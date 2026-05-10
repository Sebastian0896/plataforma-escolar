import { notFound } from 'next/navigation'

import { getPlanificacion } from '@/lib/planificaciones'
import PlanificacionView from '@/components/PlanificacionView'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

type Params = Promise<{
  nivel: string
  grado: string
  tema: string
}>

export default async function PlanificacionPage({
  params,
}: {
  params: Params
}) {
  const { nivel, grado, tema } = await params

  const planificacion = await getPlanificacion(
    nivel,
    grado,
    tema
  )

  if (!planificacion) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <Card className="mb-6 rounded-3xl border-border/60 shadow-sm">
        
        <CardContent className="space-y-4 p-6 sm:p-8">
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            
            <div className="space-y-3">
              
              <div className="flex flex-wrap items-center gap-2">
                
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
                  {nivel.replace('-', ' ')}
                </span>

                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
                  {grado.replace('-', ' ')}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {planificacion.tema}
                </h1>

                {planificacion.materia && (
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                    Materia: {planificacion.materia}
                  </p>
                )}
              </div>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-muted text-3xl">
              📘
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <div className="space-y-6">
        <PlanificacionView planificacion={planificacion} />
      </div>
    </div>
  )
}