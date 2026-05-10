'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Building2,
  Crown,
  FileText,
  Home,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

export default function AdminSidebar() {
  const { data: session } = useSession()
  const { setTheme } = useTheme()

  const pathname = usePathname()

  const user = session?.user
  const rol = user?.role

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev)

    document.addEventListener('toggle-sidebar', handler)

    return () => {
      document.removeEventListener('toggle-sidebar', handler)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const allLinks = [
    {
      href:
        rol === 'admin_centro'
          ? `/admin/centros/${user?.centroId}`
          : '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'docente', 'admin_centro', 'superadmin'],
    },

    {
      href: '/admin/docente',
      label: 'Mi oficina',
      icon: Home,
      roles: ['docente', 'admin_centro'],
      condicion:
        rol === 'admin_centro'
          ? !!user?.categoriaDocente
          : true,
    },

    {
      href: '/dashboard',
      label: 'Planificaciones',
      icon: FileText,
      roles: ['admin', 'docente', 'admin_centro', 'coordinador'],
    },

    {
      href: '/admin/planificaciones/nueva',
      label: 'Nueva planificación',
      icon: PlusCircle,
      roles: ['admin', 'docente'],
    },

    {
      href: '/admin/usuarios/centros',
      label: 'Usuarios',
      icon: Users,
      roles: ['admin', 'admin_centro', 'superadmin'],
    },

    {
      href: '/admin/centros',
      label: 'Centros',
      icon: Building2,
      roles: ['superadmin'],
    },

    {
      href: '/admin/centros/plan',
      label: 'Planes',
      icon: Crown,
      roles: ['admin_centro', 'admin'],
    },

    {
      href: '/admin/registro/comprobantes',
      label: 'Comprobantes',
      icon: FileText,
      roles: ['registro'],
    },
  ]

  const links = allLinks.filter(
    (link) =>
      link.roles.includes(rol || '') &&
      (link.condicion === undefined || link.condicion)
  )

  return (
    <>
      {/* Mobile trigger */}
      {/* {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed top-3 left-2 z-[40] lg:hidden bg-background  shadow-lg border">
          <Menu className="w-5 h-5" />
        </button>
      )} */}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-[290px]
          bg-white dark:bg-slate-950
          border-r border-gray-200 dark:border-slate-800
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-in-out
          flex flex-col
          lg:sticky lg:top-0 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200 dark:border-slate-800">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Panel administrativo
            </h1>

            <p className="text-xs text-muted-foreground mt-1">
              Gestión académica y administrativa
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-5 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-700 text-white font-semibold text-sm shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.name || 'Usuario'}
              </p>

              <p className="text-xs capitalize text-muted-foreground truncate">
                {(rol || '').replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1.5">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + '/')

              return (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  <Button
                    variant="ghost"
                    className={`
                      w-full h-11 justify-start gap-3 rounded-xl px-3
                      text-sm font-medium transition-all
                      ${
                        isActive
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    <link.icon className="w-4 h-4 shrink-0" />

                    <span className="truncate">
                      {link.label}
                    </span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <Button
            variant="ghost"
            onClick={() => {
              setTheme('light')
              signOut({ callbackUrl: '/' })
            }}
            className="w-full h-11 justify-start gap-3 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>
    </>
  )
}