'use client'

import { useState } from 'react'
import SidebarTema from './SidebarTema'

interface Tema {
  slug: string
  tema: string
}

interface Materia {
  nombre: string
  slug: string
  temas: Tema[]
}

interface Props {
  materia: Materia
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
        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
      >
        <svg className={`w-3 h-3 transition-transform ${expandido ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
        </svg>
        📖 {materia.nombre}
      </button>

      {expandido && (
        <div className="ml-6 space-y-0.5">
          {materia.temas.map((tema) => (
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