import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Competencia from '@/lib/models/Competencia'

export const runtime = "nodejs"

export async function GET() {
  await connectDB()
  const competencias = await Competencia.find({}).sort({ orden: 1 }).lean()
  return NextResponse.json(competencias)
}