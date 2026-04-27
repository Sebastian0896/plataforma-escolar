// app/admin/planificaciones/page.tsx
import Link from 'next/link'
import { getMaterias } from '@/lib/wordpress'
import BotonEliminar from '@/components/admin/BotonEliminar'

export const dynamic = 'force-dynamic'

export default async function PlanificacionesPage() {
  const materias = await getMaterias()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planificaciones</h1>
          <p className="text-sm text-gray-500 mt-1">
            {materias.reduce((acc, m) => acc + m.temas.length, 0)} planificaciones en total
          </p>
        </div>
        <Link
          href="/admin/planificaciones/nueva"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          + Nueva
        </Link>
      </div>

      {materias.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No hay planificaciones aún.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {materias.map((materia) => (
            <div key={materia.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">{materia.nombre}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {materia.temas.map((tema) => (
                  <div key={tema.slug} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{tema.tema}</p>
                      <p className="text-xs text-gray-400">/{materia.slug}/{tema.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/planificaciones/editar/${materia.slug}/${tema.slug}`}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </Link>
                      <BotonEliminar materiaSlug={materia.slug} temaSlug={tema.slug} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}