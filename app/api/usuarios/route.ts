import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

// Verificar permiso
async function verificarAdmin() {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'admin_centro')) {
    return null
  }
  return session
}

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    await connectDB()
    const usuario = await Usuario.findById(id).lean()
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(usuario)
  }

  const session = await verificarAdmin()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const mostrarInactivos = searchParams.get('inactivos') === 'true'

  await connectDB()
  const usuarios = await Usuario.find({
    centroId: session.user.centroId,
    activo: mostrarInactivos ? false : true,
  }).sort({ createdAt: -1 }).lean()

  return NextResponse.json(usuarios)
}

// POST
export async function POST(request: Request) {
  const session = await verificarAdmin()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const { nombre, email, password, rol, genero, nivel, ciclo, grado, rne, categoriaDocente, materias, niveles, ciclos, grados } = body


    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    // Normalizar ciclos: acepta array u objeto
    const ciclosArray = Array.isArray(ciclos) ? ciclos : Object.values(ciclos || {}).filter(Boolean)
    await connectDB()

    const existe = await Usuario.findOne({ email })
    if (existe) return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)

    const usuario: any = {
      nombre, email, password: passwordHash, rol,
      genero: genero || '',
      centroId: session.user.centroId,
    }

    if (rol === 'estudiante') {
      usuario.nivel = nivel
      usuario.ciclo = ciclo
      usuario.grado = grado
      usuario.rne = rne
    }

    if (rol === 'docente') {
      usuario.niveles = niveles || []
      usuario.ciclos = ciclosArray || []
      usuario.grados = grados || []
      usuario.categoriaDocente = categoriaDocente
      usuario.materias = materias || []
    }

    console.log('📦 usuario a crear:', JSON.stringify(usuario))
    await Usuario.create(usuario)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: 'Email o RNE ya registrado' }, { status: 409 })
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}

// PUT
export async function PUT(request: Request) {
  const session = await verificarAdmin()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const { id, password, ciclos, genero, ...updateData } = body
    
    if (ciclos) {
      updateData.ciclos = Array.isArray(ciclos) ? ciclos : Object.values(ciclos).filter(Boolean)
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    if(genero !== undefined){
      updateData.genero = genero
    }

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

    if (Object.keys(unset).length > 0) {
      await Usuario.findByIdAndUpdate(id, { $unset: unset })
    }

     console.log('📦 usuario a actualizar:', JSON.stringify(updateData))

    await Usuario.findByIdAndUpdate(id, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: Request) {
  const session = await verificarAdmin()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const accion = searchParams.get('accion')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Usuario.findByIdAndUpdate(id, { activo: accion === 'activar' })

  return NextResponse.json({ success: true })
}