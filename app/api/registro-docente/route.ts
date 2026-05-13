// app/api/auth/registro-docente/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { nombre, email, password, genero, materia } = await request.json()

    // Validaciones
    if (!nombre || !email || !password || !materia) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    // Verificar si el email ya existe
    const existeUsuario = await prisma.usuario.findUnique({
      where: { email },
    })

    if (existeUsuario) {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })
    }

    // Determinar categoría del docente según la materia
    let categoriaDocente = 'materias-basicas'
    if (materia === 'frances' || materia === 'ingles') {
      categoriaDocente = 'idiomas'
    } else if (materia === 'educacion-fisica' || materia === 'artistica') {
      categoriaDocente = 'otras-materias'
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el docente (sin centro asociado - centroId = null)
    const nuevoDocente = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: 'admin_centro',
        genero: genero || null,
        categoriaDocente,
        materias: [materia],
        grados: [],     // Array vacío por defecto
        niveles: [],    // Array vacío por defecto
        ciclos: [],     // Array vacío por defecto
        activo: true,
        // centroId se deja como null (docente individual sin centro)
      },
    })

    // Ocultar password en la respuesta
    const { password: _, ...docenteSinPassword } = nuevoDocente

    return NextResponse.json({
      success: true,
      message: 'Docente registrado exitosamente',
      usuario: docenteSinPassword,
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error en registro docente:', error)
    
    // Error de email duplicado (Prisma)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })
    }
    
    return NextResponse.json({ 
      error: 'Error del servidor al registrar docente' 
    }, { status: 500 })
  }
}