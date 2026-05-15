import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-signature')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

  // 1. Verificación de Firma (Con log de fallo)
  const hmac = crypto.createHmac('sha256', secret!)
  const digest = hmac.update(rawBody).digest('hex')

  if (signature !== digest) {
    console.error('❌ ERROR: Firma de Lemon Squeezy no coincide. Revisa LEMON_SQUEEZY_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
  }

  try {
    const payload = JSON.parse(rawBody)
    const eventName = payload.meta?.event_name
    const customData = payload.meta?.custom_data || {}
    const attributes = payload.data?.attributes || {}

    // Limpieza de datos
    const userId = String(customData.usuarioId || '').trim()
    const lemonId = String(payload.data?.id || '')

    console.log(`📡 EVENTO RECIBIDO: ${eventName}`)
    console.log(`👤 ID DE USUARIO RECIBIDO: "${userId}"`)
    console.log(`🆔 ID DE LEMON RECIBIDO: "${lemonId}"`)

    if (!userId || userId === 'undefined') {
      console.error('⚠️ El evento no trae un usuarioId válido.')
      return NextResponse.json({ message: 'Sin userId' }, { status: 200 })
    }

    // OPERACIÓN DE BASE DE DATOS
    // Si el evento es de suscripción o de orden, intentamos asegurar que la suscripción exista
    if (eventName.includes('subscription') || eventName.includes('order')) {
      
      const resultado = await prisma.suscripcion.upsert({
        where: { lemonSubscriptionId: lemonId },
        update: {
          estado: attributes.status === 'active' ? 'active' : 'inactive',
          plan: customData.plan || 'premium',
        },
        create: {
          usuarioId: userId,
          plan: customData.plan || 'premium',
          estado: 'active',
          lemonSubscriptionId: lemonId,
          lemonCustomerId: attributes.customer_id?.toString(),
          fechaInicio: new Date(),
        },
      })

      console.log('✅ OPERACIÓN EXITOSA EN PRISMA. ID:', resultado.id)
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    // ESTE LOG ES EL MÁS IMPORTANTE
    console.error('❌ FALLO CRÍTICO EN LA BASE DE DATOS:')
    console.error('Mensaje:', error.message)
    console.error('Código de error:', error.code) // P2002, P2003, etc.
    
    return NextResponse.json({ 
      error: 'Error interno', 
      prismaMessage: error.message 
    }, { status: 200 })
  }
}