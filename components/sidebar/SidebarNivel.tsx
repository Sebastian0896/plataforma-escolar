'use client'

import { useState } from 'react'
import SidebarCiclo from './SidebarCiclo'

interface Props {
  nivel: any
  onClose: () => void
}

export default function SidebarNivel({ nivel, onClose }: Props) {
  const [expandido, setExpandido] = useState(false)

  return (
    <div className="mb-1">
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          🏫 {nivel.nombre}
        </span>
        <svg className={`w-4 h-4 transition-transform ${expandido ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>
      </button>

      {expandido && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-200 dark:border-indigo-800 pl-3">
          {nivel.ciclos.map((ciclo: any) => (
            <SidebarCiclo key={ciclo.slug} ciclo={ciclo} nivelSlug={nivel.slug} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  )
}