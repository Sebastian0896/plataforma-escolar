import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { nombre, email, password, genero, materia } = await request.json()

    if (!nombre || !email || !password || !materia) {
      return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 })
    }

    await connectDB()

    const existe = await Usuario.findOne({ email })
    if (existe) return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })

    // Crear centro virtual para el docente
    const centro = await Centro.create({
      nombre: `Docente: ${nombre}`,
      codigo: `DOC-${Date.now().toString(36).toUpperCase()}`,
      plan: 'docente_pro',
      maxDocentes: 1,
      maxEstudiantes: 100,
      tipo: 'individual',
    })

    // Crear docente
    const hash = await bcrypt.hash(password, 10)
    await Usuario.create({
      nombre,
      email,
      password: hash,
      rol: 'admin_centro',
      genero: genero || '',
      categoriaDocente: materia === 'frances' || materia === 'ingles' ? 'idiomas' : materia === 'educacion-fisica' || materia === 'artistica' ? 'otras-materias' : 'materias-basicas',
      materias: [materia],
      centroId: centro._id,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    if (error.code === 11000) return NextResponse.json({ error: 'Email ya registrado' }, { status: 409 })
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}