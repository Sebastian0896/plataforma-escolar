import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Planificacion from '@/lib/models/Planificacion'
import Link from 'next/link'

type Params = Promise<{ id: string }>

export default async function CentroDetailPage({ params }: { params: Params }) {
  const session = await auth()
  //if (session?.user?.role !== 'superadmin') redirect('/dashboard')
  if (session?.user?.role !== 'superadmin' && 
      session?.user?.role !== 'admin' && 
      session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  const { id } = await params

  await connectDB()
  const centro = await Centro.findById(id).lean()
  const totalUsuarios = await Usuario.countDocuments({ centroId: id, activo: true })
  const totalPlanificaciones = await Planificacion.countDocuments({ centroId: id, publicado: true })

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-gray-500 hover:text-blue-600">← Dashboard</Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{centro?.nombre}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={`/admin/centros/${id}/usuarios`}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-4xl mb-3">👥</div>
          <p className="text-3xl font-bold text-blue-600">{totalUsuarios}</p>
          <p className="text-sm text-gray-500 mt-1">Usuarios</p>
          <p className="text-xs text-blue-600 hover:underline mt-3">Ver todos →</p>
        </Link>

        <Link
          href={`/admin/centros/${id}/planificaciones`}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-4xl mb-3">📖</div>
          <p className="text-3xl font-bold text-green-600">{totalPlanificaciones}</p>
          <p className="text-sm text-gray-500 mt-1">Planificaciones</p>
          <p className="text-xs text-blue-600 hover:underline mt-3">Ver todas →</p>
        </Link>

      </div>
    </div>
  )
}