// app/api/webhooks/lemon-squeezy/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-signature')

    // Verificar firma
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
    if (secret) {
      const hmac = crypto.createHmac('sha256', secret)
      const digest = hmac.update(body).toString('hex')
      if (signature !== digest) {
        return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
      }
    }

    const event = JSON.parse(body)
    const eventName = event?.meta?.event_name
    const customData = event?.data?.attributes?.custom_data
    const userId = customData?.user_id
    const variantId = event?.data?.attributes?.variant_id

    // Determinar plan por variantId
    let plan = 'gratis'
    if (variantId === process.env.LEMON_VARIANT_DOCENTE_PRO_MENSUAL || 
        variantId === process.env.LEMON_VARIANT_DOCENTE_PRO_ANUAL) {
      plan = 'docente_pro'
    }
    if (variantId === process.env.LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL || 
        variantId === process.env.LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL) {
      plan = 'docente_premium'
    }

    if (eventName === 'order_created' && userId) {
      // Desactivar suscripciones anteriores
      await prisma.suscripcion.updateMany({
        where: { usuarioId: userId, estado: 'active' },
        data: { estado: 'inactive', fechaFin: new Date() }
      })

      // Crear nueva suscripción
      const suscripcion = await prisma.suscripcion.create({
        data: {
          id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          usuarioId: userId,
          plan,
          estado: 'active',
          lemonCustomerId: event?.data?.attributes?.customer_id?.toString(),
          lemonSubscriptionId: event?.data?.attributes?.subscription_id?.toString(),
          lemonVariantId: variantId,
          fechaInicio: new Date(),
        }
      })

      // Registrar pago
      await prisma.pago.create({
        data: {
          id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          suscripcionId: suscripcion.id,
          monto: event?.data?.attributes?.total,
          moneda: 'USD',
          estado: 'completado',
          lemonOrderId: event?.data?.id,
          lemonPaymentId: event?.data?.attributes?.order_id,
        }
      })

      console.log(`✅ Suscripción creada: ${userId} - ${plan}`)
    }

    if (eventName === 'subscription_cancelled') {
      await prisma.suscripcion.updateMany({
        where: { lemonSubscriptionId: event?.data?.id?.toString() },
        data: { estado: 'inactive', fechaFin: new Date() }
      })
      console.log(`❌ Suscripción cancelada: ${event?.data?.id}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}