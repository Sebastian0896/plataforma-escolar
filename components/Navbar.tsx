// components/Navbar.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UserMenu from './UserMenu'
import BuscadorGlobal from './BuscadorGlobal'

export default function Navbar() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  const rol = session?.user?.role
  const inicioHref = rol === 'docente' ? '/admin/docente'
  : rol === 'admin_centro' ? '/admin'
  : rol === 'superadmin' ? '/admin'
  : rol === 'estudiante' ? `/estudiante/${session?.user?.grado}`
  : rol === 'registro' ? '/admin/registro/comprobantes'
  : '/dashboard'


  if (!mounted) {
    return (
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14" />
      </nav>
    )
  }

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Botón Sidebar - mobile */}
          <button
            onClick={() => document.dispatchEvent(new Event('toggle-sidebar'))}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link href={inicioHref} className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span className="text-xl">📚</span>
            <span className="hidden sm:inline">Plataforma Educativa</span>
          </Link>

          {/* Buscador */}
          <BuscadorGlobal />
        </div>
      </div>
    </nav>
  )
}