import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Notificacion from '@/lib/models/Notificacion'
import Usuario from '@/lib/models/Usuario'
import mongoose from 'mongoose'

export const runtime = "nodejs"

export async function GET(request: Request) {
  // Proteger con un token secreto
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const hoy = new Date()
  const manana = new Date(hoy)
  manana.setDate(hoy.getDate() + 1)
  const inicioSemana = new Date(hoy)
  inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1)

  // 1. Recordatorios para mañana
  const planificacionesManana = await Planificacion.find({
    fechaProgramada: {
      $gte: new Date(manana.setHours(0, 0, 0, 0)),
      $lt: new Date(manana.setHours(23, 59, 59, 999)),
    },
    publicado: true,
  }).populate('creadoPor').lean()

  for (const p of planificacionesManana) {
    if (p.creadoPor) {
      await Notificacion.create({
        tipo: 'recordatorio',
        titulo: '⏰ Clase mañana',
        mensaje: `${p.tema} - ${p.grado?.replace('-', ' ')}`,
        destinatarioId: (p.creadoPor as any)._id,
        grado: p.grado,
        planificacionId: p._id,
        centroId: p.centroId,
      })
    }
  }

  // 2. Pendientes: grados sin planificación esta semana
  const docentes = await Usuario.find({ rol: 'docente', activo: true }).lean()

  for (const docente of docentes) {
    const grados = docente.grados || (docente.grado ? [docente.grado] : [])

    for (const grado of grados) {
      const tienePlan = await Planificacion.countDocuments({
        centroId: docente.centroId,
        grado,
        creadoPor: docente._id,
        createdAt: { $gte: inicioSemana },
      })

      if (tienePlan === 0) {
        await Notificacion.create({
          tipo: 'pendiente',
          titulo: '📋 Pendiente esta semana',
          mensaje: `No tenés planificación para ${grado?.replace('-', ' ')}`,
          destinatarioId: docente._id,
          grado,
          centroId: docente.centroId,
        })
      }
    }
  }

  return NextResponse.json({
    recordatorios: planificacionesManana.length,
    pendientes: docentes.length,
  })
}