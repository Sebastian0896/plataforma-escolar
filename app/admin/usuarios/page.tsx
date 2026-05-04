import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

export default async function UsuariosPage({ searchParams }: { searchParams: Promise<{ page?: string; inactivos?: string }> }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'admin_centro' && session.user?.role !== 'superadmin')) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 9
  const skip = (page - 1) * limit
  const mostrarInactivos = params.inactivos === 'true'

  await connectDB()
  const filter: any = { activo: mostrarInactivos ? false : true }
  if (session.user?.role === 'admin_centro') filter.centroId = session.user.centroId

  const [usuarios, total] = await Promise.all([
    Usuario.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Usuario.countDocuments(filter),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{total} usuarios</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`?inactivos=${!mostrarInactivos}`} className="text-xs px-3 py-2 rounded-lg border dark:border-slate-600">
            {mostrarInactivos ? 'Ver activos' : 'Ver inactivos'}
          </Link>
          <Link href="/admin/usuarios/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nuevo Usuario</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {usuarios.map((u: any) => (
          <div key={u._id} className={`bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 ${!u.activo ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300">
                {u.nombre?.charAt(0)?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">{u.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-0.5 rounded-full capitalize bg-blue-100 text-blue-700">
                {u.rol?.replace('_', ' ')}
              </span>
              <div className="flex items-center gap-2">
                {u.activo && (
                  <Link href={`/admin/usuarios/editar/${u._id}`} className="text-xs text-blue-600 hover:underline">Editar</Link>
                )}
                <Link href={`?id=${u._id}&accion=${u.activo ? 'desactivar' : 'activar'}`} className={`text-xs ${u.activo ? 'text-red-500' : 'text-green-500'}`}>
                  {u.activo ? 'Desactivar' : 'Activar'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
    </div>
  )
}