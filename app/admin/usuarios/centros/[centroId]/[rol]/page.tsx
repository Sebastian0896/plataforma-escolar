import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

type Params = Promise<{ centroId: string; rol: string }>

export default async function UsuariosPorCentroRolPage({ params, searchParams }: { params: Params; searchParams: Promise<{ page?: string }> }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin' && session.user?.role !== 'admin_centro')) redirect('/dashboard')

  const { centroId, rol } = await params
  const sp = await searchParams
  const page = parseInt(sp.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  await connectDB()
  const centro = await Centro.findById(centroId).lean()
  if (!centro) notFound()

  const filter = { centroId: centro._id, rol, activo: true }
  const [usuarios, total] = await Promise.all([
    Usuario.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Usuario.countDocuments(filter),
  ])

  const coloresRol: Record<string, string> = {
    admin: 'bg-red-100 text-red-700', admin_centro: 'bg-blue-100 text-blue-700',
    docente: 'bg-green-100 text-green-700', estudiante: 'bg-purple-100 text-purple-700',
    superadmin: 'bg-yellow-100 text-yellow-700',
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href={`/admin/usuarios/centros/${centroId}`} className="text-gray-500 hover:text-blue-600">← {centro?.nombre}</Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{rol?.replace('_', ' ')}</h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{total} usuarios</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {usuarios.map((u: any) => (
          <div key={u._id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300">
                {u.nombre?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{u.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>
            </div>
            {u.grado && <p className="text-xs text-gray-400">🎓 {u.grado?.replace('-', ' ')}</p>}
            {u.categoriaDocente && <p className="text-xs text-gray-400 capitalize">📖 {u.categoriaDocente?.replace('-', ' ')}</p>}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${coloresRol[u.rol] || 'bg-gray-100'}`}>
                {u.rol?.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/admin/usuarios/editar/${u._id}`} className="text-xs text-blue-600 hover:underline">Editar</Link>
                <Link href={`/admin/usuarios?id=${u._id}&accion=desactivar`} className="text-xs text-red-500 hover:underline">Desactivar</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
    </div>
  )
}