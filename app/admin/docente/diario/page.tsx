'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import {
  CalendarDays,
  ClipboardCheck,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react'

import { useScreenSize } from '@/lib/hooks/useScreenSize'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const OBSERVACIONES = [
  'Participación activa',
  'Ayudó a un compañero',
  'Excelente trabajo en equipo',
  'No trajo el material',
  'Llegó tarde',
  'No participó',
  'Entregó tarea incompleta',
  'Muy buen comportamiento',
  'Necesita mejorar atención',
  'Trabajó de forma independiente',
]

export default function DiarioPage() {
  const { data: session } = useSession()
  const { isMobile } = useScreenSize()

  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [periodo, setPeriodo] = useState('P1')

  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [registros, setRegistros] = useState<any[]>([])

  const [mensaje, setMensaje] = useState('')

  const gradosDocente = session?.user?.grados || []

  useEffect(() => {
    if (grado && materia && fecha) {
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then((r) => r.json())
        .then((d) =>
          setEstudiantes(
            Array.isArray(d)
              ? d
              : d.estudiantes || []
          )
        )

      fetch(
        `/api/diario?grado=${grado}&materia=${materia}&fecha=${fecha}`
      )
        .then((r) => r.json())
        .then((d) =>
          setRegistros(Array.isArray(d) ? d : [])
        )
    }
  }, [grado, materia, fecha])

  const getRegistro = (estudianteId: string) =>
    registros.find(
      (r) => r.estudianteId === estudianteId
    ) || {}

  const guardar = async () => {
    const data = estudiantes.map((e) => ({
      estudianteId: e._id,
      participacion: Number(
        (
          document.getElementById(
            `part-${e._id}`
          ) as HTMLInputElement
        )?.value || 0
      ),
      tarea:
        (
          document.getElementById(
            `tarea-${e._id}`
          ) as HTMLInputElement
        )?.checked || false,
      observacion:
        (
          document.getElementById(
            `obs-${e._id}`
          ) as HTMLSelectElement
        )?.value || '',
      puntosExtra: Number(
        (
          document.getElementById(
            `extra-${e._id}`
          ) as HTMLInputElement
        )?.value || 0
      ),
    }))

    const res = await fetch('/api/diario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grado,
        materia,
        fecha,
        periodo,
        registros: data,
      }),
    })

    setMensaje(
      res.ok
        ? '✅ Diario guardado correctamente'
        : '❌ Error al guardar'
    )

    setTimeout(() => setMensaje(''), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-primary" />

          <h1 className="text-3xl font-bold tracking-tight">
            Diario del Docente
          </h1>
        </div>

        <p className="text-muted-foreground">
          Registra participación, tareas y observaciones diarias de los estudiantes.
        </p>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">
            Configuración del registro
          </CardTitle>
        </CardHeader>

        <CardContent>
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
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">
                  Seleccionar grado
                </option>

                {gradosDocente.map((g: string) => (
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
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">
                  Seleccionar materia
                </option>

                {session?.user?.materias?.map(
                  (m: string) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Fecha
              </label>

              <input
                type="date"
                value={fecha}
                onChange={(e) =>
                  setFecha(e.target.value)
                }
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
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
                className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
                <option value="P4">P4</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message */}
      {mensaje && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300">
          {mensaje}
        </div>
      )}

      {/* Content */}
      {grado &&
        materia &&
        estudiantes.length > 0 && (
          <>
            {/* Mobile */}
            {isMobile ? (
              <div className="space-y-4">
                {estudiantes.map((e) => {
                  const reg = getRegistro(e._id)

                  return (
                    <Card
                      key={e._id}
                      className="shadow-sm"
                    >
                      <CardContent className="space-y-4 p-5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">
                              {e.nombre}
                            </h3>

                            <p className="text-xs text-muted-foreground">
                              Registro diario
                            </p>
                          </div>

                          <Badge variant="secondary">
                            <Users className="mr-1 h-3 w-3" />
                            Estudiante
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {/* Participacion */}
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                              Participación
                            </label>

                            <input
                              id={`part-${e._id}`}
                              type="number"
                              min="0"
                              max="5"
                              defaultValue={
                                reg.participacion ?? 0
                              }
                              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
                            />
                          </div>

                          {/* Extra */}
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                              Puntos extra
                            </label>

                            <input
                              id={`extra-${e._id}`}
                              type="number"
                              min="0"
                              max="10"
                              defaultValue={
                                reg.puntosExtra ?? 0
                              }
                              className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
                            />
                          </div>
                        </div>

                        {/* Tarea */}
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="text-sm font-medium">
                              Tarea entregada
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Confirmar entrega
                            </p>
                          </div>

                          <input
                            id={`tarea-${e._id}`}
                            type="checkbox"
                            defaultChecked={
                              reg.tarea || false
                            }
                            className="h-5 w-5"
                          />
                        </div>

                        {/* Observacion */}
                        <div className="space-y-2">
                          <label className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            Observación
                          </label>

                          <select
                            id={`obs-${e._id}`}
                            defaultValue={
                              reg.observacion || ''
                            }
                            className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
                          >
                            <option value="">
                              Sin observación
                            </option>

                            {OBSERVACIONES.map((o) => (
                              <option
                                key={o}
                                value={o}
                              >
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              /* Desktop */
              <Card className="overflow-hidden shadow-sm">
                <CardHeader className="border-b bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardCheck className="h-5 w-5" />
                    Registro de estudiantes
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[260px]">
                          Estudiante
                        </TableHead>

                        <TableHead className="text-center">
                          Participación
                        </TableHead>

                        <TableHead className="text-center">
                          Tarea
                        </TableHead>

                        <TableHead className="text-center">
                          Extra
                        </TableHead>

                        <TableHead>
                          Observación
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {estudiantes.map((e) => {
                        const reg = getRegistro(e._id)

                        return (
                          <TableRow key={e._id}>
                            <TableCell className="font-medium">
                              {e.nombre}
                            </TableCell>

                            {/* Participacion */}
                            <TableCell className="text-center">
                              <input
                                id={`part-${e._id}`}
                                type="number"
                                min="0"
                                max="5"
                                defaultValue={
                                  reg.participacion ??
                                  0
                                }
                                className="h-9 w-20 rounded-lg border bg-background px-2 text-center text-sm"
                              />
                            </TableCell>

                            {/* Tarea */}
                            <TableCell className="text-center">
                              <input
                                id={`tarea-${e._id}`}
                                type="checkbox"
                                defaultChecked={
                                  reg.tarea || false
                                }
                                className="h-5 w-5"
                              />
                            </TableCell>

                            {/* Extra */}
                            <TableCell className="text-center">
                              <input
                                id={`extra-${e._id}`}
                                type="number"
                                min="0"
                                max="10"
                                defaultValue={
                                  reg.puntosExtra ??
                                  0
                                }
                                className="h-9 w-20 rounded-lg border bg-background px-2 text-center text-sm"
                              />
                            </TableCell>

                            {/* Observacion */}
                            <TableCell>
                              <select
                                id={`obs-${e._id}`}
                                defaultValue={
                                  reg.observacion ||
                                  ''
                                }
                                className="h-9 w-full rounded-lg border bg-background px-3 text-sm"
                              >
                                <option value="">
                                  Sin observación
                                </option>

                                {OBSERVACIONES.map(
                                  (o) => (
                                    <option
                                      key={o}
                                      value={o}
                                    >
                                      {o}
                                    </option>
                                  )
                                )}
                              </select>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Save */}
            <div className="flex justify-end">
              <Button
                onClick={guardar}
                size="lg"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Guardar Diario
              </Button>
            </div>
          </>
        )}
    </div>
  )
}