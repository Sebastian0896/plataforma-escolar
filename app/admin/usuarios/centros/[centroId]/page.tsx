import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'

type Params = Promise<{ centroId: string }>

export default async function CategoriasPorCentroPage({ params }: { params: Params }) {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'superadmin' && session.user?.role !== 'admin_centro')) redirect('/dashboard')

  const { centroId } = await params
  await connectDB()
  const centro = await Centro.findById(centroId).lean()

  const categorias = await Usuario.aggregate([
    { $match: { centroId: centro?._id, activo: true } },
    { $group: { _id: '$rol', total: { $sum: 1 } } },
  ])

  const iconos: Record<string, string> = {
    admin: '🔧', admin_centro: '🏫', docente: '👩‍🏫',
    estudiante: '🎒', superadmin: '👑', coordinador: '📋', tecnico_distrital: '💼',
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/usuarios/centros" className="text-gray-500 hover:text-blue-600">← Centros</Link>
        <span className="text-gray-300">|</span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{centro?.nombre}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((c: any) => (
          <Link
            key={c._id}
            href={`/admin/usuarios/centros/${centroId}/${c._id}`}
            className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:shadow-md transition-shadow block"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">{iconos[c._id] || '👤'}</div>
              <span className="text-3xl font-bold text-blue-600">{c.total}</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{c._id?.replace('_', ' ')}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}