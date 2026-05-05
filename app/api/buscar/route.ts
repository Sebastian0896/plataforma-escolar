import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q || q.length < 2) return NextResponse.json([])

  await connectDB()

  const filter: any = {
    publicado: true,
    $or: [
      { tema: { $regex: q, $options: 'i' } },
      { materia: { $regex: q, $options: 'i' } },
      { grado: { $regex: q, $options: 'i' } },
      { competencia: { $regex: q, $options: 'i' } },
      { indicadorLogro: { $regex: q, $options: 'i' } },
    ],
  }

  // Filtrar por centro y categoría si es docente
  if (session.user?.role === 'docente') {
    filter.centroId = session.user.centroId
    filter.categoriaDocente = session.user.categoriaDocente
  }

  const resultados = await Planificacion.find(filter)
    .select('tema materia grado slug nivel')
    .limit(10)
    .lean()

  return NextResponse.json(resultados)
}