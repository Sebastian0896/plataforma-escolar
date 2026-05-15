import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🟢 TEST DB')

    const usuario = await prisma.usuario.create({
      data: {
        email: `test_${Date.now()}@test.com`,
        nombre: 'TEST',
      },
    })

    console.log('✅ INSERTADO:', usuario.id)

    return NextResponse.json({
      ok: true,
      usuario,
    })
  } catch (error) {
    console.error('❌ ERROR DB:', error)

    return NextResponse.json({
      ok: false,
      error,
    })
  }
}