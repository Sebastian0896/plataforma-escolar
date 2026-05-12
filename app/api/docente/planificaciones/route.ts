import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import mongoose from 'mongoose'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const filter: any = { publicado: true }

  if (session.user?.role === 'docente') {
    filter.centroId = session.user.centroId
    filter.categoriaDocente = session.user.categoriaDocente
    if (session.user?.grados?.length) filter.grado = { $in: session.user.grados }
    if (session.user?.materias?.length) filter.materia = { $in: session.user.materias }
    filter.creadoPor = session.user.id
  }

  const planificaciones = await Planificacion.find(filter)
    .select('tema materia grado slug nivel')
    .sort({ createdAt: -1 })
    .limit(50)
    .lean()
//const planificaciones = await Planificacion.find({ publicado: true }).limit(10).lean()

  return NextResponse.json(planificaciones)
}