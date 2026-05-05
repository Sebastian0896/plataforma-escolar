import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const formato = searchParams.get('formato') || 'json'

  await connectDB()

  const planificaciones = await Planificacion.find({
    centroId: session.user.centroId,
    categoriaDocente: session.user.categoriaDocente,
    publicado: true,
  })
    .select('tema materia grado nivel ciclo fechaProgramada createdAt')
    .sort({ createdAt: -1 })
    .lean()

  const datos = planificaciones.map((p: any) => ({
    Tema: p.tema,
    Materia: p.materia,
    Grado: p.grado?.replace('-', ' '),
    Nivel: p.nivel?.replace('nivel-', '').replace('-', ' '),
    Ciclo: p.ciclo?.replace('-', ' '),
    'Fecha Programada': p.fechaProgramada ? new Date(p.fechaProgramada).toLocaleDateString('es-DO') : 'Sin fecha',
    'Fecha Creación': new Date(p.createdAt).toLocaleDateString('es-DO'),
  }))

  if (formato === 'excel') {
    const XLSX = await import('xlsx')
    const ws = XLSX.utils.json_to_sheet(datos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Planificaciones')

    // Ajustar ancho de columnas
    ws['!cols'] = [
      { wch: 35 }, // Tema
      { wch: 20 }, // Materia
      { wch: 20 }, // Grado
      { wch: 20 }, // Nivel
      { wch: 20 }, // Ciclo
      { wch: 18 }, // Fecha Programada
      { wch: 18 }, // Fecha Creación
    ]

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="planificaciones-${new Date().toISOString().split('T')[0]}.xlsx"`,
      },
    })
  }

  if (formato === 'pdf') {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    // Header
    doc.setFillColor(30, 64, 175)
    doc.rect(0, 0, pageWidth, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Reporte de Planificaciones', pageWidth / 2, 20, { align: 'center' })
    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`Docente: ${session.user?.name}`, pageWidth / 2, 30, { align: 'center' })
    doc.setTextColor(0, 0, 0)

    let y = 50

    // Tabla
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setFillColor(245, 245, 255)
    doc.rect(10, y, pageWidth - 20, 8, 'F')
    doc.text('Tema', 12, y + 5.5)
    doc.text('Materia', 70, y + 5.5)
    doc.text('Grado', 100, y + 5.5)
    doc.text('F. Programada', 130, y + 5.5)
    doc.text('F. Creación', 168, y + 5.5)
    y += 10

    doc.setFont('helvetica', 'normal')
    datos.forEach((row: any, i: number) => {
      if (y > 270) { doc.addPage(); y = 20 }

      if (i % 2 === 0) {
        doc.setFillColor(248, 250, 252)
        doc.rect(10, y - 5, pageWidth - 20, 8, 'F')
      }

      doc.text(row.Tema?.substring(0, 38) || '', 12, y)
      doc.text(row.Materia?.substring(0, 15) || '', 70, y)
      doc.text(row.Grado || '', 100, y)
      doc.text(row['Fecha Programada'] || '', 130, y)
      doc.text(row['Fecha Creación'] || '', 168, y)
      y += 8
    })

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(7)
      doc.setTextColor(180, 180, 180)
      doc.line(10, 288, pageWidth - 10, 288)
      doc.text('Generado desde Oficina Virtual', pageWidth / 2, 293, { align: 'center' })
      doc.text(`Página ${i} de ${totalPages}`, pageWidth - 15, 293, { align: 'right' })
    }

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="planificaciones-${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    })
  }

  return NextResponse.json(datos)
}