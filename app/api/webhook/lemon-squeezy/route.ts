import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  // 1. Capturar el body como texto para la firma
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  if (!signature || !secret) {
    console.error('❌ Configuración de webhook incompleta')
    return NextResponse.json({ error: 'Configuración inválida' }, { status: 401 })
  }

  // 2. Verificar Firma HMAC SHA256
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')

  if (signature !== digest) {
    console.error('❌ Firma de Lemon Squeezy inválida')
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
  }

  try {
    const payload = JSON.parse(rawBody)
    const eventName = payload.meta?.event_name
    const attributes = payload.data?.attributes || {}
    const customData = payload.meta?.custom_data || {}

    // 3. Extracción forzada de IDs (Lemon Squeezy varía la estructura según el evento)
    const userId = customData.user_id || customData.usuarioId || customData.userId
    const subscriptionId = attributes.subscription_id?.toString() || payload.data?.id?.toString()
    const orderId = payload.data?.id?.toString() // ID de la orden o transacción
    
    console.log(`🔔 Evento Recibido: ${eventName} | User: ${userId} | SubID: ${subscriptionId}`)

    // Si no hay userId, no podemos vincularlo a un registro en Postgres
    if (!userId) {
      console.error('❌ Error: No se encontró userId en custom_data. Revisa tu link de checkout.')
      return NextResponse.json({ error: 'No userId' }, { status: 200 }) // Respondemos 200 para que Lemon no reintente infinitamente
    }

    // 4. Lógica de Negocio con Transacciones para asegurar persistencia
    return await prisma.$transaction(async (tx) => {
      
      // A. Gestión de Suscripción
      if (eventName.startsWith('subscription_')) {
        const subStatus = attributes.status === 'active' ? 'active' : 'inactive'
        
        const suscripcion = await tx.suscripcion.upsert({
          where: { lemonSubscriptionId: subscriptionId },
          update: {
            estado: subStatus,
            plan: customData.plan || 'premium',
            lemonVariantId: attributes.variant_id?.toString(),
            fechaFin: eventName === 'subscription_cancelled' ? new Date() : null,
          },
          create: {
            // Generar ID único si tu esquema no usa autoincrement o uuid por defecto
            usuarioId: userId,
            plan: customData.plan || 'premium',
            estado: 'active',
            lemonCustomerId: attributes.customer_id?.toString(),
            lemonSubscriptionId: subscriptionId,
            lemonVariantId: attributes.variant_id?.toString(),
            fechaInicio: new Date(),
          },
        })

        console.log(`✅ Suscripción ${suscripcion.id} procesada`)

        // B. Gestión de Pagos (Solo si el evento es de pago exitoso)
        if (eventName === 'subscription_payment_success' || eventName === 'order_created') {
          const total = Number(attributes.total || 0) / 100
          
          const pago = await tx.pago.upsert({
            where: { lemonOrderId: orderId },
            update: { estado: 'completado' },
            create: {
              suscripcionId: suscripcion.id,
              monto: total,
              moneda: attributes.currency || 'USD',
              estado: 'completado',
              lemonOrderId: orderId,
              lemonPaymentId: attributes.order_number?.toString(),
            }
          })
          console.log(`✅ Pago ${pago.id} registrado`)
        }
      }

      return NextResponse.json({ success: true })
    })

  } catch (error: any) {
    console.error('❌ Error Crítico en Postgres:', error)
    // Devolvemos 500 para que Lemon Squeezy reintente el envío más tarde
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}