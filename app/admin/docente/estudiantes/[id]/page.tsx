'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  FileText, 
  Star, 
  BookCheck, 
  Calendar,
  UserCircle,
  GraduationCap,
  Save,
  X,
  Trash2,
  Edit3
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export default function EstudianteFichaPage() {
  const { data: session } = useSession()
  const params = useParams()
  const [estudiante, setEstudiante] = useState<any>(null)
  const [evaluaciones, setEvaluaciones] = useState<any[]>([])
  const [diario, setDiario] = useState<Record<string, any[]>>({})
  const [resumenDiario, setResumenDiario] = useState<Record<string, any>>({})
  const [asistencia, setAsistencia] = useState<Record<string, any[]>>({})
  const [resumenAsistencia, setResumenAsistencia] = useState<Record<string, any>>({})
  const [cargando, setCargando] = useState(true)
  const [diarioAbierto, setDiarioAbierto] = useState<string | null>(null)
  const [asistenciaAbierta, setAsistenciaAbierta] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ participacion: 0, tarea: false, observacion: '', puntosExtra: 0 })

  const fetchData = async () => {
    try {
      const [est, ev, di, as] = await Promise.all([
        fetch(`/api/usuarios?id=${params.id}`).then(r => r.json()),
        fetch(`/api/evaluaciones/estudiante/${params.id}`).then(r => r.json()),
        fetch(`/api/diario/estudiante/${params.id}`).then(r => r.json()),
        fetch(`/api/asistencia/estudiante/${params.id}`).then(r => r.json()),
      ])
      setEstudiante(est)
      setEvaluaciones(ev.evaluaciones || [])
      setDiario(di.registros || {})
      setResumenDiario(di.resumen || {})
      setAsistencia(as.porPeriodo || {})
      setResumenAsistencia(as.resumen || {})
    } catch (error) {
      toast.error("Error al cargar los datos")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (params.id) fetchData()
  }, [params.id])

  const getColorNota = (nota: number | null) => {
    if (nota === null) return 'text-slate-400'
    if (nota >= 80) return 'text-emerald-600 dark:text-emerald-400 font-bold'
    if (nota >= 65) return 'text-amber-600 dark:text-amber-400 font-bold'
    return 'text-red-600 dark:text-red-400 font-bold'
  }

  const iniciarEdicion = (r: any) => {
    setEditando(r._id)
    setEditValues({ 
      participacion: r.participacion || 0, 
      tarea: r.tarea || false, 
      observacion: r.observacion || '', 
      puntosExtra: r.puntosExtra || 0 
    })
  }

  const guardarEdicion = async () => {
    try {
      const res = await fetch('/api/diario', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id: editando, ...editValues }) 
      })
      if (!res.ok) throw new Error()
      toast.success("Registro actualizado")
      setEditando(null)
      fetchData()
    } catch {
      toast.error("Error al guardar cambios")
    }
  }

  const eliminarRegistro = async (id: string) => {
    if (!confirm('¿Eliminar este registro?')) return
    await fetch(`/api/diario?id=${id}`, { method: 'DELETE' })
    fetchData()
  }

  if (cargando) return <div className="flex h-96 items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
  if (!estudiante) return <p className="text-center py-20 text-slate-500">Estudiante no encontrado</p>

  const porMateria: Record<string, any> = {}
  evaluaciones.forEach((e: any) => {
    const mat = e.materia || 'Sin materia'
    if (!porMateria[mat]) porMateria[mat] = { P1: null, P2: null, P3: null, P4: null }
    const notas = Object.values(e.notas || {}) as number[]
    porMateria[mat][e.periodo] = notas.length > 0 ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null
  })

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-6">
      <div className="flex justify-between items-center">
        <Link className="group inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600" href="/admin/docente/estudiantes">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"/> Volver
        </Link>
        <Button asChild size="sm" variant="outline">
          <a className='flex item-center' href={`/api/diario/estudiante/${estudiante._id}/pdf`} target="_blank"><FileText className="w-4 h-4 mr-2"/> Exportar PDF</a>
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-none shadow-lg">
        <CardContent className="p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold border border-white/30">
            {estudiante.nombre?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{estudiante.nombre}</h1>
            <p className="text-blue-100">{estudiante.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge className="bg-white/20 border-none text-white capitalize">{estudiante.grado?.replace('-', ' ')}</Badge>
              <Badge className="bg-white/20 border-none text-white">{estudiante.genero || 'N/A'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-lg flex items-center gap-2"><BookCheck className="w-5 h-5 text-blue-600"/> Calificaciones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Materia</TableHead>
                {['P1', 'P2', 'P3', 'P4'].map(p => <TableHead key={p} className="text-center">{p}</TableHead>)}
                <TableHead className="text-center bg-blue-50/50 font-bold">Promedio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(porMateria).map(([materia, periodos]: any) => {
                const valores = [periodos.P1, periodos.P2, periodos.P3, periodos.P4].filter(v => v !== null)
                const promedio = valores.length > 0 ? Math.round(valores.reduce((a: number, b: number) => a + b, 0) / valores.length) : null
                return (
                  <TableRow key={materia}>
                    <TableCell className="pl-6 font-semibold capitalize">{materia}</TableCell>
                    {['P1', 'P2', 'P3', 'P4'].map(p => (
                      <TableCell key={p} className={`text-center ${getColorNota(periodos[p])}`}>{periodos[p] ?? '-'}</TableCell>
                    ))}
                    <TableCell className={`text-center bg-blue-50/30 ${getColorNota(promedio)}`}>{promedio ?? '-'}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-lg flex items-center gap-2"><Star className="w-5 h-5 text-amber-500"/> Seguimiento Diario</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {['P1', 'P2', 'P3', 'P4'].map(p => resumenDiario[p] && (
              <div key={p} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">{p}</p>
                <p className="text-xl font-bold text-slate-800">{resumenDiario[p].estrellas} <span className="text-xs font-normal">pts</span></p>
                <p className="text-[10px] text-slate-500 mt-1">{resumenDiario[p].tareas} tareas · {resumenDiario[p].totalDias} días</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {['P1', 'P2', 'P3', 'P4'].map(p => diario[p]?.length > 0 && (
              <div key={p} className="border rounded-xl overflow-hidden">
                <button onClick={() => setDiarioAbierto(diarioAbierto === p ? null : p)} className="w-full flex items-center justify-between px-5 py-3 bg-white hover:bg-slate-50 transition-colors text-sm font-semibold">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 opacity-40"/> Registros de {p}</span>
                  {diarioAbierto === p ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </button>
                {diarioAbierto === p && (
                  <div className="border-t max-h-80 overflow-y-auto">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-center">⭐</TableHead>
                          <TableHead className="text-center">Tarea</TableHead>
                          <TableHead className="text-center">Extra</TableHead>
                          <TableHead>Obs.</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diario[p].map((r: any) => (
                          <TableRow key={r._id} className="group">
                            {editando === r._id ? (
                              <>
                                <TableCell className="text-xs">{new Date(r.fecha).toLocaleDateString()}</TableCell>
                                <TableCell><Input type="number" value={editValues.participacion} onChange={e => setEditValues({...editValues, participacion: Number(e.target.value)})} className="w-16 h-8 mx-auto text-center"/></TableCell>
                                <TableCell className="text-center"><Checkbox checked={editValues.tarea} onCheckedChange={v => setEditValues({...editValues, tarea: !!v})}/></TableCell>
                                <TableCell><Input type="number" value={editValues.puntosExtra} onChange={e => setEditValues({...editValues, puntosExtra: Number(e.target.value)})} className="w-16 h-8 mx-auto text-center"/></TableCell>
                                <TableCell><Input value={editValues.observacion} onChange={e => setEditValues({...editValues, observacion: e.target.value})} className="h-8 text-xs"/></TableCell>
                                <TableCell className="flex gap-1 justify-end py-4">
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600" onClick={guardarEdicion}><Save className="h-4 h-4"/></Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditando(null)}><X className="h-4 h-4"/></Button>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="text-xs font-medium">{new Date(r.fecha).toLocaleDateString('es-DO', {day:'2-digit', month:'2-digit'})}</TableCell>
                                <TableCell className="text-center font-bold text-blue-600">{r.participacion || 0}</TableCell>
                                <TableCell className="text-center">{r.tarea ? '✅' : '—'}</TableCell>
                                <TableCell className="text-center text-emerald-600 font-bold">+{r.puntosExtra || 0}</TableCell>
                                <TableCell className="text-xs text-slate-500 italic">{r.observacion || '—'}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => iniciarEdicion(r)}><Edit3 className="h-3.5 w-3.5"/></Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400" onClick={() => eliminarRegistro(r._id)}><Trash2 className="h-3.5 w-3.5"/></Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}