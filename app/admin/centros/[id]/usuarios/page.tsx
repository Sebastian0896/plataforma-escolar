import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

type Params = Promise<{ id: string }>

export default async function UsuariosPorCentroPage({ params, searchParams }: { params: Params; searchParams: Promise<{ page?: string }> }) {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') redirect('/dashboard')

  const { id } = await params
  const sp = await searchParams
  const page = parseInt(sp.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  await connectDB()
  const centro = await Centro.findById(id).lean()
  const [usuarios, total] = await Promise.all([
    Usuario.find({ centroId: id, activo: true }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Usuario.countDocuments({ centroId: id, activo: true }),
  ])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/admin/centros/${id}`} className="text-gray-500 hover:text-blue-600">← {centro?.nombre}</Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
      </div>
      <p className="text-sm text-gray-500 mb-4">{total} usuarios</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {usuarios.map((u: any) => (
          <div key={u._id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold">
                {u.nombre?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{u.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 capitalize">
              {u.rol?.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>

      <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
    </div>
  )
}