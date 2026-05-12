import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { id } = await params

  const evaluaciones = await prisma.evaluacion.findMany({
  where: { estudianteId: id },
  include: { periodo: true, competencia: true },
})

  return NextResponse.json({ evaluaciones })
}