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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white flex-shrink-0">
            <span className="text-xl">📚</span>
            <span className="hidden sm:inline">Plataforma Educativa</span>
          </Link>

          {/* Buscador + UserMenu */}
          <div className="flex items-center gap-1">
            <BuscadorGlobal />
            <div className="hidden md:flex items-center gap-3">
              <UserMenu name={session?.user?.name} rol={session?.user?.role} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}