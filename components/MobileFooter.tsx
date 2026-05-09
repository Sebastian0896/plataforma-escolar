'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import NotificacionesBell from './NotificacionesBell'

export default function MobileFooter() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const rol = session?.user?.role
  const grado = session?.user?.grado

  const links: { href: string; icon: string; label: string; roles: string[] }[] = [
    { href: '/dashboard', icon: '📖', label: 'Planificaciones', roles: ['admin', 'docente', 'admin_centro', 'coordinador'] },
    { href: '/admin/docente', icon: '🏠', label: 'Oficina', roles: ['docente'] },
    { href: '/admin', icon: '⚙️', label: 'Admin', roles: ['admin', 'admin_centro', 'superadmin'] },
    { href: '/admin/usuarios/centros', icon: '👥', label: 'Usuarios', roles: ['admin', 'admin_centro', 'superadmin'] },
    { href: '/admin/centros', icon: '🏫', label: 'Centros', roles: ['superadmin'] },
    { href: `/estudiante/${grado}`, icon: '🎒', label: 'Clases', roles: ['estudiante'] },
  ]

  const visibles = links.filter(l => l.roles.includes(rol || ''))

  return (
    <nav className="md:hidden mt-8 sticky bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      <div className="flex items-center justify-around h-14 px-2">
        {visibles.slice(0, 3).map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-lg text-xs transition-colors ${
              pathname.startsWith(link.href)
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="text-[10px] leading-tight">{link.label}</span>
          </Link>
        ))}

        <Link href="/cuenta" className="text-lg text-green-500 hover:text-blue-600">
          👤
        </Link>

        {/* Notificaciones */}
        <div className="flex flex-col items-center">
          <NotificacionesBell />
        </div>

        {/* Dark mode */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex flex-col items-center gap-0.5 text-xs text-gray-500 dark:text-gray-400"
        >
          <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="text-[10px]">Tema</span>
        </button>

        {/* Salir */}
        <button
          onClick={() => { setTheme('light'); signOut({ callbackUrl: '/' }) }}
          className="flex flex-col items-center gap-0.5 text-xs text-red-500"
        >
          <span className="text-lg">🚪</span>
          <span className="text-[10px]">Salir</span>
        </button>
      </div>
    </nav>
  )
}