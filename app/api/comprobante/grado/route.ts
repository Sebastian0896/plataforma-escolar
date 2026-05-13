import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Evaluacion from '@/lib/models/Evaluacion'
import { jsPDF } from 'jspdf'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const periodo = searchParams.get('periodo') || 'P1'
  const todos = periodo === 'todos'
  const periodos = todos ? ['P1', 'P2', 'P3', 'P4'] : [periodo] 

  if (!grado) return NextResponse.json({ error: 'Grado requerido' }, { status: 400 })

  await connectDB()

  const estudiantes = await Usuario.find({
    centroId: session.user?.centroId,
    rol: 'estudiante',
    grado,
    activo: true,
  }).select('nombre grado rne').sort({ nombre: 1 }).lean()

  const centro = session.user?.centroId ? await Centro.findById(session.user.centroId).lean() : null

  const evaluaciones = await Evaluacion.find({
    grado,
    centroId: session.user?.centroId,
  }).lean()

  //const periodos = ['P1', 'P2', 'P3', 'P4']

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // Header una sola vez
  doc.setFillColor(30, 64, 175)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(centro?.nombre || 'Centro Educativo', pageWidth / 2, 16, { align: 'center' })
  doc.setFontSize(14)
  doc.text(`Comprobantes de Notas - ${periodo}`, pageWidth / 2, 28, { align: 'center' })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Grado: ${grado?.replace('-', ' ')}`, pageWidth / 2, 36, { align: 'center' })
  doc.setTextColor(0, 0, 0)
  y = 48

  doc.setFontSize(8)

  for (const estudiante of estudiantes) {
    if (y > 240) { doc.addPage(); y = 20 }

    // Nombre del estudiante
    doc.setFont('helvetica', 'bold')
    doc.text(estudiante.nombre || '', 15, y)
    y += 6

    // Tabla de materias
    const evals = evaluaciones.filter(e => e.estudianteId?.toString() === estudiante._id.toString())
    const porMateria: Record<string, Record<string, number>> = {}
    evals.forEach((e: any) => {
      const mat = e.materia || 'Sin materia'
      if (!porMateria[mat]) porMateria[mat] = {}
      const valores = Object.values(e.notas || {}) as number[]
      porMateria[mat][e.periodo] = valores.length > 0 ? Math.round(valores.reduce((a,b) => a+b, 0) / valores.length) : 0
    })

    const materias = Object.keys(porMateria).sort()

    if (materias.length === 0) {
      doc.setFont('helvetica', 'normal')
      doc.text('Sin evaluaciones', 20, y)
      y += 6
    } else {
      materias.forEach(materia => {
        let x = 20
        doc.setFont('helvetica', 'normal')
        doc.text(materia.substring(0, 25), x, y)
        x += 50
        periodos.forEach(p => {
          const nota = porMateria[materia][p]
          doc.text(nota !== undefined ? String(nota) : '-', x, y, { align: 'center' })
          x += 15
        })
        y += 5
      })
    }

    y += 4
    doc.setDrawColor(200, 200, 200)
    doc.line(15, y, pageWidth - 15, y)
    y += 4
  }

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="comprobantes-${grado}.pdf"`,
    },
  })
}