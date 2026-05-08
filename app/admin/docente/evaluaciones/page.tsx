// app/admin/docente/evaluaciones/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

//const GRADOS_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria']
//const GRADOS_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria']
export default function EvaluacionesPage() {
    const { data: session } = useSession()
    const [competencias, setCompetencias] = useState<any[]>([])
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [periodo, setPeriodo] = useState('P1')
  const [grado, setGrado] = useState('')
  const [materia, setMateria] = useState('')
  const [notas, setNotas] = useState<Record<string, Record<string, number>>>({})
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const gradosDocente = session?.user?.grados || (session?.user?.grado ? [session.user.grado] : [])
  // Inicializar materia con la primera del docente
  useEffect(() => {
    if (session?.user?.materias?.length) {
      setMateria(session.user.materias[0])
    }
  }, [session])

  // Cargar competencias
  useEffect(() => {
    fetch('/api/competencias').then(r => r.json()).then(setCompetencias)
  }, [])

  // Cargar estudiantes según grado
  useEffect(() => {
    if (grado) {
      setCargando(true)
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then(r => r.json())
        .then(d => {
          const lista = Array.isArray(d) ? d : d.estudiantes || []
          setEstudiantes(lista)
          setCargando(false)
        })
    }
  }, [grado])

  // Cargar notas existentes
  useEffect(() => {
    if (grado && periodo && materia) {
      fetch(`/api/evaluaciones?grado=${grado}&periodo=${periodo}&materia=${materia}`)
        .then(r => r.json())
        .then(d => {
          if (d.notas) {
            const cargadas: Record<string, Record<string, number>> = {}
            Object.entries(d.notas).forEach(([estId, comps]: any) => {
              cargadas[estId] = comps
            })
            setNotas(cargadas)
          } else {
            setNotas({})
          }
        })
    }
  }, [grado, periodo, materia])

  const setNota = (estudianteId: string, competenciaId: string, valor: number) => {
    setNotas(prev => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        [competenciaId]: valor,
      },
    }))
  }

  const guardar = async () => {
    setMensaje('')
    const res = await fetch('/api/evaluaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grado,
        periodo,
        materia: materia || session?.user?.materias?.[0] || '',
        notas,
      }),
    })
    if (res.ok) {
      setMensaje('✅ Evaluaciones guardadas')
      setTimeout(() => setMensaje(''), 2000)
    } else {
      setMensaje('❌ Error al guardar')
    }
  }

  const getColorNota = (nota: number) => {
    if (nota === undefined || nota === null) return ''
    if (nota >= 80) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    if (nota >= 65) return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Evaluaciones</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Seleccionar grado</option>
           {gradosDocente.map((g) => (
                <option key={g} value={g}>{g?.replace('-', ' ')}</option>
            ))}
        </select>

        <select value={materia} onChange={(e) => setMateria(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Seleccionar materia</option>
          {session?.user?.materias?.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select value={periodo} onChange={(e) => setPeriodo(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </select>

        <a
          href={`/api/evaluaciones/pdf?grado=${grado}&materia=${materia}`}
          target="_blank"
          className="ml-4 bg-red-600 text-white px-4 py-2.5 rounded-lg text-sm hover:bg-red-700"
        >
          📄 PDF Completo
        </a>
      </div>

      {mensaje && (
        <p className={`mb-4 text-sm ${mensaje.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>{mensaje}</p>
      )}

      {!grado || !materia ? (
        <p className="text-gray-500">Seleccioná grado y materia para empezar.</p>
      ) : cargando ? (
        <p className="text-gray-500">Cargando estudiantes...</p>
      ) : estudiantes.length === 0 ? (
        <p className="text-gray-500">No hay estudiantes en este grado.</p>
      ) : (
        <>
          <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Estudiante</th>
                  {competencias.map(c => (
                    <th key={c._id} className="px-2 py-3 text-center font-medium text-xs text-gray-700 dark:text-gray-300">
                      {c.nombre.length > 20 ? c.nombre.substring(0, 20) + '...' : c.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {estudiantes.map((e: any) => (
                  <tr key={e._id}>
                    <td className="px-4 py-2 text-gray-900 dark:text-white text-xs">{e.nombre}</td>
                    {competencias.map(c => {
                      const nota = notas[e._id]?.[c._id]
                      return (
                        <td key={c._id} className="px-2 py-2 text-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className={`w-14 px-1 py-1 border rounded text-center text-sm font-medium ${getColorNota(nota)}`}
                            defaultValue={nota ?? ''}
                            onBlur={(event) => setNota(e._id, c._id, Number(event.target.value))}
                          />
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={guardar} className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Guardar Evaluaciones
          </button>
        </>
      )}
    </div>
  )
}