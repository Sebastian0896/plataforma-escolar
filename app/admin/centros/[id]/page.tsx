// app/admin/centros/[id]/page.tsx

import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { connectDB } from '@/lib/db' // Importamos tu conexión de Mongoose
import Planificacion from '@/lib/models/Planificacion' // Importamos el modelo de Mongoose
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, FileText, ChevronRight } from 'lucide-react'

type Params = Promise<{ id: string }>

export default async function CentroDetailPage({
  params,
}: {
  params: Params
}) {
  const session = await auth()

  const rolesPermitidos = ['superadmin', 'admin', 'admin_centro']
  if (!session || !rolesPermitidos.includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  const { id } = await params

  // 1. Conectar a MongoDB para Mongoose
  await connectDB()

  // 2. Obtener datos del centro con Prisma
  const centro = await prisma.centro.findUnique({
    where: { id }
  })

  if (!centro) notFound()

  // 3. Obtener conteos: Usuario (Prisma) y Planificacion (Mongoose)
  const [totalUsuarios, totalPlanificaciones] = await Promise.all([
    prisma.usuario.count({
      where: {
        centroId: id,
        activo: true,
      },
    }),

    // Mantenemos Mongoose para las planificaciones
    Planificacion.countDocuments({
      centroId: id,
      publicado: true,
    }),
  ])

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {centro.nombre}
            </h1>
            <p className="text-sm text-slate-500">
              Panel administrativo del centro educativo
            </p>
          </div>
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
            🏫 Centro educativo
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        {/* Usuarios - Link a la ruta de usuarios */}
        <Link href={`/admin/centros/${id}/usuarios`}>
          <Card className="group h-full transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Users className="w-7 h-7 text-slate-700" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalUsuarios}</p>
                  <p className="text-sm text-slate-500">Usuarios activos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Planificaciones - Link a la ruta de planificaciones */}
        <Link href={`/admin/centros/${id}/planificaciones`}>
          <Card className="group h-full transition-all hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-slate-700" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{totalPlanificaciones}</p>
                  <p className="text-sm text-slate-500">Planificaciones publicadas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}