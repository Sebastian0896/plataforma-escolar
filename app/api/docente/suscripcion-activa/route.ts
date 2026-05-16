// app/api/docente/suscripcion-activa/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const suscripcion = await prisma.suscripcion.findFirst({
      where: {
        usuarioId: session.user.id,
        estado: 'active',
        OR: [
          { fechaFin: null },
          { fechaFin: { gt: new Date() } }
        ]
      },
      orderBy: { fechaInicio: 'desc' }
    })

    return NextResponse.json(suscripcion || { plan: 'gratis', estado: 'inactive' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}