import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Diario from '@/lib/models/Diario'

export const runtime = "nodejs"

// GET — Obtener registros del diario
export async function GET(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')
  const fecha = searchParams.get('fecha')

  if (!grado || !materia) {
    return NextResponse.json({ error: 'Grado y materia requeridos' }, { status: 400 })
  }

  await connectDB()

  const filter: any = {
    grado,
    materia,
    centroId: session.user.centroId,
  }

  if (fecha) {
    const inicio = new Date(fecha)
    inicio.setHours(0, 0, 0, 0)
    const fin = new Date(fecha)
    fin.setHours(23, 59, 59, 999)
    filter.fecha = { $gte: inicio, $lte: fin }
  }

  const registros = await Diario.find(filter).sort({ fecha: -1 }).lean()

  return NextResponse.json(registros)
}

// POST — Guardar registros del día
export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { grado, materia, periodo, fecha, registros } = await request.json()

  await connectDB()

  const docs = registros.map((r: any) => ({
    insertOne: {
        document: {
        estudianteId: r.estudianteId,
        docenteId: session.user?.id,
        grado,
        materia,
        fecha: new Date(fecha),
        periodo: periodo || 'P1',
        participacion: r.participacion || 0,
        tarea: r.tarea || false,
        observacion: r.observacion || '',
        puntosExtra: r.puntosExtra || 0,
        centroId: session.user?.centroId,
  },
},
  }))

  if (docs.length > 0) {
    await Diario.bulkWrite(docs as any)
  }

  return NextResponse.json({ success: true })
}