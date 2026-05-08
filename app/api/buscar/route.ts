import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Centro from '@/lib/models/Centro'
import mongoose from 'mongoose'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q || q.length < 2) return NextResponse.json([])

  await connectDB()

  const rol = session.user?.role

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

  // Filtros según rol
  if (rol === 'docente') {
    filter.creadoPor = new mongoose.Types.ObjectId(session.user.id as string)
    filter.centroId = session.user.centroId
    filter.categoriaDocente = session.user.categoriaDocente
    if (session.user?.grados?.length) filter.grado = { $in: session.user.grados }
    if (session.user?.materias?.length) filter.materia = { $in: session.user.materias }
  } else if (rol === 'estudiante') {
    filter.centroId = session.user.centroId
    if (session.user?.grado) filter.grado = session.user.grado
  } else if (rol === 'admin_centro') {
    filter.centroId = session.user.centroId
  } else if (rol === 'coordinador' || rol === 'tecnico_distrital') {
    if (session.user?.grados?.length) filter.grado = { $in: session.user.grados }
    if (session.user?.niveles?.length) filter.nivel = { $in: session.user.niveles }
    if (session.user?.centroId) filter.centroId = session.user.centroId
  }

  console.log('👤 Rol en buscador:', session.user?.role)
console.log('🔍 Filtro:', JSON.stringify(filter))
  // superadmin y admin: sin filtro (ven todo)

  const resultados = await Planificacion.find(filter)
    .select('tema materia grado slug nivel')
    .limit(10)
    .lean()

  return NextResponse.json(resultados)
}