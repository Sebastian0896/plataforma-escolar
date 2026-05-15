// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('🔵 Webhook recibido')

    // =========================================================
    // RAW BODY
    // =========================================================
    const rawBody = await req.text()

    // =========================================================
    // VERIFY SIGNATURE
    // =========================================================
    const signature = req.headers.get('x-signature')
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!secret) {
      console.error('❌ LEMON_SQUEEZY_WEBHOOK_SECRET no existe')
      return NextResponse.json(
        { error: 'Webhook secret no configurado' },
        { status: 500 }
      )
    }

    const digest = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex')

    if (signature !== digest) {
      console.error('❌ Firma inválida')
      console.log('🔵 Signature:', signature)
      console.log('🔵 Digest:', digest)

      return NextResponse.json(
        { error: 'Firma inválida' },
        { status: 401 }
      )
    }

    console.log('✅ Firma válida')

    // =========================================================
    // PARSE PAYLOAD
    // =========================================================
    const payload = JSON.parse(rawBody)

    console.log(
      '📦 PAYLOAD:',
      JSON.stringify(payload, null, 2)
    )

    const eventName = payload.meta?.event_name

    const customData = payload.meta?.custom_data || {}
    const attributes = payload.data?.attributes || {}

    console.log('🔵 Evento:', eventName)

    // =========================================================
    // USER DATA
    // =========================================================
    const usuarioId = customData.usuarioId
      ? String(customData.usuarioId)
      : null

    const plan =
      customData.plan ||
      'docente_pro'

    // =========================================================
    // IDs
    // =========================================================
    const lemonOrderId =
      payload.data?.type === 'orders'
        ? String(payload.data?.id)
        : attributes.order_id
          ? String(attributes.order_id)
          : null

    const lemonSubscriptionId =
      attributes.subscription_id
        ? String(attributes.subscription_id)
        : payload.data?.type === 'subscriptions'
          ? String(payload.data?.id)
          : null

    const lemonCustomerId = attributes.customer_id
      ? String(attributes.customer_id)
      : null

    const lemonVariantId = attributes.variant_id
      ? String(attributes.variant_id)
      : attributes.first_order_item?.variant_id
        ? String(attributes.first_order_item.variant_id)
        : null

    // =========================================================
    // PAYMENT DATA
    // =========================================================
    const total =
      attributes.total_usd ||
      attributes.total ||
      0

    const currency =
      attributes.currency ||
      'USD'

    console.log('👤 usuarioId:', usuarioId)
    console.log('📦 plan:', plan)
    console.log('🧾 lemonOrderId:', lemonOrderId)
    console.log('🔁 lemonSubscriptionId:', lemonSubscriptionId)
    console.log('🪪 lemonVariantId:', lemonVariantId)

    // =========================================================
    // VALIDATION
    // =========================================================
    if (!usuarioId) {
      console.error('❌ usuarioId no recibido')

      return NextResponse.json(
        { error: 'usuarioId faltante' },
        { status: 200 }
      )
    }

    // =========================================================
    // HANDLE SUBSCRIPTION EVENTS
    // =========================================================
    if (
      eventName === 'subscription_created' ||
      eventName === 'subscription_updated' ||
      eventName === 'subscription_payment_success' ||
      eventName === 'order_created'
    ) {
      console.log('🟢 Procesando evento de suscripción')

      // =====================================================
      // SEARCH EXISTING SUBSCRIPTION
      // =====================================================
      let suscripcion = null

      if (lemonSubscriptionId) {
        suscripcion = await prisma.suscripcion.findFirst({
          where: {
            lemonSubscriptionId,
          },
        })
      }

      // =====================================================
      // CREATE IF NOT EXISTS
      // =====================================================
      if (!suscripcion) {
        console.log('🆕 Creando nueva suscripción')

        suscripcion = await prisma.suscripcion.create({
          data: {
            usuarioId,
            plan,
            estado: 'active',

            lemonCustomerId,
            lemonSubscriptionId,
            lemonVariantId,

            fechaInicio: new Date(),
          },
        })

        console.log(
          '✅ Suscripción creada:',
          suscripcion.id
        )
      } else {
        // =================================================
        // UPDATE EXISTING
        // =================================================
        console.log('♻️ Actualizando suscripción existente')

        suscripcion = await prisma.suscripcion.update({
          where: {
            id: suscripcion.id,
          },
          data: {
            plan,
            estado: 'active',

            lemonCustomerId:
              lemonCustomerId ||
              suscripcion.lemonCustomerId,

            lemonVariantId:
              lemonVariantId ||
              suscripcion.lemonVariantId,
          },
        })

        console.log(
          '✅ Suscripción actualizada:',
          suscripcion.id
        )
      }

      // =====================================================
      // CREATE PAYMENT ONLY IF NOT EXISTS
      // =====================================================
      if (lemonOrderId) {
        const pagoExistente = await prisma.pago.findFirst({
          where: {
            lemonOrderId,
          },
        })

        if (!pagoExistente) {
          console.log('💰 Creando pago')

          const pago = await prisma.pago.create({
            data: {
              suscripcionId: suscripcion.id,

              monto: Number(total),

              moneda: currency,

              estado: 'completado',

              lemonOrderId,

              lemonPaymentId:
                lemonSubscriptionId ||
                lemonOrderId,
            },
          })

          console.log(
            '✅ Pago creado:',
            pago.id
          )
        } else {
          console.log(
            '⚠️ Pago ya existe, no se duplica'
          )
        }
      }
    }

    // =========================================================
    // CANCELLED
    // =========================================================
    if (eventName === 'subscription_cancelled') {
      console.log('🔴 Cancelando suscripción')

      if (lemonSubscriptionId) {
        await prisma.suscripcion.updateMany({
          where: {
            lemonSubscriptionId,
          },
          data: {
            estado: 'inactive',
            fechaFin: new Date(),
          },
        })

        console.log('✅ Suscripción cancelada')
      }
    }

    // =========================================================
    // SUCCESS
    // =========================================================
    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    console.error('❌ WEBHOOK ERROR')
    console.error(error)
    console.error('📛 MESSAGE:', error?.message)
    console.error('📛 CODE:', error?.code)

    return NextResponse.json(
      {
        success: false,
        error: error?.message,
      },
      { status: 500 }
    )
  }
}