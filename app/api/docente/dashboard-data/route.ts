// app/api/docente/dashboard-data/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Asistencia from '@/lib/models/Asistencia'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const centroId = session.user.centroId
  const usuarioId = session.user.id

  try {
    // Ejecutar consultas en paralelo
    const [suscripcion, stats, planificacionesRecientes, pendientes] = await Promise.all([
      // Suscripción activa
      prisma.suscripcion.findFirst({
        where: { usuarioId, estado: 'active' },
        orderBy: { fechaInicio: 'desc' },
      }),
      
      // Estadísticas (PostgreSQL)
      prisma.$transaction([
        prisma.usuario.count({ where: { centroId, rol: 'estudiante', activo: true } }),
        prisma.usuario.count({ where: { centroId, rol: 'docente', activo: true } }),
        prisma.materia.count(),
      ]),
      
      // Últimas planificaciones (MongoDB)
      connectDB(),
      Planificacion.find({ creadoPor: usuarioId, publicado: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      
      // Pendientes (MongoDB)
      // TODO: Implementar lógica de pendientes
      Promise.resolve([]),
    ])

    const [totalEstudiantes, totalDocentes, totalMaterias] = stats

    return NextResponse.json({
      suscripcion: suscripcion ? {
        plan: suscripcion.plan,
        estado: suscripcion.estado,
        fechaInicio: suscripcion.fechaInicio,
        fechaFin: suscripcion.fechaFin,
      } : { plan: 'gratis', estado: 'inactive' },
      estadisticas: {
        totalEstudiantes,
        totalDocentes,
        totalMaterias,
        totalPlanificaciones: planificacionesRecientes.length,
      },
      planificacionesRecientes,
      pendientes,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}