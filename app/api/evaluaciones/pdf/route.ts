// app/api/evaluaciones/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')
  const periodoNombre = searchParams.get('periodo') || 'P1'

  if (!grado || !materia) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  try {
    // 1. Obtener el periodo (buscar por nombre y centro)
    const periodo = await prisma.periodo.findFirst({
      where: {
        nombre: periodoNombre,
        centroId: session.user.centroId,
        activo: true,
      },
    })

    if (!periodo) {
      return NextResponse.json({ error: 'Periodo no encontrado' }, { status: 404 })
    }

    // 2. Obtener estudiantes desde PostgreSQL
    const estudiantes = await prisma.usuario.findMany({
      where: {
        centroId: session.user.centroId,
        rol: 'estudiante',
        grado: grado,
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        grado: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    })

    if (estudiantes.length === 0) {
      return NextResponse.json({ error: 'No hay estudiantes en este grado' }, { status: 404 })
    }

    // 3. Obtener competencias
    const competencias = await prisma.competencia.findMany({
      orderBy: {
        orden: 'asc',
      },
    })

    // 4. Obtener evaluaciones para estos estudiantes
    const estudianteIds = estudiantes.map(e => e.id)
    
    const evaluaciones = await prisma.evaluacion.findMany({
      where: {
        estudianteId: { in: estudianteIds },
        materia: materia,
        periodoId: periodo.id,
      },
      select: {
        id: true,
        nota: true,
        observaciones: true,
        estudianteId: true,
        competenciaId: true,
      },
    })

    // 5. Organizar datos por estudiante
    const datosEstudiantes = estudiantes.map(estudiante => {
      const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId === estudiante.id)
      
      const notasPorCompetencia: Record<string, number> = {}
      let sumaNotas = 0
      let cantidadNotas = 0
      
      competencias.forEach(comp => {
        const evalComp = evaluacionesEstudiante.find(e => e.competenciaId === comp.id)
        const nota = evalComp?.nota || 0
        notasPorCompetencia[comp.nombre] = nota
        if (nota > 0) {
          sumaNotas += nota
          cantidadNotas++
        }
      })

      const promedio = cantidadNotas > 0 ? (sumaNotas / cantidadNotas).toFixed(2) : '0.00'

      return {
        nombre: estudiante.nombre,
        promedio,
        ...notasPorCompetencia,
      }
    })

    // 6. Generar PDF
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Encabezado
    doc.setFillColor(41, 128, 185)
    doc.rect(0, 0, 210, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('REPORTE DE EVALUACIONES', 105, 20, { align: 'center' })

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.text(`Grado: ${grado} | Materia: ${materia} | Periodo: ${periodoNombre}`, 105, 32, { align: 'center' })
    doc.setTextColor(0, 0, 0)

    // Información adicional
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Total de estudiantes: ${estudiantes.length}`, 14, 52)
    doc.text(`Competencias evaluadas: ${competencias.length}`, 14, 60)

    // Tabla de notas
    const columnasCompetencias = competencias.map(c => c.nombre.substring(0, 20)) // Acortar nombres largos
    const columnas = ['Estudiante', ...columnasCompetencias, 'Promedio']

    const tableData = datosEstudiantes.map(est => [
      est.nombre,
      ...columnasCompetencias.map(comp => {
        const nota = est[comp as keyof typeof est]
        return nota !== undefined && nota !== 0 ? `${nota}` : '-'
      }),
      est.promedio,
    ])

    autoTable(doc, {
      head: [columnas],
      body: tableData,
      startY: 68,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        valign: 'middle',
        halign: 'center',
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
        0: { halign: 'left', cellWidth: 45 },
        ...Object.fromEntries(columnasCompetencias.map((_, i) => [i + 1, { cellWidth: 18 }])),
        [columnas.length - 1]: { cellWidth: 20, fillColor: [230, 240, 255] },
      },
      margin: { left: 10, right: 10 },
    })

    // Pie de página
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

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="evaluaciones_${grado}_${materia}_${periodoNombre}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generando PDF de evaluaciones:', error)
    return NextResponse.json({ error: 'Error al generar el PDF' }, { status: 500 })
  }
}