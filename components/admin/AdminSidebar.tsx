'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Building2,
  Crown,
  FileText,
  Home,
  LogOut,
  X,
  ChevronRight,
  Settings,
} from 'lucide-react'

export default function AdminSidebar() {
  const { data: session } = useSession()
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const user = session?.user
  const rol = user?.role

  // Escuchar evento personalizado para abrir desde un Navbar externo
  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev)
    document.addEventListener('toggle-sidebar', handler)
    return () => document.removeEventListener('toggle-sidebar', handler)
  }, [])

  // Cerrar sidebar al cambiar de ruta (importante en móvil)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const allLinks = [
    {
      href: rol === 'admin_centro' ? `/admin/centros/${user?.centroId}` : '/admin',
      label: 'Dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'docente', 'admin_centro', 'superadmin'],
    },
    {
      href: '/admin/docente',
      label: 'Mi oficina',
      icon: Home,
      roles: ['docente', 'admin_centro'],
      condicion: rol === 'admin_centro' ? !!user?.categoriaDocente : true,
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
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-[70]
          h-screen w-[280px]
          bg-white dark:bg-slate-950
          border-r border-slate-200 dark:border-slate-800
          transition-transform duration-300 ease-in-out
          flex flex-col
          lg:sticky lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header institucional */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">Plataforma Educativa</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="lg:hidden rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Perfil de Usuario Corto */}
        <div className="p-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 capitalize leading-none">
                {(rol || '').replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navegación Principal */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1 py-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Menú Principal
            </p>
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')

              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`
                      w-full justify-start gap-3 h-11 px-3 rounded-xl transition-all group
                      ${isActive 
                        ? 'bg-primary/10 text-primary hover:bg-primary/15 font-semibold' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                      }
                    `}
                  >
                    <link.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span className="flex-1 text-left truncate">{link.label}</span>
                    {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer / Acciones finales */}
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-slate-600 dark:text-slate-400"
          >
            <Settings className="h-5 w-5" />
            Configuración
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => {
              setTheme('light')
              signOut({ redirect: false }).then(() => window.location.replace('/'))
            }}
            className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Cerrar sesión</span>
          </Button>
        </div>
      </aside>
    </>
  )
}