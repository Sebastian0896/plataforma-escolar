'use client'

import { useState } from 'react'
import SidebarTema from './SidebarTema'

interface Props {
  materia: any
  nivelSlug: string
  gradoSlug: string
  onClose: () => void
}

export default function SidebarMateria({ materia, nivelSlug, gradoSlug, onClose }: Props) {
  const [expandido, setExpandido] = useState(false)

  return (
    <div>
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-50 dark:bg-slate-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <svg className={`w-3 h-3 transition-transform ${expandido ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        📖 {materia.nombre}
      </button>

      {expandido && (
        <div className="ml-6 space-y-0.5 border-l-2 border-blue-200 dark:border-blue-800 pl-3">
          {materia.temas.map((tema: any) => (
            <SidebarTema
              key={tema.slug}
              href={`/dashboard/${nivelSlug}/${gradoSlug}/${tema.slug}`}
              tema={tema.tema}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}