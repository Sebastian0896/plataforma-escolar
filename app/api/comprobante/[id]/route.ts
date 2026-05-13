import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Evaluacion from '@/lib/models/Evaluacion'
import { jsPDF } from 'jspdf'

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const rol = session?.user?.role
  if (!session || (rol !== 'admin_centro' && rol !== 'admin' && rol !== 'registro' && rol !=="docente")) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const { searchParams } = new URL(request.url)
  const periodo = searchParams.get('periodo') || 'P1'

  await connectDB()

  const estudiante = await Usuario.findById(id).lean()
  if (!estudiante) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  const centro = estudiante.centroId ? await Centro.findById(estudiante.centroId).lean() : null

  const periodos = ['P1', 'P2', 'P3', 'P4']

  // Obtener todas las evaluaciones del estudiante
  const evaluaciones = await Evaluacion.find({
    estudianteId: id,
    centroId: session.user?.centroId || estudiante.centroId,
  }).lean()

  // Agrupar por materia
  const porMateria: Record<string, Record<string, number>> = {}
  evaluaciones.forEach((e: any) => {
    const mat = e.materia || 'Sin materia'
    if (!porMateria[mat]) porMateria[mat] = {}
    const valores = Object.values(e.notas || {}) as number[]
    const promedio = valores.length > 0
      ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
      : 0
    porMateria[mat][e.periodo] = promedio
  })

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // Header
  doc.setFillColor(30, 64, 175)
  doc.rect(0, 0, pageWidth, 45, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(centro?.nombre || 'Centro Educativo', pageWidth / 2, 16, { align: 'center' })
  doc.setFontSize(14)
  doc.text('Comprobante de Notas', pageWidth / 2, 28, { align: 'center' })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Período: ${periodo}`, pageWidth / 2, 38, { align: 'center' })
  doc.setTextColor(0, 0, 0)
  y = 55

  // Datos del estudiante
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Estudiante:', 15, y)
  doc.setFont('helvetica', 'normal')
  doc.text(estudiante.nombre || '', 55, y)
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.text('Grado:', 15, y)
  doc.setFont('helvetica', 'normal')
  doc.text(estudiante.grado?.replace('-', ' ') || '', 55, y)
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.text('Año Escolar:', 15, y)
  doc.setFont('helvetica', 'normal')
  doc.text('2025-2026', 55, y)
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.text('RNE:', 15, y)
  doc.setFont('helvetica', 'normal')
  doc.text(estudiante.rne || '-', 55, y)
  y += 12

  // Tabla
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setFillColor(245, 245, 255)
  doc.rect(10, y, pageWidth - 20, 8, 'F')
  doc.text('Materia', 15, y + 5.5)
  let xCol = 80
  periodos.forEach(p => {
    doc.text(p, xCol, y + 5.5, { align: 'center' })
    xCol += 28
  })
  doc.text('Prom', xCol, y + 5.5, { align: 'center' })
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)

  const materias = Object.keys(porMateria).sort()

  materias.forEach(materia => {
    if (y > 250) { doc.addPage(); y = 20 }

    doc.text(materia, 15, y)
    let x = 80
    const valores: number[] = []

    periodos.forEach(p => {
      const nota = porMateria[materia][p]
      if (nota !== undefined) valores.push(nota)
      doc.text(nota !== undefined ? String(nota) : '-', x, y, { align: 'center' })
      x += 28
    })

    const promedio = valores.length > 0
      ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
      : null
    doc.text(promedio !== null ? String(promedio) : '-', x, y, { align: 'center' })
    y += 10
  })

  // Firma
  y += 20
  if (y > 250) { doc.addPage(); y = 30 }
  doc.line(50, y, 160, y)
  doc.setFontSize(9)
  doc.text('Firma del docente / Encargado de registro', pageWidth / 2, y + 6, { align: 'center' })

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="comprobante-${estudiante.nombre}.pdf"`,
    },
  })
}