// app/api/docente/pagos/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const suscripcion = await prisma.suscripcion.findFirst({
      where: {
        usuarioId: session.user.id,
        estado: 'active',
      },
      orderBy: { fechaInicio: 'desc' },
    })

    if (!suscripcion) {
      return NextResponse.json({ pagos: [], suscripcion: null })
    }

    const pagos = await prisma.pago.findMany({
      where: { suscripcionId: suscripcion.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        monto: true,
        moneda: true,
        estado: true,
        createdAt: true,
        lemonOrderId: true,
      },
    })

    return NextResponse.json({
      suscripcion: {
        id: suscripcion.id,
        plan: suscripcion.plan,
        estado: suscripcion.estado,
        fechaInicio: suscripcion.fechaInicio,
        fechaFin: suscripcion.fechaFin,
      },
      pagos: pagos.map(p => ({
        id: p.id,
        monto: p.monto,
        moneda: p.moneda,
        estado: p.estado,
        fecha: p.createdAt,
        lemonOrderId: p.lemonOrderId,
      })),
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}