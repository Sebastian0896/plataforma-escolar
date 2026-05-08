import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Evaluacion from '@/lib/models/Evaluacion'
import Periodo from '@/lib/models/Periodo'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const periodo = searchParams.get('periodo')
  const materia = searchParams.get('materia') || session.user?.materias?.[0] || ''

  if (!grado || !periodo) {
    return NextResponse.json({ error: 'Grado y período requeridos' }, { status: 400 })
  }

  await connectDB()

  

  const evaluaciones = await Evaluacion.find({
    grado,
    periodo,
    materia,
    centroId: session.user.centroId,
  }).lean()

  console.log('📋 Evaluaciones encontradas:', evaluaciones.length)
console.log('📋 Primera:', JSON.stringify(evaluaciones[0]))

  // Convertir a formato { estudianteId: { competenciaId: nota } }
  const notas: Record<string, Record<string, number>> = {}
  evaluaciones.forEach((e: any) => {
    const id = e.estudianteId?.toString()
    if (id && e.notas) {
      const notasObj: Record<string, number> = {}
        if (e.notas instanceof Map) {
        e.notas.forEach((valor: number, key: string) => {
            notasObj[key] = valor
        })
        } else if (typeof e.notas === 'object') {
        Object.assign(notasObj, e.notas)
        }
        notas[id] = notasObj
            }
        })

  return NextResponse.json({ notas })
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { grado, periodo, notas, materia } = await request.json()

  await connectDB()

  const materiaDocente = materia || session.user?.materias?.[0] || ''

  const docs = Object.entries(notas).map(([estudianteId, competencias]) => ({
    updateOne: {
      filter: { estudianteId, periodo, materia: materiaDocente },
      update: {
        $set: {
          estudianteId,
          periodo,
          grado,
          materia: materiaDocente,
          notas: competencias,
          docenteId: session.user?.id,
          centroId: session.user?.centroId,
        },
      },
      upsert: true,
    },
  }))

  if (docs.length > 0) {
    await Evaluacion.bulkWrite(docs as any)
  }

  return NextResponse.json({ success: true })
}