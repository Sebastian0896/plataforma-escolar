// app/admin/planificaciones/page.tsx
import Link from 'next/link'
import { getEstructuraCompleta } from '@/lib/wordpress'
import BotonEliminar from '@/components/admin/BotonEliminar'

export const dynamic = 'force-dynamic'

export default async function PlanificacionesPage() {
  const estructura = await getEstructuraCompleta()

  // Extraer todas las planificaciones de la estructura
  const todasLasPlanificaciones: {
    nivel: string
    nivelSlug: string
    grado: string
    gradoSlug: string
    materia: string
    materiaSlug: string
    tema: string
    temaSlug: string
  }[] = []

  estructura.forEach((nivel) => {
    nivel.ciclos.forEach((ciclo) => {
      ciclo.grados.forEach((grado) => {
        grado.materias.forEach((materia) => {
          materia.temas.forEach((tema) => {
            todasLasPlanificaciones.push({
              nivel: nivel.nombre,
              nivelSlug: nivel.slug,
              grado: grado.nombre,
              gradoSlug: grado.slug,
              materia: materia.nombre,
              materiaSlug: materia.slug,
              tema: tema.tema,
              temaSlug: tema.slug,
            })
          })
        })
      })
    })
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planificaciones</h1>
          <p className="text-sm text-gray-500 mt-1">
            {todasLasPlanificaciones.length} planificaciones en total
          </p>
        </div>
        <Link
          href="/admin/planificaciones/nueva"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Nueva
        </Link>
      </div>

      {todasLasPlanificaciones.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No hay planificaciones aún.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {todasLasPlanificaciones.map((plan, idx) => (
              <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{plan.tema}</p>
                  <p className="text-xs text-gray-400">
                    {plan.nivel} &gt; {plan.grado} &gt; {plan.materia}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/planificaciones/editar/${plan.materiaSlug}/${plan.temaSlug}`}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Editar
                  </Link>
                  <BotonEliminar materiaSlug={plan.materiaSlug} temaSlug={plan.temaSlug} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}