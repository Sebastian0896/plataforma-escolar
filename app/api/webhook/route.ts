// app/api/webhooks/lemon-squeezy/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
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
    const variantName = event?.data?.attributes?.variant_name || 'docente_pro'

    // Si es order_created y hay userId, actualizar el usuario en PostgreSQL
    if (evento === 'order_created' && userId) {
      // Verificar si el usuario existe
      const usuario = await prisma.usuario.findUnique({
        where: { id: userId },
        select: { id: true, email: true, nombre: true },
      })

      if (!usuario) {
        console.error(`Usuario no encontrado: ${userId}`)
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }

      // Actualizar el plan del usuario
      // NOTA: Esto asume que tienes campos 'planActivo' y 'planAdquirido' en tu modelo Usuario
      // Si no existen, necesitas agregarlos al esquema Prisma
      await prisma.usuario.update({
        where: { id: userId },
        data: {
          planActivo: true,
          planAdquirido: variantName,
          // Si tu modelo no tiene estos campos, actualiza el campo 'plan' del centro
        },
      })

      console.log(`✅ Plan activado para usuario: ${userId} - Plan: ${variantName}`)
    }

    // También podrías actualizar el centro asociado al usuario
    if (evento === 'order_created' && userId) {
      const usuario = await prisma.usuario.findUnique({
        where: { id: userId },
        select: { centroId: true },
      })

      if (usuario?.centroId) {
        await prisma.centro.update({
          where: { id: usuario.centroId },
          data: {
            plan: variantName === 'docente_pro' ? 'docente_pro' : 'centro',
            maxDocentes: variantName === 'centro' ? 100 : 1,
            maxEstudiantes: variantName === 'centro' ? 1000 : 100,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error en webhook de Lemon Squeezy:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}