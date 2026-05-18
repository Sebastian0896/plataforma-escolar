import { notFound } from 'next/navigation'
import { BookOpen, Calendar, GraduationCap, Layers } from 'lucide-react'

import { getPlanificacion } from '@/lib/planificaciones'
import PlanificacionView from '@/components/PlanificacionView'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

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
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs / Metadata Superior */}
      <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
        <span className="flex items-center gap-1">
          <Layers className="h-3 w-3" /> {nivel.replace('-', ' ')}
        </span>
        <span>/</span>
        <span className="flex items-center gap-1">
          <GraduationCap className="h-3 w-3" /> {grado.replace('-', ' ')}
        </span>
      </div>

      {/* Header Principal */}
      <Card className="mb-8 overflow-hidden rounded-3xl border-border/50 bg-card shadow-md">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Accento Lateral o Icono */}
            <div className="flex w-full items-center justify-center bg-muted/30 p-6 md:w-32 md:border-r">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
            </div>

            {/* Información del Título */}
            <div className="flex-1 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
                    {planificacion.tema}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>Ciclo Lectivo 2026</span>
                    </div>
                    {planificacion.materia && (
                      <>
                        <Separator orientation="vertical" className="hidden h-4 md:block" />
                        <span className="font-medium text-foreground">
                          Materia: {planificacion.materia}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-col md:flex-row gap-2">
                  <Badge variant="secondary" className="w-full my-1 mx-1 md:my-0 md:w-[194px] rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase">
                    Documento Oficial
                  </Badge>
                  <Badge variant="outline" className="w-full my-1 mx-1 md:my-0 md:w-[194px] rounded-lg px-2.5 py-0.5 text-xs font-semibold uppercase">
                    Planificación Curricular
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cuerpo de la Planificación */}
      <section className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Desarrollo de la Unidad
          </h2>
          <Separator className="flex-1 ml-4 opacity-50" />
        </div>
        
        <div className="space-y-8">
          <PlanificacionView planificacion={planificacion} />
        </div>
      </section>
    </main>
  )
}