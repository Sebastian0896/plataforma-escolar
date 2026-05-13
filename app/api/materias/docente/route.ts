// app/api/materias/docente/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET() {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const categoriaDocente = session.user?.categoriaDocente
  
  if (!categoriaDocente) {
    return NextResponse.json([])
  }

  try {
    const materias = await prisma.materia.findMany({
      where: {
        activo: true,
        categoriaDocente: categoriaDocente, // Filtrar por su categoría
      },
      orderBy: { nombre: 'asc' },
    })
    
    return NextResponse.json(materias)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener materias' }, { status: 500 })
  }
}