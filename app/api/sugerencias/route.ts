// app/api/sugerencias/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// POST - Crear sugerencia
export async function POST(req: NextRequest) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { titulo, descripcion, tipo } = await req.json()

    if (!titulo || !descripcion) {
      return NextResponse.json({ error: 'Título y descripción requeridos' }, { status: 400 })
    }

    // ✅ Asegurar valores por defecto si vienen undefined
    const usuarioNombre = session.user.name || 'Usuario'
    const usuarioRol = session.user.role || 'usuario'

    const sugerencia = await prisma.sugerencia.create({
      data: {
        titulo,
        descripcion,
        tipo: tipo || 'mejora',
        usuarioId: session.user.id,
        usuarioNombre: usuarioNombre,
        usuarioRol: usuarioRol,
      }
    })

    return NextResponse.json({ success: true, sugerencia })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// GET - Obtener sugerencias (solo admin/superadmin)
export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado') || 'pendiente'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const skip = (page - 1) * limit

  try {
    const [sugerencias, total] = await Promise.all([
      prisma.sugerencia.findMany({
        where: { estado },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.sugerencia.count({ where: { estado } })
    ])

    return NextResponse.json({ sugerencias, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// PUT - Actualizar estado de sugerencia (solo admin/superadmin)
export async function PUT(req: NextRequest) {
  const session = await auth()
  
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id, estado } = await req.json()

    const sugerencia = await prisma.sugerencia.update({
      where: { id },
      data: { estado, updatedAt: new Date() }
    })

    return NextResponse.json({ success: true, sugerencia })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}