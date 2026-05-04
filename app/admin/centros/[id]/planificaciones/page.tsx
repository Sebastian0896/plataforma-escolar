import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Planificacion from '@/lib/models/Planificacion'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

type Params = Promise<{ id: string }>

export default async function PlanificacionesPorCentroPage({ params, searchParams }: { params: Params; searchParams: Promise<{ page?: string }> }) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') redirect('/dashboard')

  const { id } = await params
  const sp = await searchParams
  const page = parseInt(sp.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  await connectDB()
  const centro = await Centro.findById(id).lean()
  const [planificaciones, total] = await Promise.all([
    Planificacion.find({ centroId: id, publicado: true }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Planificacion.countDocuments({ centroId: id, publicado: true }),
  ])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/admin/centros/${id}`} className="text-gray-500 hover:text-blue-600">← {centro?.nombre}</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Planificaciones</h1>
      </div>
      <p className="text-sm text-gray-500 mb-4">{total} planificaciones</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {planificaciones.map((p: any) => (
          <div key={p._id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-sm mb-2">{p.tema}</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <span>{p.grado?.replace('-', ' ')}</span>
              <span>·</span>
              <span>{p.materia}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('es-DO')}</span>
              <Link href={`/admin/planificaciones/editar/${p.materia}/${p.slug}`} className="text-xs text-blue-600 hover:underline">Editar →</Link>
            </div>
          </div>
        ))}
      </div>

      <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
    </div>
  )
}