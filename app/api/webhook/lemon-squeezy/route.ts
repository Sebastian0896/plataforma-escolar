import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-signature')
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!signature || !secret) {
      return NextResponse.json({ error: 'Configuración inválida' }, { status: 401 })
    }

    // Verificar Firma
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')
    if (signature !== digest) {
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
    }

    const payload = JSON.parse(body)
    const eventName = payload.meta?.event_name
    const attributes = payload.data?.attributes || {}
    const customData = payload.meta?.custom_data || {}

    // Extraer IDs clave
    const userId = customData.user_id || customData.usuarioId
    const plan = customData.plan || 'premium' // Plan por defecto si viene de customData
    
    // El ID de la suscripción puede venir en diferentes lugares según el evento
    const subscriptionId = attributes.subscription_id?.toString() || payload.data?.id?.toString()
    const customerId = attributes.customer_id?.toString()
    const variantId = attributes.variant_id?.toString()

    console.log(`🔔 Evento: ${eventName} | User: ${userId} | Sub: ${subscriptionId}`)

    // 1. GESTIÓN DE SUSCRIPCIÓN (Created, Updated, Resumed, etc.)
    if (eventName.startsWith('subscription_')) {
      if (!subscriptionId) throw new Error('No subscriptionId found in payload')

      // Si es una creación o actualización, necesitamos asegurar que el usuario existe en el registro
      if (userId) {
        await prisma.suscripcion.upsert({
          where: { lemonSubscriptionId: subscriptionId },
          update: {
            estado: attributes.status === 'active' ? 'active' : 'inactive',
            plan: plan,
            lemonVariantId: variantId,
          },
          create: {
            id: `sub_${Math.random().toString(36).slice(2, 11)}`,
            usuarioId: userId,
            plan: plan,
            estado: 'active',
            lemonCustomerId: customerId,
            lemonSubscriptionId: subscriptionId,
            lemonVariantId: variantId,
            fechaInicio: new Date(),
          }
        })
        console.log('✅ Suscripción procesada (Upsert)')
      }
    }

    // 2. GESTIÓN DE PAGOS (Payment Success)
    if (eventName === 'subscription_payment_success' || eventName === 'order_created') {
      const orderId = payload.data?.id?.toString()
      const total = Number(attributes.total || 0) / 100
      const orderNumber = attributes.order_number?.toString()

      // Intentar encontrar la suscripción para vincular el pago
      let suscripcion = await prisma.suscripcion.findUnique({
        where: { lemonSubscriptionId: subscriptionId }
      })

      // Si el pago llega antes que el evento de creación, intentamos crearla aquí
      if (!suscripcion && userId) {
        suscripcion = await prisma.suscripcion.create({
          data: {
            id: `sub_${Math.random().toString(36).slice(2, 11)}`,
            usuarioId: userId,
            plan: plan,
            estado: 'active',
            lemonCustomerId: customerId,
            lemonSubscriptionId: subscriptionId,
            lemonVariantId: variantId,
            fechaInicio: new Date(),
          }
        })
      }

      if (suscripcion && orderId) {
        await prisma.pago.upsert({
          where: { lemonOrderId: orderId },
          update: { estado: 'completado' },
          create: {
            id: `pay_${Math.random().toString(36).slice(2, 11)}`,
            suscripcionId: suscripcion.id,
            monto: total,
            moneda: attributes.currency || 'USD',
            estado: 'completado',
            lemonOrderId: orderId,
            lemonPaymentId: orderNumber,
          }
        })
        console.log('✅ Pago registrado con éxito')
      } else {
        console.warn('⚠️ No se pudo registrar el pago: Suscripción o OrderId ausente')
      }
    }

    // 3. CANCELACIONES / EXPIRACIONES
    if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      await prisma.suscripcion.updateMany({
        where: { lemonSubscriptionId: subscriptionId },
        data: { 
          estado: eventName === 'subscription_cancelled' ? 'inactive' : 'expired',
          fechaFin: new Date() 
        },
      })
      console.log('❌ Suscripción marcada como inactiva/expirada')
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Webhook Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}