// app/api/diario/estudiante/[id]/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Diario from '@/lib/models/Diario'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 })
  }

  try {
    // 1. Obtener estudiante y su centro desde PostgreSQL
    const estudiante = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        grado: true,
        centro: {
          select: {
            nombre: true,
            codigo: true,
          },
        },
      },
    })

    if (!estudiante) {
      return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 })
    }

    // 2. Obtener registros del diario desde MongoDB
    await connectDB()
    const registros = await Diario.find({ estudianteId: id })
      .sort({ fecha: -1 })
      .lean()

    // 3. Calcular estadísticas
    const totalRegistros = registros.length
    const promedioParticipacion = totalRegistros > 0 
      ? registros.reduce((acc: number, r: any) => acc + (r.participacion || 0), 0) / totalRegistros 
      : 0
    const promedioPuntosExtra = totalRegistros > 0 
      ? registros.reduce((acc: number, r: any) => acc + (r.puntosExtra || 0), 0) / totalRegistros 
      : 0
    const tareasEntregadas = registros.filter((r: any) => r.tarea === true).length
    const porcentajeTareas = totalRegistros > 0 ? (tareasEntregadas / totalRegistros) * 100 : 0

    // 4. Generar PDF profesional
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // ========== ENCABEZADO ==========
    doc.setFillColor(41, 128, 185)
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('INFORME DE DIARIO ESCOLAR', 105, 20, { align: 'center' })

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    const nombreCentro = estudiante.centro?.nombre || 'Plataforma Educativa'
    doc.text(nombreCentro, 105, 32, { align: 'center' })
    doc.setTextColor(0, 0, 0)

    // ========== DATOS DEL ESTUDIANTE ==========
    doc.setFillColor(240, 248, 255)
    doc.rect(14, 50, 182, 45, 'F')
    doc.setDrawColor(41, 128, 185)
    doc.setLineWidth(0.5)
    doc.rect(14, 50, 182, 45)

    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(41, 128, 185)
    doc.text('DATOS DEL ESTUDIANTE', 20, 62)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    
    doc.text(`Nombre: ${estudiante.nombre}`, 20, 74)
    doc.text(`Grado: ${estudiante.grado || 'No asignado'}`, 20, 82)
    doc.text(`Email: ${estudiante.email || 'No registrado'}`, 120, 74)
    doc.text(`Codigo: ${estudiante.centro?.codigo || 'N/A'}`, 120, 82)

    // ========== ESTADÍSTICAS ==========
    const startYStats = 105
    doc.setFillColor(245, 245, 245)
    doc.rect(14, startYStats, 182, 42, 'F')

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(41, 128, 185)
    doc.text('RESUMEN ACADEMICO', 20, startYStats + 8)

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    
    // Estadísticas sin emojis
    doc.text(`Total de registros: ${totalRegistros}`, 20, startYStats + 20)
    doc.text(`Participacion promedio: ${promedioParticipacion.toFixed(1)}/5`, 20, startYStats + 30)
    doc.text(`Puntos extra promedio: ${promedioPuntosExtra.toFixed(1)}/10`, 20, startYStats + 40)
    
    doc.text(`Tareas entregadas: ${tareasEntregadas}/${totalRegistros} (${porcentajeTareas.toFixed(0)}%)`, 120, startYStats + 30)
    doc.text(`Porcentaje de asistencia: ${porcentajeTareas.toFixed(0)}%`, 120, startYStats + 40)

    // ========== TABLA DE REGISTROS ==========
    const startYTable = startYStats + 58
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(41, 128, 185)
    doc.text('DETALLE DE REGISTROS', 14, startYTable)

    const tableData = registros.map((reg: any, index: number) => [
      (index + 1).toString(),
      new Date(reg.fecha).toLocaleDateString('es-ES'),
      reg.materia,
      `${reg.participacion || 0}/5`,
      reg.tarea ? 'Si' : 'No',
      `${reg.puntosExtra || 0}/10`,
      reg.observacion?.substring(0, 35) || '-',
    ])

    autoTable(doc, {
      head: [['#', 'Fecha', 'Materia', 'Part.', 'Tarea', 'Extra', 'Observacion']],
      body: tableData,
      startY: startYTable + 6,
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [248, 248, 250],
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 22, halign: 'center' },
        2: { cellWidth: 35 },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 12, halign: 'center' },
        5: { cellWidth: 15, halign: 'center' },
        6: { cellWidth: 65 },
      },
      margin: { left: 14, right: 14 },
    })

    // ========== NOTA ADICIONAL ==========
    const finalY = (doc as any).lastAutoTable?.finalY || startYTable + 80
    
    if (registros.length === 0) {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(150, 150, 150)
      doc.text('No hay registros disponibles para este estudiante.', 105, startYTable + 20, { align: 'center' })
    }

    // ========== PIE DE PÁGINA ==========
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      
      doc.setDrawColor(200, 200, 200)
      doc.line(14, doc.internal.pageSize.height - 15, 196, doc.internal.pageSize.height - 15)
      
      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(128, 128, 128)
      doc.text(
        `Documento generado el ${fechaActual} - Plataforma Educativa`,
        14,
        doc.internal.pageSize.height - 8
      )
      doc.text(
        `Pagina ${i} de ${pageCount}`,
        196,
        doc.internal.pageSize.height - 8,
        { align: 'right' }
      )
    }

    // ========== SALIDA ==========
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="diario_${estudiante.nombre.replace(/\s/g, '_')}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generando PDF:', error)
    return NextResponse.json({ error: 'Error al generar el PDF' }, { status: 500 })
  }
}