import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Planificacion from '@/lib/models/Planificacion'
import Link from 'next/link'

type Params = Promise<{ id: string }>

export default async function PlanificacionesPorCentroPage({ params }: { params: Params }) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') redirect('/dashboard')

  const { id } = await params

  await connectDB()
  const centro = await Centro.findById(id).lean()
  const planificaciones = await Planificacion.find({ centroId: id, publicado: true }).sort({ createdAt: -1 }).lean()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{centro?.nombre}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{planificaciones.length} planificaciones</p>
        </div>
        <Link href="/admin/centros" className="text-sm text-blue-600 hover:underline">← Volver a centros</Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {planificaciones.map((p: any) => (
          <div key={p._id} className="px-5 py-3 flex items-center justify-between border-b dark:border-slate-700">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{p.tema}</p>
              <p className="text-xs text-gray-500">{p.materia} · {p.grado?.replace('-', ' ')} · {p.categoriaDocente}</p>
            </div>
            <span className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString('es-DO')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}