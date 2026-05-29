// app/api/centro/[centroId]/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ centroId: string }> }
) {
  const session = await auth()
  const { centroId } = await params

  if (session?.user?.role !== 'admin_centro') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (session.user.centroId !== centroId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })

  if (!centro) {
    return NextResponse.json({ error: 'Centro no encontrado' }, { status: 404 })
  }

  return NextResponse.json(centro)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ centroId: string }> }
) {
  const session = await auth()
  const { centroId } = await params

  if (session?.user?.role !== 'admin_centro') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  if (session.user.centroId !== centroId) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { nombre, codigo, plan } = await req.json()

  const centro = await prisma.centro.update({
    where: { id: centroId },
    data: { nombre, codigo, plan }
  })

  return NextResponse.json(centro)
}