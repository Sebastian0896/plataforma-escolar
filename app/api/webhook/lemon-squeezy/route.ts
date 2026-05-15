import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  // 1. Obtener el cuerpo bruto para validar la firma
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  if (!signature || !secret) {
    console.error('❌ Configuración de webhook incompleta (Secret o Signature faltante)')
    return NextResponse.json({ error: 'Configuración inválida' }, { status: 401 })
  }

  // 2. Validar la firma HMAC SHA256
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

    // 3. Extracción de datos (Compatibilidad con varios nombres de campo)
    const userId = customData.user_id || customData.usuarioId || customData.userId
    const subscriptionId = attributes.subscription_id?.toString() || payload.data?.id?.toString()
    const orderId = payload.data?.id?.toString()
    
    console.log(`🔔 Evento: ${eventName} | User: ${userId} | SubID: ${subscriptionId}`)

    // 4. Validación de Usuario (Crítico en PostgreSQL)
    if (!userId) {
      console.error('❌ Error: No hay userId en los metadatos del webhook')
      return NextResponse.json({ error: 'Falta userId' }, { status: 200 })
    }

    const usuarioExiste = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!usuarioExiste) {
      console.error(`❌ Error: El usuario con ID ${userId} no existe en la base de datos PostgreSQL.`)
      // Respondemos 200 para que Lemon Squeezy no siga reintentando un error que no se arreglará solo
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 200 })
    }

    // 5. Procesamiento de la data
    return await prisma.$transaction(async (tx) => {
      
      // GESTIÓN DE SUSCRIPCIÓN
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
            usuarioId: userId,
            plan: customData.plan || 'premium',
            estado: 'active',
            lemonCustomerId: attributes.customer_id?.toString(),
            lemonSubscriptionId: subscriptionId,
            lemonVariantId: attributes.variant_id?.toString(),
            fechaInicio: new Date(),
          },
        })

        console.log(`✅ Suscripción ${suscripcion.id} procesada correctamente`)

        // GESTIÓN DE PAGOS
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
          console.log(`✅ Pago ${pago.id} registrado correctamente`)
        }
      }

      return NextResponse.json({ success: true })
    })

  } catch (error: any) {
    console.error('❌ Error procesando el Webhook:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}