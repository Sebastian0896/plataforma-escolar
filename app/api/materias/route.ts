// app/api/materias/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// GET - Obtener todas las materias
export async function GET(req: NextRequest) {
  const session = await auth()
  
  // Verificar permisos
  if (!session || !['admin', 'superadmin', 'admin_centro', 'docente'].includes(session.user?.role || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const materias = await prisma.materia.findMany({
      orderBy: {
        nombre: 'asc',
      },
    })
    
    return NextResponse.json(materias)
  } catch (error) {
    console.error('Error GET materias:', error)
    return NextResponse.json({ error: 'Error al obtener materias' }, { status: 500 })
  }
}

// POST - Crear nueva materia
export async function POST(req: NextRequest) {
  const session = await auth()
  
  // Verificar permisos
  if (!session || !['admin', 'superadmin', 'admin_centro'].includes(session.user?.role || '')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { nombre, categoriaDocente } = body
    
    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre es requerido' }, { status: 400 })
    }
    
    // Generar slug a partir del nombre
    const slug = nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    // Verificar si ya existe
    const existe = await prisma.materia.findFirst({
      where: {
        OR: [
          { nombre: nombre.trim() },
          { slug }
        ]
      }
    })
    
    if (existe) {
      return NextResponse.json({ error: 'Ya existe una materia con ese nombre' }, { status: 400 })
    }
    
    const materia = await prisma.materia.create({
      data: {
        nombre: nombre.trim(),
        slug,
        categoriaDocente: categoriaDocente || 'otras-materias',
        activo: true,
      },
    })
    
    return NextResponse.json(materia, { status: 201 })
  } catch (error) {
    console.error('Error POST materia:', error)
    return NextResponse.json({ error: 'Error al crear la materia' }, { status: 500 })
  }
}