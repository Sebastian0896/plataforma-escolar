import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

// GET — Listar usuarios (activos o inactivos)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  // Buscar uno solo
  if (id) {
    await connectDB()
    const usuario = await Usuario.findById(id).lean()
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(usuario)
  }

  // Listar todos
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const mostrarInactivos = searchParams.get('inactivos') === 'true'

  await connectDB()
  const usuarios = await Usuario.find({
    centroId: session.user.centroId,
    activo: mostrarInactivos ? false : true,
  }).sort({ createdAt: -1 }).lean()

  return NextResponse.json(usuarios)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { nombre, email, password, rol, niveles, ciclos, grado, rne, categoriaDocente, materias, grados } = body

    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    await connectDB()

    const existe = await Usuario.findOne({ email })
    if (existe) return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)

    const usuario: any = {
      nombre, email, password: passwordHash, rol,
      centroId: session.user.centroId,
    }

    if (rol === 'estudiante') {
      usuario.niveles = niveles
      usuario.ciclos = ciclos
      usuario.grado = grado
      usuario.rne = rne
    }

    if (rol === 'docente') {
      usuario.niveles = niveles
      usuario.ciclos = ciclos
      usuario.grados = grados
      usuario.categoriaDocente = categoriaDocente
      usuario.materias = materias
    }

    await Usuario.create(usuario)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: 'Email o RNE ya registrado' }, { status: 409 })
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}


// PUT — Actualizar usuario
export async function PUT(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, password, ...updateData } = body

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    // Campos a eliminar según el rol
    const unset: any = {}

    if (updateData.rol === 'estudiante') {
      unset.categoriaDocente = 1
      unset.materias = 1
      unset.niveles = 1
      unset.ciclos = 1
      unset.grados = 1
    }

    if (updateData.rol === 'docente') {
      unset.nivel = 1
      unset.ciclo = 1
      unset.grado = 1
      unset.rne = 1
    }

    if (updateData.rol === 'admin' || updateData.rol === 'admin_centro') {
      unset.nivel = 1
      unset.ciclo = 1
      unset.grado = 1
      unset.rne = 1
      unset.categoriaDocente = 1
      unset.materias = 1
      unset.niveles = 1
      unset.ciclos = 1
      unset.grados = 1
    }

    await connectDB()

    // Primero eliminar campos que no corresponden
    if (Object.keys(unset).length > 0) {
      await Usuario.findByIdAndUpdate(id, { $unset: unset })
    }

    // Luego actualizar con los nuevos datos
    await Usuario.findByIdAndUpdate(id, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

// DELETE — Soft delete (desactivar)
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const accion = searchParams.get('accion') // 'desactivar' o 'activar'

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Usuario.findByIdAndUpdate(id, { activo: accion === 'activar' })

  return NextResponse.json({ success: true })
}