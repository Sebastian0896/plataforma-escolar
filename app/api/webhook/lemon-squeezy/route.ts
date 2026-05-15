import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')

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
      console.log('❌ Firma inválida')

      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      )
    }

    console.log('✅ Firma válida')

    const payload = JSON.parse(rawBody)

    console.log(
      '📦 PAYLOAD:',
      JSON.stringify(payload, null, 2)
    )

    const eventName =
      payload.meta?.event_name

    const customData =
      payload.meta?.custom_data || {}

    const attributes =
      payload.data?.attributes || {}

    const userId = String(
      customData.usuarioId || ''
    ).trim()

    const plan =
      customData.plan || 'premium'

    const subscriptionId =
      eventName === 'subscription_created'
        ? String(payload.data?.id || '')
        : String(
            attributes.subscription_id || ''
          )

    const invoiceId = String(
      payload.data?.id || ''
    )

    const customerId =
      attributes.customer_id?.toString()

    const variantId =
      attributes.variant_id?.toString()

    console.log('🔵 eventName:', eventName)
    console.log('🔵 userId:', userId)
    console.log(
      '🔵 subscriptionId:',
      subscriptionId
    )

    // =====================================================
    // VALIDAR
    // =====================================================

    if (!userId) {
      console.log('❌ userId vacío')

      return NextResponse.json({
        success: true,
      })
    }

    // =====================================================
    // SUBSCRIPTION CREATED
    // =====================================================

    if (
      eventName === 'subscription_created'
    ) {
      console.log(
        '🟢 Entró a subscription_created'
      )

      const resultado =
        await prisma.suscripcion.create({
          data: {
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
        '✅ SUSCRIPCION CREADA'
      )

      console.log(resultado)
    }

    // =====================================================
    // PAYMENT SUCCESS
    // =====================================================

    if (
      eventName ===
      'subscription_payment_success'
    ) {
      console.log(
        '💰 Entró a payment_success'
      )

      const suscripcion =
        await prisma.suscripcion.findFirst({
          where: {
            usuarioId: userId,
          },
        })

      console.log(
        '🔵 Suscripcion encontrada:',
        suscripcion
      )

      if (!suscripcion) {
        console.log(
          '❌ NO EXISTE SUSCRIPCION'
        )

        return NextResponse.json({
          success: true,
        })
      }

      const pago =
        await prisma.pago.create({
          data: {
            suscripcionId:
              suscripcion.id,

            monto:
              Number(attributes.total || 0) /
              100,

            moneda:
              attributes.currency ||
              'USD',

            estado: 'completado',

            lemonOrderId: invoiceId,
          },
        })

      console.log('✅ PAGO CREADO')

      console.log(pago)
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error(
      '❌ ERROR GENERAL'
    )

    console.error(error)

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    )
  }
}