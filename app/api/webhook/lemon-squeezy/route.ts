import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  // 1. Validar Firma
  if (!signature || !secret) {
    return NextResponse.json({ error: 'Configuración incompleta' }, { status: 401 })
  }

  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')

  if (signature !== digest) {
    console.error('❌ Firma inválida')
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
  }

  try {
    const payload = JSON.parse(rawBody)
    const eventName = payload.meta?.event_name
    const attributes = payload.data?.attributes || {}
    const customData = payload.meta?.custom_data || {}

    // Extraer el ID que enviamos en el checkout
    const userId = customData.usuarioId
    const subscriptionId = attributes.subscription_id?.toString() || payload.data?.id?.toString()

    console.log(`🔔 Recibido: ${eventName} para Usuario: ${userId}`)

    if (!userId || !subscriptionId) {
      return NextResponse.json({ message: 'Datos incompletos, ignorando' }, { status: 200 })
    }

    // 2. Verificar que el usuario existe en Postgres (Evita error de Foreign Key)
    const user = await prisma.usuario.findUnique({ where: { id: userId } })
    if (!user) {
      console.error(`❌ Usuario ${userId} no existe en la base de datos de producción.`)
      return NextResponse.json({ error: 'User not found' }, { status: 200 })
    }

    // 3. Procesar datos en una transacción
    await prisma.$transaction(async (tx) => {
      if (eventName.startsWith('subscription_')) {
        const status = attributes.status === 'active' ? 'active' : 'inactive'

        const sub = await tx.suscripcion.upsert({
          where: { lemonSubscriptionId: subscriptionId },
          update: {
            estado: status,
            plan: customData.plan || 'premium',
          },
          create: {
            usuarioId: userId,
            plan: customData.plan || 'premium',
            estado: status,
            lemonSubscriptionId: subscriptionId,
            lemonCustomerId: attributes.customer_id?.toString(),
            fechaInicio: new Date(),
          },
        })

        // Registrar pago si corresponde
        if (eventName === 'subscription_payment_success') {
          await tx.pago.create({
            data: {
              suscripcionId: sub.id,
              monto: Number(attributes.total) / 100,
              moneda: attributes.currency || 'USD',
              estado: 'completado',
              lemonOrderId: payload.data?.id?.toString(),
            },
          })
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Error Webhook:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}