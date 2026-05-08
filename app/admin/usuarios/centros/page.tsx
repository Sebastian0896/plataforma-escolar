import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'

export const metadata = { title: 'Usuarios' }

export default async function CentrosUsuariosPage() {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin' && session.user?.role !== 'admin_centro')) redirect('/dashboard')

  await connectDB()

  // Si es admin_centro, solo ver su centro
  const filter: any = { activo: true }
  if (session.user?.role === 'admin_centro') {
    filter._id = session.user.centroId
  }

  const centros = await Centro.find(filter).lean()

  const centrosConCount = await Promise.all(
    centros.map(async (c: any) => {
      const total = await Usuario.countDocuments({ centroId: c._id, activo: true })
      return { ...c, total }
    })
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios por Centro</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{centros.length} centros</p>
        </div>
        <Link href="/admin/usuarios/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nuevo Usuario</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {centrosConCount.map((c: any) => (
          <Link
            key={c._id}
            href={`/admin/usuarios/centros/${c._id}`}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                🏫
              </div>
              <span className="text-3xl font-bold text-blue-600">{c.total}</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{c.nombre}</h3>
            <p className="text-xs text-gray-500">Código: {c.codigo}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}