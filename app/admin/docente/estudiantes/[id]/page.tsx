'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'


export default function EstudianteFichaPage() {
  const { data: session } = useSession()
  const params = useParams()
  const [estudiante, setEstudiante] = useState<any>(null)
  const [evaluaciones, setEvaluaciones] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [diario, setDiario] = useState<Record<string, any[]>>({})
  const [resumenDiario, setResumenDiario] = useState<Record<string, any>>({})
  const [diarioAbierto, setDiarioAbierto] = useState<string | null>(null)
  const [editando, setEditando] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ participacion: 0, tarea: false, observacion: '', puntosExtra: 0 })
  const [asistencia, setAsistencia] = useState<Record<string, any[]>>({})
  const [resumenAsistencia, setResumenAsistencia] = useState<Record<string, any>>({})
  const [asistenciaAbierta, setAsistenciaAbierta] = useState(false)

  useEffect(() => {
    if (params.id) {
      // Cargar datos del estudiante
      fetch(`/api/usuarios?id=${params.id}`)
        .then(r => r.json())
        .then(data => {
          setEstudiante(data)
          // Cargar evaluaciones de todas las materias y períodos
          return fetch(`/api/evaluaciones/estudiante/${params.id}`)
        })
        .then(r => r.json())
        .then(data => {
          setEvaluaciones(data.evaluaciones || [])
          setCargando(false)
        })
    }
  }, [params.id])

  useEffect(() => {
  fetch(`/api/diario/estudiante/${params.id}`)
    .then(r => r.json())
    .then(d => {
      setDiario(d.registros || {})
      setResumenDiario(d.resumen || {})
    })
}, [params.id])

useEffect(() => {
  fetch(`/api/asistencia/estudiante/${params.id}`)
    .then(r => r.json())
    .then(d => {
      setAsistencia(d.porPeriodo || {})
      setResumenAsistencia(d.resumen || {})
    })
}, [params.id])

const iniciarEdicion = (r: any) => {
  setEditando(r._id)
  setEditValues({
    participacion: r.participacion || 0,
    tarea: r.tarea || false,
    observacion: r.observacion || '',
    puntosExtra: r.puntosExtra || 0,
  })
}

