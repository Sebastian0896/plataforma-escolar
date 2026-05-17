// app/api/coordinador/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export async function GET(req: NextRequest) {
  const session = await auth()
  const url = new URL(req.url)
  const centroId = url.searchParams.get('centroId')

  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const rol = session.user?.role
  const usuarioCentroId = session.user?.centroId

  const esCoordinador = rol === 'coordinador' && usuarioCentroId === centroId
  const esAdminCentro = rol === 'admin_centro' && usuarioCentroId === centroId
  const esSuperAdmin = rol === 'superadmin'

  if (!esCoordinador && !esAdminCentro && !esSuperAdmin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    // Estadísticas desde PostgreSQL
    const [
      totalDocentes,
      totalEstudiantes,
      totalMaterias,
      periodosActivos,
      estudiantesPorGrado,
      docentesPorMateria,
    ] = await Promise.all([
      prisma.usuario.count({
        where: { centroId, rol: 'docente', activo: true },
      }),
      prisma.usuario.count({
        where: { centroId, rol: 'estudiante', activo: true },
      }),
      prisma.materia.count({ where: { activo: true } }),
      prisma.periodo.count({ where: { centroId, activo: true } }),
      prisma.usuario.groupBy({
        by: ['grado'],
        where: { centroId, rol: 'estudiante', activo: true },
        _count: { id: true },
      }),
      prisma.usuario.findMany({
        where: { centroId, rol: 'docente', activo: true },
        select: { materias: true },
      }),
    ])

    // Procesar materias
    const materiasDocentes = docentesPorMateria.flatMap(d => d.materias)
    const materiasUnicas = [...new Set(materiasDocentes)]
    const docentesPorMateriaMap = materiasUnicas.map(materia => ({
      materia,
      cantidad: materiasDocentes.filter(m => m === materia).length,
    }))

    // Estadísticas desde MongoDB (Planificaciones)
    await connectDB()

    const hoy = new Date()
    const inicioSemana = new Date(hoy)
    inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1)
    inicioSemana.setHours(0, 0, 0, 0)

    const [totalPlanificaciones, planificacionesSemana, planificacionesPorDocente] =
      await Promise.all([
        Planificacion.countDocuments({
          centroId,
          publicado: true,
        }),
        Planificacion.countDocuments({
          centroId,
          publicado: true,
          createdAt: { $gte: inicioSemana },
        }),
        Planificacion.aggregate([
          { $match: { centroId, publicado: true } },
          { $group: { _id: '$creadoPor', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),
      ])

    // Obtener nombres de los docentes
    const docentesTop = await Promise.all(
      planificacionesPorDocente.map(async (item) => {
        const docente = await prisma.usuario.findUnique({
          where: { id: item._id },
          select: { nombre: true, email: true },
        })
        return {
          docenteId: item._id,
          nombre: docente?.nombre || 'Desconocido',
          email: docente?.email,
          total: item.count,
        }
      })
    )

    return NextResponse.json({
      resumen: {
        totalDocentes,
        totalEstudiantes,
        totalMaterias,
        periodosActivos,
        totalPlanificaciones,
        planificacionesSemana,
        ratioEstudianteDocente:
          totalDocentes > 0 ? Math.round(totalEstudiantes / totalDocentes) : 0,
      },
      estudiantesPorGrado: estudiantesPorGrado.map(g => ({
        grado: g.grado || 'No asignado',
        cantidad: g._count.id,
      })),
      docentesPorMateria: docentesPorMateriaMap,
      docentesTop,
    })
  } catch (error) {
    console.error('Error en stats coordinador:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}