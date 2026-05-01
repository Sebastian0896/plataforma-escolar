'use client'

import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import ThemeToggle from './ThemeToggle'

interface Props {
  name?: string | null
  rol?: string
}

export default function UserMenu({ name, rol }: Props) {
  const { setTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="w-7 h-7 bg-gray-200 dark:bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold">
          {name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <span className="max-w-[120px] truncate">{name}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 capitalize">({rol || 'invitado'})</span>
      </div>
      <button
        onClick={() => {
          setTheme('light')
          signOut({ callbackUrl: '/' })
        }}
        className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
        title="Cerrar sesión"
      >
        🚪 Salir
      </button>
    </div>
  )
}