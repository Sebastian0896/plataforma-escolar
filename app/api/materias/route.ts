import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Materia from '@/lib/models/Materia'

export const runtime = "nodejs"

export async function GET() {
  await connectDB()
  const materias = await Materia.find({ activo: true }).sort({ nombre: 1 }).lean()
  return NextResponse.json(materias)
}