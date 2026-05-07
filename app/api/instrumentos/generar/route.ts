import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import { sugerirTipoInstrumento, generarCriterios, generarRecomendaciones } from '@/lib/instrumentos'

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

  return NextResponse.json({
    tipo,
    criterios,
    recomendaciones,
    planificacion: {
      tema: plan.tema,
      materia: plan.materia,
      grado: plan.grado,
      indicadorLogro: plan.indicadorLogro,
      competencia: plan.competencia,
    },
  })
}