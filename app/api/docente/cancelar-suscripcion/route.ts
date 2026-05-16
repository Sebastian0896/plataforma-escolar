// app/api/docente/cancelar-suscripcion/route.ts (mejorado)
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
        estado: 'active',
      },
    })

    if (!suscripcion) {
      return NextResponse.json({ error: 'No hay suscripción activa' }, { status: 400 })
    }

    let lemonCancelled = false

    // Cancelar en Lemon Squeezy
    if (suscripcion.lemonSubscriptionId) {
      const response = await fetch(
        `https://api.lemonsqueezy.com/v1/subscriptions/${suscripcion.lemonSubscriptionId}`,
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
          },
        }
      )

      if (response.ok) {
        lemonCancelled = true
        console.log('✅ Cancelado en Lemon Squeezy')
      } else {
        const error = await response.json()
        console.error('Lemon Squeezy error:', error)
      }
    }

    // ✅ Actualizar BD LOCAL inmediatamente (independientemente de Lemon)
    await prisma.suscripcion.update({
      where: { id: suscripcion.id },
      data: {
        estado: 'inactive',
        fechaFin: new Date(),
      },
    })

    console.log('✅ Suscripción cancelada en BD local')

    return NextResponse.json({ 
      success: true, 
      lemonCancelled,
      message: lemonCancelled 
        ? 'Suscripción cancelada exitosamente' 
        : 'Suscripción cancelada localmente. El webhook sincronizará el cambio.'
    })
    
  } catch (error) {
    console.error('Error cancelando suscripción:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}