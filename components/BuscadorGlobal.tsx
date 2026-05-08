'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function BuscadorGlobal() {
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState<any[]>([])
  const [abierto, setAbierto] = useState(false)
  const [modalAbierto, setModalAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const puedeGestionar = session?.user?.role === 'docente' || session?.user?.role === 'admin' || session?.user?.role === 'admin_centro'

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false)
        setModalAbierto(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (query.length < 2) { setResultados([]); setAbierto(false); return }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/buscar?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResultados(data)
      setAbierto(data.length > 0)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const inputClass = "w-full px-3 py-2 pl-8 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <>
      {/* Desktop */}
      <div ref={ref} className="hidden sm:block relative">
        <div className="relative">
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar planificaciones..."
            className="w-48 lg:w-64 px-3 py-1.5 pl-8 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {abierto && resultados.length > 0 && (
          <Resultados resultados={resultados} puedeGestionar={puedeGestionar} onClose={() => { setAbierto(false); setQuery('') }} />
        )}
      </div>

      {/* Mobile: solo lupa */}
      <button
        onClick={() => setModalAbierto(true)}
        className="sm:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Modal mobile */}
      {modalAbierto && (
        <div className="fixed inset-0 z-90 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalAbierto(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white dark:bg-slate-900 p-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <input
                  type="text" value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar planificaciones..."
                  className={inputClass}
                  autoFocus
                />
                <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button onClick={() => setModalAbierto(false)} className="text-sm text-gray-500">
                Cancelar
              </button>
            </div>

            {resultados.length > 0 && (
              <div className="max-h-60 overflow-y-auto">
                <Resultados
                  resultados={resultados}
                  puedeGestionar={puedeGestionar}
                  onClose={() => { setModalAbierto(false); setQuery('') }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Resultados({ resultados, puedeGestionar, onClose }: { resultados: any[], puedeGestionar: boolean, onClose: () => void }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xl max-h-80 overflow-y-auto">
      {resultados.map((r: any) => (
        <div key={r._id} className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/dashboard/${r.nivel || 'nivel-secundario'}/${r.grado}/${r.slug}`}
              onClick={onClose}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.tema}</p>
              <p className="text-xs text-gray-500 mt-0.5">{r.materia} · {r.grado?.replace('-', ' ')}</p>
            </Link>
            {puedeGestionar && (
              <Link
                href={`/admin/planificaciones/editar/${r.materia}/${r.slug}`}
                onClick={onClose}
                className="text-xs text-blue-600 hover:underline whitespace-nowrap flex-shrink-0"
              >
                ✏️ Editar
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}