import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Evaluacion from '@/lib/models/Evaluacion'

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{id: string}> }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  console.log('🆔 ID recibido:', id)

  await connectDB()

  const evaluaciones = await Evaluacion.find({
    estudianteId: id,
    centroId: session.user.centroId,
  }).lean()
console.log('📋 Evaluaciones encontradas:', evaluaciones.length)
  return NextResponse.json({ evaluaciones })
}
