// app/admin/docente/asistencia/page.tsx - Versión Kanban
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CheckCircle2, XCircle, Users, CalendarDays, Filter, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'

export default function AsistenciaPage() {
  const { data: session } = useSession()
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [periodo, setPeriodo] = useState('P1')
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [presentes, setPresentes] = useState<Record<string, boolean>>({})
  const [observaciones, setObservaciones] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroPresente, setFiltroPresente] = useState('todos')
  const [cargando, setCargando] = useState(false)

  const cargar = () => {
    if (!grado || !materia) return
    setCargando(true)
    Promise.all([
      fetch(`/api/docente/estudiantes?grado=${grado}`).then(r => r.json()),
      fetch(`/api/asistencia?grado=${grado}&materia=${materia}&fecha=${fecha}`).then(r => r.json()),
    ]).then(([est, reg]) => {
      const lista = Array.isArray(est) ? est : est.estudiantes || []
      const registros = Array.isArray(reg) ? reg : []
      
      const pres: Record<string, boolean> = {}
      const obs: Record<string, string> = {}
      
      lista.forEach((e: any) => {
        const r = registros.find((x: any) => x.estudianteId === e.id)
        pres[e.id] = r ? r.presente : true
        obs[e.id] = r?.observacion || ''
      })
      
      setEstudiantes(lista)
      setPresentes(pres)
      setObservaciones(obs)
      setCargando(false)
    })
  }

  useEffect(() => { cargar() }, [grado, materia, fecha])

  const toggleAsistencia = (estudianteId: string) => {
    setPresentes(prev => ({ ...prev, [estudianteId]: !prev[estudianteId] }))
  }

  const marcarTodos = (presente: boolean) => {
    const nuevos: Record<string, boolean> = {}
    estudiantes.forEach(e => { nuevos[e.id] = presente })
    setPresentes(nuevos)
  }

  const guardar = async () => {
    const registros = estudiantes.map(e => ({
      estudianteId: e.id,
      presente: presentes[e.id] ?? true,
      observacion: observaciones[e.id] || '',
    }))

    const res = await fetch('/api/asistencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grado, materia, fecha, periodo, registros }),
    })

    if (res.ok) {
      toast.success('✅ Asistencia guardada')
    } else {
      toast.error('❌ Error al guardar')
    }
  }

  const estudiantesFiltrados = estudiantes.filter(e => {
    if (searchTerm && !e.nombre.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (filtroPresente === 'presente' && !presentes[e.id]) return false
    if (filtroPresente === 'ausente' && presentes[e.id]) return false
    return true
  })

  const estadisticas = {
    total: estudiantes.length,
    presentes: Object.values(presentes).filter(v => v === true).length,
    ausentes: Object.values(presentes).filter(v => v === false).length,
  }

  if (!grado || !materia) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Pase de Lista</h1>
        </div>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            <div className="space-y-2">
              <Label>Grado</Label>
              <Select value={grado} onValueChange={setGrado}>
                <SelectTrigger><SelectValue placeholder="Seleccionar grado" /></SelectTrigger>
                <SelectContent>
                  {(session?.user?.grados || []).map((g: string) => (
                    <SelectItem key={g} value={g}>{g?.replace('-', ' ')}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Materia</Label>
              <Select value={materia} onValueChange={setMateria}>
                <SelectTrigger><SelectValue placeholder="Seleccionar materia" /></SelectTrigger>
                <SelectContent>
                  {(session?.user?.materias || []).map((m: string) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-7 w-7 text-primary" />
              Pase de Lista
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {grado?.replace('-', ' ')} • {materia} • {new Date(fecha).toLocaleDateString()}
            </p>
          </div>
          
          {/* Botones - Stack vertical en mobile, horizontal en desktop */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => marcarTodos(true)} 
              size="sm"
              className="w-full sm:w-auto"
            >
              ✅ Marcar todos presentes
            </Button>
            <Button 
              variant="outline" 
              onClick={() => marcarTodos(false)} 
              size="sm"
              className="w-full sm:w-auto"
            >
              ❌ Marcar todos ausentes
            </Button>
            <Button 
              onClick={guardar} 
              size="sm"
              className="w-full sm:w-auto gap-1"
            >
              💾 Guardar
            </Button>
          </div>
        </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total estudiantes</p>
              <p className="text-2xl font-bold">{estadisticas.total}</p>
            </div>
            <Users className="h-8 w-8 text-primary opacity-50" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Presentes</p>
              <p className="text-2xl font-bold text-green-600">{estadisticas.presentes}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ausentes</p>
              <p className="text-2xl font-bold text-red-600">{estadisticas.ausentes}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500 opacity-50" />
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filtroPresente} onValueChange={setFiltroPresente}>
          <SelectTrigger className="w-[160px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="presente">Presentes</SelectItem>
            <SelectItem value="ausente">Ausentes</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-[160px]" />
        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['P1','P2','P3','P4'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Vista Kanban */}
      {cargando ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {estudiantesFiltrados.map(e => {
            const presente = presentes[e.id] ?? true
            
            return (
              <Card 
                key={e.id} 
                className={`cursor-pointer transition-all hover:shadow-md overflow-hidden ${
                  presente ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500 opacity-75'
                }`}
                onClick={() => toggleAsistencia(e.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className={presente ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {e.nombre.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{e.nombre}</h3>
                      <p className="text-xs text-muted-foreground">{e.grado}</p>
                    </div>
                    <Badge variant={presente ? 'default' : 'destructive'} className="gap-1">
                      {presente ? '✓ Presente' : '✗ Ausente'}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <Input
                      placeholder="Observación"
                      value={observaciones[e.id] || ''}
                      onChange={(ev) => {
                        ev.stopPropagation()
                        setObservaciones(prev => ({ ...prev, [e.id]: ev.target.value }))
                      }}
                      className="h-8 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="mt-3">
                    <Progress value={presente ? 100 : 0} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}