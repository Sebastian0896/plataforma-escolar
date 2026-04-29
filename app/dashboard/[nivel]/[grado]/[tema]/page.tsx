// app/(public)/[nivel]/[grado]/[tema]/page.tsx
import { notFound } from 'next/navigation'
import { getPlanificacion } from '@/lib/planificaciones'
import PlanificacionView from '@/components/PlanificacionView'

type Params = Promise<{ nivel: string; grado: string; tema: string }>

export default async function PlanificacionPage({ params }: { params: Params }) {
  const { nivel, grado, tema } = await params

  const planificacion = await getPlanificacion(nivel, grado, tema)

  if (!planificacion) {
    notFound()
  }

  return <PlanificacionView planificacion={planificacion} />
}