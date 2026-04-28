import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email, password, codigo } = await request.json()

    if (!email || !password || !codigo) {
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

    // Buscar por email o RNE
    const usuario = await Usuario.findOne({
    $or: [
        { email: email, activo: true, centroId: centro._id },
        { rne: email, activo: true, centroId: centro._id },
    ],
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Verificar que sea estudiante
    if (usuario.rol !== 'estudiante') {
      return NextResponse.json(
        { error: 'Esta cuenta no es de estudiante' },
        { status: 403 }
      )
    }

    // Verificar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password)
    if (!passwordValida) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    // Guardar en sesión del navegador
    const response = NextResponse.json({
      centroId: centro._id.toString(),
      centroNombre: centro.nombre,
      grado: usuario.grado,
      nombre: usuario.nombre,
    })

    // Cookie con el grado (dura 7 días)
    response.cookies.set('estudiante_grado', usuario.grado || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}