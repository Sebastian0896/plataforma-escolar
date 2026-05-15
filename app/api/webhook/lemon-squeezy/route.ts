import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  const signature =
    req.headers.get('x-signature')

  const secret =
    process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  // =====================================================
  // VERIFY SIGNATURE
  // =====================================================

  const hmac = crypto.createHmac(
    'sha256',
    secret!
  )

  const digest = hmac
    .update(rawBody)
    .digest('hex')

  if (signature !== digest) {
    console.error(
      '❌ Firma inválida'
    )

    return NextResponse.json(
      { error: 'Firma inválida' },
      { status: 401 }
    )
  }

  console.log('✅ Firma válida')

  try {
    const payload = JSON.parse(rawBody)

    const eventName =
      payload.meta?.event_name

    const customData =
      payload.meta?.custom_data || {}

    const attributes =
      payload.data?.attributes || {}

    // =====================================================
    // DATOS CUSTOM
    // =====================================================

    const userId = String(
      customData.usuarioId || ''
    ).trim()

    const plan =
      customData.plan || 'premium'

    // =====================================================
    // IDS IMPORTANTES
    // =====================================================

    // subscription_created
    const subscriptionId =
      eventName ===
      'subscription_created'
        ? String(payload.data?.id || '')
        : String(
            attributes.subscription_id || ''
          )

    // payment_success
    const invoiceId = String(
      payload.data?.id || ''
    )

    const customerId =
      attributes.customer_id?.toString()

    const variantId =
      attributes.variant_id?.toString()

    console.log(
      `📡 EVENTO: ${eventName}`
    )

    console.log(
      `👤 USER ID: ${userId}`
    )

    console.log(
      `📦 SUBSCRIPTION ID: ${subscriptionId}`
    )

    console.log(
      `🧾 INVOICE ID: ${invoiceId}`
    )

    // =====================================================
    // VALIDAR USER
    // =====================================================

    if (
      !userId ||
      userId === 'undefined'
    ) {
      console.error(
        '⚠️ Evento sin usuarioId'
      )

      return NextResponse.json(
        { success: true },
        { status: 200 }
      )
    }

    // =====================================================
    // SUBSCRIPTION CREATED
    // =====================================================

    if (
      eventName ===
      'subscription_created'
    ) {
      console.log(
        '🟢 Creando suscripción'
      )

      // ===============================================
      // DESACTIVAR ACTIVAS
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
      // UPSERT
      // ===============================================

      const suscripcion =
        await prisma.suscripcion.upsert({
          where: {
            lemonSubscriptionId:
              subscriptionId,
          },

          update: {
            estado: 'active',

            plan,

            lemonCustomerId:
              customerId,

            lemonVariantId:
              variantId,
          },

          create: {
            usuarioId: userId,

            plan,

            estado: 'active',

            lemonSubscriptionId:
              subscriptionId,

            lemonCustomerId:
              customerId,

            lemonVariantId:
              variantId,

            fechaInicio: new Date(),
          },
        })

      console.log(
        '✅ Suscripción guardada:',
        suscripcion.id
      )
    }

    // =====================================================
    // PAYMENT SUCCESS
    // =====================================================

    if (
      eventName ===
      'subscription_payment_success'
    ) {
      console.log(
        '💰 Registrando pago'
      )

      // ===============================================
      // BUSCAR SUSCRIPCIÓN
      // ===============================================

      let suscripcion =
        await prisma.suscripcion.findUnique({
          where: {
            lemonSubscriptionId:
              subscriptionId,
          },
        })

      // ===============================================
      // FALLBACK
      // ===============================================

      if (!suscripcion) {
        console.log(
          '⚠️ Creando fallback'
        )

        suscripcion =
          await prisma.suscripcion.create({
            data: {
              usuarioId: userId,

              plan,

              estado: 'active',

              lemonSubscriptionId:
                subscriptionId,

              lemonCustomerId:
                customerId,

              fechaInicio: new Date(),
            },
          })
      }

      // ===============================================
      // EVITAR DUPLICADOS
      // ===============================================

      const pagoExistente =
        await prisma.pago.findUnique({
          where: {
            lemonOrderId: invoiceId,
          },
        })

      if (!pagoExistente) {
        const total =
          Number(attributes.total || 0) /
          100

        await prisma.pago.create({
          data: {
            suscripcionId:
              suscripcion.id,

            monto: total,

            moneda:
              attributes.currency ||
              'USD',

            estado: 'completado',

            lemonOrderId: invoiceId,
          },
        })

        console.log(
          '✅ Pago registrado'
        )
      }
    }

    // =====================================================
    // CANCELLED
    // =====================================================

    if (
      eventName ===
      'subscription_cancelled'
    ) {
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
    // EXPIRED
    // =====================================================

    if (
      eventName ===
      'subscription_expired'
    ) {
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

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error(
      '❌ ERROR CRÍTICO'
    )

    console.error(
      'Mensaje:',
      error.message
    )

    console.error(
      'Código:',
      error.code
    )

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }
}