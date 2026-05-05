import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import mongoose from 'mongoose'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const planificaciones = await Planificacion.find({
    centroId: session.user.centroId,
    categoriaDocente: session.user.categoriaDocente,
    publicado: true,
    fechaProgramada: { $ne: null },
  })
    .select('tema materia grado fechaProgramada slug')
    .lean()

  return NextResponse.json(planificaciones)
}