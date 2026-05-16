'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BookOpen,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function SemanaPage() {
  const { data: session } = useSession()

  const [planificaciones, setPlanificaciones] = useState<any[]>([])
  const [semanaOffset, setSemanaOffset] = useState(0)

  const hoy = new Date()

  // Inicio semana (lunes)
  const lunes = useMemo(() => {
    const fecha = new Date(hoy)

    fecha.setDate(
      hoy.getDate() -
        hoy.getDay() +
        1 +
        semanaOffset * 7
    )

    fecha.setHours(0, 0, 0, 0)

    return fecha
  }, [semanaOffset])

  const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
  ]

  const fechasSemana = dias.map((_, i) => {
    const fecha = new Date(lunes)

    fecha.setDate(lunes.getDate() + i)

    return fecha
  })

  useEffect(() => {
    if (session?.user) {
      fetch('/api/planificaciones?todas=true')
        .then((r) => r.json())
        .then((d) =>
          setPlanificaciones(
            Array.isArray(d?.planificaciones)
              ? d.planificaciones
              : []
          )
        )
    }
  }, [session])

  const plansPorDia = (fecha: Date) => {
    return planificaciones.filter((p) => {
      if (!p.fechaProgramada) return false

      const fp = new Date(p.fechaProgramada)

      return (
        fp.toDateString() ===
        fecha.toDateString()
      )
    })
  }

  const getMateriaColor = (materia: string) => {
    const map: Record<string, string> = {
      ingles:
        'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300',

      frances:
        'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/30 dark:text-indigo-300',

      'lengua-espanola':
        'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300',

      matematica:
        'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300',

      'ciencias-sociales':
        'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300',

      'ciencias-naturales':
        'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300',

      'educacion-fisica':
        'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950/30 dark:text-orange-300',

      artistica:
        'border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-900 dark:bg-pink-950/30 dark:text-pink-300',
    }

    return (
      map[materia] ||
      'border-border bg-muted/40 text-foreground'
    )
  }

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Planificación Semanal
              </h1>

              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Visualiza las actividades y planificaciones académicas organizadas por semana.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-background p-2 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl"
            onClick={() =>
              setSemanaOffset((s) => s - 1)
            }
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>

          <div className="min-w-[240px] text-center text-sm font-medium">
            {fechasSemana[0].toLocaleDateString(
              'es-DO',
              {
                day: 'numeric',
                month: 'short',
              }
            )}{' '}
            —{' '}
            {fechasSemana[4].toLocaleDateString(
              'es-DO',
              {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl"
            onClick={() =>
              setSemanaOffset((s) => s + 1)
            }
          >
            Siguiente
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {fechasSemana.map((fecha, i) => {
          const planes = plansPorDia(fecha)

          const esHoy =
            fecha.toDateString() ===
            hoy.toDateString()

          return (
            <Card
              key={i}
              className={`overflow-hidden border shadow-sm transition-all hover:shadow-md ${
                esHoy
                  ? 'border-primary ring-1 ring-primary/20'
                  : ''
              }`}
            >
              <CardContent className="space-y-5 p-5">
                {/* Day Header */}
                <div
                  className={`rounded-xl border px-4 py-4 text-center ${
                    esHoy
                      ? 'border-primary/20 bg-primary/5'
                      : 'bg-muted/30'
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      esHoy
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {dias[i]}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {fecha.getDate()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {fecha.toLocaleDateString('es-DO', {
                      month: 'long',
                    })}
                  </p>

                  {esHoy && (
                    <Badge className="mt-3">
                      Hoy
                    </Badge>
                  )}
                </div>

                {/* Plans */}
                <div className="space-y-3">
                  {planes.length === 0 ? (
                    <div className="flex h-28 items-center justify-center rounded-xl border border-dashed bg-muted/20">
                      <p className="text-center text-sm text-muted-foreground">
                        Sin planificaciones
                      </p>
                    </div>
                  ) : (
                    planes.map((p) => (
                      <Link
                        key={p._id}
                        href={`/dashboard/${
                          p.nivel ||
                          'nivel-secundario'
                        }/${p.grado}/${p.slug}`}
                      >
                        <div
                          className={`rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${getMateriaColor(
                            p.materia
                          )}`}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 opacity-70" />

                            <span className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                              {p.materia?.replace(
                                '-',
                                ' '
                              )}
                            </span>
                          </div>

                          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                            {p.tema}
                          </h3>

                          <p className="mt-3 text-xs opacity-70">
                            {p.grado?.replace('-', ' ')}
                          </p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}