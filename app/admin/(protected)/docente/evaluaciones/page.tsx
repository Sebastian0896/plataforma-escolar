'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import {
  BookOpen,
  Download,
  GraduationCap,
  Loader2,
  Save,
  Sparkles,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { redirect } from 'next/navigation'

export default function EvaluacionesPage() {
  const { data: session } = useSession()

  const [competencias, setCompetencias] =
    useState<any[]>([])

  const [estudiantes, setEstudiantes] =
    useState<any[]>([])

  const [periodo, setPeriodo] = useState('P1')
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [competenciaActiva, setCompetenciaActiva] = useState('')

  const [notas, setNotas] = useState<
    Record<string, Record<string, number>>
  >({})

  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] =
    useState(false)

  const [resumen, setResumen] = useState<
    Record<string, any>
  >({})

  const gradosDocente =
    session?.user?.grados ||
    (session?.user?.grado
      ? [session.user.grado]
      : [])

  // Inicializar materia
  useEffect(() => {
    if (session?.user?.materias?.length) {
      setMateria(session.user.materias[0])
    }
  }, [session])

  // Competencias
  useEffect(() => {
  fetch('/api/competencias')
    .then((r) => r.json())
    .then((data) => {
      setCompetencias(data)

      // seleccionar primera competencia por defecto
      if (data?.length > 0) {
        setCompetenciaActiva(data[0].id)
      }
    })
}, [])

  // Estudiantes
  useEffect(() => {
    if (grado) {
      setCargando(true)

      fetch(
        `/api/docente/estudiantes?grado=${grado}`
      )
        .then((r) => r.json())
        .then((d) => {
          const lista = Array.isArray(d)
            ? d
            : d.estudiantes || []

          setEstudiantes(lista)
          setCargando(false)
        })
    }
  }, [grado])

  // Notas
  useEffect(() => {
    if (grado && periodo && materia) {
      fetch(
        `/api/evaluaciones?grado=${grado}&periodo=${periodo}&materia=${materia}`
      )
        .then((r) => r.json())
        .then((d) => {
          if (d.notas) {
            const cargadas: Record<
              string,
              Record<string, number>
            > = {}

            Object.entries(d.notas).forEach(
              ([estId, comps]: any) => {
                cargadas[estId] = comps
              }
            )

            setNotas(cargadas)
          } else {
            setNotas({})
          }
        })
    }
  }, [grado, periodo, materia])

  // Resumen
  useEffect(() => {
    if (grado && materia && periodo) {
      fetch(
        `/api/diario/resumen?grado=${grado}&materia=${materia}&periodo=${periodo}`
      )
        .then((r) => r.json())
        .then(setResumen)
    }
  }, [grado, materia, periodo])

  const setNota = (
    estudianteId: string,
    competenciaId: string,
    valor: number
  ) => {
    setNotas((prev) => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        [competenciaId]: valor,
      },
    }))
  }

  const guardar = async () => {
    setMensaje('')
    console.log('📤 notas a enviar:', JSON.stringify(notas))
    const res = await fetch(
      '/api/evaluaciones',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          grado,
          periodo,
          materia:
            materia ||
            session?.user?.materias?.[0] ||
            '',
          notas,
        }),
      }
    )

    if (res.ok) {
      setMensaje(
        '✅ Evaluaciones guardadas'
      )

      setTimeout(() => setMensaje(''), 2500)
      redirect("/admin/docente/estudiantes")
    } else {
      setMensaje('❌ Error al guardar')
    }
  }

  const getColorNota = (nota: number) => {
    if (
      nota === undefined ||
      nota === null
    )
      return ''

    if (nota >= 80) {
      return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900 dark:text-green-300'
    }

    if (nota >= 65) {
      return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300'
    }

    return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300'
  }

    return (
      <div className="space-y-8 pb-24">
        {/* Header */}
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Evaluaciones Académicas
                </h1>

                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Gestiona competencias y calificaciones de los estudiantes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {mensaje && (
              <Badge
                variant="secondary"
                className="rounded-xl px-4 py-2 text-xs"
              >
                {mensaje}
              </Badge>
            )}

            <a
              href={`/api/evaluaciones/pdf?grado=${grado}&materia=${materia}`}
              target="_blank"
            >
              <Button
                variant="outline"
                className="h-11 rounded-xl px-5"
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </a>
          </div>
        </div>

        <Separator />

        {/* Filters */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              Configuración de evaluación
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {/* Grado */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Grado
                </label>

                <select
                  value={grado}
                  onChange={(e) =>
                    setGrado(e.target.value)
                  }
                  className="h-11 w-full rounded-xl border bg-background px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    Seleccionar grado
                  </option>

                  {gradosDocente.map((g) => (
                    <option key={g} value={g}>
                      {g?.replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Materia */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Materia
                </label>

                <select
                  value={materia}
                  onChange={(e) =>
                    setMateria(e.target.value)
                  }
                  className="h-11 w-full rounded-xl border bg-background px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="">
                    Seleccionar materia
                  </option>

                  {session?.user?.materias?.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Periodo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Período
                </label>

                <select
                  value={periodo}
                  onChange={(e) =>
                    setPeriodo(e.target.value)
                  }
                  className="h-11 w-full rounded-xl border bg-background px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                  <option value="P4">P4</option>
                </select>
              </div>

              {/* Stats */}
              <div className="rounded-2xl border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Resumen
                </p>

                <div className="mt-3 flex items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold">
                      {estudiantes.length}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Estudiantes
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold">
                      {competencias.length}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Competencias
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estados */}
        {!grado || !materia ? (
          <Card className="border-dashed">
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">
                Selecciona grado y materia para comenzar.
              </p>
            </CardContent>
          </Card>
        ) : cargando ? (
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Cargando estudiantes...
              </div>
            </CardContent>
          </Card>
        ) : estudiantes.length === 0 ? (
          <Card>
            <CardContent className="flex h-40 items-center justify-center">
              <p className="text-muted-foreground">
                No hay estudiantes registrados.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Evaluaciones */}
            <Card className="overflow-hidden border shadow-sm">
              {/* Toolbar */}
              <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    Captura de notas
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Selecciona una competencia y registra las notas rápidamente.
                  </p>
                </div>

                {/* Selector */}
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                  {/* Navegación */}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={
                        competencias.findIndex(
                          (c) =>
                            c.id === competenciaActiva
                        ) === 0
                      }
                      onClick={() => {
                        const current =
                          competencias.findIndex(
                            (c) =>
                              c.id === competenciaActiva
                          )

                        if (current > 0) {
                          setCompetenciaActiva(
                            competencias[current - 1].id
                          )
                        }
                      }}
                    >
                      ←
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={
                        competencias.findIndex(
                          (c) =>
                            c.id === competenciaActiva
                        ) ===
                        competencias.length - 1
                      }
                      onClick={() => {
                        const current =
                          competencias.findIndex(
                            (c) =>
                              c.id === competenciaActiva
                          )

                        if (
                          current <
                          competencias.length - 1
                        ) {
                          setCompetenciaActiva(
                            competencias[current + 1].id
                          )
                        }
                      }}
                    >
                      →
                    </Button>
                  </div>

                  {/* Select */}
                  <select
                    value={competenciaActiva}
                    onChange={(e) =>
                      setCompetenciaActiva(
                        e.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border bg-background px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary md:w-[320px]"
                  >
                    {competencias.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                      >
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Students */}
              <div className="divide-y">
                {estudiantes.map((e: any) => {
                  const nota =
                    notas[e.id]?.[
                      competenciaActiva
                    ]

                  return (
                    <div
                      key={e.id}
                      className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/20"
                    >
                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-semibold">
                              {e.nombre}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {e.email}
                            </p>
                          </div>
                        </div>

                        {resumen[e.id] && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              ⭐{' '}
                              {
                                resumen[e.id]
                                  .estrellas
                              }
                            </Badge>

                            <Badge variant="outline">
                              📝{' '}
                              {
                                resumen[e.id]
                                  .tareas
                              }
                              /
                              {
                                resumen[e.id]
                                  .totalDias
                              }
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Nota */}
                      <div className="shrink-0">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          inputMode="numeric"
                          value={nota ?? ''}
                          onChange={(event) => {
                            const valor = Number(
                              event.target.value
                            )

                            if (
                              valor >= 0 &&
                              valor <= 100
                            ) {
                              setNota(
                                e.id,
                                competenciaActiva,
                                valor
                              )
                            }
                          }}
                          onFocus={(e) =>
                            e.target.select()
                          }
                          onKeyDown={(e) => {
                            if (
                              e.key === 'Enter'
                            ) {
                              e.preventDefault()

                              const inputs =
                                Array.from(
                                  document.querySelectorAll(
                                    'input[type="number"]'
                                  )
                                ) as HTMLInputElement[]

                              const index =
                                inputs.indexOf(
                                  e.currentTarget
                                )

                              inputs[
                                index + 1
                              ]?.focus()
                            }
                          }}
                          className={`
                            h-12
                            w-20
                            rounded-2xl
                            border
                            text-center
                            text-base
                            font-bold
                            shadow-sm
                            outline-none
                            transition-all
                            duration-200
                            focus:scale-105
                            focus:ring-2
                            focus:ring-primary
                            [appearance:textfield]
                            ${getColorNota(nota)}
                          `}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Footer */}
            <div className="sticky bottom-4 z-30 flex justify-end">
              <Button
                onClick={guardar}
                size="lg"
                className="h-12 rounded-2xl px-8 shadow-2xl"
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar Evaluaciones
              </Button>
            </div>
          </>
        )}
      </div>
    )
}