// app/api/docente/estudiantes/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  // Obtener grados del docente desde su perfil
  let grados = session.user?.grados?.length
    ? session.user.grados
    : (session.user?.grado ? [session.user.grado] : [])

  // Si no tiene grados, buscar en sus planificaciones
  if (grados.length === 0) {
    const planes = await Planificacion.find({
      centroId: session.user.centroId,
      categoriaDocente: session.user.categoriaDocente,
      publicado: true,
    }).select('grado').lean()
    grados = [...new Set(planes.map((p: any) => p.grado).filter(Boolean))]
  }

  // Si no hay grados, buscar en usuarios del mismo centro
  if (grados.length === 0) {
    const usuarios = await Usuario.find({
      centroId: session.user.centroId,
      rol: 'estudiante',
      activo: true,
    }).select('grado').lean()
    grados = [...new Set(usuarios.map((u: any) => u.grado).filter(Boolean))]
  }

  // Buscar estudiantes
  const filter: any = {
    centroId: session.user.centroId,
    rol: 'estudiante',
    activo: true,
  }

  if (grados.length > 0) {
    filter.grado = { $in: grados }
  }

  const estudiantes = await Usuario.find(filter)
    .select('nombre email grado genero createdAt')
    .sort({ grado: 1, nombre: 1 })
    .lean()

  // Agrupar por grado
  const porGrado: Record<string, any[]> = {}
  estudiantes.forEach((e: any) => {
    const g = e.grado || 'sin-grado'
    if (!porGrado[g]) porGrado[g] = []
    porGrado[g].push(e)
  })

  return NextResponse.json({ estudiantes, porGrado, total: estudiantes.length })
}