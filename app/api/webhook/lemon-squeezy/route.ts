// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    console.log('==============================')
    console.log('🔵 WEBHOOK RECIBIDO')
    console.log('==============================')

    // ======================================================
    // RAW BODY
    // ======================================================

    const rawBody = await req.text()

    console.log('📦 RAW BODY:')
    console.log(rawBody)

    // ======================================================
    // SIGNATURE
    // ======================================================

    const signature = req.headers.get('x-signature')
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''

    console.log('🔐 Signature recibida:', signature)
    console.log('🔐 Secret existe:', !!secret)

    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(rawBody).digest('hex')

    console.log('🔐 Digest generado:', digest)

    if (signature !== digest) {
      console.error('❌ FIRMA INVÁLIDA')

      return NextResponse.json(
        {
          ok: false,
          error: 'Firma inválida',
        },
        { status: 401 }
      )
    }

    console.log('✅ FIRMA VÁLIDA')

    // ======================================================
    // PARSE PAYLOAD
    // ======================================================

    const payload = JSON.parse(rawBody)

    console.log('📦 PAYLOAD COMPLETO:')
    console.log(JSON.stringify(payload, null, 2))

    // ======================================================
    // EVENTO
    // ======================================================

    const eventName = payload.meta?.event_name

    console.log('📡 EVENTO:', eventName)

    // ======================================================
    // CUSTOM DATA
    // ======================================================

    const customData = payload.meta?.custom_data || {}

    console.log('📦 CUSTOM DATA:')
    console.log(customData)

    // ======================================================
    // ATTRIBUTES
    // ======================================================

    const attributes = payload.data?.attributes || {}

    console.log('📦 ATTRIBUTES:')
    console.log(attributes)

    // ======================================================
    // DATOS IMPORTANTES
    // ======================================================

    const userId = customData.usuarioId?.toString()?.trim()

    const plan = customData.plan?.toString()?.trim()

    const customerId = attributes.customer_id?.toString()

    const variantId =
      attributes.variant_id?.toString() ||
      attributes.first_order_item?.variant_id?.toString()

    const subscriptionId =
      attributes.subscription_id?.toString() ||
      payload.data?.id?.toString()

    const orderId =
      attributes.order_id?.toString() ||
      payload.data?.id?.toString()

    const total =
      Number(attributes.total_usd || attributes.total || 0)

    console.log('==============================')
    console.log('📌 DATOS EXTRAIDOS')
    console.log('==============================')

    console.log('👤 userId:', userId)
    console.log('📦 plan:', plan)
    console.log('🧾 customerId:', customerId)
    console.log('🪪 variantId:', variantId)
    console.log('🔁 subscriptionId:', subscriptionId)
    console.log('🧾 orderId:', orderId)
    console.log('💰 total:', total)

    // ======================================================
    // VALIDACIONES
    // ======================================================

    if (!userId) {
      console.error('❌ userId vacío')

      return NextResponse.json({
        ok: false,
        error: 'userId vacío',
      })
    }

    if (!plan) {
      console.error('❌ plan vacío')

      return NextResponse.json({
        ok: false,
        error: 'plan vacío',
      })
    }

    // ======================================================
    // BUSCAR USUARIO
    // ======================================================

    console.log('🔎 Buscando usuario...')

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: userId,
      },
    })

    console.log('👤 Usuario encontrado:')
    console.log(usuario)

    if (!usuario) {
      console.error('❌ Usuario no encontrado')

      return NextResponse.json({
        ok: false,
        error: 'Usuario no encontrado',
      })
    }

    // ======================================================
    // CREAR / ACTUALIZAR SUSCRIPCIÓN
    // ======================================================

    let suscripcion = null

    if (subscriptionId) {
      console.log('🔄 Intentando UPSERT de suscripción...')

      suscripcion = await prisma.suscripcion.upsert({
        where: {
          lemonSubscriptionId: subscriptionId,
        },

        update: {
          plan,
          estado: 'active',
          lemonCustomerId: customerId,
          lemonVariantId: variantId,
        },

        create: {
          usuarioId: userId,
          plan,
          estado: 'active',
          lemonSubscriptionId: subscriptionId,
          lemonCustomerId: customerId,
          lemonVariantId: variantId,
          fechaInicio: new Date(),
        },
      })

      console.log('✅ SUSCRIPCIÓN GUARDADA:')
      console.log(suscripcion)
    } else {
      console.log('⚠️ subscriptionId vacío, no se creó suscripción')
    }

    // ======================================================
    // CREAR PAGO
    // ======================================================

    if (
      suscripcion &&
      (
        eventName === 'subscription_payment_success' ||
        eventName === 'order_created'
      )
    ) {
      console.log('💳 Creando pago...')

      const pago = await prisma.pago.create({
        data: {
          suscripcionId: suscripcion.id,
          monto: total,
          moneda: attributes.currency || 'USD',
          estado: 'completado',
          lemonOrderId: orderId,
          lemonPaymentId: payload.data?.id?.toString(),
        },
      })

      console.log('✅ PAGO CREADO:')
      console.log(pago)
    }

    console.log('==============================')
    console.log('✅ WEBHOOK FINALIZADO')
    console.log('==============================')

    return NextResponse.json({
      ok: true,
      event: eventName,
    })
  } catch (error: any) {
    console.error('==============================')
    console.error('❌ ERROR CRÍTICO WEBHOOK')
    console.error('==============================')

    console.error(error)

    console.error('📌 MESSAGE:')
    console.error(error?.message)

    console.error('📌 STACK:')
    console.error(error?.stack)

    console.error('📌 JSON ERROR:')
    console.error(JSON.stringify(error, null, 2))

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || 'Error interno',
        stack: error?.stack || null,
      },
      { status: 500 }
    )
  }
}