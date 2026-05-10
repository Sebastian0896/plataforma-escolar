// app/admin/centros/[id]/page.tsx

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Planificacion from '@/lib/models/Planificacion'
import Link from 'next/link'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import {
  Badge,
} from '@/components/ui/badge'

import {
  ArrowLeft,
  Users,
  FileText,
  ChevronRight,
} from 'lucide-react'

type Params = Promise<{ id: string }>

export default async function CentroDetailPage({
  params,
}: {
  params: Params
}) {
  const session = await auth()

  if (
    session?.user?.role !== 'superadmin' &&
    session?.user?.role !== 'admin' &&
    session?.user?.role !== 'admin_centro'
  ) {
    redirect('/dashboard')
  }

  const { id } = await params

  await connectDB()

  const centro = await Centro.findById(id).lean()

  const [totalUsuarios, totalPlanificaciones] = await Promise.all([
    Usuario.countDocuments({
      centroId: id,
      activo: true,
    }),

    Planificacion.countDocuments({
      centroId: id,
      publicado: true,
    }),
  ])

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {centro?.nombre}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Panel administrativo del centro educativo
            </p>
          </div>

          <Badge
            variant="secondary"
            className="w-fit rounded-full px-3 py-1 text-xs"
          >
            🏫 Centro educativo
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
        {/* Usuarios */}
        <Link href={`/admin/centros/${id}/usuarios`}>
          <Card className="group h-full border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Users className="w-7 h-7 text-slate-700 dark:text-slate-300" />
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {totalUsuarios}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Usuarios activos
                  </p>
                </div>
              </div>

              <div className="pt-5">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Ver usuarios
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Planificaciones */}
        <Link href={`/admin/centros/${id}/planificaciones`}>
          <Card className="group h-full border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-slate-700 dark:text-slate-300" />
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {totalPlanificaciones}
                  </p>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Planificaciones publicadas
                  </p>
                </div>
              </div>

              <div className="pt-5">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Ver planificaciones
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}