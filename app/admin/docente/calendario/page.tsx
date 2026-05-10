'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  BookOpen,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function SemanaPage() {
  const { data: session } = useSession()

  const [planificaciones, setPlanificaciones] = useState<any[]>([])
  const [semanaOffset, setSemanaOffset] = useState(0)

  const hoy = new Date()

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
    const f = new Date(lunes)

    f.setDate(lunes.getDate() + i)

    return f
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

  const plansPorDia = (fecha: Date) =>
    planificaciones.filter(
      (p) =>
        p.fechaProgramada &&
        new Date(p.fechaProgramada).toDateString() ===
          fecha.toDateString()
    )

  const getMateriaColor = (materia: string) => {
    const map: Record<string, string> = {
      ingles:
        'border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30',
      frances:
        'border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30',
      'lengua-espanola':
        'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30',
      matematica:
        'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30',
      'ciencias-sociales':
        'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30',
      'ciencias-naturales':
        'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30',
      'educacion-fisica':
        'border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30',
      artistica:
        'border-pink-200 bg-pink-50 dark:border-pink-900 dark:bg-pink-950/30',
    }

    return (
      map[materia] ||
      'border-border bg-muted/40'
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-7 w-7 text-primary" />

            <h1 className="text-3xl font-bold tracking-tight">
              Planificación Semanal
            </h1>
          </div>

          <p className="mt-2 text-muted-foreground">
            Visualiza y organiza las actividades académicas de la semana.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 rounded-xl border bg-background p-2 shadow-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSemanaOffset((s) => s - 1)
            }
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Anterior
          </Button>

          <div className="min-w-[220px] text-center text-sm font-medium">
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

      {/* Week Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {fechasSemana.map((fecha, i) => {
          const planes = plansPorDia(fecha)

          const esHoy =
            fecha.toDateString() ===
            hoy.toDateString()

          return (
            <Card
              key={i}
              className={`relative overflow-hidden border shadow-sm transition-all hover:shadow-md ${
                esHoy
                  ? 'border-primary ring-1 ring-primary/20'
                  : ''
              }`}
            >
              {esHoy && (
                <div className="absolute right-3 top-3">
                  <Badge>Hoy</Badge>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="flex flex-col">
                  <span
                    className={`text-sm uppercase tracking-wide ${
                      esHoy
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {dias[i]}
                  </span>

                  <span className="mt-1 text-3xl font-bold">
                    {fecha.getDate()}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {fecha.toLocaleDateString('es-DO', {
                      month: 'long',
                    })}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {planes.length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-xl border border-dashed text-center">
                    <p className="text-sm text-muted-foreground">
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
                        className={`rounded-xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-sm ${getMateriaColor(
                          p.materia
                        )}`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 opacity-70" />

                          <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                            {p.materia?.replace(
                              '-',
                              ' '
                            )}
                          </span>
                        </div>

                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                          {p.tema}
                        </h3>

                        <p className="mt-2 text-xs opacity-70">
                          {p.grado?.replace('-', ' ')}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}