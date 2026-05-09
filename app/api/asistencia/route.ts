import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Asistencia from '@/lib/models/Asistencia'

export const runtime = "nodejs"

// GET
export async function GET(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')
  const fecha = searchParams.get('fecha')

  if (!grado || !materia) return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })

  await connectDB()

  const filter: any = { grado, materia, centroId: session.user.centroId }
  if (fecha) {
    const inicio = new Date(fecha); inicio.setHours(0, 0, 0, 0)
    const fin = new Date(fecha); fin.setHours(23, 59, 59, 999)
    filter.fecha = { $gte: inicio, $lte: fin }
  }

  const registros = await Asistencia.find(filter).lean()
  return NextResponse.json(registros)
}

// POST
export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { grado, materia, fecha, periodo, registros } = await request.json()

  await connectDB()

  const docs = registros.map((r: any) => ({
    updateOne: {
      filter: { estudianteId: r.estudianteId, fecha: new Date(fecha), materia },
      update: {
        $set: {
          estudianteId: r.estudianteId,
          docenteId: session.user?.id,
          grado, materia,
          fecha: new Date(fecha),
          periodo: periodo || 'P1',
          presente: r.presente,
          observacion: r.observacion || '',
          centroId: session.user?.centroId,
        },
      },
      upsert: true,
    },
  }))

  if (docs.length > 0) await Asistencia.bulkWrite(docs as any)
  return NextResponse.json({ success: true })
}

// PUT
export async function PUT(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id, ...data } = await request.json()

  await connectDB()
  await Asistencia.findByIdAndUpdate(id, data)

  return NextResponse.json({ success: true })
}

// DELETE
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Asistencia.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}