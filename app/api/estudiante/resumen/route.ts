// app/api/estudiante/resumen/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Asistencia from '@/lib/models/Asistencia'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'estudiante') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const usuarioId = session.user.id
  const grado = session.user.grado

  try {
    await connectDB()

    // Planificaciones del grado del estudiante
    const planificaciones = await Planificacion.find({
      grado: grado,
      publicado: true,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    // Asistencia del estudiante
    const asistencias = await Asistencia.find({
      estudianteId: usuarioId,
    }).lean()

    const totalClases = asistencias.length
    const presentes = asistencias.filter(a => a.presente === true).length
    const asistenciaPorcentaje = totalClases > 0 ? Math.round((presentes / totalClases) * 100) : 100

    // Próximas actividades (planificaciones con fecha futura)
    const hoy = new Date()
    const proximasActividades = await Planificacion.find({
      grado: grado,
      publicado: true,
      fechaProgramada: { $gte: hoy },
    })
      .sort({ fechaProgramada: 1 })
      .limit(5)
      .lean()

    return NextResponse.json({
      totalPlanificaciones: planificaciones.length,
      asistenciaPorcentaje,
      proximasActividades: proximasActividades.map(p => ({
        titulo: p.tema,
        materia: p.materia,
        fecha: p.fechaProgramada ? new Date(p.fechaProgramada).toLocaleDateString('es-ES') : 'Por definir',
        tipo: 'Planificación',
      })),
      ultimasPlanificaciones: planificaciones.map(p => ({
        slug: p.slug,
        tema: p.tema,
        materia: p.materia,
        grado: p.grado,
      })),
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}