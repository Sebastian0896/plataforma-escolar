import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import { sugerirTipoInstrumento, generarCriterios, generarRecomendaciones } from '@/lib/instrumentos'
import { jsPDF } from 'jspdf'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (!slug) return NextResponse.json({ error: 'Slug requerido' }, { status: 400 })

  await connectDB()
  const plan = await Planificacion.findOne({ slug }).lean()
  if (!plan) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  const tipo = sugerirTipoInstrumento(plan as any)
  const criterios = generarCriterios(plan as any)
  const recomendaciones = generarRecomendaciones(plan as any)

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // Header
  doc.setFillColor(124, 58, 237)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Instrumento de Evaluación', pageWidth / 2, 20, { align: 'center' })
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(`${plan.tema} - ${plan.grado?.replace('-', ' ')}`, pageWidth / 2, 32, { align: 'center' })
  doc.setTextColor(0, 0, 0)
  y = 50

  // Tipo
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Tipo de Instrumento', 15, y)
  y += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(tipo, 15, y)
  y += 12

  // Datos
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Datos de la Planificación', 15, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Materia: ${plan.materia}`, 15, y); y += 5
  doc.text(`Grado: ${plan.grado?.replace('-', ' ')}`, 15, y); y += 5
  doc.text(`Indicador: ${plan.indicadorLogro?.substring(0, 80)}`, 15, y); y += 8

  // Criterios
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Criterios de Evaluación', 15, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  criterios.forEach((c: string, i: number) => {
    if (y > 270) { doc.addPage(); y = 20 }
    doc.text(`${i + 1}. ${c}`, 20, y, { maxWidth: pageWidth - 40 })
    y += 6
  })
  y += 6

  // Recomendaciones
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Recomendaciones', 15, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  recomendaciones.forEach((r: string) => {
    if (y > 270) { doc.addPage(); y = 20 }
    doc.text(`• ${r}`, 20, y, { maxWidth: pageWidth - 40 })
    y += 5
  })

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="instrumento-${slug}.pdf"`,
    },
  })
}