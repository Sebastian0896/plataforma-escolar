import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Notificacion from '@/lib/models/Notificacion'

export const runtime = "nodejs"

// GET — Obtener notificaciones del usuario
export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const soloNoLeidas = searchParams.get('noLeidas') === 'true'

  await connectDB()

  const filter: any = {
    $or: [
      { destinatarioId: session.user?.id },
      { grado: { $in: session.user?.grados || [] } },
      { grado: session.user?.grado },
    ].filter(Boolean),
  }

  if (soloNoLeidas) filter.leida = false

  const notificaciones = await Notificacion.find(filter)
    .sort({ createdAt: -1 })
    .limit(20)
    .lean()

  const totalNoLeidas = await Notificacion.countDocuments({ ...filter, leida: false })

  return NextResponse.json({ notificaciones, totalNoLeidas })
}

// PUT — Marcar como leída
// app/api/notificaciones/route.ts — PUT
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const { id, todas, leida } = body

  await connectDB()

  if (todas) {
    await Notificacion.updateMany(
      { $or: [{ destinatarioId: session.user?.id }, { grado: session.user?.grado }] },
      { leida: leida ?? true }
    )
  } else if (id) {
    await Notificacion.findByIdAndUpdate(id, { leida: leida ?? true })
  }

  return NextResponse.json({ success: true })
}
// POST — Crear notificación (interno)
export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await request.json()

  await connectDB()
  const notif = await Notificacion.create({
    ...body,
    centroId: session.user?.centroId,
  })

  return NextResponse.json(notif, { status: 201 })
}