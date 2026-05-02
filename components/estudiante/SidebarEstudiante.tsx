'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import type { NivelInfo } from '@/lib/types'

function formatear(texto: string): string {
  if (!texto) return ''
  return texto
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

interface Props {
  estructura: NivelInfo[]
  grado: string
}

export default function SidebarEstudiante({ estructura, grado }: Props) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandido, setExpandido] = useState<string | null>(null)

  const nombre = session?.user?.name || 'Estudiante'
  const gradoActual = estructura
  .flatMap(n => n.ciclos.flatMap(c => c.grados.filter(g => g.slug === grado)))
  .flatMap(g => g.materias)
  .filter((m, i, arr) => arr.findIndex(x => x.slug === m.slug) === i)

  const toggle = (key: string) => {
    setExpandido(expandido === key ? null : key)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-slate-900 p-2 rounded-lg shadow-md border"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />}

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 overflow-y-auto
        transform transition-transform duration-200
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-lg font-bold text-white">📚 Mis Clases</h1>
          <p className="text-sm text-blue-100 mt-0.5">Hola, {nombre}</p>
          <p className="text-xs text-blue-200 mt-0.5 capitalize">{formatear(grado)}</p>
        </div>

        <nav className="p-3">
          {gradoActual.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No hay contenido disponible para este grado aún.
            </p>
          ) : (
            gradoActual.map((materia) => (
              <div key={materia.slug} className="mb-2">
                <button
                  onClick={() => toggle(materia.slug)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {formatear(materia.nombre)}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandido === materia.slug ? 'rotate-90' : ''}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                  </svg>
                </button>

                {expandido === materia.slug && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                    {materia.temas.map((tema) => {
                      const href = `/estudiante/${grado}/${tema.slug}`
                      const isActive = pathname === href

                      return (
                        <Link
                          key={tema.slug}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          {tema.tema}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
          <Link
            href="/"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline block text-center"
          >
            ← Volver al inicio
          </Link>
        </div>
      </aside>
    </>
  )
}