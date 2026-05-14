// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')

    // =====================================================
    // RAW BODY
    // =====================================================

    const body = await req.text()

    // =====================================================
    // SIGNATURE
    // =====================================================

    const signature = req.headers.get('x-signature')

    if (!signature) {
      console.log('❌ Signature faltante')

      return NextResponse.json(
        { error: 'Signature faltante' },
        { status: 401 }
      )
    }

    // =====================================================
    // VERIFY SIGNATURE
    // =====================================================

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

    // =====================================================
    // PAYLOAD
    // =====================================================

    const payload = JSON.parse(body)

    console.log(
      '📦 PAYLOAD:',
      JSON.stringify(payload, null, 2)
    )

    const eventName = payload.meta?.event_name

    console.log('🔵 Evento:', eventName)

    // =====================================================
    // DATA
    // =====================================================

    const attributes =
      payload.data?.attributes || {}

    const customData =
      payload.meta?.custom_data || {}

    // =====================================================
    // CUSTOM DATA
    // =====================================================

    const userId =
      customData.usuarioId

    const plan =
      customData.plan || 'gratis'

    // =====================================================
    // LEMON DATA
    // =====================================================

    const customerId =
      attributes.customer_id?.toString()

    const subscriptionId =
      attributes.subscription_id?.toString()

    const orderId =
      payload.data?.id?.toString()

    const total =
      Number(attributes.total || 0) / 100

    const currency =
      attributes.currency || 'USD'

    const status =
      attributes.status || 'paid'

    const orderNumber =
      attributes.order_number?.toString()

    console.log('🔵 userId:', userId)
    console.log('🔵 plan:', plan)
    console.log('🔵 customerId:', customerId)
    console.log('🔵 subscriptionId:', subscriptionId)

    // =====================================================
    // SUBSCRIPTION CREATED
    // =====================================================

    if (
      eventName === 'subscription_created' &&
      userId &&
      plan !== 'gratis'
    ) {
      console.log(
        '🟢 Creando suscripción'
      )

      // ===============================================
      // DESACTIVAR ANTERIORES
      // ===============================================

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

      // ===============================================
      // VERIFICAR EXISTENTE
      // ===============================================

      const existe =
        await prisma.suscripcion.findFirst({
          where: {
            lemonSubscriptionId:
              subscriptionId,
          },
        })

      // ===============================================
      // CREAR SI NO EXISTE
      // ===============================================

      if (!existe) {
        await prisma.suscripcion.create({
          data: {
            id: `sub_${Date.now()}_${Math.random()
              .toString(36)
              .slice(2, 11)}`,

            usuarioId: userId,

            plan,

            estado: 'active',

            lemonCustomerId:
              customerId,

            lemonSubscriptionId:
              subscriptionId,

            fechaInicio: new Date(),
          },
        })

        console.log(
          '✅ Suscripción creada'
        )
      }
    }

    // =====================================================
    // PAYMENT SUCCESS
    // =====================================================

    if (
      eventName ===
        'subscription_payment_success' &&
      subscriptionId
    ) {
      console.log(
        '💰 Registrando pago'
      )

      // ===============================================
      // BUSCAR SUSCRIPCIÓN
      // ===============================================

      const suscripcion =
        await prisma.suscripcion.findFirst({
          where: {
            lemonSubscriptionId:
              subscriptionId,
          },
        })

      if (!suscripcion) {
        console.log(
          '❌ Suscripción no encontrada'
        )

        return NextResponse.json({
          success: true,
        })
      }

      // ===============================================
      // EVITAR PAGOS DUPLICADOS
      // ===============================================

      const pagoExistente =
        await prisma.pago.findFirst({
          where: {
            lemonOrderId: orderId,
          },
        })

      if (!pagoExistente) {
        await prisma.pago.create({
          data: {
            id: `pay_${Date.now()}_${Math.random()
              .toString(36)
              .slice(2, 11)}`,

            suscripcionId:
              suscripcion.id,

            monto: total,

            moneda: currency,

            estado:
              status === 'paid'
                ? 'completado'
                : 'pendiente',

            lemonOrderId: orderId,

            lemonPaymentId:
              orderNumber,
          },
        })

        console.log(
          '✅ Pago registrado'
        )
      }

      // ===============================================
      // ASEGURAR ACTIVA
      // ===============================================

      await prisma.suscripcion.update({
        where: {
          id: suscripcion.id,
        },

        data: {
          estado: 'active',
        },
      })

      console.log(
        '✅ Suscripción actualizada'
      )
    }

    // =====================================================
    // SUBSCRIPTION CANCELLED
    // =====================================================

    if (
      eventName ===
        'subscription_cancelled' &&
      subscriptionId
    ) {
      console.log(
        '⚠️ Cancelando suscripción'
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
        '❌ Suscripción cancelada'
      )
    }

    // =====================================================
    // SUBSCRIPTION EXPIRED
    // =====================================================

    if (
      eventName ===
        'subscription_expired' &&
      subscriptionId
    ) {
      console.log(
        '⌛ Expirando suscripción'
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
        '⌛ Suscripción expirada'
      )
    }

    // =====================================================
    // SUBSCRIPTION RESUMED
    // =====================================================

    if (
      eventName ===
        'subscription_resumed' &&
      subscriptionId
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