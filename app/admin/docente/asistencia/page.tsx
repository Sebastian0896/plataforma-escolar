'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  ClipboardCheck,
  Pencil,
  Trash2,
  Save,
  CalendarDays,
  BookOpen,
  GraduationCap,
} from 'lucide-react'

export default function AsistenciaPage() {
  const { data: session } = useSession()

  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [periodo, setPeriodo] = useState('P1')

  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [mensaje, setMensaje] = useState('')

  const [editando, setEditando] = useState<string | null>(null)

  const [editValues, setEditValues] = useState({
    presente: true,
    observacion: '',
  })

  const cargar = () => {
    if (grado && materia) {
      Promise.all([
        fetch(`/api/docente/estudiantes?grado=${grado}`).then(r => r.json()),
        fetch(`/api/asistencia?grado=${grado}&materia=${materia}&fecha=${fecha}`).then(r => r.json()),
      ]).then(([est, reg]) => {
        const estList = Array.isArray(est) ? est : est.estudiantes || []
        const regList = Array.isArray(reg) ? reg : []

        const merged = estList.map((e: any) => {
          const r = regList.find((x: any) => x.estudianteId === e._id)

          return {
            ...e,
            ...r,
            regId: r?._id || null,
          }
        })

        setEstudiantes(merged)
      })
    }
  }

  useEffect(() => {
    cargar()
  }, [grado, materia, fecha])

  const guardar = async () => {
    const data = estudiantes.map(e => ({
      estudianteId: e._id,
      presente:
        (document.getElementById(`pres-${e._id}`) as HTMLInputElement)?.checked ??
        true,
      observacion:
        (document.getElementById(`obs-${e._id}`) as HTMLInputElement)?.value || '',
    }))

    const res = await fetch('/api/asistencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grado,
        materia,
        fecha,
        periodo,
        registros: data,
      }),
    })

    setMensaje(res.ok ? '✅ Asistencia guardada correctamente' : '❌ Error al guardar')

    setTimeout(() => setMensaje(''), 2500)

    cargar()
  }

  const iniciarEdicion = (e: any) => {
    setEditando(e._id)

    setEditValues({
      presente: e.presente !== undefined ? e.presente : true,
      observacion: e.observacion || '',
    })
  }

  const guardarEdicion = async () => {
    if (!editando) return

    await fetch('/api/asistencia', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editando,
        ...editValues,
      }),
    })

    setEditando(null)

    cargar()
  }

  const eliminarRegistro = async (id: string) => {
    if (!id || !confirm('¿Eliminar este registro?')) return

    await fetch(`/api/asistencia?id=${id}`, {
      method: 'DELETE',
    })

    cargar()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          <ClipboardCheck className="h-7 w-7 text-primary" />
          Asistencia
        </h1>

        <p className="text-sm text-muted-foreground">
          Registro y control de asistencia diaria de estudiantes.
        </p>
      </div>

      {/* Filtros */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">
            Filtros de asistencia
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                Grado
              </label>

              <Select value={grado} onValueChange={setGrado}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar grado" />
                </SelectTrigger>

                <SelectContent>
                  {(session?.user?.grados || []).map((g: string) => (
                    <SelectItem key={g} value={g}>
                      {g?.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                Materia
              </label>

              <Select value={materia} onValueChange={setMateria}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>

                <SelectContent>
                  {session?.user?.materias?.map((m: string) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                Fecha
              </label>

              <Input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>

              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="P1">P1</SelectItem>
                  <SelectItem value="P2">P2</SelectItem>
                  <SelectItem value="P3">P3</SelectItem>
                  <SelectItem value="P4">P4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mensaje */}
      {mensaje && (
        <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30">
          <CardContent className="py-3 text-sm font-medium text-green-700 dark:text-green-300">
            {mensaje}
          </CardContent>
        </Card>
      )}

      {/* Tabla */}
      {grado && materia && estudiantes.length > 0 && (
        <>
          <Card className="overflow-hidden border-border/60 shadow-sm">
            <CardHeader className="border-b bg-muted/40">
              <CardTitle className="text-base font-semibold">
                Registro de estudiantes
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Estudiante
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Presente
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Observación
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {estudiantes.map((e: any) =>
                      editando === e._id ? (
                        <tr
                          key={e._id}
                          className="border-b bg-primary/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                            {e.nombre}
                          </td>

                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={editValues.presente}
                              onChange={ev =>
                                setEditValues({
                                  ...editValues,
                                  presente: ev.target.checked,
                                })
                              }
                              className="h-5 w-5"
                            />
                          </td>

                          <td className="px-6 py-4">
                            <Input
                              value={editValues.observacion}
                              onChange={ev =>
                                setEditValues({
                                  ...editValues,
                                  observacion: ev.target.value,
                                })
                              }
                              placeholder="Agregar observación..."
                            />
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                onClick={guardarEdicion}
                              >
                                <Save className="mr-2 h-4 w-4" />
                                Guardar
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditando(null)}
                              >
                                Cancelar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={e._id}
                          className="border-b transition-colors hover:bg-muted/30"
                        >
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                            {e.nombre}
                          </td>

                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                e.presente !== false
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              }`}
                            >
                              {e.presente !== false ? 'Presente' : 'Ausente'}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {e.observacion || 'Sin observaciones'}
                          </td>

                          <td className="px-6 py-4">
                            {e.regId && (
                              <div className="flex justify-end gap-2">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => iniciarEdicion(e)}
                                >
                                  <Pencil className="h-4 w-4 text-blue-600" />
                                </Button>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => eliminarRegistro(e.regId)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Guardar */}
          <div className="flex justify-end">
            <Button size="lg" onClick={guardar}>
              <Save className="mr-2 h-4 w-4" />
              Guardar asistencia
            </Button>
          </div>
        </>
      )}
    </div>
  )
}