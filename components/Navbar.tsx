'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import NavLinks from './NavLinks'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const { data: session } = useSession()

  
  const [menuOpen, setMenuOpen] = useState(false)
  const rol = session?.user?.role
  const grado = session?.user?.grado

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span className="text-xl">📚</span>
            <span className="hidden sm:inline">Salomé Ureña</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLinks rol={rol} grado={grado} />
          </div>

          <div className="flex items-center gap-3">
            <UserMenu name={session?.user?.name} rol={rol} />
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)}>
          <NavLinks rol={rol} grado={grado} onClick={() => setMenuOpen(false)} />
        </MobileMenu>
      </div>
    </nav>
  )
}