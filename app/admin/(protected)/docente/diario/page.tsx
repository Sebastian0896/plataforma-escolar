// app/admin/docente/diario/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { CalendarDays, Sparkles, Search, Filter, Save } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { redirect } from 'next/navigation'
import { ConfiguracionAcademica } from '@/components/diario/ConfiguracionAcademica'
import obtenerPeriodoActual from '@/lib/obtenerPeriodoActual'

const OBSERVACIONES = [
  { value: '', label: 'Sin observación', color: 'default' },
  { value: 'Participación activa', label: '🌟 Participación activa', color: 'green' },
  { value: 'Excelente trabajo en equipo', label: '🤝 Excelente trabajo en equipo', color: 'green' },
  { value: 'Muy buen comportamiento', label: '⭐ Muy buen comportamiento', color: 'green' },
  { value: 'Trabajó de forma independiente', label: '💪 Trabajó independiente', color: 'blue' },
  { value: 'No participó', label: '😶 No participó', color: 'yellow' },
  { value: 'No trajo el material', label: '📚 No trajo el material', color: 'orange' },
  { value: 'Llegó tarde', label: '⏰ Llegó tarde', color: 'orange' },
  { value: 'Entregó tarea incompleta', label: '📝 Tarea incompleta', color: 'red' },
  { value: 'Necesita mejorar atención', label: '👀 Necesita mejorar atención', color: 'red' },
]

interface Estudiante {
  id: string
  nombre: string
  email: string
  grado: string
}

interface RegistroDiario {
  estudianteId: string
  participacion: number
  tarea: boolean
  observacion: string
  puntosExtra: number
}



