// app/admin/centros/[id]/planificaciones/page.tsx

import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma' // Importamos Prisma
import { connectDB } from '@/lib/db' // Importamos conexión de Mongoose
import Planificacion from '@/lib/models/Planificacion' // Modelo Mongoose
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CalendarDays, FileText, Pencil } from 'lucide-react'

type Params = Promise<{ id: string }>

export default async function PlanificacionesPorCentroPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Promise<{ page?: string }>
}) {
  const session = await auth()

  if (session?.user?.role !== 'superadmin') {
    redirect('/dashboard')
  }

  const { id } = await params
  const sp = await searchParams

  const page = parseInt(sp.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  // 1. Conectar Mongoose para la consulta de planificaciones
  await connectDB()

  // 2. Obtener Centro con Prisma
  const centro = await prisma.centro.findUnique({
    where: { id }
  })

  if (!centro) notFound()

  // 3. Obtener Planificaciones y Total con Mongoose
  // Usamos una consulta que no falle si el id es un CUID (Prisma ID)
  const [planificaciones, total] = await Promise.all([
    Planificacion.find({
      centroId: id,
      publicado: true,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

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
          href={`/admin/centros/${id}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {centro.nombre}
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Planificaciones
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {total} planificaciones publicadas
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
            <FileText className="w-3.5 h-3.5 mr-1" />
            Centro educativo
          </Badge>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
        {planificaciones.map((p: any) => (
          <Card
            key={p._id.toString()}
            className="group transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-slate-200 dark:border-slate-800"
          >
            <CardContent className="p-5 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <Badge variant="outline" className="rounded-full text-xs">
                    {p.grado?.replace('-', ' ')}
                  </Badge>

                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(p.createdAt).toLocaleDateString('es-DO')}
                  </span>
                </div>

                <h3 className="font-semibold leading-snug text-slate-900 dark:text-white line-clamp-2">
                  {p.tema}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {p.materia}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Publicada
                </div>

                <Link
                  href={`/admin/planificaciones/editar/${p.materia}/${p.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Editar
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {planificaciones.length === 0 && (
        <Card className="border-dashed border-slate-300 dark:border-slate-700">
          <CardContent className="py-14 text-center">
            <div className="space-y-3">
              <div className="text-4xl">📚</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                No hay planificaciones
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Este centro todavía no tiene planificaciones publicadas.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {total > limit && (
        <div className="pt-2">
          <PaginacionServer
            totalPaginas={Math.ceil(total / limit)}
            paginaActual={page}
          />
        </div>
      )}
    </div>
  )
}