// app/api/docente/pendientes/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import PendienteIgnorado from '@/lib/models/PendienteIgnorado'

export const runtime = "nodejs"

function getNumeroSemana(fecha: Date): string {
  const año = fecha.getFullYear()
  const primeroEnero = new Date(año, 0, 1)
  const dias = Math.floor((fecha.getTime() - primeroEnero.getTime()) / (1000 * 60 * 60 * 24))
  const semana = Math.ceil((dias + primeroEnero.getDay() + 1) / 7)
  return `${año}-W${semana}`
}

export async function GET() {
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session || session.user?.role !== 'docente') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { grado } = await request.json()
    
    if (!grado) {
      return NextResponse.json({ error: 'Grado requerido' }, { status: 400 })
    }

    const semana = getNumeroSemana(new Date())

    await connectDB()

    // Buscar si ya existe
    const existe = await PendienteIgnorado.findOne({
      docenteId: session.user.id,
      grado,
      semana,
      centroId: session.user.centroId,
    })

    if (!existe) {
      await PendienteIgnorado.create({
        docenteId: session.user.id,
        grado,
        semana,
        centroId: session.user.centroId,
        createdAt: new Date(),
      })
    }

    return NextResponse.json({ 
      success: true, 
      ignored: !existe 
    })
    
  } catch (error) {
    console.error('Error al ignorar pendiente:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}