import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  // Obtener grados del docente desde sus planificaciones
  const planificaciones = await Planificacion.find({
    centroId: session.user.centroId,
    categoriaDocente: session.user.categoriaDocente,
    publicado: true,
  }).select('grado').lean()

  const grados = [...new Set(planificaciones.map((p: any) => p.grado))]

  // Buscar estudiantes en esos grados
  const estudiantes = await Usuario.find({
    centroId: session.user.centroId,
    rol: 'estudiante',
    grado: { $in: grados },
    activo: true,
  }).select('nombre email grado genero createdAt').sort({ grado: 1, nombre: 1 }).lean()

  // Agrupar por grado
  const porGrado: Record<string, any[]> = {}
  estudiantes.forEach((e: any) => {
    const g = e.grado || 'sin-grado'
    if (!porGrado[g]) porGrado[g] = []
    porGrado[g].push(e)
  })

  return NextResponse.json({ estudiantes, porGrado, total: estudiantes.length })
}