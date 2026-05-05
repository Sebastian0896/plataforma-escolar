// app/api/docente/stats/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Usuario from '@/lib/models/Usuario'
import PendienteIgnorado from '@/lib/models/PendienteIgnorado'

export const runtime = "nodejs"

function getNumeroSemana(fecha: Date): string {
  const año = fecha.getFullYear()
  const primeroEnero = new Date(año, 0, 1)
  const dias = Math.floor((fecha.getTime() - primeroEnero.getTime()) / (1000 * 60 * 60 * 24))
  const semana = Math.ceil((dias + primeroEnero.getDay() + 1) / 7)
  return `${año}-W${semana}`
}

export async function GET() {
  const session = await auth()

  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const centroId = session.user.centroId
  const categoria = session.user.categoriaDocente

  // Total de planificaciones
  const totalPlanificaciones = await Planificacion.countDocuments({
    centroId,
    categoriaDocente: categoria,
    publicado: true,
  })

  // Por materia
  const porMateria = await Planificacion.aggregate([
    { $match: { centroId, categoriaDocente: categoria, publicado: true } },
    { $group: { _id: '$materia', total: { $sum: 1 } } },
  ])

  // Por grado
  const porGrado = await Planificacion.aggregate([
    { $match: { centroId, categoriaDocente: categoria, publicado: true } },
    { $group: { _id: '$grado', total: { $sum: 1 } } },
  ])

  // Planificaciones recientes (con fechaProgramada)
  const recientes = await Planificacion.find({
    centroId,
    categoriaDocente: categoria,
    publicado: true,
  })
    .sort({ fechaProgramada: -1, createdAt: -1 })
    .limit(5)
    .lean()

  // Total estudiantes en sus grados
  const gradosDocente = session.user?.grados?.length
    ? session.user.grados
    : session.user?.grado
      ? [session.user.grado]
      : []

  const totalEstudiantes = await Usuario.countDocuments({
    centroId,
    grado: { $in: gradosDocente },
    rol: 'estudiante',
    activo: true,
  })

  // Pendientes: grados sin planificación esta semana
  const hoy = new Date()
  const inicioSemana = new Date(hoy)
  inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1)
  inicioSemana.setHours(0, 0, 0, 0)
  const finSemana = new Date(inicioSemana)
  finSemana.setDate(inicioSemana.getDate() + 7)

  const semanaActual = getNumeroSemana(hoy)

  const pendientes = []

  for (const grado of gradosDocente) {
    // Verificar si ya fue ignorado esta semana
    const ignorado = await PendienteIgnorado.findOne({
      docenteId: session.user?.id,
      grado,
      semana: semanaActual,
    })

    if (ignorado) continue

    const count = await Planificacion.countDocuments({
      centroId,
      grado,
      categoriaDocente: categoria,
      publicado: true,
      createdAt: { $gte: inicioSemana, $lt: finSemana },
    })

    if (count === 0) {
      const diasRestantes = 5 - hoy.getDay()
      pendientes.push({
        grado,
        urgente: diasRestantes <= 2 && hoy.getDay() >= 4,
        diasRestantes: Math.max(0, diasRestantes),
      })
    }
  }

  return NextResponse.json({
    totalPlanificaciones,
    porMateria,
    porGrado,
    recientes: recientes.map((r: any) => ({
      tema: r.tema,
      grado: r.grado,
      materia: r.materia,
      fechaProgramada: r.fechaProgramada,
      slug: r.slug,
      createdAt: r.createdAt,
    })),
    totalEstudiantes,
    pendientes,
  })
}