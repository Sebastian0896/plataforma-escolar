// components/admin/AdminSidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function AdminSidebar() {
  const { data: session } = useSession()
  const user = session?.user
  const rol = user?.role
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme } = useTheme()

  // Links según rol
  const allLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊', roles: ['admin', 'docente', 'admin_centro', 'superadmin'] },
    { href: '/admin/docente', label: 'Mi Oficina', icon: '🏠', roles: ['docente', 'admin_centro'] },
    { href: '/admin/planificaciones', label: 'Planificaciones', icon: '📖', roles: ['admin', 'docente'] },
    { href: '/admin/planificaciones/nueva', label: 'Nueva Planificación', icon: '➕', roles: ['admin', 'docente'] },
    { href: '/admin/usuarios/centros', label: 'Usuarios', icon: '👥', roles: ['admin', 'admin_centro', 'superadmin'] },
    { href: '/admin/centros', label: 'Centros', icon: '🏫', roles: ['superadmin'] },
    { href: '/admin/centros/plan', label: 'Planes', icon: '💎', roles: ['admin_centro', 'admin'] },
    { href: '/admin/docente/evaluaciones', label: 'Evaluaciones', icon: '📊', roles: ['docente'] },
    { href: '/admin/registro/comprobantes', label: 'Comprobantes', icon: '📄', roles: ['registro'] },
  ]

  const links = allLinks.filter(l => l.roles.includes(rol || ''))

  useEffect(() => {
  const handler = () => setIsOpen(prev => !prev)
  document.addEventListener('toggle-sidebar', handler)
  return () => document.removeEventListener('toggle-sidebar', handler)
}, [])

  return (
    <>
      {/* Mobile toggle */}
    

      {/* {!isOpen && (
          <button
              onClick={() => setIsOpen(true)}
              className="fixed top-3 left-3 z-[40] lg:hidden bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 p-2.5 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )} */}

      {/* Overlay */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white overflow-y-auto
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-lg font-bold">📚 Admin</h1>
          <p className="text-xs text-gray-400 mt-0.5">Panel de gestión</p>
        </div>

        <div className="p-4 border-b border-gray-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name || 'Docente'}</p>
            <p className="text-xs text-gray-400 capitalize">{rol || 'profesor'}</p>
          </div>
        </div>

        <nav className="p-3">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
                  isActive
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <button
            onClick={() => {
              setTheme('light')
              signOut({ callbackUrl: '/' })
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}