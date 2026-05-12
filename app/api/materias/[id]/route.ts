// app/api/materias/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  
  // Verificar permisos
  if (!session || !['admin', 'superadmin', 'admin_centro'].includes(session.user?.role || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { nombre, categoriaDocente } = body
    
    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
    }
    
    // Generar slug
    const slug = nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    // Verificar si ya existe otra materia con el mismo nombre
    const existe = await prisma.materia.findFirst({
      where: {
        AND: [
          { nombre: nombre.trim() },
          { NOT: { id } }
        ]
      }
    })
    
    if (existe) {
      return NextResponse.json({ error: 'Ya existe una materia con ese nombre' }, { status: 400 })
    }
    
    const materia = await prisma.materia.update({
      where: { id },
      data: {
        nombre: nombre.trim(),
        slug,
        categoriaDocente: categoriaDocente || 'otras-materias',
      },
    })
    
    return NextResponse.json(materia)
  } catch (error) {
    console.error('Error PUT materia:', error)
    return NextResponse.json({ error: 'Error al actualizar la materia' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  
  // Verificar permisos
  if (!session || !['admin', 'admin_centro', 'superadmin'].includes(session.user?.role || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 })
  }

  try {
    // Verificar si la materia existe
    const materia = await prisma.materia.findUnique({
      where: { id },
    })
    
    if (!materia) {
      return NextResponse.json({ error: 'Materia no encontrada' }, { status: 404 })
    }
    
    await prisma.materia.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error DELETE materia:', error)
    return NextResponse.json({ error: 'Error al eliminar la materia' }, { status: 500 })
  }
}