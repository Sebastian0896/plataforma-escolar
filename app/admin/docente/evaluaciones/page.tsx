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

export default function EvaluacionesPage() {
  const { data: session } = useSession()

  const [competencias, setCompetencias] =
    useState<any[]>([])

  const [estudiantes, setEstudiantes] =
    useState<any[]>([])

  const [periodo, setPeriodo] = useState('P1')
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')

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
      .then(setCompetencias)
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
    <div className="space-y-10 pb-10">
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
                Gestiona las competencias y calificaciones de los estudiantes por período académico.
              </p>
            </div>
          </div>
        </div>

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

      <Separator />

      {/* Filters */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            Configuración de evaluación
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                  <option
                    key={g}
                    value={g}
                  >
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

                {session?.user?.materias?.map(
                  (m) => (
                    <option
                      key={m}
                      value={m}
                    >
                      {m}
                    </option>
                  )
                )}
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
                <option value="P1">
                  P1
                </option>

                <option value="P2">
                  P2
                </option>

                <option value="P3">
                  P3
                </option>

                <option value="P4">
                  P4
                </option>
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
                    {
                      competencias.length
                    }
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

      {/* Alert */}
      {mensaje && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            mensaje.includes('✅')
              ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300'
              : 'border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300'
          }`}
        >
          {mensaje}
        </div>
      )}

      {/* Empty states */}
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
          {/* Table */}
          <Card className="overflow-hidden border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="sticky left-0 z-10 min-w-[280px] border-r bg-muted/40 px-5 py-4 text-left font-semibold">
                      Estudiante
                    </th>

                    {competencias.map((c) => (
                      <th
                        key={c._id}
                        className="min-w-[150px] px-3 py-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        {c.nombre.length >
                        20
                          ? `${c.nombre.substring(
                              0,
                              20
                            )}...`
                          : c.nombre}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {estudiantes.map(
                    (e: any) => (
                      <tr
                        key={e._id}
                        className="border-t transition-colors hover:bg-muted/20"
                      >
                        {/* Student */}
                        <td className="sticky left-0 z-10 border-r bg-background px-5 py-5 align-top">
                          <div className="space-y-3">
                            <div>
                              <p className="font-semibold">
                                {e.nombre}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {
                                  e.email
                                }
                              </p>
                            </div>

                            {resumen[
                              e._id
                            ] && (
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">
                                  ⭐{' '}
                                  {
                                    resumen[
                                      e._id
                                    ]
                                      .estrellas
                                  }
                                </Badge>

                                <Badge variant="outline">
                                  📝{' '}
                                  {
                                    resumen[
                                      e._id
                                    ]
                                      .tareas
                                  }
                                  /
                                  {
                                    resumen[
                                      e._id
                                    ]
                                      .totalDias
                                  }
                                </Badge>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Grades */}
                        {competencias.map(
                          (c) => {
                            const nota =
                              notas[
                                e._id
                              ]?.[
                                c._id
                              ]

                            return (
                              <td
                                key={
                                  c._id
                                }
                                className="px-3 py-5 text-center"
                              >
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  defaultValue={
                                    nota ??
                                    ''
                                  }
                                  onBlur={(
                                    event
                                  ) =>
                                    setNota(
                                      e._id,
                                      c._id,
                                      Number(
                                        event
                                          .target
                                          .value
                                      )
                                    )
                                  }
                                  className={`h-11 w-20 rounded-xl border px-3 text-center text-sm font-semibold shadow-sm outline-none transition focus:ring-2 focus:ring-primary ${getColorNota(
                                    nota
                                  )}`}
                                />
                              </td>
                            )
                          }
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Footer Actions */}
          <div className="sticky bottom-4 flex justify-end">
            <Button
              onClick={guardar}
              size="lg"
              className="h-12 rounded-xl px-8 shadow-lg"
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