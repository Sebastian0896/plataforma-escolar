// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')

    const body = await req.text()

    const signature =
      req.headers.get('x-signature')

    if (!signature) {
      return NextResponse.json(
        {
          error: 'Signature faltante',
        },
        { status: 401 }
      )
    }

    const secret =
      process.env
        .LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!secret) {
      return NextResponse.json(
        {
          error:
            'Webhook secret faltante',
        },
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
        {
          error: 'Firma inválida',
        },
        { status: 401 }
      )
    }

    console.log('✅ Firma válida')

    const payload = JSON.parse(body)

    console.log(
      '📦 PAYLOAD:',
      JSON.stringify(payload, null, 2)
    )

    const eventName =
      payload.meta?.event_name

    const attributes =
      payload.data?.attributes || {}

    const customData =
      payload.meta?.custom_data || {}

    console.log(
      '🔵 Evento:',
      eventName
    )

    // =====================================================
    // EXTRAER DATOS
    // =====================================================

    const userId =
      customData.user_id ||
      customData.usuarioId

    const planDesdeCustom =
      customData.plan || 'gratis'

    const customerId =
      attributes.customer_id?.toString()

    const variantId =
      attributes.variant_id?.toString()

    const lemonOrderId = payload.data?.id || attributes.order_id?.toString()

    let subscriptionId = null

    if (attributes.subscription_id) {
      subscriptionId =
        attributes.subscription_id.toString()
    } else if (
      payload.data?.type ===
      'subscriptions'
    ) {
      subscriptionId =
        payload.data?.id?.toString()
    }

    console.log(
      '👤 usuarioId:',
      userId
    )

    console.log(
      '📦 plan:',
      planDesdeCustom
    )

    console.log(
      '🧾 lemonOrderId:',
      lemonOrderId
    )

    console.log(
      '🔁 lemonSubscriptionId:',
      subscriptionId
    )

    console.log(
      '🪪 lemonVariantId:',
      variantId
    )

    // =====================================================
    // DETERMINAR PLAN
    // =====================================================

    let planDeterminado =
      planDesdeCustom

    if (
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_MENSUAL ||
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_ANUAL
    ) {
      planDeterminado =
        'docente_pro'
    }

    if (
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL ||
      variantId ===
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL
    ) {
      planDeterminado =
        'docente_premium'
    }

    // =====================================================
    // SUBSCRIPTION CREATED
    // =====================================================

    if (
      eventName ===
      'subscription_created'
    ) {
      console.log(
        '🟢 SUBSCRIPTION CREATED'
      )

      if (userId && subscriptionId) {
        await prisma.suscripcion.updateMany(
          {
            where: {
              usuarioId: userId,
              estado: 'active',
              NOT: {
                lemonSubscriptionId:
                  subscriptionId,
              },
            },
            data: {
              estado: 'inactive',
              fechaFin: new Date(),
            },
          }
        )

        const existe =
          await prisma.suscripcion.findFirst(
            {
              where: {
                lemonSubscriptionId:
                  subscriptionId,
              },
            }
          )

        if (!existe) {
          const nueva =
            await prisma.suscripcion.create(
              {
                data: {
                  usuarioId: userId,

                  plan:
                    planDeterminado,

                  estado: 'active',

                  lemonCustomerId:
                    customerId,

                  lemonSubscriptionId:
                    subscriptionId,

                  lemonVariantId:
                    variantId,

                  fechaInicio:
                    new Date(),

                  fechaFin:
                    attributes.renews_at
                      ? new Date(
                          attributes.renews_at
                        )
                      : null,
                },
              }
            )

          console.log(
            '✅ Suscripción creada:',
            nueva.id
          )
        }
      }
    }

    // =====================================================
    // SUBSCRIPTION UPDATED
    // =====================================================

    else if (
      eventName ===
      'subscription_updated'
    ) {
      console.log(
        '♻️ SUBSCRIPTION UPDATED'
      )

      if (subscriptionId) {
        await prisma.suscripcion.updateMany(
          {
            where: {
              lemonSubscriptionId:
                subscriptionId,
            },
            data: {
              estado: 'active',

              plan:
                planDeterminado,

              fechaFin:
                attributes.renews_at
                  ? new Date(
                      attributes.renews_at
                    )
                  : null,
            },
          }
        )
      }
    }

    // =====================================================
    // PAYMENT SUCCESS
    // =====================================================

    else if (
      eventName ===
      'subscription_payment_success'
    ) {
      console.log(
        '💰 PAYMENT SUCCESS'
      )

      const facturaId =
        payload.data?.id?.toString()

      const rawAmount =
        attributes.total ?? 0

      console.log(
        '💵 RAW AMOUNT:',
        rawAmount
      )

      const monto =
        Number(rawAmount) / 100

      console.log(
        '💵 MONTO FINAL:',
        monto
      )

      if (!subscriptionId) {
        console.log(
          '❌ subscriptionId faltante'
        )

        return NextResponse.json({
          success: false,
        })
      }

      const suscripcion =
        await prisma.suscripcion.findFirst(
          {
            where: {
              lemonSubscriptionId:
                subscriptionId,
            },
          }
        )

      if (!suscripcion) {
        console.log(
          '❌ Suscripción no encontrada'
        )

        return NextResponse.json({
          success: false,
        })
      }

      const pagoExistente =
        await prisma.pago.findFirst({
          where: {
            lemonPaymentId:
              facturaId,
          },
        })

      if (
        !pagoExistente &&
        monto >= 0
      ) {
        const nuevoPago =
          await prisma.pago.create({
            data: {
              suscripcionId:
                suscripcion.id,

              monto,

              moneda:
                attributes.currency ||
                'USD',

              estado:
                'completado',

              lemonOrderId:
                lemonOrderId ||
                null,

              lemonPaymentId:
                facturaId,
            },
          })

        console.log(
          '✅ Pago creado:',
          nuevoPago.id
        )
      } else {
        console.log(
          '⏭️ Pago omitido'
        )
      }
    }

    // =====================================================
    // CANCELLED
    // =====================================================

    else if (eventName === 'subscription_cancelled') {
      console.log('❌ SUBSCRIPTION CANCELLED')

      if (subscriptionId) {
        // Buscar la suscripción primero
        const suscripcion = await prisma.suscripcion.findFirst({
          where: { lemonSubscriptionId: subscriptionId },
        })

        if (suscripcion) {
          // Actualizar estado de la suscripción
          await prisma.suscripcion.update({
            where: { id: suscripcion.id },
            data: {
              estado: 'inactive',
              fechaFin: new Date(),
              plan: 'gratis',
            },
          })

          // Actualizar el plan del usuario
          await prisma.suscripcion.update({
            where: { id: suscripcion.usuarioId },
            data: {
              plan: 'gratis',
            },
          })

          console.log('✅ Suscripción cancelada y usuario downgrade a gratis')
        }
      }
    }

    // =====================================================
    // EXPIRED
    // =====================================================

    else if (
      eventName ===
      'subscription_expired'
    ) {
      console.log(
        '⌛ SUBSCRIPTION EXPIRED'
      )

      if (subscriptionId) {
        await prisma.suscripcion.updateMany(
          {
            where: {
              lemonSubscriptionId:
                subscriptionId,
            },
            data: {
              estado: 'expired',
              fechaFin: new Date(),
            },
          }
        )
      }
    }

    // =====================================================
    // RESUMED
    // =====================================================

    else if (
      eventName ===
      'subscription_resumed'
    ) {
      console.log(
        '🔄 SUBSCRIPTION RESUMED'
      )

      if (subscriptionId) {
        await prisma.suscripcion.updateMany(
          {
            where: {
              lemonSubscriptionId:
                subscriptionId,
            },
            data: {
              estado: 'active',
              fechaFin: null,
            },
          }
        )
      }
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(
      '❌ Error crítico webhook:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Internal Server Error',
      },
      { status: 500 }
    )
  }
}