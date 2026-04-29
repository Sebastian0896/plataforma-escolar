import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
     const body = await request.json()
    console.log('📦 Body recibido:', body)

    const { nombre, email, password, codigo, rol, grado, rne, categoriaDocente, grados, materias } = body

    if (!nombre || !email || !password || !codigo || !rol) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    await connectDB()

    const centro = await Centro.findOne({ codigo: codigo.toUpperCase(), activo: true })
    if (!centro) return NextResponse.json({ error: 'Código de centro inválido' }, { status: 401 })

    const existe = await Usuario.findOne({ email })
    if (existe) return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 10)

    const usuario: any = {
      nombre,
      email,
      password: passwordHash,
      rol,
      centroId: centro._id,
      materias
    }

    if (rol === 'estudiante') {
      usuario.grado = grado
      usuario.rne = rne
    }

    if (rol === 'docente') {
      usuario.categoriaDocente = categoriaDocente
      usuario.grados = grados || []
      usuario.materias = materias || [] // ← Agregar
    }

    await Usuario.create(usuario)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email o RNE ya registrado' }, { status: 409 })
    }
    console.error('❌ Error registro:', error) // ← Agregar
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}