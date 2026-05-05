import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session || session.user?.role !== 'docente') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const planificaciones = await Planificacion.find({
    centroId: session.user.centroId,
    categoriaDocente: session.user.categoriaDocente,
    publicado: true,
  }).lean()

  // Extraer todos los recursos de todas las actividades
  const recursos: any[] = []

  planificaciones.forEach((p: any) => {
    p.momentos?.forEach((m: any) => {
      m.actividades?.forEach((a: any) => {
        a.recursos?.forEach((r: any) => {
          if (r.url) {
            recursos.push({
              ...r,
              planificacionTema: p.tema,
              actividadTitulo: a.titulo,
              createdAt: p.createdAt,
            })
          }
        })
      })
    })
  })

  return NextResponse.json(recursos)
}