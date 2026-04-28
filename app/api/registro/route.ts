import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { nombre, email, password, codigo, grado, rne } = await request.json()

    if (!nombre || !email || !password || !codigo || !grado || !rne) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    await connectDB()

    // Validar código de centro
    const centro = await Centro.findOne({
      codigo: codigo.toUpperCase(),
      activo: true,
    })

    if (!centro) {
      return NextResponse.json(
        { error: 'Código de centro inválido' },
        { status: 401 }
      )
    }

    // Verificar si el email ya existe
    const existe = await Usuario.findOne({ email })
    if (existe) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // Crear usuario
    const passwordHash = await bcrypt.hash(password, 10)
    const usuario = await Usuario.create({
        nombre,
        email,
        password: passwordHash,
        rol: 'estudiante',
        grado,
        rne,
        centroId: centro._id,
    })

    return NextResponse.json(
      {
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        email: usuario.email,
        grado: usuario.grado,
      },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}