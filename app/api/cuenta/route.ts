import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

// PUT — Actualizar datos del usuario logueado
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { nombre, email, passwordActual, passwordNueva } = await request.json()

  await connectDB()
  const usuario = await Usuario.findById(session.user?.id)
  if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  // Si quiere cambiar contraseña
  if (passwordNueva) {
    if (!passwordActual) return NextResponse.json({ error: 'Contraseña actual requerida' }, { status: 400 })
    const ok = await bcrypt.compare(passwordActual, usuario.password)
    if (!ok) return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 400 })
    usuario.password = await bcrypt.hash(passwordNueva, 10)
  }

  if (nombre) usuario.nombre = nombre
  if (email) usuario.email = email

  await usuario.save()

  return NextResponse.json({ success: true })
}