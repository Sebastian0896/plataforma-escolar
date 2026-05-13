// app/api/coordinador/planificaciones/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export async function GET() {
  const session = await auth()
  
  if (!session || session.user?.role !== 'coordinador') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const centroId = session.user.centroId

  try {
    await connectDB()
    
    // Obtener docentes del mismo centro
    const docentes = await prisma.usuario.findMany({
      where: {
        centroId,
        rol: 'docente',
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
      },
    })
    
    const docenteIds = docentes.map(d => d.id)
    
    // Obtener planificaciones de esos docentes
    const planificaciones = await Planificacion.find({
      creadoPor: { $in: docenteIds },
      publicado: true,
    })
      .sort({ createdAt: -1 })
      .lean()
    
    // Mapear para agregar nombre del docente
    const resultado = planificaciones.map(p => ({
      id: p._id.toString(),
      tema: p.tema,
      materia: p.materia,
      grado: p.grado,
      docenteId: p.creadoPor,
      docente: docentes.find(d => d.id === p.creadoPor)?.nombre || 'Desconocido',
      estado: p.estado || 'pendiente',
      fecha: p.createdAt || new Date(),
    }))
    
    return NextResponse.json(resultado)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json([], { status: 500 })
  }
}