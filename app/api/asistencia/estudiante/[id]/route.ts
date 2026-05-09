import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Asistencia from '@/lib/models/Asistencia'

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  await connectDB()

  const registros = await Asistencia.find({
    estudianteId: id,
    centroId: session.user.centroId,
  }).sort({ fecha: -1 }).lean()

  // Agrupar por período
  const porPeriodo: Record<string, any[]> = { P1: [], P2: [], P3: [], P4: [] }
  registros.forEach(r => {
    const p = r.periodo || 'P1'
    if (porPeriodo[p]) porPeriodo[p].push(r)
  })

  // Resumen
  const resumen: Record<string, any> = {}
  Object.entries(porPeriodo).forEach(([p, regs]) => {
    if (regs.length === 0) return
    resumen[p] = {
      total: regs.length,
      presentes: regs.filter(r => r.presente).length,
      ausentes: regs.filter(r => !r.presente).length,
    }
  })

  return NextResponse.json({ porPeriodo, resumen })
}