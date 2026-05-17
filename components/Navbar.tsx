// components/Navbar.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UserMenu from './UserMenu'
import BuscadorGlobal from './BuscadorGlobal'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Menu, Bell, Sun, Moon, User, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import NotificacionesBell from './NotificacionesBell'
import Image from 'next/image'

export default function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [showNotif, setShowNotif] = useState(false)
  const [totalNoLeidas, setTotalNoLeidas] = useState(0)

  useEffect(() => {
    fetch('/api/notificaciones?noLeidas=true')
      .then(r => r.json())
      .then(d => setTotalNoLeidas(d.totalNoLeidas || 0))
  }, [])

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <nav className="bg-background border-b sticky top-0 z-30"><div className="h-14" /></nav>

  const rol = session?.user?.role
  const inicioHref = rol === 'docente' ? '/admin/docente' : rol === 'admin_centro' ? '/admin' : rol === 'superadmin' ? '/admin' : rol === 'estudiante' ? `/estudiante/${session?.user?.grado}` : rol === 'registro' ? '/admin/registro/comprobantes' : '/dashboard'

  return (
    <nav className="bg-background border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          {/* Izquierda: Hamburguesa */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => document.dispatchEvent(new Event('toggle-sidebar'))}>
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo desktop */}
          <Link href={inicioHref} className="hidden lg:flex items-center gap-2 font-bold">
            <span className="text-xl"><Image src='/logo.png' alt='logo' width={40} height={40} /></span>
            <span>Plataforma Educativa</span>
          </Link>

          {/* Centro: Buscador siempre visible */}
          <div className="flex-1 flex justify-center px-3">
            <BuscadorGlobal />
          </div>

          {/* Entre buscador y popover - visible siempre */}
            {rol !== 'registro' && totalNoLeidas > 0 && (
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotif(true)}>
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalNoLeidas}
                </span>
              </Button>
            )}
          
          {/* Derecha: Desktop menu + Mobile popover */}
          <div className="flex items-center gap-1">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-3">
              <UserMenu name={session?.user?.name} rol={rol} />
            </div>

            {/* Mobile popover */}
            
            <div className="md:hidden">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary cursor-pointer hover:bg-primary/20 transition-colors">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-0">
                  <div className="px-3 py-3 border-b">
                    <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{rol?.replace('_', ' ')}</p>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    {rol !== 'registro' && (
                      <Button variant="ghost" size="sm" className="justify-start w-full" onClick={() => { setPopoverOpen(false); setTimeout(() => setShowNotif(true), 100) }}>
                        <Bell className="w-4 h-4 mr-2" /> Notificaciones
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="justify-start w-full" onClick={() => { setPopoverOpen(false); setTheme(theme === 'dark' ? 'light' : 'dark') }}>
                      {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                      {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start w-full" onClick={() => { setPopoverOpen(false); router.push('/cuenta') }}>
                      <User className="w-4 h-4 mr-2" /> Mi Cuenta
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start w-full text-destructive" onClick={() => { setPopoverOpen(false); setTheme('light'); signOut({ callbackUrl: '/' }) }}>
                      <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      {showNotif && (
        <NotificacionesBell up soloPanel defaultOpen onClose={() => setShowNotif(false)} />
      )}
    </nav>
  )
}