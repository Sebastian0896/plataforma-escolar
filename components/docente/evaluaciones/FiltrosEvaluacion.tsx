// components/docente/evaluaciones/FiltrosEvaluacion.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface FiltrosEvaluacionProps {
  grado: string
  setGrado: (v: string) => void
  materia: string
  setMateria: (v: string) => void
  periodo: string
  setPeriodo: (v: string) => void
  gradosDocente: string[]
  materiasDocente: string[]
  totalEstudiantes: number
  totalCompetencias: number
  obtenerPeriodoActual: () => string
}

export function FiltrosEvaluacion({
  grado,
  setGrado,
  materia,
  setMateria,
  periodo,
  setPeriodo,
  gradosDocente,
  materiasDocente,
  totalEstudiantes,
  totalCompetencias,
  obtenerPeriodoActual,
}: FiltrosEvaluacionProps) {
  return (
    <Card className="overflow-hidden rounded-3xl border-0 bg-gradient-to-b from-background to-muted/10 shadow-md">
      {/* Header */}
      <CardHeader className="border-b bg-muted/20 pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              Configuración de evaluación
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Define rápidamente el contexto académico de la evaluación.
            </p>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {grado && (
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                🎓 {grado.replace('-', ' ')}
              </div>
            )}

            {materia && (
              <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                📘 {materia}
              </div>
            )}

            <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              📅 {periodo}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          
          {/* Controles */}
          <div className="space-y-6 xl:col-span-8">

            {/* Grado + Materia */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Grado */}
              <div className="space-y-3">
                <div className="flex flex-col">
                  <Label className="text-sm font-bold text-foreground">
                    Grado académico
                  </Label>

                  <span className="text-xs text-muted-foreground">
                    Selecciona el curso a evaluar
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {gradosDocente.map((g) => {
                    const activo = grado === g

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrado(g)}
                        className={`
                          flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]
                          ${
                            activo
                              ? 'border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/20'
                              : 'border-border bg-background text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                          }
                        `}
                      >
                        <span
                          className={`
                            flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all
                            ${
                              activo
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-muted-foreground/30'
                            }
                          `}
                        >
                          {activo && (
                            <div className="h-2 w-2 rounded-full bg-background" />
                          )}
                        </span>

                        <span className="truncate text-sm tracking-tight">
                          🎓 {g.replace('-', ' ')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Materia */}
              <div className="space-y-3">
                <div className="flex flex-col">
                  <Label className="text-sm font-bold text-foreground">
                    Materia / Asignatura
                  </Label>

                  <span className="text-xs text-muted-foreground">
                    Selecciona la asignatura correspondiente
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {materiasDocente.map((m) => {
                    const activo = materia === m

                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMateria(m)}
                        className={`
                          flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]
                          ${
                            activo
                              ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/20'
                              : 'border-border bg-background text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                          }
                        `}
                      >
                        <span
                          className={`
                            flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all
                            ${
                              activo
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-muted-foreground/30'
                            }
                          `}
                        >
                          {activo && (
                            <div className="h-2 w-2 rounded-full bg-background" />
                          )}
                        </span>

                        <span className="truncate text-sm tracking-tight">
                          📘 {m}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Períodos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
               <div className='flex flex-col'>
                 <Label className="text-sm font-bold text-foreground">
                  Período evaluativo
                </Label>

                <span className="text-xs text-muted-foreground">
                  Selecciona el período académico actual
                </span>
               </div>
                <div className="inline-block  my-2 gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Sugerido: {obtenerPeriodoActual()}
                </div>
                </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  {
                    value: 'P1',
                    rango: 'Ago - Oct',
                    icon: '🌱',
                  },
                  {
                    value: 'P2',
                    rango: 'Oct - Ene',
                    icon: '📚',
                  },
                  {
                    value: 'P3',
                    rango: 'Ene - Mar',
                    icon: '🧠',
                  },
                  {
                    value: 'P4',
                    rango: 'Abr - Jun',
                    icon: '🏆',
                  },
                ].map((p) => {
                  const activo =
                    periodo === p.value
                    const actual = obtenerPeriodoActual() === p.value
                    return (
                        <button
                            key={p.value}
                            type="button"
                            onClick={() => setPeriodo(p.value)}
                            className={`
                            group relative flex flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-200 h-[52px] sm:h-auto
                            hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98]
                            ${
                                activo
                                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold ring-2 ring-emerald-500/20'
                                : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/40'
                            }
                            `}
                        >
                            <div className="flex items-center justify-between w-full">
                            <span className="text-sm font-bold">{p.icon} {p.value}</span>
                            {actual && !activo && (
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            )}
                            </div>
                            <span className="text-[10px] opacity-80 font-normal hidden sm:inline">
                            {p.rango}
                            </span>
                        </button>
                    )
                })}
              </div>
            </div>
          </div>

          {/* Panel lateral */}
          <div className="xl:col-span-4">
            <div className="flex h-full flex-col justify-between space-y-4 rounded-3xl border bg-muted/30 p-5">
              
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                    📊
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      Resumen Académico
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      Estado de evaluación
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  
                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background px-3.5 py-2.5 shadow-2xs">
                    <span className="text-xs text-muted-foreground">
                      Estudiantes
                    </span>

                    <span className="rounded-md bg-muted/60 px-2 py-0.5 text-xs font-bold text-foreground">
                      {totalEstudiantes}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background px-3.5 py-2.5 shadow-2xs">
                    <span className="text-xs text-muted-foreground">
                      Competencias
                    </span>

                    <span className="rounded-md bg-muted/60 px-2 py-0.5 text-xs font-bold text-foreground">
                      {totalCompetencias}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-border/40 bg-background px-3.5 py-2.5 shadow-2xs">
                    <span className="text-xs text-muted-foreground">
                      Período
                    </span>

                    <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {periodo}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/50 p-3 text-[11px] text-muted-foreground">
                💡 Las evaluaciones se organizan automáticamente por competencias e indicadores según el período y la asignatura seleccionada.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}