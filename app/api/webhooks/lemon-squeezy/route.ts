// app/api/webhook/lemon-squeezy/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')
    
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

    const payload = JSON.parse(body)
    
    // Nueva estructura: el evento está en payload.meta.event_name
    const eventName = payload.meta?.event_name
    const customData = payload.meta?.custom_data || {}
    const userId = customData.user_id
    
    // Los datos están en payload.data.attributes
    const attributes = payload.data?.attributes || {}
    const variantId = attributes.variant_id
    const customerId = attributes.customer_id
    const subscriptionId = attributes.subscription_id
    const orderId = payload.data?.id
    const total = attributes.total
    const orderNumber = attributes.order_number

    console.log('Evento:', eventName)
    console.log('UserId:', userId)
    console.log('VariantId:', variantId)

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

    if (eventName === 'order_created' && userId && plan !== 'gratis') {
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
          lemonCustomerId: customerId?.toString(),
          lemonSubscriptionId: subscriptionId?.toString(),
          lemonVariantId: variantId?.toString(),
          fechaInicio: new Date(),
        }
      })

      // Registrar pago
      await prisma.pago.create({
        data: {
          id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          suscripcionId: suscripcion.id,
          monto: total || 0,
          moneda: 'USD',
          estado: 'completado',
          lemonOrderId: orderId?.toString(),
          lemonPaymentId: orderNumber?.toString(),
        }
      })

      console.log(`✅ Suscripción creada: ${userId} - ${plan}`)
    }

    if (eventName === 'subscription_cancelled') {
      await prisma.suscripcion.updateMany({
        where: { lemonSubscriptionId: subscriptionId?.toString() },
        data: { estado: 'inactive', fechaFin: new Date() }
      })
      console.log(`❌ Suscripción cancelada: ${subscriptionId}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}