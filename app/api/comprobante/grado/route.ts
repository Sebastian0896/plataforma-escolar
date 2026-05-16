
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
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

  // =====================================================
  // POSTGRESQL - Obtener estudiantes y centro
  // =====================================================

  const estudiantes = await prisma.usuario.findMany({
    where: {
      centroId: session.user?.centroId,
      rol: 'estudiante',
      grado: grado,
      activo: true,
    },
    select: {
      id: true,
      nombre: true,
      grado: true,
      rne: true,
    },
    orderBy: {
      nombre: 'asc',
    },
  })

  const centro = await prisma.centro.findUnique({
    where: { id: session.user?.centroId },
    select: { id: true, nombre: true, codigo: true },
  })

  // =====================================================
  // POSTGRESQL - Obtener evaluaciones
  // =====================================================

  // Obtener período(s) correspondiente(s)
  const periodosDB = await prisma.periodo.findMany({
    where: {
      centroId: session.user?.centroId,
      nombre: { in: periodos },
    },
    select: { id: true, nombre: true },
  })

  const evaluaciones = await prisma.evaluacion.findMany({
    where: {
      estudiante: {
        centroId: session.user?.centroId,
        grado: grado,
      },
      periodoId: { in: periodosDB.map(p => p.id) },
    },
    select: {
      id: true,
      nota: true,
      materia: true,
      estudianteId: true,
      periodo: {
        select: { nombre: true },
      },
    },
  })

  // =====================================================
  // GENERAR PDF
  // =====================================================

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // Header
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

  // Tabla headers
  doc.setFont('helvetica', 'bold')
  doc.text('Estudiante', 15, y)
  let x = 65
  periodos.forEach(p => {
    doc.text(p, x, y, { align: 'center' })
    x += 20
  })
  y += 6
  doc.setFont('helvetica', 'normal')

  for (const estudiante of estudiantes) {
    if (y > 240) {
      doc.addPage()
      y = 20
      
      // Repetir header en nueva página
      doc.setFont('helvetica', 'bold')
      doc.text('Estudiante', 15, y)
      let xHeader = 65
      periodos.forEach(p => {
        doc.text(p, xHeader, y, { align: 'center' })
        xHeader += 20
      })
      y += 6
      doc.setFont('helvetica', 'normal')
    }

    // Nombre del estudiante
    doc.text(estudiante.nombre || '', 15, y)
    
    // Notas por período
    let xNota = 65
    for (const p of periodos) {
      // Buscar evaluaciones del estudiante para este período
      const evalsEstudiante = evaluaciones.filter(
        e => e.estudianteId === estudiante.id && e.periodo?.nombre === p
      )
      
      let notaPromedio = '-'
      if (evalsEstudiante.length > 0) {
        const sumaNotas = evalsEstudiante.reduce((acc: number, e: any) => {
          return acc + (e.nota || 0)
        }, 0)
        notaPromedio = Math.round(sumaNotas / evalsEstudiante.length).toString()
      }
      
      doc.text(notaPromedio, xNota, y, { align: 'center' })
      xNota += 20
    }
    
    y += 6
    
    // Línea separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(15, y - 2, pageWidth - 15, y - 2)
  }

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="comprobantes-${grado}.pdf"`,
    },
  })
}