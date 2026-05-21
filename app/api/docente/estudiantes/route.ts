// app/api/docente/estudiantes/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  
  // Verificar roles permitidos
  const rolesPermitidos = ['docente', 'admin_centro', 'registro']
  if (!session || !rolesPermitidos.includes(session.user?.role || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const skip = (page - 1) * limit

  let grados: string[] = []

  try {
    // ✅ Optimizado: Obtener grados en una sola consulta cuando no se especifica grado
    if (!grado) {
      // Intentar obtener grados del perfil del docente
      const docente = await prisma.usuario.findUnique({
        where: { id: session.user.id },
        select: { grados: true, grado: true, centroId: true, categoriaDocente: true }
      })
      
      grados = docente?.grados?.length ? docente.grados : (docente?.grado ? [docente.grado] : [])
      
      // Si no hay grados, obtener de planificaciones (MongoDB)
      if (grados.length === 0 && docente) {
        const planes = await Planificacion.find({
          centroId: docente.centroId,
          categoriaDocente: docente.categoriaDocente,
          publicado: true,
        }).select('grado').lean()
        
        grados = [...new Set(planes.map((p: any) => p.grado).filter(Boolean))]
      }
      
      // Último recurso: obtener grados de estudiantes existentes
      if (grados.length === 0 && docente?.centroId) {
        const estudiantesGrados = await prisma.usuario.findMany({
          where: { centroId: docente.centroId, rol: 'estudiante', activo: true },
          select: { grado: true },
          distinct: ['grado'],
        })
        grados = estudiantesGrados.map(u => u.grado).filter(Boolean) as string[]
      }
    } else {
      grados = [grado]
    }

    if (grados.length === 0) {
      return NextResponse.json({ 
        estudiantes: [], 
        porGrado: {}, 
        total: 0,
        gradosDisponibles: [] 
      })
    }

    // ✅ Ejecutar consultas en paralelo
    const [estudiantes, total] = await Promise.all([
      prisma.usuario.findMany({
        where: {
          centroId: session.user.centroId,
          rol: 'estudiante',
          activo: true,
          grado: { in: grados },
        },
        orderBy: [{ grado: 'asc' }, { nombre: 'asc' }],
        select: {
          id: true,
          nombre: true,
          email: true,
          grado: true,
          genero: true,
          rne: true,
          createdAt: true,
        },
        skip,
        take: limit,
      }),
      prisma.usuario.count({
        where: {
          centroId: session.user.centroId,
          rol: 'estudiante',
          activo: true,
          grado: { in: grados },
        },
      })
    ])

    // Agrupar por grado
    const porGrado: Record<string, any[]> = {}
    estudiantes.forEach(e => {
      const g = e.grado || 'sin-grado'
      if (!porGrado[g]) porGrado[g] = []
      porGrado[g].push(e)
    })

    return NextResponse.json({
      estudiantes,
      porGrado,
      total,
      gradosDisponibles: grados,
      paginacion: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      }
    })
  } catch (error) {
    console.error('Error en /api/docente/estudiantes:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}