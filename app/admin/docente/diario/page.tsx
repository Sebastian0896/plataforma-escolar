'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function DiarioPage() {
  const { data: session } = useSession()
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [periodo, setPeriodo] = useState('P1')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [registros, setRegistros] = useState<any[]>([])
  const [mensaje, setMensaje] = useState('')

  const gradosDocente = session?.user?.grados || []

  useEffect(() => {
    if (grado && materia && fecha) {
      // Cargar estudiantes
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then(r => r.json())
        .then(d => setEstudiantes(Array.isArray(d) ? d : d.estudiantes || []))

      // Cargar registros existentes
      fetch(`/api/diario?grado=${grado}&materia=${materia}&fecha=${fecha}`)
        .then(r => r.json())
        .then(d => setRegistros(Array.isArray(d) ? d : []))
    }
  }, [grado, materia, fecha])

  const getRegistro = (estudianteId: string) => {
    return registros.find(r => r.estudianteId === estudianteId) || {}
  }

  const guardar = async () => {
    const data = estudiantes.map(e => ({
      estudianteId: e._id,
      participacion: Number((document.getElementById(`part-${e._id}`) as HTMLInputElement)?.value || 0),
      tarea: (document.getElementById(`tarea-${e._id}`) as HTMLInputElement)?.checked || false,
      puntosExtra: Number((document.getElementById(`extra-${e._id}`) as HTMLInputElement)?.value || 0),
      observacion: (document.getElementById(`obs-${e._id}`) as HTMLInputElement)?.value || '',
    }))

    const res = await fetch('/api/diario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grado, materia, fecha, periodo, registros: data }),
    })

    setMensaje(res.ok ? '✅ Guardado' : '❌ Error')
    setTimeout(() => setMensaje(''), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📅 Diario del Docente</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Grado</option>
          {gradosDocente.map((g: string) => <option key={g} value={g}>{g?.replace('-', ' ')}</option>)}
        </select>
        <select value={materia} onChange={(e) => setMateria(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Materia</option>
          {session?.user?.materias?.map((m: string) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
            <option value="P4">P4</option>
        </select>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm" />
      </div>

      {mensaje && <p className="mb-4 text-sm text-green-600">{mensaje}</p>}

      {grado && materia && estudiantes.length > 0 && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">Estudiante</th>
                  <th className="px-3 py-3 text-center">⭐ Participación (0-5)</th>
                  <th className="px-3 py-3 text-center">📝 Tarea</th>
                  <th className="px-3 py-3 text-center">🎁 Extra</th>
                  <th className="px-3 py-3 text-left">💬 Observación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {estudiantes.map(e => {
                  const reg = getRegistro(e._id)
                  return (
                    <tr key={e._id}>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">{e.nombre}</td>
                      <td className="px-3 py-3 text-center">
                        <input
                          id={`part-${e._id}`}
                          type="number" min="0" max="5"
                          defaultValue={reg.participacion ?? 0}
                          className="w-16 px-2 py-1 border rounded text-center dark:bg-slate-700 dark:text-white"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                          id={`tarea-${e._id}`}
                          type="checkbox"
                          defaultChecked={reg.tarea || false}
                          className="w-5 h-5"
                        />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <input
                            id={`extra-${e._id}`}
                            type="number" min="0" max="10"
                            defaultValue={reg.puntosExtra ?? 0}
                            className="w-16 px-2 py-1 border rounded text-center dark:bg-slate-700 dark:text-white"
                        />
                        </td>
                      <td className="px-3 py-3">
                        <select
  id={`obs-${e._id}`}
  defaultValue={reg.observacion || ''}
  className="w-full px-2 py-1 border rounded dark:bg-slate-700 dark:text-white text-xs"
>
                        <option value="">Sin observación</option>
                        <option value="Participación activa">Participación activa</option>
                        <option value="Ayudó a un compañero">Ayudó a un compañero</option>
                        <option value="Excelente trabajo en equipo">Excelente trabajo en equipo</option>
                        <option value="No trajo el material">No trajo el material</option>
                        <option value="Llegó tarde">Llegó tarde</option>
                        <option value="No participó">No participó</option>
                        <option value="Entregó tarea incompleta">Entregó tarea incompleta</option>
                        <option value="Muy buen comportamiento">Muy buen comportamiento</option>
                        <option value="Necesita mejorar atención">Necesita mejorar atención</option>
                        <option value="Trabajó de forma independiente">Trabajó de forma independiente</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button onClick={guardar} className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700">
            Guardar Diario
          </button>
        </>
      )}
    </div>
  )
}