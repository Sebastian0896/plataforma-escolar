'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NivelInfo } from '@/lib/types'

interface SidebarEstudianteProps {
  estructura: NivelInfo[]
  grado: string
}

export default function SidebarEstudiante({ estructura, grado }: SidebarEstudianteProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [nivelExpandido, setNivelExpandido] = useState(true)

  // Obtener nombre de la sesión o de sessionStorage
  const nombre = session?.user?.name || 
    (typeof window !== 'undefined' ? sessionStorage.getItem('estudiante_nombre') : null) || 
    'Estudiante'

  console.log("Viendo el nombre de estudiante: ", nombre)

  // Filtrar solo el grado del estudiante
  const gradoActual = estructura
    .flatMap((n) =>
      n.ciclos.flatMap((c) =>
        c.grados.filter((g) => g.slug === grado)
      )
    )[0]

    

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />
      )}

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200 overflow-y-auto
        transform transition-transform duration-200
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">📚 Mis Clases</h1>
          <p className="text-sm text-gray-600 mt-0.5">Hola, {nombre}</p>
          <p className="text-xs text-gray-400 mt-0.5 capitalize">
            {grado?.replace('-', ' ')}
          </p>
        </div>

        <nav className="p-3">
          {gradoActual ? (
            <div>
              <button
                onClick={() => setNivelExpandido(!nivelExpandido)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <svg className={`w-4 h-4 transition-transform ${nivelExpandido ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                </svg>
                📖 Mis Materias
              </button>

              {nivelExpandido && (
                <div className="ml-4 mt-1 space-y-1">
                  {gradoActual.materias.map((materia) => (
                    <div key={materia.slug}>
                      <p className="px-3 py-1.5 text-sm font-medium text-gray-500">
                        {materia.nombre.charAt(0).toUpperCase() + materia.nombre.slice(1)}
                      </p>
                      <div className="ml-3 space-y-0.5">
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
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {tema.tema}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">
              No hay contenido disponible para este grado aún.
            </p>
          )}
        </nav>

        <div className=" bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <Link
            href="/login"
            className="text-xs text-blue-600 hover:text-blue-800 block text-center"
          >
            Salir
          </Link>
        </div>
      </aside>
    </>
  )
}