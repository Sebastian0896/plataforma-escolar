import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Layers3,
  Sparkles,
} from 'lucide-react'

interface FiltrosClaseRapidosProps {
  materia: string
  setMateria: (materia: string) => void
  materiasDisponibles: string[]

  periodo: string
  setPeriodo: (periodo: string) => void

  fecha: string
  setFecha: (fecha: string) => void

  gradoActivo: string
  setGradoActivo: (grado: string) => void
  gradosDisponibles: string[]
  obtenerPeriodoActual: () => string
}

export const FiltrosClaseRapidos: React.FC<
  FiltrosClaseRapidosProps
> = ({
  materia,
  setMateria,
  materiasDisponibles,

  periodo,
  setPeriodo,

  fecha,
  setFecha,

  gradoActivo,
  setGradoActivo,
  gradosDisponibles,
  obtenerPeriodoActual,
}) => {
  return (
    <Card className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background to-muted/20 shadow-sm">
      <CardContent className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              Configuración rápida
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Gestiona el diario docente de forma más rápida y visual.
            </p>
          </div>

          <div className="rounded-2xl border bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
            {gradoActivo || 'Sin grado'} •{' '}
            {materia || 'Sin materia'}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          {/* ========================= */}
          {/* GRADO */}
          {/* ========================= */}
          <div className="rounded-2xl border bg-background/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Grado
                </Label>

                <p className="text-xs text-muted-foreground">
                  Selecciona el curso
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-">
                  {gradosDisponibles.map((g: string) => {
                    const esActivo = gradoActivo === g
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGradoActivo(g)}
                        className={`
                          flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] w-full
                          ${
                            esActivo
                              ? 'border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/20'
                              : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/30'
                          }
                        `}
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                          esActivo ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30'
                        }`}>
                          {esActivo && <div className="h-2 w-2 rounded-full bg-background" />}
                        </span>
                        <span className="text-sm tracking-tight truncate">
                          🎓 {g?.replace('-', '')}
                        </span>
                      </button>
                    )
                  })}
                </div>
          </div>

          {/* ========================= */}
          {/* MATERIA */}
          {/* ========================= */}
          <div className="rounded-2xl border bg-background/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10">
                <BookOpen className="h-4 w-4 text-blue-500" />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Materia
                </Label>

                <p className="text-xs text-muted-foreground">
                  Área académica
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {materiasDisponibles.map(
                (m) => {
                  const activo =
                    materia === m

                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        setMateria(m)
                      }
                      className={`
                        rounded-2xl border px-4 py-2 text-sm font-medium transition-all
                        active:scale-[0.97]

                        ${
                          activo
                            ? 'border-blue-500 bg-blue-500 text-white shadow-md'
                            : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted'
                        }
                      `}
                    >
                      {m}
                    </button>
                  )
                }
              )}
            </div>
          </div>

          {/* ========================= */}
          {/* PERIODO */}
          {/* ========================= */}
          <div className="rounded-2xl border bg-background/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10">
                <Layers3 className="h-4 w-4 text-emerald-500" />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Período
                </Label>

                <p className="text-xs text-muted-foreground">
                  Año académico
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 my-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Sugerido: {obtenerPeriodoActual()}
            </div>
            <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'P1', rango: 'Ago - Oct', icon: '🌱' },
                    { value: 'P2', rango: 'Oct - Ene', icon: '📚' },
                    { value: 'P3', rango: 'Ene - Mar', icon: '🧠' },
                    { value: 'P4', rango: 'Abr - Jun', icon: '🏆' },
                  ].map((p) => {
                    const activo = periodo === p.value
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

          {/* ========================= */}
          {/* FECHA */}
          {/* ========================= */}
          <div className="rounded-2xl border bg-background/80 p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10">
                <Calendar className="h-4 w-4 text-amber-500" />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Fecha
                </Label>

                <p className="text-xs text-muted-foreground">
                  Registro diario
                </p>
              </div>
            </div>

            <Input
              type="date"
              value={fecha}
              onChange={(e) =>
                setFecha(e.target.value)
              }
              className="
                h-12 rounded-2xl border-border/60
                bg-background text-sm font-medium
                shadow-sm transition-all
                focus-visible:ring-2
                focus-visible:ring-primary/20
              "
            />

            <div className="mt-3 rounded-xl bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              Los cambios se guardan según la fecha seleccionada.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}