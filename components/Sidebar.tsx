'use client'

import { useEffect, useState } from 'react'
import type { NivelInfo } from '@/lib/types'
import SidebarNivel from './sidebar/SidebarNivel'
import { useSession } from 'next-auth/react'

function formatear(texto: string): string {
  if (!texto) return ''
  return texto
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

interface SidebarProps {
  estructura: NivelInfo[]
}


export default function Sidebar({ estructura }: SidebarProps) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [centroNombre, setCentroNombre] = useState('')
  
  useEffect(() => {
    const handler = () => setIsOpen(prev => !prev)
    document.addEventListener('toggle-sidebar', handler)
    return () => document.removeEventListener('toggle-sidebar', handler)
  }, [])


useEffect(() => {
  if (session?.user?.centroId) {
    fetch(`/api/centros?id=${session.user.centroId}`)
      .then(r => r.json())
      .then(c => { if (c?.nombre) setCentroNombre(c.nombre) })
      .catch(() => {})
  }
}, [session?.user?.centroId])
  
  return (
    <>
      
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />}

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 overflow-y-auto
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header con gradiente */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-lg font-bold text-white">📚 Planificaciones</h1>
          <p className="text-xs text-blue-100 mt-0.5">Sistema Educativo Dominicano</p>
        </div>

        <nav className="p-3">
          {estructura.map((nivel) => (
            <SidebarNivel key={nivel.slug} nivel={nivel} onClose={() => setIsOpen(false)} />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {centroNombre || 'Plataforma Educativa'}
          </p>
        </div>
      </aside>
    </>
  )
}