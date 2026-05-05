// app/api/docente/stats/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Usuario from '@/lib/models/Usuario'
import mongoose from 'mongoose'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  console.log('🆔 session.user.id:', session.user?.id)
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const docenteId = new mongoose.Types.ObjectId(session.user.id as string)

  // Total de planificaciones
    const totalPlanificaciones = await Planificacion.countDocuments({
    centroId: session.user?.centroId,
    categoriaDocente: session.user?.categoriaDocente,
    publicado: true,
    })

  // Por materia
  const porMateria = await Planificacion.aggregate([
    { $match: { creadoPor: docenteId, publicado: true } },
    { $group: { _id: '$materia', total: { $sum: 1 } } },
  ])

  // Por grado
  const porGrado = await Planificacion.aggregate([
    { $match: { creadoPor: docenteId, publicado: true } },
    { $group: { _id: '$grado', total: { $sum: 1 } } },
  ])

  // Planificaciones recientes
  const recientes = await Planificacion.find({
    creadoPor: docenteId,
    publicado: true,
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean()

  // Total estudiantes en sus grados
  const grados = [...new Set(recientes.map((p: any) => p.grado))]
  const totalEstudiantes = await Usuario.countDocuments({
    grado: { $in: grados },
    rol: 'estudiante',
    activo: true,
  })

  return NextResponse.json({
    totalPlanificaciones,
    porMateria,
    porGrado,
    recientes: recientes.map((r: any) => ({
      tema: r.tema,
      grado: r.grado,
      materia: r.materia,
      createdAt: r.createdAt,
    })),
    totalEstudiantes,
  })
}