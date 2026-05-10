// components/UserMenu.tsx
'use client'

import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import NotificacionesBell from './NotificacionesBell'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Props {
  name?: string | null
  rol?: string
}

export default function UserMenu({ name, rol }: Props) {
  const { setTheme } = useTheme()
  const router = useRouter()

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      {/* {rol !== 'registro' && <NotificacionesBell />} */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 h-auto py-1 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
              {name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="hidden lg:inline max-w-[120px] truncate">{name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{name} · <span className="capitalize">{rol?.replace('_', ' ')}</span></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push('/cuenta')} className="cursor-pointer">
              👤 Mi Cuenta
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => { setTheme('light'); signOut({ redirect: false }).then(() => window.location.replace('/')) }}>
              🚪 Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}