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
      return NextResponse.json(
        { error: 'Webhook secret faltante' },
        { status: 500 }
      )
    }

    const digest = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

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

    const eventName = payload.meta?.event_name

    const attributes =
      payload.data?.attributes || {}

    const customData =
      payload.meta?.custom_data || {}

    console.log('🔵 Evento:', eventName)

    // =====================================================
    // CUSTOM DATA
    // =====================================================

    const userId =
      customData.usuarioId

    const plan =
      customData.plan || 'gratis'

    // =====================================================
    // COMMON DATA
    // =====================================================

    const customerId =
      attributes.customer_id?.toString()

    const subscriptionId =
      attributes.subscription_id?.toString()

    const variantId =
      attributes.variant_id?.toString()

    // =====================================================
    // SUBSCRIPTION CREATED
    // =====================================================

    if (
      eventName === 'subscription_created'
    ) {
      console.log(
        '🟢 Procesando subscription_created'
      )

      console.log('🔵 userId:', userId)
      console.log('🔵 plan:', plan)
      console.log(
        '🔵 subscriptionId:',
        subscriptionId
      )

      if (!userId || !subscriptionId) {
        console.log(
          '❌ Faltan datos requeridos'
        )

        return NextResponse.json({
          success: true,
        })
      }

      // ===============================================
      // DESACTIVAR SUSCRIPCIONES ACTIVAS
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
      // EVITAR DUPLICADOS
      // ===============================================

      const existente =
        await prisma.suscripcion.findFirst({
          where: {
            lemonSubscriptionId:
              subscriptionId,
          },
        })

      if (!existente) {
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

            lemonVariantId:
              variantId,

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
      'subscription_payment_success'
    ) {
      console.log(
        '💰 Procesando pago'
      )

      // ===============================================
      // DATOS
      // ===============================================

      const invoiceId =
        payload.data?.id?.toString()

      const total =
        Number(attributes.total || 0) /
        100

      const currency =
        attributes.currency || 'USD'

      const status =
        attributes.status || 'paid'

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

      console.log(
        '🔵 Suscripción encontrada:',
        !!suscripcion
      )

      // ===============================================
      // SI NO EXISTE AÚN
      // ===============================================

      if (!suscripcion) {
        console.log(
          '⚠️ La suscripción aún no existe'
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
            lemonOrderId: invoiceId,
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

            lemonOrderId: invoiceId,
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
    }

    // =====================================================
    // SUBSCRIPTION CANCELLED
    // =====================================================

    if (
      eventName ===
      'subscription_cancelled'
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
      'subscription_expired'
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
        error: 'Error interno',
      },
      { status: 500 }
    )
  }
}