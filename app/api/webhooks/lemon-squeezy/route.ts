// app/api/webhooks/lemon-squeezy/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  console.log('🔵 Webhook recibido en:', new Date().toISOString())
  
  try {
    const body = await req.json()
    const eventName = body?.meta?.event_name
    const customData = body?.meta?.custom_data
    const userId = customData?.user_id
    const variantId = body?.data?.attributes?.variant_id
    
    console.log('Evento:', eventName)
    console.log('UserId:', userId)
    console.log('VariantId:', variantId)

    if (eventName === 'order_created' && userId) {
      // Determinar plan
      let plan = 'gratis'
      if (variantId === process.env.LEMON_VARIANT_DOCENTE_PRO_MENSUAL || 
          variantId === process.env.LEMON_VARIANT_DOCENTE_PRO_ANUAL) {
        plan = 'docente_pro'
      }

      // Actualizar usuario
      await prisma.usuario.update({
        where: { id: userId },
        data: { plan }
      })

      console.log(`✅ Usuario ${userId} actualizado a plan ${plan}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}