export default function DiarioPage() {
  const { data: session } = useSession()
  
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  //const [periodo, setPeriodo] = useState('P1')
  const [periodo, setPeriodo] = useState(
    obtenerPeriodoActual()
  )
  
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  // ✅ Cambiar a Record<string, RegistroDiario> en lugar de Map
  const [registros, setRegistros] = useState<Record<string, RegistroDiario>>({})
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroAsistencia, setFiltroAsistencia] = useState('todos')
  const [saving, setSaving] = useState(false)

  const gradosDocente = session?.user?.grados || []
  const materiasDocente = session?.user?.materias || []
  
  useEffect(() => {
  // Limpiar estados si falta información
  if (!grado || !materia) {
    queueMicrotask(() => {
      setEstudiantes([])
      setRegistros({})
    })
    return
  }

  const cargarDatos = async () => {
    setLoading(true)

    try {
      const [estudiantesRes, registrosRes] = await Promise.all([
        fetch(`/api/docente/estudiantes?grado=${grado}`).then((r) =>
          r.json()
        ),

        fetch(
          `/api/diario?grado=${grado}&materia=${materia}&fecha=${fecha}&periodo=${periodo}`
        ).then((r) => r.json()),
      ])

      const estudiantesList = Array.isArray(estudiantesRes)
        ? estudiantesRes
        : estudiantesRes.estudiantes || []

      setEstudiantes(estudiantesList)

      // Convertir registros a objeto
      const registrosObj: Record<string, RegistroDiario> = {}

      const registrosList = Array.isArray(registrosRes)
        ? registrosRes
        : []

      registrosList.forEach((reg: any) => {
        registrosObj[reg.estudianteId] = {
          estudianteId: reg.estudianteId,
          participacion: reg.participacion ?? 0,
          tarea: reg.tarea ?? false,
          observacion: reg.observacion ?? '',
          puntosExtra: reg.puntosExtra ?? 0,
        }
      })

      setRegistros(registrosObj)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  cargarDatos()
  }, [grado, materia, fecha, periodo])


  // ✅ Actualizar campo - ahora con objeto
  const actualizarCampo = (estudianteId: string, campo: keyof RegistroDiario, valor: any) => {
    setRegistros(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        estudianteId,
        participacion: prev[estudianteId]?.participacion ?? 0,
        tarea: prev[estudianteId]?.tarea ?? false,
        observacion: prev[estudianteId]?.observacion ?? '',
        puntosExtra: prev[estudianteId]?.puntosExtra ?? 0,
        [campo]: valor
      }
    }))
  }

  const guardarTodos = async () => {
    if (estudiantes.length === 0) {
      toast.error('No hay estudiantes para guardar')
      return
    }
    
    setSaving(true)
    const data = estudiantes.map(e => ({
      estudianteId: e.id,
      participacion: registros[e.id]?.participacion || 0,
      tarea: registros[e.id]?.tarea || false,
      observacion: registros[e.id]?.observacion || '',
      puntosExtra: registros[e.id]?.puntosExtra || 0,
    }))

    try {
      const res = await fetch('/api/diario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grado, materia, fecha, periodo, registros: data }),
      })
      
      if (res.ok) {
        toast.success('Diario guardado correctamente')
        setTimeout(() => {
          redirect("/admin/docente/estudiantes")
        }, 2500);
      } else {
        toast.error('Error al guardar')
      }
    } catch (error) {
      console.error("SG - ERROR: ", error)
      toast.error('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const estudiantesFiltrados = estudiantes.filter(e => {
    if (searchTerm && !e.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false
    const registro = registros[e.id]
    if (filtroAsistencia === 'presente' && registro?.tarea === false) return false
    if (filtroAsistencia === 'ausente' && registro?.tarea === true) return false
    return true
  })

  const totalRegistros = Object.values(registros).length
  const tareasEntregadas = Object.values(registros).filter(r => r.tarea).length
  const promedioParticipacion = totalRegistros > 0 
    ? Object.values(registros).reduce((acc, r) => acc + r.participacion, 0) / totalRegistros 
    : 0

  const getObservacionStyle = (observacion: string) => {
    const obs = OBSERVACIONES.find(o => o.value === observacion)
    if (!obs) return 'bg-gray-100 text-gray-700'
    switch (obs.color) {
      case 'green': return 'bg-green-100 text-green-700'
      case 'blue': return 'bg-blue-100 text-blue-700'
      case 'yellow': return 'bg-yellow-100 text-yellow-700'
      case 'orange': return 'bg-orange-100 text-orange-700'
      case 'red': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Diario del Docente</h1>
        </div>
      </div>

      {/* Panel de configuración */}

      <ConfiguracionAcademica
        grado={grado}
        setGrado={setGrado}
        materia={materia}
        setMateria={setMateria}
        fecha={fecha}
        setFecha={setFecha}
        periodo={periodo}
        setPeriodo={setPeriodo}
        gradosDocente={gradosDocente}
        materiasDocente={materiasDocente}
        obtenerPeriodoActual={obtenerPeriodoActual}
      />

      {(!grado || !materia) && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Selecciona un grado y una materia para comenzar</p>
          </CardContent>
        </Card>
      )}

      {grado && materia && estudiantes.length === 0 && !loading && (
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800">
          <CardContent className="py-8 text-center">
            <p className="text-yellow-700 dark:text-yellow-400">
              ⚠️ No hay estudiantes registrados en el grado {grado?.replace('-', ' ')}
            </p>
          </CardContent>
        </Card>
      )}

      {grado && materia && estudiantes.length > 0 && (
        <>
          {/* CONTENT */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" />
                Cargando estudiantes...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-3 gap-5">
              {estudiantesFiltrados.map((estudiante) => {
                const registro =
                  registros[estudiante.id] || {
                    estudianteId:
                      estudiante.id,
                    participacion: 0,
                    tarea: false,
                    observacion: '',
                    puntosExtra: 0,
                  }

                return (
                  <Card
                    key={estudiante.id}
                    className="overflow-hidden border shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* HEADER */}
                    <div className="border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 border border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {estudiante.nombre
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold">
                            {estudiante.nombre}
                          </h3>

                          <p className="text-xs text-muted-foreground">
                            {estudiante.grado}
                          </p>
                        </div>

                        <Badge
                          variant={
                            registro.tarea
                              ? 'default'
                              : 'secondary'
                          }
                          className="shrink-0"
                        >
                          {registro.tarea
                            ? '✓'
                            : '○'}
                        </Badge>
                      </div>
                    </div>

                    {/* BODY */}
                    <CardContent className="space-y-5 p-4">
                      
                      {/* Participación */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-muted-foreground">
                            Participación
                          </Label>

                          <span className="text-sm font-bold text-primary">
                            {registro.participacion}/5
                          </span>
                        </div>

                        <div className="flex justify-between gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() =>
                                actualizarCampo(
                                  estudiante.id,
                                  'participacion',
                                  star
                                )
                              }
                              className={`flex-1 rounded-xl border py-2 text-lg transition-all ${
                                star <=
                                registro.participacion
                                  ? 'border-yellow-300 bg-yellow-50 text-yellow-500'
                                  : 'bg-muted/40 text-muted-foreground hover:bg-muted'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Puntos */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Puntos extra
                        </Label>

                        <div className="grid grid-cols-3 gap-2">
                          {[0,2,4,6,8,10].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() =>
                                actualizarCampo(
                                  estudiante.id,
                                  'puntosExtra',
                                  val
                                )
                              }
                              className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all ${
                                registro.puntosExtra === val
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted/30 hover:bg-muted'
                              }`}
                            >
                              +{val}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tarea */}
                      <div className="flex items-center justify-between rounded-xl border bg-muted/20 p-3">
                        <div>
                          <p className="text-sm font-medium">
                            Tarea entregada
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Marcar entrega
                          </p>
                        </div>

                        <Switch
                          checked={registro.tarea}
                          onCheckedChange={(checked) =>
                            actualizarCampo(
                              estudiante.id,
                              'tarea',
                              checked
                            )
                          }
                        />
                      </div>

                      {/* Observación */}
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">
                          Observación
                        </Label>

                        <Select
                          value={registro.observacion}
                          onValueChange={(value) =>
                            actualizarCampo(
                              estudiante.id,
                              'observacion',
                              value
                            )
                          }
                        >
                          <SelectTrigger
                            className={`${getObservacionStyle(
                              registro.observacion
                            )} border-0`}
                          >
                            <SelectValue placeholder="Sin observación" />
                          </SelectTrigger>

                          <SelectContent>
                            {OBSERVACIONES.map((obs) => (
                              <SelectItem
                                key={obs.value}
                                value={obs.value}
                              >
                                {obs.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progreso</span>

                          <span>
                            {Math.round(
                              (registro.participacion /
                                5) *
                                100
                            )}
                            %
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{
                              width: `${
                                (registro.participacion /
                                  5) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* MOBILE FLOATING SAVE */}
          <div className="bg-background/95 backdrop-blur md:hidden">
            <Button
              onClick={guardarTodos}
              disabled={saving}
              className="w-full gap-2 rounded-xl text-sm font-semibold shadow-lg"
            >
              <Save className="h-4 w-4" />

              {saving
                ? 'Guardando cambios...'
                : 'Guardar Todo'}
            </Button>
          </div>

          {/* DESKTOP FOOTER */}
          <div className="hidden md:flex">
            <Button
              onClick={guardarTodos}
              disabled={saving}
              size="lg"
              className="gap-2 rounded-xl px-4 shadow-sm"
            >
              <Save className="h-4 w-4" />
              {saving
                ? 'Guardando...'
                : 'Guardar Todo'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}