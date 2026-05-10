'use client'

import { useEffect, useState } from 'react'
import type { NivelInfo } from '@/lib/types'
import SidebarNivel from './sidebar/SidebarNivel'
import { Accordion } from '@/components/ui/accordion'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@base-ui/react'

interface SidebarProps {
  estructura: NivelInfo[]
}

export default function Sidebar({ estructura }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
  const handler = () => setIsOpen(prev => !prev)
  document.addEventListener('toggle-sidebar', handler)
  return () => document.removeEventListener('toggle-sidebar', handler)
}, [])

  return (
    <>
      {/* {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed top-3 left-2 z-[40] lg:hidden bg-background  shadow-lg border">
           <Menu className="w-5 h-5" />
        </button>
      )} */}

      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 z-40 lg:hidden" />}

      <aside className={`fixed top-0 left-0 z-40 h-screen w-72 bg-background border-r overflow-y-auto transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-lg font-bold text-white">📚 Planificaciones</h1>
          <p className="text-xs text-blue-100 mt-0.5">Sistema Educativo Dominicano</p>
        </div>

        <Accordion type="multiple" className="p-3">
          {estructura.map((nivel) => (
            <SidebarNivel key={nivel.slug} nivel={nivel} onClose={() => setIsOpen(false)} />
          ))}
        </Accordion>

        <div className="p-4 border-t bg-muted space-y-2">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
              ⚙️ Volver al Panel
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-muted">
          <p className="text-xs text-muted-foreground text-center">Plataforma Educativa</p>
        </div>
      </aside>
    </>
  )
}