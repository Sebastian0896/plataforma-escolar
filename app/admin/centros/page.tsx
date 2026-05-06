import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Link from 'next/link'

export default async function CentrosPage() {
  const session = await auth()
  if (session?.user?.role !== 'superadmin') redirect('/dashboard')

  await connectDB()
  const centros = await Centro.find({}).sort({ createdAt: -1 }).lean()
console.log('👤 Rol en centro/[id]:', session?.user?.role)
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Centros Educativos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{centros.length} centros</p>
        </div>
        <Link href="/admin/centros/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nuevo Centro</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {centros.map((c: any) => (
          <Link
            key={c._id}
            href={`/admin/centros/${c._id}`}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                🏫
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {c.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{c.nombre}</h3>
            <p className="text-xs text-gray-500">{c.codigo}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}