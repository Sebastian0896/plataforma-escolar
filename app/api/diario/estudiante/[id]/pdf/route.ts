import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Diario from '@/lib/models/Diario'
import Usuario from '@/lib/models/Usuario'
import { jsPDF } from 'jspdf'

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  await connectDB()

  const estudiante = await Usuario.findById(id).lean()
  const registros = await Diario.find({ estudianteId: id }).sort({ fecha: -1 }).lean()

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // Header
  doc.setFillColor(30, 64, 175)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Diario del Docente', pageWidth / 2, 20, { align: 'center' })
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text(estudiante?.nombre || 'Estudiante', pageWidth / 2, 32, { align: 'center' })
  doc.setTextColor(0, 0, 0)
  y = 50

  // Agrupar por período
  const porPeriodo: Record<string, any[]> = { P1: [], P2: [], P3: [], P4: [] }
  registros.forEach(r => {
    const p = r.periodo || 'P1'
    if (porPeriodo[p]) porPeriodo[p].push(r)
  })

  for (const p of ['P1', 'P2', 'P3', 'P4']) {
    const regs = porPeriodo[p]
    if (!regs || regs.length === 0) continue

    if (y > 250) { doc.addPage(); y = 20 }

    // Título del período
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(`${p} — ${regs.length} registros`, 15, y)
    y += 6

    // Resumen
    const estrellas = regs.reduce((a, b) => a + (b.participacion || 0), 0)
    const tareas = regs.filter(r => r.tarea).length
    const extra = regs.reduce((a, b) => a + (b.puntosExtra || 0), 0)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.text(`⭐ ${estrellas} estrellas  📝 ${tareas}/${regs.length} tareas  🎁 +${extra} extra`, 15, y)
    y += 8

    // Tabla
    doc.setFontSize(8)
    doc.setFillColor(245, 245, 255)
    doc.rect(15, y, pageWidth - 30, 6, 'F')
    doc.text('Fecha', 18, y + 4)
    doc.text('⭐', 62, y + 4)
    doc.text('📝', 78, y + 4)
    doc.text('🎁', 94, y + 4)
    doc.text('Observación', 110, y + 4)
    y += 7

    doc.setFont('helvetica', 'normal')
    regs.forEach(r => {
      if (y > 270) { doc.addPage(); y = 20 }
      doc.text(new Date(r.fecha).toLocaleDateString('es-DO'), 18, y + 4)
      doc.text(String(r.participacion || 0), 64, y + 4, { align: 'center' })
      doc.text(r.tarea ? 'Sí' : 'No', 80, y + 4, { align: 'center' })
      doc.text(String(r.puntosExtra || 0), 96, y + 4, { align: 'center' })
      doc.text((r.observacion || '').substring(0, 40), 110, y + 4)
      y += 6
    })

    y += 8
  }

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="diario-${estudiante?.nombre || 'estudiante'}.pdf"`,
    },
  })
}