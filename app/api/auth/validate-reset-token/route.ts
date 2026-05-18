// app/api/auth/validate-reset-token/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token requerido' }, { status: 400 })
  }

  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      token,
      used: false,
      expiresAt: { gt: new Date() }
    }
  })

  if (!resetToken) {
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 })
  }

  return NextResponse.json({ valid: true })
}