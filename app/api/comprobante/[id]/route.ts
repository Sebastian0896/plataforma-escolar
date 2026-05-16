// app/api/docente/reportes/estudiante/[id]/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { jsPDF } from 'jspdf'

export const runtime = "nodejs"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const rol = session?.user?.role
  
  if (!session || (rol !== 'admin_centro' && rol !== 'admin' && rol !== 'registro' && rol !== 'docente')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const { searchParams } = new URL(request.url)
  const periodo = searchParams.get('periodo') || 'P1'
  const mostrarTodos = periodo === 'todos'
  const periodos = mostrarTodos ? ['P1', 'P2', 'P3', 'P4'] : [periodo]

  // =====================================================
  // POSTGRESQL - Estudiante y centro
  // =====================================================

  const estudiante = await prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      email: true,
      grado: true,
      rne: true,
      centroId: true,
    },
  })

  if (!estudiante) {
    return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 })
  }

  const centro = await prisma.centro.findUnique({
    where: { id: estudiante.centroId || session.user?.centroId },
    select: { id: true, nombre: true, codigo: true },
  })

  // =====================================================
  // POSTGRESQL - Evaluaciones del estudiante
  // =====================================================

  const evaluaciones = await prisma.evaluacion.findMany({
    where: {
      estudianteId: id,
    },
    select: {
      id: true,
      nota: true,
      materia: true,
      observaciones: true,
      competencia: {
        select: {
          id: true,
          nombre: true,
        },
      },
      periodo: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  })

  // Agrupar por materia y período
  const porMateria: Record<string, Record<string, number[]>> = {}
  
  evaluaciones.forEach((e) => {
    const materia = e.materia || 'Sin materia'
    const periodoNombre = e.periodo?.nombre || 'P1'
    const nota = e.nota || 0
    
    if (!porMateria[materia]) {
      porMateria[materia] = {}
    }
    if (!porMateria[materia][periodoNombre]) {
      porMateria[materia][periodoNombre] = []
    }
    porMateria[materia][periodoNombre].push(nota)
  })

  // Calcular promedios
  const promediosPorMateria: Record<string, Record<string, number>> = {}
  Object.keys(porMateria).forEach(materia => {
    promediosPorMateria[materia] = {}
    Object.keys(porMateria[materia]).forEach(periodoKey => {
      const notas = porMateria[materia][periodoKey]
      const promedio = notas.reduce((a, b) => a + b, 0) / notas.length
      promediosPorMateria[materia][periodoKey] = Math.round(promedio)
    })
  })

  // =====================================================
  // GENERAR PDF
  // =====================================================

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

  // Tabla de notas
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

  const materias = Object.keys(promediosPorMateria).sort()

  materias.forEach(materia => {
    if (y > 250) {
      doc.addPage()
      y = 20
      
      // Repetir encabezado de tabla en nueva página
      doc.setFont('helvetica', 'bold')
      doc.setFillColor(245, 245, 255)
      doc.rect(10, y, pageWidth - 20, 8, 'F')
      doc.text('Materia', 15, y + 5.5)
      let xHeader = 80
      periodos.forEach(p => {
        doc.text(p, xHeader, y + 5.5, { align: 'center' })
        xHeader += 28
      })
      doc.text('Prom', xHeader, y + 5.5, { align: 'center' })
      y += 10
      doc.setFont('helvetica', 'normal')
    }

    doc.text(materia.substring(0, 30), 15, y)
    
    let x = 80
    const valores: number[] = []

    periodos.forEach(p => {
      const nota = promediosPorMateria[materia][p]
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
  if (y > 250) {
    doc.addPage()
    y = 30
  }
  
  doc.line(50, y, 160, y)
  doc.setFontSize(9)
  doc.text('Firma del docente / Encargado de registro', pageWidth / 2, y + 6, { align: 'center' })

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="comprobante-${estudiante.nombre?.replace(/\s/g, '_')}.pdf"`,
    },
  })
}