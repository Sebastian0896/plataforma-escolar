// app/api/cron/recordatorios/route.ts
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Notificacion from '@/lib/models/Notificacion'
import { prisma } from '@/lib/prisma'

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
  inicioSemana.setHours(0, 0, 0, 0)

  // 1. Recordatorios para mañana
  const planificacionesManana = await Planificacion.find({
    fechaProgramada: {
      $gte: new Date(manana.setHours(0, 0, 0, 0)),
      $lt: new Date(manana.setHours(23, 59, 59, 999)),
    },
    publicado: true,
  }).populate('creadoPor').lean()

  let recordatoriosCreados = 0

  for (const p of planificacionesManana) {
    const creador = p.creadoPor as any
    
    if (creador?._id) {
      await Notificacion.create({
        tipo: 'recordatorio',
        titulo: '⏰ Clase mañana',
        mensaje: `${p.tema} - ${p.grado?.replace('-', ' ')}`,
        destinatarioId: creador._id.toString(),
        grado: p.grado,
        planificacionId: p._id,
        centroId: p.centroId,
      })
      recordatoriosCreados++
    }
  }

  // 2. Pendientes: grados sin planificación esta semana
  // ✅ Usando Prisma para obtener docentes
  const docentes = await prisma.usuario.findMany({
    where: {
      rol: 'docente',
      activo: true,
    },
    select: {
      id: true,
      grados: true,
      grado: true,
      centroId: true,
    },
  })

  let pendientesCreados = 0

  for (const docente of docentes) {
    // Obtener grados del docente (array o string único)
    const gradosList = docente.grados || (docente.grado ? [docente.grado] : [])

    for (const grado of gradosList) {
      // ✅ Contar planificaciones en MongoDB
      const tienePlan = await Planificacion.countDocuments({
        centroId: docente.centroId,
        grado: grado,
        creadoPor: docente.id,
        createdAt: { $gte: inicioSemana },
      })

      if (tienePlan === 0) {
        await Notificacion.create({
          tipo: 'pendiente',
          titulo: '📋 Pendiente esta semana',
          mensaje: `No tenés planificación para ${grado?.replace('-', ' ')}`,
          destinatarioId: docente.id,
          grado: grado,
          centroId: docente.centroId,
        })
        pendientesCreados++
      }
    }
  }

  return NextResponse.json({
    success: true,
    recordatorios: recordatoriosCreados,
    pendientes: pendientesCreados,
    fecha: new Date().toISOString(),
  })
}