// app/api/exportar-pdf/route.ts
import { NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const grado = searchParams.get('grado')

  if (!slug) return NextResponse.json({ error: 'Slug requerido' }, { status: 400 })

  await connectDB()
  const plan = await Planificacion.findOne({ slug, grado }).lean()
  if (!plan) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 25

  // ========== HEADER ==========
  doc.setFillColor(30, 64, 175)
  doc.rect(0, 0, pageWidth, 44, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Planificacion Diaria', pageWidth / 2, 18, { align: 'center' })
  doc.setFontSize(13)
  doc.setFont('helvetica', 'normal')
  doc.text('Centro Educativo Salome Urena', pageWidth / 2, 30, { align: 'center' })
  doc.setFontSize(9)
  doc.text(`Ano escolar: ${plan.anoEscolar || '2025-2026'}`, pageWidth / 2, 38, { align: 'center' })
  doc.setTextColor(0, 0, 0)

  y = 52

  // ========== DATOS GENERALES ==========
  doc.setDrawColor(200, 200, 200)
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(12, y, pageWidth - 24, 52, 3, 3, 'FD')

  y += 8
  doc.setFontSize(10)
  const datosIzq = [
    { label: 'Tema:', value: plan.tema },
    { label: 'Materia:', value: plan.materia },
    { label: 'Nivel:', value: plan.nivel?.replace('nivel-', '').replace('-', ' ') },
    { label: 'Ciclo:', value: plan.ciclo?.replace('-', ' ') },
  ]
  const datosDer = [
    { label: 'Grado:', value: plan.grado?.replace('-', ' ') },
    { label: 'Maestro/a:', value: plan.maestro },
    { label: 'Coordinadora:', value: plan.coordinadora },
    { label: 'Categoria:', value: plan.categoriaDocente?.replace('-', ' ') },
  ]

  datosIzq.forEach((d) => {
    doc.setFont('helvetica', 'bold')
    doc.text(d.label, 18, y)
    doc.setFont('helvetica', 'normal')
    doc.text(d.value || '', 50, y)
    y += 7
  })

  y = 60
  datosDer.forEach((d) => {
    doc.setFont('helvetica', 'bold')
    doc.text(d.label, pageWidth / 2 + 6, y)
    doc.setFont('helvetica', 'normal')
    doc.text(d.value || '', pageWidth / 2 + 42, y)
    y += 7
  })

  y = 112

  // ========== COMPETENCIA E INDICADOR ==========
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(30, 64, 175)
  doc.text('Competencia:', 14, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(55, 65, 81)
  const competencia = doc.splitTextToSize(plan.competencia || '', pageWidth - 28)
  doc.text(competencia, 14, y)
  y += competencia.length * 5 + 5

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(30, 64, 175)
  doc.text('Indicador de Logro:', 14, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(55, 65, 81)
  const indicador = doc.splitTextToSize(plan.indicadorLogro || '', pageWidth - 28)
  doc.text(indicador, 14, y)
  y += indicador.length * 5 + 6

  // Contenido para estudiantes
  if (plan.contenidoEstudiante) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(30, 64, 175)
    doc.text('Para los estudiantes:', 14, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(55, 65, 81)
    const est = doc.splitTextToSize(plan.contenidoEstudiante || '', pageWidth - 28)
    doc.text(est, 14, y)
    y += est.length * 5 + 6
  }

  // ========== MOMENTOS ==========
  const colores: Record<string, [number, number, number]> = {
    inicio: [220, 252, 231],
    desarrollo: [219, 234, 254],
    cierre: [243, 232, 255],
  }
  const coloresTexto: Record<string, [number, number, number]> = {
    inicio: [22, 101, 52],
    desarrollo: [30, 64, 175],
    cierre: [107, 33, 168],
  }

  plan.momentos?.forEach((momento: any, idx: number) => {
    if (y > 240) {
      doc.addPage()
      y = 20
    }

    const color = colores[momento.tipo] || [240, 240, 240]
    const colorTexto = coloresTexto[momento.tipo] || [0, 0, 0]

    // Fondo y título del momento
    doc.setFillColor(...color)
    doc.roundedRect(12, y, pageWidth - 24, 14, 3, 3, 'F')
    doc.setTextColor(...colorTexto)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    const icono = momento.tipo === 'inicio' ? 'INICIO' : momento.tipo === 'desarrollo' ? 'DESARROLLO' : 'CIERRE'
    doc.text(`${icono}`, pageWidth / 2, y + 9, { align: 'center' })
    doc.setTextColor(0, 0, 0)
    y += 18

    // Descripción del momento
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(9)
    doc.setTextColor(75, 85, 99)
    const descMomento = doc.splitTextToSize(momento.descripcion || '', pageWidth - 36)
    doc.text(descMomento, 18, y)
    y += descMomento.length * 5 + 4

    // Actividades
    momento.actividades?.forEach((act: any, aIdx: number) => {
      if (y > 255) {
        doc.addPage()
        y = 20
      }

      // Línea separadora sutil
      if (aIdx > 0) {
        doc.setDrawColor(220, 220, 220)
        doc.line(18, y, pageWidth - 18, y)
        y += 5
      }

      // Título de actividad
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(17, 24, 39)
      doc.text(`Actividad ${aIdx + 1}: ${act.titulo}`, 18, y)

      // Duración a la derecha
      if (act.duracion) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.setTextColor(107, 114, 128)
        doc.text(act.duracion, pageWidth - 25, y, { align: 'right' })
      }
      y += 6

      // Descripción de actividad
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(55, 65, 81)
      const actDesc = doc.splitTextToSize(act.descripcion || '', pageWidth - 40)
      doc.text(actDesc, 24, y)
      y += actDesc.length * 5 + 2

      // Contenido estudiante
      if (act.contenidoEstudiante) {
        doc.setFont('helvetica', 'italic')
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        doc.text('Para el estudiante:', 24, y)
        y += 4
        const estAct = doc.splitTextToSize(act.contenidoEstudiante || '', pageWidth - 44)
        doc.text(estAct, 28, y)
        y += estAct.length * 4 + 2
      }

      // Recursos
      if (act.recursos && act.recursos.length > 0) {
        act.recursos.forEach((recurso: any) => {
          if (y > 270) {
            doc.addPage()
            y = 20
          }

          if (recurso.tipo === 'audio' && recurso.texto) {
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(8)
            doc.setTextColor(99, 102, 241)
            doc.text('Audio TTS:', 24, y)
            y += 4
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(8)
            doc.setTextColor(99, 102, 241)
            const audio = doc.splitTextToSize(recurso.texto || '', pageWidth - 44)
            doc.text(audio, 28, y)
            y += audio.length * 4
            if (recurso.traduccion) {
              doc.setTextColor(148, 163, 184)
              const trad = doc.splitTextToSize(`Trad: ${recurso.traduccion}`, pageWidth - 44)
              doc.text(trad, 28, y)
              y += trad.length * 4
            }
            y += 2
          }

          if ((recurso.tipo === 'imagen' || recurso.tipo === 'pdf' || recurso.tipo === 'video' || recurso.tipo === 'enlace') && recurso.url) {
            const iconos: Record<string, string> = {
              imagen: 'Imagen',
              pdf: 'Documento PDF',
              video: 'Video',
              enlace: 'Enlace',
            }
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(8)
            doc.setTextColor(99, 102, 241)
            doc.text(`${iconos[recurso.tipo] || 'Recurso'}:`, 24, y)
            y += 4
            doc.setFont('helvetica', 'normal')
            doc.setFontSize(8)
            doc.setTextColor(59, 130, 246)
            doc.textWithLink(recurso.descripcion || recurso.url, 28, y, { url: recurso.url })
            y += 5
          }
        })
      }

      y += 2
      doc.setTextColor(0, 0, 0)
    })

    y += 4
  })

  // ========== FOOTER ==========
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(180, 180, 180)
    doc.setDrawColor(200, 200, 200)
    doc.line(12, 288, pageWidth - 12, 288)
    doc.text('Generado desde Plataforma Educativa - Salome Urena', pageWidth / 2, 293, { align: 'center' })
    doc.text(`Pagina ${i} de ${totalPages}`, pageWidth - 20, 293, { align: 'right' })
  }

  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="planificacion-${plan.slug}.pdf"`,
    },
  })
}