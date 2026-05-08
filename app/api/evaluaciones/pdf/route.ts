import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Evaluacion from '@/lib/models/Evaluacion'
import Usuario from '@/lib/models/Usuario'
import { jsPDF } from 'jspdf'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const session = await auth()

  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json(
      { error: 'No autorizado' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)

  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')

  if (!grado || !materia) {
    return NextResponse.json(
      { error: 'Faltan grado y materia' },
      { status: 400 }
    )
  }

  await connectDB()

  const periodos = ['P1', 'P2', 'P3', 'P4']

  const estudiantes = await Usuario.find({
    centroId: session.user.centroId,
    rol: 'estudiante',
    grado,
    activo: true,
  })
    .select('nombre')
    .sort({ nombre: 1 })
    .lean()

  const evaluaciones = await Evaluacion.find({
    grado,
    materia,
    centroId: session.user.centroId,
    periodo: { $in: periodos },
  }).lean()

  // Datos por estudiante
  const datos: Record<string, Record<string, number>> = {}

  estudiantes.forEach((e: any) => {
    datos[e._id.toString()] = {}
  })

  evaluaciones.forEach((e: any) => {
    const id = e.estudianteId?.toString()

    if (id && e.notas && datos[id]) {
      const valores = Object.values(e.notas) as number[]

      const promedio =
        valores.length > 0
          ? Math.round(
              valores.reduce((a, b) => a + b, 0) / valores.length
            )
          : 0

      datos[id][e.periodo] = promedio
    }
  })

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  let y = 25

  // =========================
  // HEADER
  // =========================
  doc.setFillColor(30, 64, 175)
  doc.rect(0, 0, pageWidth, 35, 'F')

  doc.setTextColor(255, 255, 255)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)

  doc.text(
    'Reporte de Evaluaciones',
    pageWidth / 2,
    15,
    { align: 'center' }
  )

  doc.setFontSize(12)

  doc.text(
    `${materia} · ${grado.replace('-', ' ')} · Todos los períodos`,
    pageWidth / 2,
    25,
    { align: 'center' }
  )

  doc.setTextColor(0, 0, 0)

  y = 45

  // =========================
  // TABLA HEADER
  // =========================
  doc.setFillColor(230, 235, 255)
  doc.rect(10, y - 6, pageWidth - 20, 10, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)

  doc.text('#', 14, y)
  doc.text('Estudiante', 25, y)

  let xCol = 120

  periodos.forEach((p) => {
    doc.text(p, xCol, y, {
      align: 'center',
    })

    xCol += 30
  })

  doc.text('Prom', xCol, y, {
    align: 'center',
  })

  y += 12

  // =========================
  // FILAS
  // =========================
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)

  estudiantes.forEach((e: any, i: number) => {
    if (y > pageHeight - 25) {
      doc.addPage()
      y = 20
    }

    const id = e._id.toString()
    const notas = datos[id] || {}

    // Zebra rows
    if (i % 2 === 0) {
      doc.setFillColor(248, 250, 252)
      doc.rect(10, y - 5, pageWidth - 20, 9, 'F')
    }

    doc.text(String(i + 1), 14, y)

    doc.text(
      (e.nombre || '').substring(0, 40),
      25,
      y
    )

    let x = 120
    const valores: number[] = []

    periodos.forEach((p) => {
      const nota = notas[p]

      if (nota !== undefined) {
        valores.push(nota)
      }

      doc.text(
        nota !== undefined ? String(nota) : '-',
        x,
        y,
        { align: 'center' }
      )

      x += 30
    })

    const promedio =
      valores.length > 0
        ? Math.round(
            valores.reduce((a, b) => a + b, 0) /
              valores.length
          )
        : null

    doc.text(
      promedio !== null ? String(promedio) : '-',
      x,
      y,
      { align: 'center' }
    )

    y += 10
  })

  // =========================
  // FOOTER
  // =========================
  const totalPages = doc.getNumberOfPages()

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)

    doc.setDrawColor(220, 220, 220)

    doc.line(
      10,
      pageHeight - 12,
      pageWidth - 10,
      pageHeight - 12
    )

    doc.setFontSize(10)
    doc.setTextColor(120, 120, 120)

    doc.text(
      `Generado desde Oficina Virtual · Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    )
  }

  const pdfBuffer = Buffer.from(
    doc.output('arraybuffer')
  )

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="evaluaciones-${grado}-${materia}.pdf"`,
    },
  })
}