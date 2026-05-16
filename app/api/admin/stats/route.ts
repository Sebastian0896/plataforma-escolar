// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    // =====================================================
    // POSTGRESQL - Consultas paralelas
    // =====================================================
    
    const [totalCentros, totalUsuarios, centros, porGenero, porRol] = await Promise.all([
      prisma.centro.count({ where: { activo: true } }),
      prisma.usuario.count({ where: { activo: true } }),
      prisma.centro.findMany({
        where: { activo: true },
        select: { id: true, nombre: true, codigo: true },
        orderBy: { nombre: 'asc' },
      }),
      prisma.usuario.groupBy({
        by: ['genero'],
        where: { activo: true },
        _count: { id: true },
      }),
      prisma.usuario.groupBy({
        by: ['rol'],
        where: { activo: true },
        _count: { id: true },
      }),
    ])

    // =====================================================
    // MONGODB - Total planificaciones
    // =====================================================
    
    await connectDB()
    const totalPlanificaciones = await Planificacion.countDocuments({ 
      publicado: true 
    })

    // =====================================================
    // MONGODB - Planificaciones por centro
    // =====================================================
    
    const stats = await Promise.all(
      centros.map(async (c) => {
        const [usuarios, planificaciones] = await Promise.all([
          prisma.usuario.count({
            where: { centroId: c.id, activo: true }
          }),
          Planificacion.countDocuments({ 
            centroId: c.id, 
            publicado: true 
          }),
        ])

        return {
          _id: c.id,
          nombre: c.nombre,
          codigo: c.codigo,
          usuarios,
          planificaciones,
        }
      })
    )

    // Formatear resultados
    const porGeneroFormateado = porGenero.map(item => ({
      _id: item.genero || 'No especificado',
      total: item._count.id,
    }))

    const porRolFormateado = porRol.map(item => ({
      _id: item.rol,
      total: item._count.id,
    }))

    return NextResponse.json({
      totalCentros,
      totalUsuarios,
      totalPlanificaciones,
      stats,
      porGenero: porGeneroFormateado,
      porRol: porRolFormateado,
    })

  } catch (error) {
    console.error('Error en stats:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}