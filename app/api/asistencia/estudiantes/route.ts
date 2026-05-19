// app/api/asistencia/estudiantes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const grado = searchParams.get('grado')

  if (!grado) {
    return NextResponse.json({ error: 'Grado requerido' }, { status: 400 })
  }

  try {
    const estudiantes = await prisma.usuario.findMany({
      where: {
        centroId: session.user?.centroId,
        rol: 'estudiante',
        grado: grado,
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        grado: true,
        rne: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    })

    return NextResponse.json(estudiantes)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}