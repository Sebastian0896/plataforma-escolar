// app/admin/docente/asistencia/historial/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarDays, Search, Loader2, ClipboardList, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function HistorialAsistenciaPage() {
  const { data: session } = useSession()
  const [grado, setGrado] = useState('todos')
  const [materia, setMateria] = useState('todos')
  const [periodo, setPeriodo] = useState('todos')
  const [fecha, setFecha] = useState('')
  const [registros, setRegistros] = useState<any[]>([])
  const [cargando, setCargando] = useState(false)

  const buscarHistorial = async () => {
    setCargando(true)
    try {
      const params = new URLSearchParams()
      
      if (grado && grado !== 'todos') params.append('grado', grado)
      if (materia && materia !== 'todos') params.append('materia', materia)
      if (periodo && periodo !== 'todos') params.append('periodo', periodo)
      if (fecha) params.append('fecha', fecha)

      const query = params.toString()
      
      // Llamada directa a nuestra API optimizada y unificada
      const res = await fetch(`/api/asistencia${query ? `?${query}` : ''}`)
      
      if (!res.ok) throw new Error('Error en el servidor')
      
      const data = await res.json()
      setRegistros(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error al cargar historial:", error)
      setRegistros([])
    } bits: {
      setCargando(false)
    }
  }

  useEffect(() => {
    buscarHistorial()
  }, [grado, materia, periodo, fecha])

  // Alertas rápidas: Alumnos con 3 o más faltas acumuladas bajo los filtros actuales
  const alumnosConFaltas = registros.reduce((acc: Record<string, number>, item: any) => {
    if (!item.presente) {
      acc[item.estudianteNombre] = (acc[item.estudianteNombre] || 0) + 1
    }
    return acc
  }, {})

  const alertasFaltas = Object.entries(alumnosConFaltas)
    .filter(([_, total]) => total >= 3)
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4 py-4 pb-12">
      {/* Encabezado superior */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" /> Historial de Asistencias
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Consulta, filtra y gestiona los registros históricos de tus grupos.</p>
        </div>
        <Link href="/admin/docente/asistencia/lista">
          <Button size="sm" className="gap-1.5 w-full sm:w-auto">
            <CalendarDays className="h-4 w-4" /> Tomar Nueva Lista
          </Button>
        </Link>
      </div>

      {/* Panel de Control de Filtros */}
      <Card className="shadow-sm border-muted/70">
        <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Grado / Curso</Label>
            <Select value={grado} onValueChange={setGrado}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los grados</SelectItem>
                {(session?.user?.grados || []).map((g: string) => (
                  <SelectItem key={g} value={g}>{g.replace('-', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Materia / Asignatura</Label>
            <Select value={materia} onValueChange={setMateria}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las materias</SelectItem>
                {(session?.user?.materias || []).map((m: string) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Periodo</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {['P1','P2','P3','P4'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 col-span-2 md:col-span-1">
            <Label className="text-xs">Fecha Específica</Label>
            <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="h-9 text-xs" />
          </div>
        </CardContent>
      </Card>

      {/* Módulo de Alertas Críticas */}
      {alertasFaltas.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/30 dark:bg-amber-950/10 shadow-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Alumnos con Inasistencias Críticas (Mismo Filtro)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0 flex flex-wrap gap-2">
            {alertasFaltas.map(([nombre, faltas]) => (
              <Badge key={nombre} variant="outline" className="bg-card text-xs border-amber-300 gap-1 py-1">
                ⚠️ {nombre} <span className="font-bold text-amber-600">({faltas} faltas)</span>
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabla Principal */}
      <Card className="shadow-sm overflow-hidden">
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Cruzando registros históricos distribuidos...</p>
          </div>
        ) : registros.length === 0 ? (
          <div className="text-center py-16 space-y-2">
            <Search className="h-8 w-8 text-muted-foreground/50 mx-auto" />
            <p className="text-sm font-medium">No se encontraron registros de asistencia</p>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">Prueba variando los selectores o cambiando la fecha del calendario.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/60 border-b text-xs font-semibold text-muted-foreground">
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Estudiante</th>
                  <th className="p-3 hidden sm:table-cell">Grado</th>
                  <th className="p-3 hidden md:table-cell">Materia</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 hidden sm:table-cell">Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs md:text-sm">
                {registros.map((reg, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    {/* SOLUCIÓN AL DESFASE DE FECHAS: Formateo explícito mediante componentes UTC */}
                    <td className="p-3 text-xs font-medium whitespace-nowrap">
                      {(() => {
                        const d = new Date(reg.fecha)
                        const dia = String(d.getUTCDate()).padStart(2, '0')
                        const mes = String(d.getUTCMonth() + 1).padStart(2, '0')
                        const anio = d.getUTCFullYear()
                        return `${dia}/${mes}/${anio}`
                      })()}
                    </td>
                    <td className="p-3 font-medium text-foreground">{reg.estudianteNombre}</td>
                    <td className="p-3 hidden sm:table-cell text-xs text-muted-foreground">{reg.grado?.replace('-', ' ')}</td>
                    <td className="p-3 hidden md:table-cell text-xs">{reg.materia}</td>
                    <td className="p-3">
                      <Badge variant={reg.presente ? "secondary" : "destructive"} className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                        {reg.presente ? 'Presente' : 'Ausente'}
                      </Badge>
                    </td>
                    <td className="p-3 hidden sm:table-cell text-xs text-muted-foreground max-w-[180px] truncate" title={reg.observacion}>
                      {reg.observacion || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}