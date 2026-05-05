'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MisRecursosPage() {
  const { data: session } = useSession()
  const [recursos, setRecursos] = useState<any[]>([])
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/recursos')
        .then(r => r.json())
        .then(data => setRecursos(data))
    }
  }, [session])

  const filtrados = filtro === 'todos' ? recursos : recursos.filter(r => r.tipo === filtro)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mis Recursos</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{recursos.length} archivos</p>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {['todos', 'imagen', 'pdf', 'video', 'audio', 'enlace'].map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize ${filtro === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtrados.map((r, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">
                {r.tipo === 'imagen' ? '🖼️' : r.tipo === 'pdf' ? '📄' : r.tipo === 'video' ? '🎬' : r.tipo === 'audio' ? '🎵' : '🔗'}
              </span>
              <span className="text-xs capitalize bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">{r.tipo}</span>
            </div>
            <a href={r.url} target="_blank" className="text-sm text-blue-600 hover:underline break-all">{r.url}</a>
            {r.descripcion && <p className="text-xs text-gray-500 mt-1">{r.descripcion}</p>}
            <p className="text-xs text-gray-400 mt-2">De: {r.planificacionTema}</p>
          </div>
        ))}
      </div>
    </div>
  )
}