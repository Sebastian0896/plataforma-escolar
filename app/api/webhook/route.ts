import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import crypto from 'crypto'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('x-signature')

  // Verificar firma (opcional por ahora)
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || ''
  if (secret) {
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')
    if (signature !== digest) {
      return NextResponse.json({ error: 'Firma inválida' }, { status: 401 })
    }
  }

  const event = JSON.parse(body)
  const evento = event?.meta?.event_name
  const customData = event?.data?.attributes?.custom_data
  const userId = customData?.user_id

  if (evento === 'order_created' && userId) {
    await connectDB()
    await Usuario.findByIdAndUpdate(userId, {
      planActivo: true,
      planAdquirido: event?.data?.attributes?.variant_name || 'docente_pro',
    })
  }

  return NextResponse.json({ received: true })
}