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

    // Verificar autenticación
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    // Verificar rol
    if (session.user?.role !== 'admin_centro') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 })
    }

    // Verificar que accede a su propio centro
    if (session.user.centroId !== centroId) {
      return NextResponse.json({ error: 'No autorizado para este centro' }, { status: 403 })
    }

    // Buscar usuario
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: id,
        centroId: centroId,
        activo: true
      }
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Devolver usuario (sin password)
    const { password, ...usuarioSinPassword } = usuario
    return NextResponse.json(usuarioSinPassword)
    
  } catch (error) {
    console.error('Error en GET usuario:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// app/api/admin/centro/[centroId]/usuarios/[id]/route.ts (continuación)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ centroId: string; id: string }> }
) {
  const session = await auth()
  const { centroId, id } = await params

  if (session?.user?.role !== 'admin_centro') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (session.user.centroId !== centroId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { nombre, email, rol, password, genero, nivel, ciclo, grado, rne, categoriaDocente, materias, niveles, ciclos, grados } = body

  // Validar que no asigne roles prohibidos
  if (!['estudiante', 'docente', 'admin_centro'].includes(rol)) {
    return NextResponse.json({ error: 'Rol no permitido' }, { status: 400 })
  }

  const updateData: any = {
    nombre,
    email,
    rol,
    genero,
    nivel,
    ciclo,
    grado,
    rne,
    categoriaDocente,
    materias,
    niveles,
    ciclos,
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

  return NextResponse.json(usuario)
}