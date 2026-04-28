import { getPlanificacion } from '@/lib/wordpress'
import PlanificacionView from '@/components/PlanificacionView'

type Params = Promise<{ grado: string; tema: string }>

export default async function EstudianteTemaPage({ params }: { params: Params }) {
  const { grado, tema } = await params

  // Obtener el nivel del grado
  const nivel = grado.includes('primaria') ? 'nivel-primario' : 'nivel-secundario'

  const planificacion = await getPlanificacion(nivel, grado, tema)

  if (!planificacion) {
    return (
      <div className="p-8 text-center text-gray-500">
        Planificación no encontrada
      </div>
    )
  }

  return <PlanificacionView planificacion={planificacion} soloEstudiante />
}