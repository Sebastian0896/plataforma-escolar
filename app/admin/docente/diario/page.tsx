// app/admin/docente/diario/page.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { CalendarDays, Sparkles, Search, Filter } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  const [periodo, setPeriodo] = useState('P1')
  
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
    if (grado && materia) {
      cargarDatos()
    } else {
      setEstudiantes([])
      setRegistros({})
    }
  }, [grado, materia, fecha, periodo])

  const cargarDatos = async () => {
    setLoading(true)
    try {
      const [estudiantesRes, registrosRes] = await Promise.all([
        fetch(`/api/docente/estudiantes?grado=${grado}`).then(r => r.json()),
        fetch(`/api/diario?grado=${grado}&materia=${materia}&fecha=${fecha}&periodo=${periodo}`).then(r => r.json()),
      ])
      
      const estudiantesList = Array.isArray(estudiantesRes) ? estudiantesRes : estudiantesRes.estudiantes || []
      setEstudiantes(estudiantesList)
      
      // ✅ Convertir a objeto en lugar de Map
      const registrosObj: Record<string, RegistroDiario> = {}
      const registrosList = Array.isArray(registrosRes) ? registrosRes : []
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
      } else {
        toast.error('Error al guardar')
      }
    } catch (error) {
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
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Configuración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Grado</Label>
              <Select value={grado} onValueChange={setGrado}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar grado" />
                </SelectTrigger>
                <SelectContent>
                  {gradosDocente.map((g: string) => (
                    <SelectItem key={g} value={g}>{g?.replace('-', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Materia</Label>
              <Select value={materia} onValueChange={setMateria}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  {materiasDocente.map((m: string) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['P1','P2','P3','P4'].map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
          {/* Barra de acciones y estadísticas */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              <Card>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">{estudiantes.length}</p>
                  </div>
                  <div className="text-2xl">👥</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Tareas</p>
                    <p className="text-xl font-bold">{tareasEntregadas}</p>
                  </div>
                  <div className="text-2xl">📚</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Participación</p>
                    <p className="text-xl font-bold">{promedioParticipacion.toFixed(1)}</p>
                  </div>
                  <div className="text-2xl">⭐</div>
                </CardContent>
              </Card>
            </div>
            
            <Button onClick={guardarTodos} disabled={saving} className="gap-2 w-full sm:w-auto">
              <Sparkles className="h-4 w-4" />
              {saving ? 'Guardando...' : 'Guardar Todo'}
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar estudiante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filtroAsistencia} onValueChange={setFiltroAsistencia}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="presente">Con tarea</SelectItem>
                <SelectItem value="ausente">Sin tarea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vista Kanban */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {estudiantesFiltrados.map((estudiante) => {
                // ✅ Obtener valores directamente del objeto registros
                const registro = registros[estudiante.id] || {
                  estudianteId: estudiante.id,
                  participacion: 0,
                  tarea: false,
                  observacion: '',
                  puntosExtra: 0,
                }
                
                return (
                  <Card 
                    key={estudiante.id} 
                    className="overflow-hidden hover:shadow-md transition-all group"
                  >
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/20 text-primary font-bold">
                            {estudiante.nombre.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{estudiante.nombre}</h3>
                          <p className="text-xs text-muted-foreground">{estudiante.grado}</p>
                        </div>
                        <Badge variant={registro.tarea ? 'default' : 'secondary'} className="gap-1">
                          {registro.tarea ? '✓ Tarea' : '○ Pendiente'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <Label className="text-xs text-muted-foreground">Participación</Label>
                          <span className="font-medium text-primary">{registro.participacion}/5</span>
                        </div>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <button
                              key={star}
                              onClick={() => actualizarCampo(estudiante.id, 'participacion', star)}
                              className={`text-xl transition-all hover:scale-110 ${
                                star <= registro.participacion ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Puntos extra</Label>
                        <div className="flex flex-wrap gap-1">
                          {[0,2,4,6,8,10].map(val => (
                            <button
                              key={val}
                              onClick={() => actualizarCampo(estudiante.id, 'puntosExtra', val)}
                              className={`px-2 py-1 text-xs rounded-md transition-all ${
                                registro.puntosExtra === val
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted hover:bg-muted/80'
                              }`}
                            >
                              +{val}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <Label className="text-sm">Tarea entregada</Label>
                        <Switch
                          checked={registro.tarea}
                          onCheckedChange={(checked) => actualizarCampo(estudiante.id, 'tarea', checked)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Observación</Label>
                        <Select
                          value={registro.observacion}
                          onValueChange={(value) => actualizarCampo(estudiante.id, 'observacion', value)}
                        >
                          <SelectTrigger className={`${getObservacionStyle(registro.observacion)} border-0`}>
                            <SelectValue placeholder="Sin observación" />
                          </SelectTrigger>
                          <SelectContent>
                            {OBSERVACIONES.map(obs => (
                              <SelectItem key={obs.value} value={obs.value}>
                                {obs.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    
                    {/* ✅ Barra de progreso que SÍ se actualiza */}
                    <div className="px-4 pb-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progreso</span>
                          <span>{Math.round((registro.participacion / 5) * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300 ease-in-out"
                            style={{ 
                              width: `${(registro.participacion / 5) * 100}%`,
                              transition: 'width 0.3s ease-in-out'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}