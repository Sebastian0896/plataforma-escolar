'use client'

import { signOut, useSession } from 'next-auth/react'

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">📄 Registro de Notas</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">{session?.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
          >
            🚪 Salir
          </button>
        </div>
      </header>
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  )
}