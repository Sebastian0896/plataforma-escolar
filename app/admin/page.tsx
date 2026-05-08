import { redirect } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { auth } from '@/auth'


async function getStats() {
  try {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join('; ')

    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/stats`, {
      headers: { Cookie: cookieHeader },
      cache: 'no-store',
    })
    return res.json()
  } catch {
    return null
  }
}

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) redirect('/login')

    if (session.user?.role === 'registro') {
      redirect('/admin/registro/comprobantes')
    }
  const stats = session.user?.role === 'superadmin' ? await getStats() : null
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Bienvenido, {session.user?.name}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Panel de gestión</p>

      {/* Stats generales - Superadmin */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <p className="text-3xl font-bold text-blue-600">{stats.totalCentros}</p>
            <p className="text-sm text-gray-500">Centros</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <p className="text-3xl font-bold text-green-600">{stats.totalUsuarios}</p>
            <p className="text-sm text-gray-500">Usuarios</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <p className="text-3xl font-bold text-purple-600">{stats.totalPlanificaciones}</p>
            <p className="text-sm text-gray-500">Planificaciones</p>
          </div>
        </div>
      )}

      {/* Centros - Superadmin */}
      {stats && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Centros Educativos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.stats?.map((c: any) => (
              <Link
                key={c._id}
                href={`/admin/centros/${c._id}`}
                className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow block"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{c.nombre}</h3>
                <p className="text-xs text-gray-400 mb-3">Código: {c.codigo}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600">👥 {c.usuarios} usuarios</span>
                  <span className="text-green-600">📖 {c.planificaciones} planificaciones</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Roles */}
      {stats && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usuarios por rol</h2>
          <div className="flex gap-4 flex-wrap">
            {stats.porRol?.map((r: any) => (
              <div key={r._id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{r.total}</p>
                <p className="text-xs text-gray-500 capitalize">{r._id?.replace('_', ' ') || 'Sin rol'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Género */}
      {stats && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Usuarios por género</h2>
          <div className="flex gap-4 flex-wrap">
            {stats.porGenero?.map((g: any) => (
              <div key={g._id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{g.total}</p>
                <p className="text-xs text-gray-500 capitalize">{g._id || 'Sin especificar'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin normal / Admin centro */}
      {!stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/planificaciones" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md">
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Planificaciones</h3>
            <p className="text-sm text-gray-500">Gestionar contenido</p>
          </Link>
          <Link href="/admin/planificaciones/nueva" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md">
            <div className="text-3xl mb-2">➕</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Nueva</h3>
            <p className="text-sm text-gray-500">Crear planificación</p>
          </Link>
          {(session.user?.role === 'admin' || session.user?.role === 'admin_centro' || session.user?.role === 'superadmin') && (
            <Link href="/admin/usuarios" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Usuarios</h3>
              <p className="text-sm text-gray-500">Gestionar usuarios</p>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}