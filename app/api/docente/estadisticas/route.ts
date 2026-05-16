// app/api/docente/estadisticas/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Diario from '@/lib/models/Diario'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    // Estudiantes del docente (desde PostgreSQL)
    const estudiantes = await prisma.usuario.count({
      where: {
        centroId: session.user.centroId,
        rol: 'estudiante',
        activo: true,
        grado: { in: session.user.grados || [] }
      }
    })

    // Planificaciones (desde MongoDB)
    await connectDB()
    const planificaciones = await Diario.countDocuments({
      creadoPor: session.user.id
    })

    // Registros de diario del último mes
    const haceUnMes = new Date()
    haceUnMes.setMonth(haceUnMes.getMonth() - 1)
    
    const diario = await Diario.countDocuments({
      docenteId: session.user.id,
      fecha: { $gte: haceUnMes }
    })

    return NextResponse.json({
      totalEstudiantes: estudiantes,
      totalPlanificaciones: planificaciones,
      usoDiario: diario,
      usoAsistencia: 0 // TODO: implementar
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      totalEstudiantes: 0,
      totalPlanificaciones: 0,
      usoDiario: 0,
      usoAsistencia: 0
    })
  }
}