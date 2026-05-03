import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

// Jerarquía de creación
const JERARQUIA: Record<string, string[]> = {
  superadmin: ['admin', 'admin_centro', 'docente', 'estudiante'],
  admin: ['admin_centro', 'docente', 'estudiante'],
  admin_centro: ['docente', 'estudiante'],
}

function puedeGestionar(rolCreador: string, rolObjetivo: string): boolean {
  return JERARQUIA[rolCreador]?.includes(rolObjetivo) || false
}

function verificarPermiso(rolRequerido?: string) {
  return async () => {
    const session = await auth()
    if (!session) return null
    if (rolRequerido && !puedeGestionar(session.user?.role || '', rolRequerido)) return null
    return session
  }
}

// GET — Listar usuarios
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    await connectDB()
    const usuario = await Usuario.findById(id).lean()
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(usuario)
  }

  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const mostrarInactivos = searchParams.get('inactivos') === 'true'
  const filter: any = { activo: mostrarInactivos ? false : true }

  // admin_centro solo ve su centro
  if (session.user?.role === 'admin_centro') {
    filter.centroId = session.user.centroId
  }
  // superadmin y admin ven todo

  await connectDB()
  const usuarios = await Usuario.find(filter).sort({ createdAt: -1 }).lean()
  return NextResponse.json(usuarios)
}

// POST — Crear usuario
export async function POST(request: Request) {
  const body = await request.json()
  const { nombre, email, password, rol, genero, nivel, ciclo, grado, rne, categoriaDocente, materias, niveles, ciclos, grados, centroId } = body


  // Permitir crear el primer superadmin sin sesión
if (rol === 'superadmin') {
  await connectDB()
  const count = await Usuario.countDocuments({ rol: 'superadmin' })
  if (count > 0) {
    const session = await auth()
    if (!session || session.user?.role !== 'superadmin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }
} else {
  const session = await auth()
  if (!session || !puedeGestionar(session.user?.role || '', rol)) {
    return NextResponse.json({ error: 'No autorizado para crear este rol' }, { status: 401 })
  }
}
  // Verificar permisos
  const session = await auth()
  if (!session || !puedeGestionar(session.user?.role || '', rol)) {
    return NextResponse.json({ error: 'No autorizado para crear este rol' }, { status: 401 })
  }

  if (!nombre || !email || !password || !rol) {
    return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
  }

  console.log('📦 POST /api/usuarios - Body:', body)

  try {
    await connectDB()

    const existe = await Usuario.findOne({ email })
    if (existe) return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)

    // Determinar centroId
    let centroAsignado = centroId
    if (session.user?.role === 'admin_centro') {
      centroAsignado = session.user.centroId // fuerza su centro
    }

    const ciclosArray = Array.isArray(ciclos) ? ciclos : Object.values(ciclos || {}).filter(Boolean)

    const usuario: any = {
      nombre, email, password: passwordHash, rol,
      genero: genero || '',
      centroId: centroAsignado || session.user?.centroId,
    }

    if (rol === 'estudiante') {
      usuario.nivel = nivel
      usuario.ciclo = ciclo
      usuario.grado = grado
      usuario.rne = rne
    }

    if (rol === 'docente') {
      usuario.niveles = niveles || []
      usuario.ciclos = [...new Set(ciclosArray)]
      usuario.grados = grados || []
      usuario.categoriaDocente = categoriaDocente
      usuario.materias = materias || []
    }

    await Usuario.create(usuario)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: 'Email o RNE ya registrado' }, { status: 409 })
      console.error('❌ Error POST /api/usuarios:', error)
    return NextResponse.json({ error: 'Error del servidor: ' + error.message }, { status: 500 })
    //return NextResponse.json({ error: error.message || 'Error del servidor' }, { status: 500 })
  }
}

// PUT — Actualizar usuario
export async function PUT(request: Request) {
  const body = await request.json()
  const { id, password, rol, ciclos, ...updateData } = body

  // Verificar permisos
  const session = await auth()
  if (!session || !puedeGestionar(session.user?.role || '', rol || '')) {
    return NextResponse.json({ error: 'No autorizado para modificar este rol' }, { status: 401 })
  }

  try {
    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    if (ciclos) {
      updateData.ciclos = [...new Set(Array.isArray(ciclos) ? ciclos : Object.values(ciclos).filter(Boolean))]
    }

    const unset: any = {}

    if (rol === 'estudiante') {
      unset.categoriaDocente = 1
      unset.materias = 1
      unset.niveles = 1
      unset.ciclos = 1
      unset.grados = 1
    }

    if (rol === 'docente') {
      unset.nivel = 1
      unset.ciclo = 1
      unset.grado = 1
      unset.rne = 1
    }

    if (rol === 'admin' || rol === 'admin_centro') {
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

    if (Object.keys(unset).length > 0) {
      await Usuario.findByIdAndUpdate(id, { $unset: unset })
    }

    await Usuario.findByIdAndUpdate(id, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const accion = searchParams.get('accion')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Usuario.findByIdAndUpdate(id, { activo: accion === 'activar' })

  return NextResponse.json({ success: true })
}