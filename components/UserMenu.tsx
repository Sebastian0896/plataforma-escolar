'use client'

import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import NotificacionesBell from './NotificacionesBell'

interface Props {
  name?: string | null
  rol?: string
}

export default function UserMenu({ name, rol }: Props) {
  const { setTheme } = useTheme()
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      {rol !== 'registro' && <NotificacionesBell />}

      <div ref={ref} className="relative">
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-400">
            {name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <span className="hidden lg:inline max-w-[120px] truncate">{name}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {abierto && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xl z-50 py-1">
            <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{rol?.replace('_', ' ')}</p>
            </div>
            <Link
              href="/cuenta"
              onClick={() => setAbierto(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              👤 Mi Cuenta
            </Link>
            <button
              onClick={() => { setTheme('light'); signOut({ callbackUrl: '/' }) }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  )
}