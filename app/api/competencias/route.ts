import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs"

export async function GET() {
  const competencias = await prisma.competencia.findMany({
    orderBy: { orden: 'asc' },
  })
  return NextResponse.json(competencias)
}