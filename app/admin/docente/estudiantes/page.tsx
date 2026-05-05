'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function MisEstudiantesPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/estudiantes')
        .then(r => r.json())
        .then(d => setData(d))
    }
  }, [session])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mis Estudiantes</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{data?.total || 0} estudiantes</p>

      {data?.porGrado && Object.entries(data.porGrado).map(([grado, estudiantes]: [string, any]) => (
        <div key={grado} className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            {grado?.replace('-', ' ')}
            <span className="text-sm text-gray-500 font-normal">({estudiantes.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {estudiantes.map((e: any) => (
              <div key={e._id} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-lg font-bold text-purple-700">
                    {e.nombre?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{e.nombre}</p>
                    <p className="text-xs text-gray-500 truncate">{e.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-xs text-gray-400 capitalize">{e.genero || 'Sin especificar'}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">🎒 Estudiante</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}