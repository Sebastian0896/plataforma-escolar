// app/admin/docente/asistencia/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function AsistenciaPage() {
  const { data: session } = useSession()
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [periodo, setPeriodo] = useState('P1')
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [presentes, setPresentes] = useState<Record<string, boolean>>({})
  const [observaciones, setObservaciones] = useState<Record<string, string>>({})
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

  const toggleTodos = () => {
    const todosPresentes = Object.values(presentes).every(v => v)
    const nuevo: Record<string, boolean> = {}
    estudiantes.forEach(e => { nuevo[e.id] = !todosPresentes })
    setPresentes(nuevo)
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">📋 Pase de Lista</h1>

      <div className="flex gap-3 mb-6 flex-wrap">
        <Select value={grado} onValueChange={setGrado}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Grado" /></SelectTrigger>
          <SelectContent>
            {(session?.user?.grados || []).map((g: string) => <SelectItem key={g} value={g}>{g?.replace('-', ' ')}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={materia} onValueChange={setMateria}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Materia" /></SelectTrigger>
          <SelectContent>
            {(session?.user?.materias || []).map((m: string) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>

        <Input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-[160px]" />

        <Select value={periodo} onValueChange={setPeriodo}>
          <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {['P1','P2','P3','P4'].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {grado && materia && estudiantes.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-lg">
              {estudiantes.length} estudiantes
            </CardTitle>
            <Button variant="outline" size="sm" onClick={toggleTodos}>
              {Object.values(presentes).every(v => v) ? 'Marcar todos ausentes' : 'Marcar todos presentes'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {estudiantes.map(e => (
              <div key={e.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={presentes[e.id] ?? true}
                  onCheckedChange={v => setPresentes(prev => ({ ...prev, [e.id]: !!v }))}
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${presentes[e.id] ? '' : 'text-muted-foreground line-through'}`}>
                    {e.nombre}
                  </p>
                </div>
                <Badge variant={presentes[e.id] ? 'default' : 'destructive'} className="text-xs">
                  {presentes[e.id] ? 'Presente' : 'Ausente'}
                </Badge>
                <Input
                  placeholder="Obs."
                  value={observaciones[e.id] || ''}
                  onChange={ev => setObservaciones(prev => ({ ...prev, [e.id]: ev.target.value }))}
                  className="w-32 h-8 text-xs"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {grado && materia && estudiantes.length > 0 && (
        <Button onClick={guardar} className="mt-4 w-full" size="lg">
          💾 Guardar Asistencia
        </Button>
      )}

      {cargando && <p className="text-center text-muted-foreground mt-8">Cargando estudiantes...</p>}
    </div>
  )
}