'use client'

import { useState } from 'react'
import SidebarMateria from './SidebarMateria'

interface GradoInfo {
  nombre: string
  slug: string
  materias: any[]
}

interface Props {
  grado: GradoInfo
  nivelSlug: string
  onClose: () => void
}

export default function SidebarGrado({ grado, nivelSlug, onClose }: Props) {
  const [expandido, setExpandido] = useState(false)

  return (
    <div>
      <button
        onClick={() => setExpandido(!expandido)}
        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
      >
        <svg className={`w-3 h-3 transition-transform ${expandido ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>
        👨‍🎓 {grado.nombre}
      </button>

      {expandido && (
        <div className="ml-6 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-3">
          {grado.materias.map((materia) => (
            <SidebarMateria
              key={materia.slug}
              materia={materia}
              nivelSlug={nivelSlug}
              gradoSlug={grado.slug}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}