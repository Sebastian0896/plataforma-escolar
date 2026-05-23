// app/admin/docente/asistencia/lista/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Check, X, Users, AlertCircle, Loader2, Save, Search } from 'lucide-react'
import { toast } from 'sonner'
import { FiltrosClaseRapidos } from '@/components/asistencia/FiltrosClaseRapidos'
import obtenerPeriodoActual from '@/lib/obtenerPeriodoActual'


export default function TomarAsistenciaPage() {
  const { data: session } = useSession()
  
  // Estados de configuración de la sesión de clase
  const [gradoActivo, setGradoActivo] = useState<string>('')
  const [materia, setMateria] = useState<string>('')
  //const [periodo, setPeriodo] = useState<string>('P1')
  const [periodo, setPeriodo] = useState(obtenerPeriodoActual())
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0])
  
  // Estados para estudiantes y UI
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [estudiantesFiltrados, setEstudiantesFiltrados] = useState<any[]>([])
  const [asistencias, setAsistencias] = useState<Record<string, { presente: boolean; observacion: string }>>({})
  const [cargandoEstudiantes, setCargandoEstudiantes] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [ultimoGuardado, setUltimoGuardado] = useState<string | null>(null)

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroAsistencia, setFiltroAsistencia] = useState<string>('todos') // todos, presente, ausente

  const gradosDisponibles = session?.user?.grados || []
  const materiasDisponibles = session?.user?.materias || []

  // Inicializar el primer grado disponible cuando cargue la sesión
  useEffect(() => {
    if (gradosDisponibles.length > 0 && !gradoActivo) {
      setGradoActivo(gradosDisponibles[0])
    }
    if (materiasDisponibles.length > 0 && !materia) {
      setMateria(materiasDisponibles[0])
    }
  }, [gradosDisponibles, materiasDisponibles])

  // Cargar estudiantes asignados a Postgres
  const cargarEstudiantesDelGrado = useCallback(async () => {
    if (!gradoActivo) return

    setCargandoEstudiantes(true)
    try {
      const res = await fetch(`/api/asistencia/estudiantes?grado=${encodeURIComponent(gradoActivo)}`)
      if (!res.ok) throw new Error('Error al traer estudiantes')
      const data = await res.json()
      
      setEstudiantes(data)
      
      // Inicializar el estado de asistencia predeterminado: Todos PRESENTES
      const estadoInicial: Record<string, { presente: boolean; observacion: string }> = {}
      data.forEach((est: any) => {
        // Buscar si ya existe asistencia guardada para esta fecha/materia/periodo
        estadoInicial[est.id] = { presente: true, observacion: '' }
      })
      setAsistencias(estadoInicial)
    } catch (error) {
      console.error("Error cargando alumnos:", error)
      toast.error('Error al cargar los estudiantes')
      setEstudiantes([])
    } finally {
      setCargandoEstudiantes(false)
    }
  }, [gradoActivo])

  // Cargar asistencias existentes para la fecha seleccionada
  const cargarAsistenciasExistentes = useCallback(async () => {
    if (!gradoActivo || !materia) return

    try {
      const res = await fetch(`/api/asistencia?grado=${encodeURIComponent(gradoActivo)}&materia=${encodeURIComponent(materia)}&fecha=${fecha}&periodo=${periodo}`)
      if (res.ok) {
        const data = await res.json()
        if (data && data.length > 0) {
          const estadoExistente: Record<string, { presente: boolean; observacion: string }> = {}
          data.forEach((reg: any) => {
            estadoExistente[reg.estudianteId] = {
              presente: reg.presente ?? true,
              observacion: reg.observacion || ''
            }
          })
          setAsistencias(prev => ({ ...prev, ...estadoExistente }))
        }
      }
    } catch (error) {
      console.error('Error cargando asistencias existentes:', error)
    }
  }, [gradoActivo, materia, fecha, periodo])

  // Cargar estudiantes cuando cambie el grado
  useEffect(() => {
    cargarEstudiantesDelGrado()
  }, [cargarEstudiantesDelGrado])

  // Cargar asistencias existentes cuando cambie materia, fecha o periodo
  useEffect(() => {
    if (estudiantes.length > 0) {
      cargarAsistenciasExistentes()
    }
  }, [materia, fecha, periodo, estudiantes.length, cargarAsistenciasExistentes])

  // Filtrar estudiantes por búsqueda y estado de asistencia
  useEffect(() => {
    let filtrados = [...estudiantes]
    
    // Filtro por búsqueda
    if (searchTerm) {
      filtrados = filtrados.filter(est => 
        est.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filtro por estado de asistencia
    if (filtroAsistencia === 'presente') {
      filtrados = filtrados.filter(est => asistencias[est.id]?.presente === true)
    } else if (filtroAsistencia === 'ausente') {
      filtrados = filtrados.filter(est => asistencias[est.id]?.presente === false)
    }
    
    setEstudiantesFiltrados(filtrados)
  }, [estudiantes, searchTerm, filtroAsistencia, asistencias])

  // Swichear el estado de asistencia individual
  const toggleAsistencia = (estudianteId: string) => {
    setAsistencias(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        presente: !prev[estudianteId].presente
      }
    }))
  }

  // Marcar todos como presentes
  const marcarTodosPresentes = () => {
    const nuevos: Record<string, { presente: boolean; observacion: string }> = {}
    estudiantes.forEach(est => {
      nuevos[est.id] = { presente: true, observacion: asistencias[est.id]?.observacion || '' }
    })
    setAsistencias(nuevos)
    toast.success('Todos los estudiantes marcados como presentes')
  }

  // Marcar todos como ausentes
  const marcarTodosAusentes = () => {
    const nuevos: Record<string, { presente: boolean; observacion: string }> = {}
    estudiantes.forEach(est => {
      nuevos[est.id] = { presente: false, observacion: asistencias[est.id]?.observacion || '' }
    })
    setAsistencias(nuevos)
    toast.success('Todos los estudiantes marcados como ausentes')
  }

  // Modificar observaciones
  const cambiarObservacion = (estudianteId: string, obs: string) => {
    setAsistencias(prev => ({
      ...prev,
      [estudianteId]: { ...prev[estudianteId], observacion: obs }
    }))
  }

  // Guardar asistencia
    const guardarAsistencia = async () => {
    // Evitar guardados duplicados rápidos
    if (guardando) return
    
    // Evitar guardar la misma fecha múltiples veces
    const key = `${gradoActivo}-${materia}-${fecha}-${periodo}`
    if (ultimoGuardado === key) {
        toast.info('Ya se guardó esta asistencia recientemente')
        return
    }

    setGuardando(true)
    try {
      const payload = estudiantes.map(est => ({
        estudianteId: est.id,
        grado: gradoActivo,
        materia,
        periodo,
        fecha,
        presente: asistencias[est.id]?.presente ?? true,
        observacion: asistencias[est.id]?.observacion || '',
      }))

      const res = await fetch('/api/asistencia/guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ asistencias: payload })
      })

      if (!res.ok) throw new Error('Error al guardar')
      
      setUltimoGuardado(key)
      toast.success('¡Asistencia guardada exitosamente!')
    } catch (error) {
      console.error(error)
      toast.error('Hubo un inconveniente al procesar el guardado')
    } finally {
      setGuardando(false)
    }
  }

  const totalEstudiantes = estudiantes.length
  const presentes = Object.values(asistencias).filter(a => a.presente).length
  const ausentes = totalEstudiantes - presentes

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-2 sm:px-4 py-4 pb-16">
      {/* Encabezado */}
      <div>
        <h1 className="text-xl md:text-2xl font-black flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" /> Registro de Asistencia
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Selecciona el grado, materia y registra la asistencia diaria
        </p>
      </div>

      {/* Controladores de Clase */}
      <FiltrosClaseRapidos
          materia={materia}
          setMateria={setMateria}
          materiasDisponibles={materiasDisponibles}
          periodo={periodo}
          setPeriodo={setPeriodo}
          fecha={fecha}
          setFecha={setFecha}
          gradoActivo={gradoActivo}
          setGradoActivo={setGradoActivo}
          gradosDisponibles={gradosDisponibles}
          obtenerPeriodoActual={obtenerPeriodoActual}
        />

      {/* Tarjetas de resumen */}
      {estudiantes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 dark:text-green-400">Presentes</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">{presentes}</p>
              </div>
              <Check className="h-8 w-8 text-green-500 opacity-70" />
            </CardContent>
          </Card>
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-red-700 dark:text-red-400">Ausentes</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-400">{ausentes}</p>
              </div>
              <X className="h-8 w-8 text-red-500 opacity-70" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalEstudiantes}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lista de estudiantes */}
      {gradosDisponibles.length > 0 ? (
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="p-4 bg-muted/30 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  Lista de {gradoActivo?.replace('-', ' ')}
                </CardTitle>
                <CardDescription className="text-[11px]">
                  {estudiantesFiltrados.length} de {estudiantes.length} estudiantes
                </CardDescription>
              </div>
              
              {/* Barra de búsqueda y filtros */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar estudiante..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8 pl-7 text-base w-full sm:w-48"
                  />
                </div>
                <Select value={filtroAsistencia} onValueChange={setFiltroAsistencia}>
                  <SelectTrigger className="h-8 text-xs w-full sm:w-32">
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="presente">Presentes</SelectItem>
                    <SelectItem value="ausente">Ausentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          {/* Botones de acción rápida */}
          {estudiantes.length > 0 && (
            <div className="p-3 border-b bg-muted/20 flex gap-2">
              <Button size="sm" variant="outline" onClick={marcarTodosPresentes} className="h-8 text-xs">
                <Check className="h-3 w-3 mr-1" /> Marcar todos presentes
              </Button>
              <Button size="sm" variant="outline" onClick={marcarTodosAusentes} className="h-8 text-xs">
                <X className="h-3 w-3 mr-1" /> Marcar todos ausentes
              </Button>
            </div>
          )}

          {cargandoEstudiantes ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Cargando estudiantes...</p>
            </div>
          ) : estudiantesFiltrados.length === 0 ? (
            <div className="text-center py-16 space-y-2">
              <AlertCircle className="h-7 w-7 text-muted-foreground/60 mx-auto" />
              <p className="text-xs font-semibold text-muted-foreground">
                {searchTerm || filtroAsistencia !== 'todos' 
                  ? 'No hay estudiantes que coincidan con los filtros'
                  : 'No hay estudiantes inscritos en este grado'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-muted/60">
              {estudiantesFiltrados.map((est) => {
                const estaPresente = asistencias[est.id]?.presente ?? true
                const obs = asistencias[est.id]?.observacion ?? ''
                
                return (
                  <div key={est.id} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/10 transition-colors">
                    
                    {/* Info del Estudiante */}
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors border ${
                        estaPresente ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {estaPresente ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold">{est.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">{est.grado?.replace('-', ' ') || gradoActivo?.replace('-', ' ')}</p>
                      </div>
                    </div>

                    {/* Controles de Acción */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Input 
                        type="text" 
                        placeholder="Observación..." 
                        value={obs}
                        onChange={(e) => cambiarObservacion(est.id, e.target.value)}
                        className="h-8 text-base flex-1 sm:w-48"
                      />
                      
                      <Button 
                        type="button"
                        onClick={() => toggleAsistencia(est.id)}
                        variant={estaPresente ? "outline" : "destructive"}
                        size="sm"
                        className={`h-8 text-xs font-bold px-3 ${
                          estaPresente ? 'border-emerald-200 hover:bg-emerald-50 text-emerald-600' : ''
                        }`}
                      >
                        {estaPresente ? 'Presente' : 'Ausente'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      ) : (
        <Card className="p-8 text-center text-muted-foreground text-xs">
          No tienes grados asignados en tu perfil. Contacta al administrador.
        </Card>
      )}

      {/* Botón Guardar */}
      {estudiantes.length > 0 && (
        <div className="flex justify-end pt-2">
          <Button 
            onClick={guardarAsistencia} 
            disabled={guardando || cargandoEstudiantes}
            className="w-full sm:w-auto gap-2 font-bold px-6 h-10 text-sm"
          >
            {guardando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Guardar Asistencia
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}