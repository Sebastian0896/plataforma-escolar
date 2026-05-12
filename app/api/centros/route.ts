import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'

export const runtime = "nodejs"

// GET — Listar todos o uno
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const codigo = searchParams.get('codigo')

  await connectDB()

  // Buscar por código (público para validación)
  if (codigo) {
    const centro = await prisma.centro.findFirst({ where: { codigo: codigo.toUpperCase(), activo: true } })
    if (!centro) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(centro)
  }

  // Buscar por ID
  if (id) {
    const session = await auth()
    // Permitir si es superadmin O si está buscando su propio centro
    if (session?.user?.role !== 'superadmin' && session?.user?.centroId !== id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const centro = await prisma.centro.findUnique({ where: { id } })
    if (!centro) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(centro)
  }

  // Listar todos (solo superadmin)
  const session = await auth()
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const centros = await Centro.find({}).sort({ createdAt: -1 }).lean()
  return NextResponse.json(centros)
}

// POST — Crear centro + admin_centro
export async function POST(request: Request) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { nombre, codigo, adminNombre, adminEmail, adminPassword } = await request.json()

    if (!nombre || !codigo || !adminNombre || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    await connectDB()

    const existe = await Centro.findOne({ codigo: codigo.toUpperCase() })
    if (existe) return NextResponse.json({ error: 'Código ya existe' }, { status: 409 })

    const centro = await Centro.create({ nombre, codigo: codigo.toUpperCase() })

    const hash = await bcrypt.hash(adminPassword, 10)
    await Usuario.create({
      nombre: adminNombre,
      email: adminEmail,
      password: hash,
      rol: 'admin_centro',
      centroId: centro._id,
    })

    return NextResponse.json({ success: true, centroId: centro._id }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT — Actualizar centro
export async function PUT(request: Request) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { id, nombre, codigo, activo } = await request.json()

    await connectDB()

    const updateData: any = {}
    if (nombre) updateData.nombre = nombre
    if (codigo) updateData.codigo = codigo.toUpperCase()
    if (activo !== undefined) updateData.activo = activo

    await Centro.findByIdAndUpdate(id, updateData)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

// DELETE — Soft delete (desactivar)
export async function DELETE(request: Request) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const accion = searchParams.get('accion')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Centro.findByIdAndUpdate(id, { activo: accion === 'activar' })

  return NextResponse.json({ success: true })
}