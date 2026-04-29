import Link from 'next/link'
import { getEstructuraCompleta } from '@/lib/planificaciones'
import { auth } from '@/auth'
import BotonEliminar from '@/components/admin/BotonEliminar'

export const dynamic = 'force-dynamic'

export default async function PlanificacionesPage() {
  const session = await auth()
  const rol = session?.user?.role
  const categoria = session?.user?.categoriaDocente
  const grados = session?.user?.grados || []
  const materias = session?.user?.materias || []
  const esAdmin = rol === 'admin' || rol === 'coordinador' || rol === 'tecnico_distrital'

  const estructura = await getEstructuraCompleta(
    esAdmin ? undefined : (materias.length > 0 ? undefined : categoria),
    esAdmin ? undefined : (grados.length > 0 ? grados : undefined),
    esAdmin ? undefined : (materias.length > 0 ? materias : undefined)
  )

  const todasLasPlanificaciones: any[] = []
  estructura.forEach((nivel) => {
    nivel.ciclos.forEach((ciclo) => {
      ciclo.grados.forEach((grado) => {
        grado.materias.forEach((materia) => {
          materia.temas.forEach((tema) => {
            todasLasPlanificaciones.push({ nivel, grado, materia, tema })
          })
        })
      })
    })
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Planificaciones</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {todasLasPlanificaciones.length} planificaciones
          </p>
        </div>
        <Link
          href="/admin/planificaciones/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
        >
          + Nueva
        </Link>
      </div>

      {todasLasPlanificaciones.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No hay planificaciones aún.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {todasLasPlanificaciones.map((plan, idx) => (
              <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{plan.tema.tema}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {plan.nivel.nombre} › {plan.grado.nombre} › {plan.materia.nombre}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/planificaciones/editar/${plan.materia.slug}/${plan.tema.slug}`}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Editar
                  </Link>
                  <BotonEliminar materiaSlug={plan.materia.slug} temaSlug={plan.tema.slug} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}