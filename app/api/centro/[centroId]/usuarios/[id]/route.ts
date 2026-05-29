// app/api/admin/centro/[centroId]/usuarios/[id]/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ centroId: string; id: string }> }
) {
  const session = await auth()
  const { centroId, id } = await params

  // Verificar admin_centro
  if (session?.user?.role !== 'admin_centro') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  // Verificar que accede a su propio centro
  if (session.user.centroId !== centroId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const usuario = await prisma.usuario.findFirst({
    where: { id, centroId, activo: true }
  })

  if (!usuario) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  return NextResponse.json(usuario)
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