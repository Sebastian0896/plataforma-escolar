// app/api/docente/suscripcion/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getSuscripcionActiva, getPlanActivo, canUseFeature } from '@/lib/authz'

export async function GET(req: NextRequest) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  
  try {
    const suscripcion = await getSuscripcionActiva(session.user.id)
    const plan = await getPlanActivo(session.user.id)
    const puedeUsarDiario = await canUseFeature('diario')
    const puedeUsarAsistencia = await canUseFeature('asistencia')
    
    return NextResponse.json({
      suscripcion: suscripcion || null,
      plan,
      features: {
        diario: puedeUsarDiario,
        asistencia: puedeUsarAsistencia,
      }
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}