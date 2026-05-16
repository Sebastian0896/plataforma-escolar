// app/api/docente/cancelar-suscripcion/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    // Buscar suscripción activa
    const suscripcion = await prisma.suscripcion.findFirst({
      where: {
        usuarioId: session.user.id,
        estado: 'active',
      }
    })

    if (!suscripcion) {
      return NextResponse.json({ error: 'No hay suscripción activa' }, { status: 400 })
    }

    // Cancelar en Lemon Squeezy si tiene subscriptionId
    if (suscripcion.lemonSubscriptionId) {
      const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${suscripcion.lemonSubscriptionId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        },
      })

      if (!response.ok) {
        console.error('Error cancelando en Lemon Squeezy')
      }
    }

    // Actualizar en BD
    await prisma.suscripcion.update({
      where: { id: suscripcion.id },
      data: {
        estado: 'inactive',
        fechaFin: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error cancelando suscripción:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}