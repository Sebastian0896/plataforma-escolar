import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Interfaz que define las propiedades necesarias para el componente
interface ConfiguracionAcademicaProps {
  grado: string
  setGrado: (grado: string) => void
  materia: string
  setMateria: (materia: string) => void
  fecha: string
  setFecha: (fecha: string) => void
  periodo: string
  setPeriodo: (periodo: string) => void
  gradosDocente: string[]
  materiasDocente: string[]
  obtenerPeriodoActual: () => string
}

export const ConfiguracionAcademica: React.FC<ConfiguracionAcademicaProps> = ({
  grado,
  setGrado,
  materia,
  setMateria,
  fecha,
  setFecha,
  periodo,
  setPeriodo,
  gradosDocente,
  materiasDocente,
  obtenerPeriodoActual,
}) => {
  return (
    <Card className="border-0 shadow-sm bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      {/* Header */}
      <CardHeader className="border-b bg-muted/30 pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight">
              Configuración académica
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Selecciona el grado, materia y período de trabajo.
            </p>
          </div>

          {/* Status pills */}
          <div className="flex flex-wrap gap-2">
            {grado && (
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                🎓 {grado.replace('-', ' ')}
              </div>
            )}

            {materia && (
              <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                📘 {materia}
              </div>
            )}

            <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              📅 {periodo}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          {/* Left Inputs */}
          <div className="space-y-5 xl:col-span-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Grado */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Grado</Label>
                <Select value={grado} onValueChange={setGrado}>
                  <SelectTrigger className="h-12 rounded-2xl border-muted-foreground/20 bg-background shadow-sm transition-all hover:border-primary/40 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Seleccionar grado" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradosDocente.map((g: string) => (
                      <SelectItem key={g} value={g}>
                        🎓 {g?.replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Materia */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Materia</Label>
                <Select value={materia} onValueChange={setMateria}>
                  <SelectTrigger className="h-12 rounded-2xl border-muted-foreground/20 bg-background shadow-sm transition-all hover:border-primary/40 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                    {materiasDocente.map((m: string) => (
                      <SelectItem key={m} value={m}>
                        📘 {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Fecha</Label>
                <Input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="h-12 rounded-2xl border-muted-foreground/20 bg-background shadow-sm transition-all hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
                />
              </div>
            </div>

            {/* Periodos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Período académico</Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    El período actual se selecciona automáticamente.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Actual: {obtenerPeriodoActual()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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
                        group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200
                        hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]
                        ${
                          activo
                            ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                            : 'border-border bg-background hover:bg-muted/40'
                        }
                      `}
                    >
                      {activo && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      )}

                      {actual && (
                        <div
                          className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full ${
                            activo ? 'bg-white' : 'bg-primary'
                          }`}
                        />
                      )}

                      <div className="relative flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{p.icon}</span>
                          <span className="text-base font-bold">{p.value}</span>
                        </div>

                        <span
                          className={`text-xs ${
                            activo ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}
                        >
                          {p.rango}
                        </span>

                        {actual && (
                          <span
                            className={`mt-1 text-[10px] font-semibold uppercase tracking-wide ${
                              activo ? 'text-primary-foreground/70' : 'text-primary'
                            }`}
                          >
                            Período actual
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="xl:col-span-4">
            <div className="rounded-3xl border bg-muted/30 p-5 h-full">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  📊
                </div>
                <div>
                  <h3 className="font-semibold">Resumen rápido</h3>
                  <p className="text-xs text-muted-foreground">Estado actual de trabajo</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 shadow-sm">
                  <span className="text-sm text-muted-foreground">Grado</span>
                  <span className="font-semibold">{grado ? grado.replace('-', ' ') : '—'}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 shadow-sm">
                  <span className="text-sm text-muted-foreground">Materia</span>
                  <span className="font-semibold truncate max-w-[140px]">{materia || '—'}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 shadow-sm">
                  <span className="text-sm text-muted-foreground">Período</span>
                  <span className="font-semibold text-primary">{periodo}</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3 shadow-sm">
                  <span className="text-sm text-muted-foreground">Fecha</span>
                  <span className="font-semibold">{fecha || '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}