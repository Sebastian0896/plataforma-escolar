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

    // ======================================================
    // VERIFY SIGNATURE
    // ======================================================

    const signature = req.headers.get('x-signature')
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''

    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(rawBody).digest('hex')

    console.log('🔐 Signature:', signature)
    console.log('🔐 Digest:', digest)

    if (signature !== digest) {
      console.error('❌ Firma inválida')

      return NextResponse.json(
        {
          ok: false,
          error: 'Firma inválida',
        },
        { status: 401 }
      )
    }

    console.log('✅ Firma válida')

    // ======================================================
    // PARSE PAYLOAD
    // ======================================================

    const payload = JSON.parse(rawBody)

    console.log('📦 PAYLOAD:')
    console.log(JSON.stringify(payload, null, 2))

    const eventName = payload.meta?.event_name

    console.log('📡 EVENTO:', eventName)

    // ======================================================
    // DATA
    // ======================================================

    const customData = payload.meta?.custom_data || {}
    const attributes = payload.data?.attributes || {}

    const userId = customData.usuarioId?.toString()?.trim()

    const plan = customData.plan?.toString()?.trim()

    const customerId = attributes.customer_id?.toString()

    const variantId =
      attributes.variant_id?.toString() ||
      attributes.first_order_item?.variant_id?.toString() ||
      null

    const subscriptionId =
      attributes.subscription_id?.toString() ||
      payload.data?.id?.toString()

    const orderId =
      attributes.order_id?.toString() ||
      payload.data?.id?.toString()

    const total = Number(
      attributes.total_usd ||
      attributes.total ||
      0
    )

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
    // VALIDAR USER
    // ======================================================

    if (!userId) {
      console.error('❌ userId vacío')

      return NextResponse.json({
        ok: false,
        error: 'userId vacío',
      })
    }

    // ======================================================
    // VALIDAR USER EXISTS
    // ======================================================

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: userId,
      },
    })

    if (!usuario) {
      console.error('❌ Usuario no encontrado')

      return NextResponse.json({
        ok: false,
        error: 'Usuario no encontrado',
      })
    }

    console.log('✅ Usuario encontrado')

    // ======================================================
    // EVENT: subscription_created
    // ======================================================

    if (eventName === 'subscription_created') {
      console.log('🟢 Procesando subscription_created')

      if (!subscriptionId) {
        console.error('❌ subscriptionId vacío')

        return NextResponse.json({
          ok: false,
          error: 'subscriptionId vacío',
        })
      }

      const suscripcion = await prisma.suscripcion.upsert({
        where: {
          lemonSubscriptionId: subscriptionId,
        },

        update: {
          estado: 'active',
          lemonCustomerId: customerId,
          lemonVariantId: variantId,
        },

        create: {
          usuarioId: userId,
          plan: plan || 'pendiente',
          estado: 'active',

          lemonSubscriptionId: subscriptionId,
          lemonCustomerId: customerId,
          lemonVariantId: variantId,

          fechaInicio: new Date(),
        },
      })

      console.log('✅ SUSCRIPCIÓN BASE CREADA')
      console.log(suscripcion)
    }

    // ======================================================
    // EVENT: subscription_payment_success
    // ======================================================

    if (
      eventName === 'subscription_payment_success' ||
      eventName === 'order_created'
    ) {
      console.log('🟢 Procesando pago')

      // ==================================================
      // BUSCAR SUSCRIPCIÓN
      // ==================================================

      let suscripcion = null

      if (subscriptionId) {
        suscripcion = await prisma.suscripcion.findUnique({
          where: {
            lemonSubscriptionId: subscriptionId,
          },
        })
      }

      // ==================================================
      // SI NO EXISTE → CREARLA
      // ==================================================

      if (!suscripcion) {
        console.log('⚠️ No existe suscripción → creando automática')

        suscripcion = await prisma.suscripcion.create({
          data: {
            usuarioId: userId,

            plan: plan || 'pendiente',

            estado: 'active',

            lemonSubscriptionId: subscriptionId || null,
            lemonCustomerId: customerId || null,
            lemonVariantId: variantId || null,

            fechaInicio: new Date(),
          },
        })

        console.log('✅ Suscripción automática creada')
      }

      // ==================================================
      // ACTUALIZAR SUSCRIPCIÓN
      // ==================================================

      suscripcion = await prisma.suscripcion.update({
        where: {
          id: suscripcion.id,
        },

        data: {
          estado: 'active',
          plan: plan || suscripcion.plan,

          lemonCustomerId:
            customerId || suscripcion.lemonCustomerId,

          lemonVariantId:
            variantId || suscripcion.lemonVariantId,
        },
      })

      console.log('✅ Suscripción actualizada')

      // ==================================================
      // CREAR PAGO
      // ==================================================

      const pago = await prisma.pago.create({
        data: {
          suscripcionId: suscripcion.id,

          monto: total,

          moneda: attributes.currency || 'USD',

          estado: 'completado',

          lemonOrderId: orderId || null,

          lemonPaymentId:
            payload.data?.id?.toString() || null,
        },
      })

      console.log('✅ PAGO CREADO')
      console.log(pago)
    }

    // ======================================================
    // EVENT: subscription_cancelled
    // ======================================================

    if (eventName === 'subscription_cancelled') {
      console.log('🟢 Procesando cancelación')

      if (subscriptionId) {
        await prisma.suscripcion.updateMany({
          where: {
            lemonSubscriptionId: subscriptionId,
          },

          data: {
            estado: 'inactive',
            fechaFin: new Date(),
          },
        })

        console.log('✅ Suscripción cancelada')
      }
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
    console.error('❌ ERROR WEBHOOK')
    console.error('==============================')

    console.error(error)

    console.error('📌 MESSAGE:')
    console.error(error?.message)

    console.error('📌 STACK:')
    console.error(error?.stack)

    return NextResponse.json(
      {
        ok: false,
        error: error?.message || 'Error interno',
      },
      { status: 500 }
    )
  }
}