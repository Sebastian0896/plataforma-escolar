import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs"

// GET
export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const periodo = searchParams.get('periodo')
  const materia = searchParams.get('materia') || session.user?.materias?.[0] || ''

  if (!grado || !periodo) {
    return NextResponse.json({ error: 'Grado y período requeridos' }, { status: 400 })
  }

  // Buscar o crear período
  let periodoDoc = await prisma.periodo.findFirst({
    where: { nombre: periodo, centroId: session.user?.centroId || '' },
  })

  if (!periodoDoc) {
    periodoDoc = await prisma.periodo.create({
      data: {
        nombre: periodo,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        centroId: session.user?.centroId || '',
      },
    })
  }

  const evaluaciones = await prisma.evaluacion.findMany({
    where: {
      periodoId: periodoDoc.id,
      materia: materia || undefined,
      estudiante: { grado, activo: true },
    },
    include: { estudiante: true, competencia: true },
  })

  // Formatear respuesta como el formato anterior
  const notas: Record<string, Record<string, number>> = {}
  evaluaciones.forEach(e => {
    const estId = e.estudianteId
    if (!notas[estId]) notas[estId] = {}
    notas[estId][e.competenciaId] = e.nota
  })

  return NextResponse.json({ notas })
}

// POST
export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { grado, periodo, materia, notas } = await request.json()

  // Buscar o crear período
  let periodoDoc = await prisma.periodo.findFirst({
    where: { nombre: periodo, centroId: session.user?.centroId || '' },
  })
  if (!periodoDoc) {
    periodoDoc = await prisma.periodo.create({
      data: {
        nombre: periodo,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        centroId: session.user?.centroId || '',
      },
    })
  }

  // Guardar evaluaciones
  for (const [estudianteId, competencias] of Object.entries(notas)) {
    for (const [competenciaId, nota] of Object.entries(competencias as Record<string, number>)) {
      console.log('🆔 estudianteId recibido:', estudianteId)
      await prisma.evaluacion.upsert({
        where: {
          estudianteId_competenciaId_periodoId: {
            estudianteId,
            competenciaId,
            periodoId: periodoDoc.id,
          },
        },
        update: { nota, materia: materia || '' },
        create: {
          estudianteId,
          competenciaId,
          periodoId: periodoDoc.id,
          materia: materia || '',
          nota,
          docenteId: session.user?.id || '',
        },
      })
    }
  }

  return NextResponse.json({ success: true })
}