const guardarEdicion = async () => {
  await fetch('/api/diario', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: editando, ...editValues }),
  })
  setEditando(null)
  window.location.reload()
}

  const editarRegistro = async (r: any) => {
    const nuevaObs = prompt('Observación:', r.observacion)
    if (nuevaObs === null) return
    await fetch('/api/diario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: r._id, observacion: nuevaObs }),
    })
    // Refrescar
    window.location.reload()
  }

  const eliminarRegistro = async (id: string) => {
    if (!confirm('¿Eliminar este registro?')) return
    await fetch(`/api/diario?id=${id}`, { method: 'DELETE' })
    window.location.reload()
  }

  const getColorNota = (nota: number) => {
    if (nota === undefined || nota === null) return 'text-gray-400'
    if (nota >= 80) return 'text-green-600 dark:text-green-400 font-bold'
    if (nota >= 65) return 'text-amber-600 dark:text-amber-400 font-bold'
    return 'text-red-600 dark:text-red-400 font-bold'
  }

  // Agrupar por materia
  const porMateria: Record<string, any> = {}
  evaluaciones.forEach((e: any) => {
    const mat = e.materia || 'Sin materia'
    if (!porMateria[mat]) porMateria[mat] = { P1: null, P2: null, P3: null, P4: null }
    const periodo = e.periodo || 'P1'
    // Calcular promedio de las notas del período
    const notas = e.notas ? Object.values(e.notas) : []
    const promedio = notas.length > 0
      ? Math.round((notas as number[]).reduce((a: number, b: number) => a + b, 0) / notas.length)
      : null
    porMateria[mat][periodo] = promedio
  })

  if (cargando) return <p className="text-gray-500">Cargando...</p>
  if (!estudiante) return <p className="text-gray-500">Estudiante no encontrado</p>

  return (
    <div className='pb-20'>
      <Link href="/admin/docente/estudiantes" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Volver a estudiantes
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl font-bold text-purple-700">
            {estudiante.nombre?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{estudiante.nombre}</h1>
            <p className="text-gray-500 dark:text-gray-400">{estudiante.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {estudiante.grado?.replace('-', ' ')} · {estudiante.genero || 'Sin género'}
              {estudiante.rne && ` · RNE: ${estudiante.rne}`}
            </p>
          </div>
        </div>
      </div>
        
      <div className="bg-white dark:bg-slate-800 rounded-xl mb-4 border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📊 Notas por Período</h2>
        </div>

        {Object.keys(porMateria).length === 0 ? (
          <p className="p-4 text-gray-500 text-sm">No hay evaluaciones registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Materia</th>
                  <th className="px-4 py-3 text-center font-medium">P1</th>
                  <th className="px-4 py-3 text-center font-medium">P2</th>
                  <th className="px-4 py-3 text-center font-medium">P3</th>
                  <th className="px-4 py-3 text-center font-medium">P4</th>
                  <th className="px-4 py-3 text-center font-medium">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {Object.entries(porMateria).map(([materia, periodos]: any) => {
                  const valores = [periodos.P1, periodos.P2, periodos.P3, periodos.P4].filter((v: any) => v !== null)
                  const promedio = valores.length > 0
                    ? Math.round(valores.reduce((a: number, b: number) => a + b, 0) / valores.length)
                    : null

                  return (
                    <tr key={materia}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white capitalize">{materia}</td>
                      {['P1', 'P2', 'P3', 'P4'].map(p => (
                        <td key={p} className={`px-4 py-3 text-center font-medium ${
                            periodos[p] >= 80 ? 'text-green-600 dark:text-green-400' :
                            periodos[p] >= 65 ? 'text-amber-600 dark:text-amber-400' :
                            periodos[p] !== null ? 'text-red-600 dark:text-red-400' : 'text-gray-400'
                        }`}>
                            {periodos[p] ?? '-'}
                        </td>
                        ))}
                      <td className={`px-4 py-3 text-center font-bold ${
                        promedio >= 80 ? 'text-green-600 dark:text-green-400' :
                        promedio >= 65 ? 'text-amber-600 dark:text-amber-400' :
                        promedio !== null ? 'text-red-600 dark:text-red-400' : 'text-gray-400'
                        }`}>
                        {promedio ?? '-'}
                        </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
        <a
        href={`/api/comprobante/${estudiante._id}?periodo=P1`}
        target="_blank"
        className="bg-blue-600 text-white px-4 py-2 my-8 rounded-lg text-sm hover:bg-blue-700"
        >
        📄 Comprobante P1
        </a>

        <hr className="my-6 border-gray-200 dark:border-slate-700" />

        {Object.keys(diario).length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden mt-6">
            <div className="flex justify-between p-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📅 Diario del Docente</h2>
              <a
                href={`/api/diario/estudiante/${estudiante._id}/pdf`}
                target="_blank"
                className="text-xs bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                📄 PDF
              </a>
            </div>

            {/* Resumen */}
            <div className="p-4 grid grid-cols-4 gap-4 text-center">
              {['P1', 'P2', 'P3', 'P4'].map(p => resumenDiario[p] && (
                <div key={p} className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{p}</p>
                  <p className="text-xs text-gray-500">⭐{resumenDiario[p].estrellas} 📝{resumenDiario[p].tareas}/{resumenDiario[p].totalDias}</p>
                  {resumenDiario[p].puntosExtra > 0 && <p className="text-xs text-amber-600">🎁+{resumenDiario[p].puntosExtra}</p>}
                </div>
              ))}
            </div>

            {/* Detalle por período (acordeón) */}
            {['P1', 'P2', 'P3', 'P4'].map(p => diario[p]?.length > 0 && (
              <div key={p} className="border-t border-gray-100 dark:border-slate-700">
                <button
                  onClick={() => setDiarioAbierto(diarioAbierto === p ? null : p)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{p} — {diario[p].length} registros</span>
                  <svg className={`w-4 h-4 transition-transform ${diarioAbierto === p ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {diarioAbierto === p && (
                  <div className="px-4 pb-4 max-h-80 overflow-y-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 dark:bg-slate-700 sticky top-0">
                        <tr>
                          <th className="px-2 py-2 text-left">Fecha</th>
                          <th className="px-2 py-2 text-center">⭐</th>
                          <th className="px-2 py-2 text-center">📝</th>
                          <th className="px-2 py-2 text-center">🎁</th>
                          <th className="px-2 py-2 text-left">Obs</th>
                          <th className="px-2 py-2"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                        {diario[p].map((r: any) => (
                          editando === r._id ? (
                            <tr key={r._id} className="bg-blue-50 dark:bg-blue-900/10">
                              <td className="px-2 py-2 text-gray-600 dark:text-gray-400">{new Date(r.fecha).toLocaleDateString('es-DO')}</td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="number" min="0" max="5"
                                  value={editValues.participacion}
                                  onChange={e => setEditValues({...editValues, participacion: Number(e.target.value)})}
                                  className="w-14 px-1 py-0.5 border rounded text-center text-xs dark:bg-slate-700 dark:text-white"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={editValues.tarea}
                                  onChange={e => setEditValues({...editValues, tarea: e.target.checked})}
                                  className="w-4 h-4"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="number" min="0" max="10"
                                  value={editValues.puntosExtra}
                                  onChange={e => setEditValues({...editValues, puntosExtra: Number(e.target.value)})}
                                  className="w-14 px-1 py-0.5 border rounded text-center text-xs dark:bg-slate-700 dark:text-white"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <input
                                  type="text"
                                  value={editValues.observacion}
                                  onChange={e => setEditValues({...editValues, observacion: e.target.value})}
                                  className="w-full px-1 py-0.5 border rounded text-xs dark:bg-slate-700 dark:text-white"
                                />
                              </td>
                              <td className="px-2 py-2">
                                <div className="flex items-center gap-1">
                                  <button onClick={guardarEdicion} className="text-green-600 hover:text-green-700 text-xs" title="Guardar">💾</button>
                                  <button onClick={() => setEditando(null)} className="text-gray-400 hover:text-gray-600 text-xs" title="Cancelar">✖</button>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <tr key={r._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                              <td className="px-2 py-2 text-gray-600 dark:text-gray-400">{new Date(r.fecha).toLocaleDateString('es-DO')}</td>
                              <td className="px-2 py-2 text-center">{r.participacion || 0}</td>
                              <td className="px-2 py-2 text-center">{r.tarea ? '✅' : '—'}</td>
                              <td className="px-2 py-2 text-center">{r.puntosExtra || 0}</td>
                              <td className="px-2 py-2 text-gray-500 max-w-[120px] truncate">{r.observacion || '—'}</td>
                              <td className="px-2 py-2">
                                <div className="flex items-center gap-1">
                                  <button onClick={() => iniciarEdicion(r)} className="text-blue-600 hover:text-blue-700 text-xs" title="Editar">✏️</button>
                                  <button onClick={() => eliminarRegistro(r._id)} className="text-red-500 hover:text-red-600 text-xs" title="Eliminar">🗑️</button>
                                </div>
                              </td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                              </div>
            ))}
          </div>
        )}

        {Object.keys(resumenAsistencia).length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden mt-6">
            <button
              onClick={() => setAsistenciaAbierta(!asistenciaAbierta)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Asistencia</h2>
              <svg className={`w-4 h-4 transition-transform ${asistenciaAbierta ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {asistenciaAbierta && (
              <div className="p-4">
                {/* Resumen */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {['P1', 'P2', 'P3', 'P4'].map(p => resumenAsistencia[p] && (
                    <div key={p} className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-3 text-center">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{p}</p>
                      <p className="text-xs text-green-600">✅ {resumenAsistencia[p].presentes}</p>
                      <p className="text-xs text-red-500">❌ {resumenAsistencia[p].ausentes}</p>
                      <p className="text-xs text-gray-400">de {resumenAsistencia[p].total}</p>
                    </div>
                  ))}
                </div>

                {/* Detalle */}
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {Object.entries(asistencia).map(([p, regs]) =>
                    regs.map((r: any) => (
                      <div key={r._id} className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-gray-50 dark:hover:bg-slate-700">
                        <span className="text-gray-500">{new Date(r.fecha).toLocaleDateString('es-DO')}</span>
                        <span className="text-gray-400">{r.materia}</span>
                        <span>{r.presente ? '✅' : '❌'}</span>
                        {r.observacion && <span className="text-gray-400 truncate max-w-[100px]">{r.observacion}</span>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  )
}