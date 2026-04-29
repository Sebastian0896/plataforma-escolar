'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NivelInfo } from '@/lib/types'

interface SidebarProps {
  estructura: NivelInfo[]
}

export default function Sidebar({ estructura }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandidos, setExpandidos] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => {
    setExpandidos((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function formatear(texto: string): string {
  if (!texto) return ''
  return texto
    .split('-')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ')
}

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-slate-900 p-2 rounded-lg shadow-md border border-gray-200 dark:border-slate-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 overflow-y-auto
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">📚 Planificaciones</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sistema Educativo Dominicano</p>
        </div>

        <nav className="p-3">
          {estructura.map((nivel) => {
            const nivelKey = `nivel-${nivel.slug}`
            const expandido = expandidos[nivelKey] || false

            return (
              <div key={nivelKey} className="mb-1">
                <button
                  onClick={() => toggle(nivelKey)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 transition-transform ${expandido ? 'rotate-90' : ''}`}>
                      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                    🏫 {formatear(nivel.nombre)}
                  </span>
                </button>

                {expandido && (
                  <div className="ml-4 mt-1 space-y-1">
                    {nivel.ciclos.map((ciclo) => {
                      const cicloKey = `ciclo-${ciclo.slug}`
                      return (
                        <div key={cicloKey}>
                          <button
                            onClick={() => toggle(cicloKey)}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 transition-transform ${expandidos[cicloKey] ? 'rotate-90' : ''}`}>
                              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>
                            📘 {formatear(ciclo.nombre)}
                          </button>

                          {expandidos[cicloKey] && (
                            <div className="ml-6 space-y-1">
                              {ciclo.grados.map((grado) => {
                                const gradoKey = `grado-${grado.slug}`
                                return (
                                  <div key={gradoKey}>
                                    <button
                                      onClick={() => toggle(gradoKey)}
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 transition-transform ${expandidos[gradoKey] ? 'rotate-90' : ''}`}>
                                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                      </svg>
                                      👨‍🎓 {formatear(grado.nombre)}
                                    </button>

                                    {expandidos[gradoKey] && (
                                      <div className="ml-6 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-3">
                                        {grado.materias.map((materia) => {
                                          const materiaKey = `materia-${materia.slug}`
                                          return (
                                            <div key={materiaKey}>
                                              <button
                                                onClick={() => toggle(materiaKey)}
                                                className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded"
                                              >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-3 h-3 transition-transform ${expandidos[materiaKey] ? 'rotate-90' : ''}`}>
                                                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                                                </svg>
                                                📖 {formatear(materia.nombre)}
                                              </button>

                                              {expandidos[materiaKey] && (
                                                <div className="ml-6 space-y-0.5">
                                                  {materia.temas.map((tema) => {
                                                    const href = `/dashboard/${nivel.slug}/${grado.slug}/${tema.slug}`
                                                    const isActive = pathname === href
                                                    return (
                                                      <Link
                                                        key={tema.slug}
                                                        href={href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                                                          isActive
                                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                                                        }`}
                                                      >
                                                        {formatear(tema.tema)}
                                                      </Link>
                                                    )
                                                  })}
                                                </div>
                                              )}
                                            </div>
                                          )
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Centro Educativo Salomé Ureña
          </p>
        </div>
      </aside>
    </>
  )
}