import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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
    <Card className="border-0 shadow-md bg-gradient-to-b from-background to-muted/10 overflow-hidden rounded-3xl">
      {/* Header */}
      <CardHeader className="border-b bg-muted/20 pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Configuración académica
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Configura tu entorno de trabajo con un solo clic.
            </p>
          </div>

          {/* Status pills - Resumen superior en móvil */}
          <div className="flex flex-wrap gap-2">
            {grado && (
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary animate-fade-in">
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
          
          {/* Zona de Controles Izquierda */}
          <div className="space-y-6 xl:col-span-8">
            
            {/* Fila de Grado y Materia como Radioboxes Expuestos */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Selector de Grado */}
              <div className="space-y-3">
                <div className="flex flex-col">
                  <Label className="text-sm font-bold text-foreground">Grado académico</Label>
                  <span className="text-xs text-muted-foreground">Selecciona el curso actual</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {gradosDocente.map((g: string) => {
                    const esActivo = grado === g
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrado(g)}
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
                          🎓 {g?.replace('-', ' ')}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Selector de Materia */}
              <div className="space-y-3">
                <div className="flex flex-col">
                  <Label className="text-sm font-bold text-foreground">Asignatura / Materia</Label>
                  <span className="text-xs text-muted-foreground">Selecciona la materia a impartir</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {materiasDocente.map((m: string) => {
                    const esActivo = materia === m
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMateria(m)}
                        className={`
                          flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200
                          hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] w-full
                          ${
                            esActivo
                              ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold ring-2 ring-blue-500/20'
                              : 'border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted/30'
                          }
                        `}
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                          esActivo ? 'border-blue-500 bg-blue-500 text-white' : 'border-muted-foreground/30'
                        }`}>
                          {esActivo && <div className="h-2 w-2 rounded-full bg-background" />}
                        </span>
                        <span className="text-sm tracking-tight truncate">
                          📘 {m}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Fila de Fecha y Períodos */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              {/* Campo de Fecha */}
              <div className="space-y-3 md:col-span-1">
                <div className="flex flex-col">
                  <Label className="text-sm font-bold text-foreground">Fecha laboral</Label>
                  <span className="text-xs text-muted-foreground">Día del registro</span>
                </div>
                <Input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="h-[52px] rounded-2xl border-muted-foreground/20 bg-background shadow-sm transition-all hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20 font-medium"
                />
              </div>

              {/* Selector de Períodos Dinámicos */}
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <Label className="text-sm font-bold text-foreground">Período evaluativo</Label>
                    <span className="text-xs text-muted-foreground">Bloque de calificaciones</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Sugerido: {obtenerPeriodoActual()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    
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

            </div>

          </div>

          {/* Tarjeta Lateral Izquierda: Panel de Resumen Pro */}
          <div className="xl:col-span-4">
            <div className="rounded-3xl border bg-muted/30 p-5 h-full flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-lg">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Entorno de Clase</h3>
                    <p className="text-xs text-muted-foreground">Verificación de datos</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 border border-border/40 shadow-2xs">
                    <span className="text-xs text-muted-foreground">Curso</span>
                    <span className="text-xs font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                      {grado ? grado.replace('-', ' ') : 'Sin asignar'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 border border-border/40 shadow-2xs">
                    <span className="text-xs text-muted-foreground">Materia</span>
                    <span className="text-xs font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                      {materia || 'Sin asignar'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 border border-border/40 shadow-2xs">
                    <span className="text-xs text-muted-foreground">Período</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {periodo}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 border border-border/40 shadow-2xs">
                    <span className="text-xs text-muted-foreground">Fecha</span>
                    <span className="text-xs font-bold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                      {fecha || '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Micro-alerta informativa útil para el docente */}
              <div className="text-[11px] text-muted-foreground bg-background/50 border border-border/50 p-3 rounded-2xl">
                💡 Los datos de este panel definen automáticamente las competencias y los indicadores que se evaluarán en el registro pedagógico.
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}