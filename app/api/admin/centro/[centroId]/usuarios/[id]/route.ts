// app/api/admin/centro/[centroId]/usuarios/[id]/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ centroId: string; id: string }> }
) {
  try {
    const session = await auth()
    const { centroId, id } = await params

    console.log('🔍 GET Usuario - centroId:', centroId, 'id:', id)
    console.log('🔍 Session:', session?.user?.role, session?.user?.centroId)

    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    if (session.user?.role !== 'admin_centro') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    if (session.user.centroId !== centroId) {
      return NextResponse.json({ error: 'No autorizado para este centro' }, { status: 403 })
    }

    const usuario = await prisma.usuario.findFirst({
      where: {
        id: id,
        centroId: centroId,
        activo: true
      }
    })

    console.log('🔍 Usuario encontrado:', usuario?.nombre)

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const { password, ...usuarioSinPassword } = usuario
    return NextResponse.json(usuarioSinPassword)
    
  } catch (error) {
    console.error('Error en GET usuario:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ centroId: string; id: string }> }
) {
  try {
    const session = await auth()
    const { centroId, id } = await params

    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    if (session.user?.role !== 'admin_centro') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    if (session.user.centroId !== centroId) {
      return NextResponse.json({ error: 'No autorizado para este centro' }, { status: 403 })
    }

    const body = await req.json()
    const { nombre, email, rol, password, genero, grado, rne, categoriaDocente, materias, niveles, grados } = body

    // Validar rol permitido
    if (!['estudiante', 'docente', 'admin_centro'].includes(rol)) {
      return NextResponse.json({ error: 'Rol no permitido' }, { status: 400 })
    }

    const updateData: any = {
      nombre,
      email,
      rol,
      genero,
      grado,
      rne,
      categoriaDocente,
      materias,
      niveles,
      grados,
    }

    if (password) {
      const bcrypt = await import('bcryptjs')
      updateData.password = await bcrypt.hash(password, 10)
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data: updateData
    })

    const { password: _, ...usuarioSinPassword } = usuario
    return NextResponse.json(usuarioSinPassword)
    
  } catch (error) {
    console.error('Error en PUT usuario:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}