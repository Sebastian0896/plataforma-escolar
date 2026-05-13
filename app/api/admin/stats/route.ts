import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
   /*  console.log("Mi sesion superAdmin: ", session) */
  if (session?.user?.role !== 'superadmin') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  await connectDB()

  const totalCentros = await Centro.countDocuments({ activo: true })
  const totalUsuarios = await Usuario.countDocuments({ activo: true })
  const totalPlanificaciones = await Planificacion.countDocuments({ publicado: true })

  // Por centro
  const centros = await Centro.find({ activo: true }).lean()
  const stats = await Promise.all(
    centros.map(async (c: any) => {
      const usuarios = await Usuario.countDocuments({ centroId: c._id, activo: true })
      const planificaciones = await Planificacion.countDocuments({ centroId: c._id, publicado: true })
      return {
        _id: c._id,
        nombre: c.nombre,
        codigo: c.codigo,
        usuarios,
        planificaciones,
      }
    })
  )

  // Por género
  const porGenero = await Usuario.aggregate([
    { $match: { activo: true } },
    { $group: { _id: '$genero', total: { $sum: 1 } } },
  ])

  // Por rol
  const porRol = await Usuario.aggregate([
    { $match: { activo: true } },
    { $group: { _id: '$rol', total: { $sum: 1 } } },
  ])

  return NextResponse.json({
    totalCentros,
    totalUsuarios,
    totalPlanificaciones,
    stats,
    porGenero,
    porRol,
  })
}