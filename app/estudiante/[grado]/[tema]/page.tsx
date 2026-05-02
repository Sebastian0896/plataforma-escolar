import { getPlanificacion } from '@/lib/planificaciones'
import EstudianteView from '@/components/EstudianteView'
import { notFound } from 'next/navigation'

type Params = Promise<{ grado: string; tema: string }>

export default async function EstudianteTemaPage({ params }: { params: Params }) {
  const { grado, tema } = await params
  const nivel = grado?.includes('primaria') ? 'nivel-primario' : 'nivel-secundario'
  const planificacion = await getPlanificacion(nivel, grado, tema)

  if (!planificacion) notFound()

  return <EstudianteView planificacion={planificacion} />
}