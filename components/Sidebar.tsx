'use client'

import { useState } from 'react'
import type { NivelInfo } from '@/lib/types'
import SidebarNivel from './sidebar/SidebarNivel'

interface SidebarProps {
  estructura: NivelInfo[]
}

export default function Sidebar({ estructura }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

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

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />}

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 overflow-y-auto
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">📚 Planificaciones</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sistema Educativo Dominicano</p>
        </div>

        <nav className="p-3">
          {estructura.map((nivel) => (
            <SidebarNivel key={nivel.slug} nivel={nivel} onClose={() => setIsOpen(false)} />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Centro Educativo Salomé Ureña</p>
        </div>
      </aside>
    </>
  )
}