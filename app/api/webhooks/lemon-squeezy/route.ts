// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')

    // =========================================
    // RAW BODY
    // =========================================

    const body = await req.text()

    // =========================================
    // SIGNATURE
    // =========================================

    const signature = req.headers.get('x-signature')

    if (!signature) {
      console.log('❌ Signature faltante')

      return NextResponse.json(
        { error: 'Signature faltante' },
        { status: 401 }
      )
    }

    // =========================================
    // VERIFY SIGNATURE
    // =========================================

    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!secret) {
      console.log('❌ Secret no configurado')

      return NextResponse.json(
        { error: 'Webhook secret no configurado' },
        { status: 500 }
      )
    }

    const hmac = crypto.createHmac('sha256', secret)

    const digest = hmac
      .update(body)
      .digest('hex')

    console.log('🔵 Signature:', signature)
    console.log('🔵 Digest:', digest)

    if (signature !== digest) {
      console.log('❌ Firma inválida')

      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      )
    }

    console.log('✅ Firma válida')

    // =========================================
    // PARSE BODY
    // =========================================

    const payload = JSON.parse(body)

    const eventName = payload.meta?.event_name

    console.log('🔵 Evento:', eventName)

    // =========================================
    // ATTRIBUTES
    // =========================================

    const attributes =
      payload.data?.attributes || {}

    const customData =
      payload.meta?.custom_data || {}

    const userId = customData.user_id

    const variantId =
      attributes.variant_id?.toString()

    const customerId =
      attributes.customer_id?.toString()

    const subscriptionId =
      attributes.subscription_id?.toString()

    const orderId =
      payload.data?.id?.toString()

    const total =
      Number(attributes.total || 0) / 100

    const orderNumber =
      attributes.order_number?.toString()

    console.log('🔵 userId:', userId)
    console.log('🔵 variantId:', variantId)
    console.log('🔵 subscriptionId:', subscriptionId)

    // =========================================
    // DETECTAR PLAN
    // =========================================

    let plan = 'gratis'

    if (
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_MENSUAL ||
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_ANUAL
    ) {
      plan = 'docente_pro'
    }

    if (
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL ||
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL
    ) {
      plan = 'docente_premium'
    }

    console.log('🔵 Plan detectado:', plan)

    // =========================================
    // ORDER CREATED
    // =========================================

    if (
      eventName === 'order_created' &&
      userId &&
      plan !== 'gratis'
    ) {
      console.log(
        '🔵 Procesando nueva suscripción'
      )

      // =====================================
      // DESACTIVAR ANTERIORES
      // =====================================

      await prisma.suscripcion.updateMany({
        where: {
          usuarioId: userId,
          estado: 'active',
        },

        data: {
          estado: 'inactive',
          fechaFin: new Date(),
        },
      })

      // =====================================
      // CREAR SUSCRIPCIÓN
      // =====================================

      const suscripcion =
        await prisma.suscripcion.create({
          data: {
            id: `sub_${Date.now()}_${Math.random()
              .toString(36)
              .slice(2, 11)}`,

            usuarioId: userId,

            plan,

            estado: 'active',

            lemonCustomerId: customerId,

            lemonSubscriptionId:
              subscriptionId,

            lemonVariantId: variantId,

            fechaInicio: new Date(),
          },
        })

      console.log(
        '✅ Suscripción creada:',
        suscripcion.id
      )

      // =====================================
      // CREAR PAGO
      // =====================================

      await prisma.pago.create({
        data: {
          id: `pay_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 11)}`,

          suscripcionId: suscripcion.id,

          monto: total,

          moneda: 'USD',

          estado: 'completado',

          lemonOrderId: orderId,

          lemonPaymentId: orderNumber,
        },
      })

      console.log('✅ Pago registrado')
    }

    // =========================================
    // SUBSCRIPTION CANCELLED
    // =========================================

    if (
      eventName ===
      'subscription_cancelled'
    ) {
      console.log(
        '⚠️ Procesando cancelación'
      )

      await prisma.suscripcion.updateMany({
        where: {
          lemonSubscriptionId:
            subscriptionId,
        },

        data: {
          estado: 'inactive',
          fechaFin: new Date(),
        },
      })

      console.log(
        '❌ Suscripción cancelada:',
        subscriptionId
      )
    }

    // =========================================
    // SUBSCRIPTION EXPIRED
    // =========================================

    if (
      eventName ===
      'subscription_expired'
    ) {
      console.log(
        '⚠️ Procesando expiración'
      )

      await prisma.suscripcion.updateMany({
        where: {
          lemonSubscriptionId:
            subscriptionId,
        },

        data: {
          estado: 'expired',
          fechaFin: new Date(),
        },
      })

      console.log(
        '⌛ Suscripción expirada:',
        subscriptionId
      )
    }

    // =========================================
    // SUBSCRIPTION RESUMED
    // =========================================

    if (
      eventName ===
      'subscription_resumed'
    ) {
      console.log(
        '🔄 Reactivando suscripción'
      )

      await prisma.suscripcion.updateMany({
        where: {
          lemonSubscriptionId:
            subscriptionId,
        },

        data: {
          estado: 'active',
          fechaFin: null,
        },
      })

      console.log(
        '✅ Suscripción reactivada'
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      '❌ Webhook error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Error interno del webhook',
      },
      { status: 500 }
    )
  }
}