import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Diario from '@/lib/models/Diario'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')
  const periodo = searchParams.get('periodo') || 'P1'

  if (!grado || !materia) return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })

  // Fechas del período (aproximadas)
  const periodos: Record<string, { inicio: number; fin: number }> = {
    P1: { inicio: 8, fin: 10 },
    P2: { inicio: 11, fin: 1 },
    P3: { inicio: 2, fin: 4 },
    P4: { inicio: 5, fin: 7 },
  }

  const p = periodos[periodo] || periodos.P1
  const año = new Date().getFullYear()
  const inicio = new Date(año, p.inicio - 1, 1)
  const fin = new Date(año, p.fin - 1, 31)

  await connectDB()

  const registros = await Diario.find({
    grado,
    materia,
    periodo,
    centroId: session.user.centroId,
    /* fecha: { $gte: inicio, $lte: fin }, */
  }).lean()

  // Agrupar por estudiante
  const resumen: Record<string, any> = {}
  registros.forEach(r => {
    const id = r.estudianteId.toString()
    if (!resumen[id]) resumen[id] = { estrellas: 0, tareas: 0, totalDias: 0, observaciones: [] as string[] }
    resumen[id].estrellas += r.participacion || 0
    if (r.tarea) resumen[id].tareas++
    resumen[id].totalDias++
    if (r.observacion) resumen[id].observaciones.push(r.observacion)
  })

  return NextResponse.json(resumen)
}