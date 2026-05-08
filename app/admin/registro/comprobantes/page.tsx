'use client'

import { useState, useEffect } from 'react'

const GRADOS = [
  '1ro-primaria','2do-primaria','3ro-primaria','4to-primaria','5to-primaria','6to-primaria',
  '1ro-secundaria','2do-secundaria','3ro-secundaria','4to-secundaria','5to-secundaria','6to-secundaria',
]

export default function ComprobantesPage() {
  const [grado, setGrado] = useState('')
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (grado) {
      setCargando(true)
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then(r => r.json())
        .then(d => {
          setEstudiantes(Array.isArray(d) ? d : d.estudiantes || [])
          setCargando(false)
        })
    }
  }, [grado])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📄 Comprobantes de Notas</h1>

      <div className="flex gap-4 mb-6">
        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-white text-sm">
          <option value="">Seleccionar grado</option>
          {GRADOS.map(g => <option key={g} value={g}>{g.replace('-', ' ')}</option>)}
        </select>

        {grado && estudiantes.length > 0 && (
          <>
            <a
              href={`/api/comprobante/grado?grado=${grado}&periodo=P1`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              📄 P1
            </a>
            <a
              href={`/api/comprobante/grado?grado=${grado}&periodo=P2`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              📄 P2
            </a>
            <a
              href={`/api/comprobante/grado?grado=${grado}&periodo=P3`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              📄 P3
            </a>
            <a
              href={`/api/comprobante/grado?grado=${grado}&periodo=P4`}
              target="_blank"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              📄 P4
            </a>
            <a
              href={`/api/comprobante/grado?grado=${grado}&periodo=todos`}
              target="_blank"
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
            >
              📄 Todos
            </a>
          </>
        )}
      </div>

      {cargando ? (
        <p className="text-gray-500">Cargando...</p>
      ) : grado && estudiantes.length === 0 ? (
        <p className="text-gray-500">No hay estudiantes en este grado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {estudiantes.map(e => (
            <div key={e._id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
              <p className="font-medium text-gray-900 dark:text-white">{e.nombre}</p>
              <p className="text-xs text-gray-500">{e.email}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {['P1','P2','P3','P4'].map(p => (
                  <a
                    key={p}
                    href={`/api/comprobante/${e._id}?periodo=${p}`}
                    target="_blank"
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    {p}
                  </a>
                ))}
                <a
                  href={`/api/comprobante/${e._id}?periodo=todos`}
                  target="_blank"
                  className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Todos
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}