// app/api/docente/sincronizar-suscripcion/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const suscripcion = await prisma.suscripcion.findFirst({
      where: {
        usuarioId: session.user.id,
      },
      orderBy: { fechaInicio: 'desc' },
    })

    if (!suscripcion || !suscripcion.lemonSubscriptionId) {
      return NextResponse.json({ error: 'No hay suscripción para sincronizar' }, { status: 400 })
    }

    // Consultar estado en Lemon Squeezy
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${suscripcion.lemonSubscriptionId}`,
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: 'Error consultando Lemon Squeezy' }, { status: 500 })
    }

    const data = await response.json()
    const lemonEstado = data.data?.attributes?.status

    // Sincronizar estado
    let nuevoEstado = suscripcion.estado
    if (lemonEstado === 'cancelled' || lemonEstado === 'expired') {
      nuevoEstado = 'inactive'
      await prisma.suscripcion.update({
        where: { id: suscripcion.id },
        data: { estado: 'inactive', fechaFin: new Date() },
      })
    } else if (lemonEstado === 'active') {
      nuevoEstado = 'active'
      await prisma.suscripcion.update({
        where: { id: suscripcion.id },
        data: { estado: 'active' },
      })
    }

    return NextResponse.json({ 
      success: true, 
      lemonEstado,
      estadoLocal: nuevoEstado,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}