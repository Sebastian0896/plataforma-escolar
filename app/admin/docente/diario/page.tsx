'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { 
  CalendarDays, ClipboardCheck, MessageSquare, 
  Sparkles, Users 
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'

const OBSERVACIONES = [
  'Participación activa', 'Ayudó a un compañero', 'Excelente trabajo en equipo',
  'No trajo el material', 'Llegó tarde', 'No participó',
  'Entregó tarea incompleta', 'Muy buen comportamiento', 
  'Necesita mejorar atención', 'Trabajó de forma independiente',
]

export default function DiarioPage() {
  const { data: session } = useSession()

  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [periodo, setPeriodo] = useState('P1')

  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [datosForm, setDatosForm] = useState<Record<string, any>>({})
  const [mensaje, setMensaje] = useState('')

  const gradosDocente = session?.user?.grados || []

  useEffect(() => {
    if (grado && materia && fecha) {
      // 1. Cargar estudiantes del grado seleccionado
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then((r) => r.json())
        .then((d) => setEstudiantes(Array.isArray(d) ? d : d.estudiantes || []))

      // 2. Cargar registros existentes y actualizar el estado del formulario
      fetch(`/api/diario?grado=${grado}&materia=${materia}&fecha=${fecha}`)
        .then((r) => r.json())
        .then((d) => {
          const registrosCargados = Array.isArray(d) ? d : []
          const mapaNuevo: Record<string, any> = {}
          
          registrosCargados.forEach(reg => {
            mapaNuevo[reg.estudianteId] = reg
          })
          
          // CRUCIAL: Esto actualiza los inputs al cambiar la materia
          setDatosForm(mapaNuevo) 
        })
    }
  }, [grado, materia, fecha])

  const handleInputChange = (estudianteId: string, campo: string, valor: any) => {
    setDatosForm(prev => ({
      ...prev,
      [estudianteId]: { ...(prev[estudianteId] || {}), [campo]: valor }
    }))
  }

  const guardar = async () => {
    const data = estudiantes.map((e) => ({
      estudianteId: e.id,
      participacion: Number(datosForm[e.id]?.participacion || 0),
      tarea: !!datosForm[e.id]?.tarea,
      observacion: datosForm[e.id]?.observacion || '',
      puntosExtra: Number(datosForm[e.id]?.puntosExtra || 0),
    }))

    const res = await fetch('/api/diario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grado, materia, fecha, periodo, registros: data }),
    })

    setMensaje(res.ok ? '✅ Diario guardado correctamente' : '❌ Error al guardar')
    setTimeout(() => setMensaje(''), 3000)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Cabecera */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold">Diario del Docente</h1>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <select value={grado} onChange={(e) => setGrado(e.target.value)} className="h-10 rounded-lg border px-3 text-sm">
              <option value="">Seleccionar grado</option>
              {gradosDocente.map((g: string) => (
                <option key={g} value={g}>{g?.replace('-', ' ')}</option>
              ))}
            </select>

            <select value={materia} onChange={(e) => setMateria(e.target.value)} className="h-10 rounded-lg border px-3 text-sm">
              <option value="">Seleccionar materia</option>
              {session?.user?.materias?.map((m: string) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="h-10 rounded-lg border px-3 text-sm" />

            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="h-10 rounded-lg border px-3 text-sm">
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Mensaje de éxito/error */}
      {mensaje && <div className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">{mensaje}</div>}

      {/* Tabla de Registros */}
      {grado && materia && estudiantes.length > 0 && (
        <Card>
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" /> Registro de estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estudiante</TableHead>
                  <TableHead className="text-center">Participación</TableHead>
                  <TableHead className="text-center">Tarea</TableHead>
                  <TableHead className="text-center">Extra</TableHead>
                  <TableHead>Observación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estudiantes.map((e) => {
                  const reg = datosForm[e.id] || {}
                  return (
                    <TableRow key={e.id}>
                      <TableCell className="font-medium">{e.nombre}</TableCell>
                      <TableCell className="text-center">
                        <input 
                          type="number" 
                          value={reg.participacion ?? 0}
                          onChange={(ev) => handleInputChange(e.id, 'participacion', ev.target.value)}
                          className="h-9 w-20 rounded-lg border text-center text-sm" 
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input 
                          type="checkbox" 
                          checked={!!reg.tarea}
                          onChange={(ev) => handleInputChange(e.id, 'tarea', ev.target.checked)}
                          className="h-5 w-5 cursor-pointer" 
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <input 
                          type="number" 
                          value={reg.puntosExtra ?? 0}
                          onChange={(ev) => handleInputChange(e.id, 'puntosExtra', ev.target.value)}
                          className="h-9 w-20 rounded-lg border text-center text-sm" 
                        />
                      </TableCell>
                      <TableCell>
                        <select 
                          value={reg.observacion || ''}
                          onChange={(ev) => handleInputChange(e.id, 'observacion', ev.target.value)}
                          className="h-9 w-full rounded-lg border text-sm"
                        >
                          <option value="">Sin observación</option>
                          {OBSERVACIONES.map((o) => (<option key={o} value={o}>{o}</option>))}
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

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button onClick={guardar} size="lg" className="gap-2" disabled={!grado || !materia}>
          <Sparkles className="h-4 w-4" />
          Guardar Diario
        </Button>
      </div>
    </div>
  )
}