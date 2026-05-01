// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

import { useTheme } from 'next-themes'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const rol = session?.user?.role

  const { setTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
            <span className="text-xl">📚</span>
            <span className="hidden sm:inline">Salomé Ureña</span>
          </Link>

          {/* Links de navegación - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {rol !== 'estudiante' && (
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                📖 Planificaciones
              </Link>
            )}

            {(rol === 'admin' || rol === 'admin_centro') && (
              <Link
                href="/admin/usuarios"
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith('/admin/usuarios')
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                👥 Usuarios
              </Link>
            )}

            {(rol === 'admin' || rol === 'docente') && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith('/dashboard')
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                ⚙️ Administrar
              </Link>
            )}

            {rol === 'estudiante' && (
              <Link
                href={`/dashboard/estudiante/${session?.user?.grado}`}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith('/dashboard')
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              >
                🎒 Mis Clases
              </Link>
            )}
          </div>

          {/* Usuario y salir */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="max-w-[120px] truncate text-gray-600 dark:text-green-300">{session?.user?.name}</span>
              <span className="text-xs text-gray-400 capitalize">({rol || 'invitado'})</span>
            </div>

            <button
              onClick={() => {
                setTheme('light')
                signOut({ callbackUrl: '/' })
              }}
              className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            >
              🚪 Salir
            </button>
            <ThemeToggle />

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-2 space-y-1">
            {rol !== 'estudiante' && (
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                📖 Planificaciones
              </Link>
            )}
            {(rol === 'admin' || rol === 'docente') && (
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                ⚙️ Administrar
              </Link>
            )}
            {rol === 'estudiante' && (
              <Link
                href={`/estudiante/${session?.user?.grado}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                🎒 Mis Clases
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}