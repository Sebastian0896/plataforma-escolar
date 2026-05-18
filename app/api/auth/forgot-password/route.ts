// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'
import { sendResetPasswordEmail } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 })
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: { id: true, nombre: true, email: true }
    })

    // Siempre responder igual por seguridad
    const message = 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.'

    if (!usuario) {
      return NextResponse.json({ message })
    }

    // Eliminar tokens anteriores no usados
    await prisma.passwordResetToken.deleteMany({
      where: {
        email: usuario.email,
        OR: [
          { used: true },
          { expiresAt: { lt: new Date() } }
        ]
      }
    })

    // Generar token
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Guardar token
    await prisma.passwordResetToken.create({
      data: {
        token,
        email: usuario.email,
        expiresAt,
      }
    })

    // Enviar email (en background)
    sendResetPasswordEmail(usuario.email, token, usuario.nombre).catch(err => {
      console.error('Error sending email:', err)
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}