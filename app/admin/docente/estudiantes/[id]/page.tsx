'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'

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

  useEffect(() => {
    if (params.id) {
      Promise.all([
        fetch(`/api/usuarios?id=${params.id}`).then(r => r.json()),
        fetch(`/api/evaluaciones/estudiante/${params.id}`).then(r => r.json()),
        fetch(`/api/diario/estudiante/${params.id}`).then(r => r.json()),
        fetch(`/api/asistencia/estudiante/${params.id}`).then(r => r.json()),
      ]).then(([est, ev, di, as]) => {
        setEstudiante(est)
        setEvaluaciones(ev.evaluaciones || [])
        setDiario(di.registros || {})
        setResumenDiario(di.resumen || {})
        setAsistencia(as.porPeriodo || {})
        setResumenAsistencia(as.resumen || {})
        setCargando(false)
      })
    }
  }, [params.id])

  const getColorNota = (nota: number) => {
    if (nota >= 80) return 'text-green-600 font-bold'
    if (nota >= 65) return 'text-amber-600 font-bold'
    if (nota !== null && nota !== undefined) return 'text-red-600 font-bold'
    return 'text-muted-foreground'
  }

  const iniciarEdicion = (r: any) => {
    setEditando(r._id)
    setEditValues({ participacion: r.participacion || 0, tarea: r.tarea || false, observacion: r.observacion || '', puntosExtra: r.puntosExtra || 0 })
  }

  const guardarEdicion = async () => {
    await fetch('/api/diario', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editando, ...editValues }) })
    setEditando(null)
    fetch(`/api/diario/estudiante/${params.id}`).then(r => r.json()).then(d => { setDiario(d.registros || {}); setResumenDiario(d.resumen || {}) })
  }

  const eliminarRegistro = async (id: string) => {
    if (!confirm('¿Eliminar este registro?')) return
    await fetch(`/api/diario?id=${id}`, { method: 'DELETE' })
    fetch(`/api/diario/estudiante/${params.id}`).then(r => r.json()).then(d => { setDiario(d.registros || {}); setResumenDiario(d.resumen || {}) })
  }

  if (cargando) return <p className="text-muted-foreground">Cargando...</p>
  if (!estudiante) return <p className="text-muted-foreground">Estudiante no encontrado</p>

  const porMateria: Record<string, any> = {}
  evaluaciones.forEach((e: any) => {
    const mat = e.materia || 'Sin materia'
    if (!porMateria[mat]) porMateria[mat] = { P1: null, P2: null, P3: null, P4: null }
    const notas = Object.values(e.notas || {}) as number[]
    porMateria[mat][e.periodo] = notas.length > 0 ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null
  })

  return (
    <div className="pb-20">
      <Link href="/admin/docente/estudiantes" className="inline-flex items-center text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" /> Volver a estudiantes
      </Link>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {estudiante.nombre?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{estudiante.nombre}</h1>
              <p className="text-muted-foreground">{estudiante.email}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {estudiante.grado?.replace('-', ' ')} · {estudiante.genero || 'Sin género'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader><CardTitle>📊 Notas por Período</CardTitle></CardHeader>
        <CardContent>
          {Object.keys(porMateria).length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay evaluaciones registradas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Materia</TableHead>
                  <TableHead className="text-center">P1</TableHead>
                  <TableHead className="text-center">P2</TableHead>
                  <TableHead className="text-center">P3</TableHead>
                  <TableHead className="text-center">P4</TableHead>
                  <TableHead className="text-center">Prom</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(porMateria).map(([materia, periodos]: any) => {
                  const valores = [periodos.P1, periodos.P2, periodos.P3, periodos.P4].filter(v => v !== null)
                  const promedio = valores.length > 0 ? Math.round(valores.reduce((a: number, b: number) => a + b, 0) / valores.length) : null
                  return (
                    <TableRow key={materia}>
                      <TableCell className="font-medium capitalize">{materia}</TableCell>
                      {['P1', 'P2', 'P3', 'P4'].map(p => (
                        <TableCell key={p} className={`text-center font-medium ${getColorNota(periodos[p])}`}>{periodos[p] ?? '-'}</TableCell>
                      ))}
                      <TableCell className={`text-center font-bold ${getColorNota(promedio)}`}>{promedio ?? '-'}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Diario */}
      {Object.keys(resumenDiario).length > 0 && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>📅 Diario del Docente</CardTitle>
            <a href={`/api/diario/estudiante/${estudiante._id}/pdf`} target="_blank">
              <Button variant="destructive" size="sm">📄 PDF</Button>
            </a>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {['P1', 'P2', 'P3', 'P4'].map(p => resumenDiario[p] && (
                <div key={p} className="bg-muted rounded-lg p-3 text-center">
                  <p className="text-sm font-bold">{p}</p>
                  <p className="text-xs text-muted-foreground">⭐{resumenDiario[p].estrellas} 📝{resumenDiario[p].tareas}/{resumenDiario[p].totalDias}</p>
                </div>
              ))}
            </div>
            {['P1', 'P2', 'P3', 'P4'].map(p => diario[p]?.length > 0 && (
              <div key={p} className="border-t">
                <button onClick={() => setDiarioAbierto(diarioAbierto === p ? null : p)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted">
                  <span className="font-medium text-sm">{p} — {diario[p].length} registros</span>
                  {diarioAbierto === p ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {diarioAbierto === p && (
                  <div className="max-h-80 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-center">⭐</TableHead>
                          <TableHead className="text-center">📝</TableHead>
                          <TableHead className="text-center">🎁</TableHead>
                          <TableHead>Obs</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {diario[p].map((r: any) => (
                          <TableRow key={r._id}>
                            {editando === r._id ? (
                              <>
                                <TableCell>{new Date(r.fecha).toLocaleDateString('es-DO')}</TableCell>
                                <TableCell className="text-center">
                                  <input type="number" min="0" max="5" value={editValues.participacion}
                                    onChange={e => setEditValues({...editValues, participacion: Number(e.target.value)})}
                                    className="w-14 px-1 py-0.5 border rounded text-center text-xs" />
                                </TableCell>
                                <TableCell className="text-center">
                                  <input type="checkbox" checked={editValues.tarea}
                                    onChange={e => setEditValues({...editValues, tarea: e.target.checked})} />
                                </TableCell>
                                <TableCell className="text-center">
                                  <input type="number" min="0" max="10" value={editValues.puntosExtra}
                                    onChange={e => setEditValues({...editValues, puntosExtra: Number(e.target.value)})}
                                    className="w-14 px-1 py-0.5 border rounded text-center text-xs" />
                                </TableCell>
                                <TableCell>
                                  <input type="text" value={editValues.observacion}
                                    onChange={e => setEditValues({...editValues, observacion: e.target.value})}
                                    className="w-full px-1 py-0.5 border rounded text-xs" />
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={guardarEdicion}>💾</Button>
                                  <Button variant="ghost" size="sm" onClick={() => setEditando(null)}>✖</Button>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell>{new Date(r.fecha).toLocaleDateString('es-DO')}</TableCell>
                                <TableCell className="text-center">{r.participacion || 0}</TableCell>
                                <TableCell className="text-center">{r.tarea ? '✅' : '—'}</TableCell>
                                <TableCell className="text-center">{r.puntosExtra || 0}</TableCell>
                                <TableCell className="text-muted-foreground">{r.observacion || '—'}</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => iniciarEdicion(r)}>✏️</Button>
                                  <Button variant="ghost" size="sm" onClick={() => eliminarRegistro(r._id)}>🗑️</Button>
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
          </CardContent>
        </Card>
      )}

      {/* Asistencia */}
      {Object.keys(resumenAsistencia).length > 0 && (
        <Card>
          <button onClick={() => setAsistenciaAbierta(!asistenciaAbierta)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted">
            <CardTitle className="text-lg">📋 Asistencia</CardTitle>
            {asistenciaAbierta ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {asistenciaAbierta && (
            <CardContent>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {['P1', 'P2', 'P3', 'P4'].map(p => resumenAsistencia[p] && (
                  <div key={p} className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-sm font-bold">{p}</p>
                    <p className="text-xs text-green-600">✅ {resumenAsistencia[p].presentes}</p>
                    <p className="text-xs text-red-500">❌ {resumenAsistencia[p].ausentes}</p>
                    <p className="text-xs text-muted-foreground">de {resumenAsistencia[p].total}</p>
                  </div>
                ))}
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {Object.entries(asistencia).map(([p, regs]) =>
                  regs.map((r: any) => (
                    <div key={r._id} className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-muted">
                      <span className="text-muted-foreground">{new Date(r.fecha).toLocaleDateString('es-DO')}</span>
                      <span className="text-muted-foreground">{r.materia}</span>
                      <span>{r.presente ? '✅' : '❌'}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}