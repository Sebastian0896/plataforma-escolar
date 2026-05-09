'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function AsistenciaPage() {
  const { data: session } = useSession()
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [periodo, setPeriodo] = useState('P1')
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [registros, setRegistros] = useState<any[]>([])
  const [mensaje, setMensaje] = useState('')
  const [editando, setEditando] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ presente: true, observacion: '' })

  const cargar = () => {
    if (grado && materia) {
      Promise.all([
        fetch(`/api/docente/estudiantes?grado=${grado}`).then(r => r.json()),
        fetch(`/api/asistencia?grado=${grado}&materia=${materia}&fecha=${fecha}`).then(r => r.json()),
      ]).then(([est, reg]) => {
        const estList = Array.isArray(est) ? est : est.estudiantes || []
        const regList = Array.isArray(reg) ? reg : []
        const merged = estList.map((e: any) => {
          const r = regList.find((x: any) => x.estudianteId === e._id)
          return { ...e, ...r, regId: r?._id || null }
        })
        setEstudiantes(merged)
        setRegistros(regList)
      })
    }
  }

  useEffect(() => { cargar() }, [grado, materia, fecha])

  const guardar = async () => {
    const data = estudiantes.map(e => ({
      estudianteId: e._id,
      presente: (document.getElementById(`pres-${e._id}`) as HTMLInputElement)?.checked ?? true,
      observacion: (document.getElementById(`obs-${e._id}`) as HTMLInputElement)?.value || '',
    }))

    const res = await fetch('/api/asistencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grado, materia, fecha, periodo, registros: data }),
    })
    setMensaje(res.ok ? '✅ Guardado' : '❌ Error')
    setTimeout(() => setMensaje(''), 2000)
    cargar()
  }

  const iniciarEdicion = (e: any) => {
    setEditando(e._id)
    setEditValues({
      presente: e.presente !== undefined ? e.presente : true,
      observacion: e.observacion || '',
    })
  }

  const guardarEdicion = async () => {
    if (!editando) return
    await fetch('/api/asistencia', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editando, ...editValues }),
    })
    setEditando(null)
    cargar()
  }

  const eliminarRegistro = async (id: string) => {
    if (!id || !confirm('¿Eliminar este registro?')) return
    await fetch(`/api/asistencia?id=${id}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Asistencia</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="px-2 py-1.5 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Grado</option>
          {(session?.user?.grados || []).map((g: string) => <option key={g} value={g}>{g?.replace('-', ' ')}</option>)}
        </select>
        <select value={materia} onChange={(e) => setMateria(e.target.value)} className="px-2 py-1.5 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Materia</option>
          {session?.user?.materias?.map((m: string) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="px-2 py-1.5 border rounded-lg dark:bg-slate-700 dark:text-white text-sm" />
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="px-2 py-1.5 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="P1">P1</option><option value="P2">P2</option><option value="P3">P3</option><option value="P4">P4</option>
        </select>
      </div>

      {mensaje && <p className="mb-4 text-sm text-green-600">{mensaje}</p>}

      {grado && materia && estudiantes.length > 0 && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">Estudiante</th>
                  <th className="px-4 py-3 text-center">✅ Presente</th>
                  <th className="px-4 py-3 text-left">Observación</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {estudiantes.map((e: any) =>
                  editando === e._id ? (
                    <tr key={e._id} className="bg-blue-50 dark:bg-blue-900/10">
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{e.nombre}</td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={editValues.presente} onChange={ev => setEditValues({...editValues, presente: ev.target.checked})} className="w-5 h-5" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="text" value={editValues.observacion} onChange={ev => setEditValues({...editValues, observacion: ev.target.value})}
                          className="w-full px-2 py-1 border rounded dark:bg-slate-700 dark:text-white text-xs" />
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={guardarEdicion} className="text-green-600 text-xs">💾</button>
                        <button onClick={() => setEditando(null)} className="text-gray-500 text-xs ml-1">✖</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={e._id}>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{e.nombre}</td>
                      <td className="px-4 py-3 text-center">{e.presente !== false ? '✅' : '❌'}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{e.observacion || '—'}</td>
                      <td className="px-4 py-3">
                        {e.regId && (
                          <>
                            <button onClick={() => iniciarEdicion(e)} className="text-blue-600 text-xs">✏️</button>
                            <button onClick={() => eliminarRegistro(e.regId)} className="text-red-500 text-xs ml-1">🗑️</button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <button onClick={guardar} className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700">
            Guardar Asistencia
          </button>
        </>
      )}
    </div>
  )
}