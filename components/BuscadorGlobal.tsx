'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Search, Edit3, BookOpen, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BuscadorGlobal() {
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState<any[]>([])
  const [abierto, setAbierto] = useState(false)
  const [cargando, setCargando] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const puedeGestionar = session?.user?.role === 'docente' || 
                        session?.user?.role === 'admin' || 
                        session?.user?.role === 'admin_centro'

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Buscador con Debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setResultados([])
      setAbierto(false)
      return
    }

    const timer = setTimeout(async () => {
      setCargando(true)
      try {
        const res = await fetch(`/api/buscar?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResultados(data)
        setAbierto(true)
      } catch (error) {
        console.error("Error buscando:", error)
      } finally {
        setCargando(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative group">
        <Search className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
          abierto ? "text-primary" : "text-muted-foreground"
        )} />
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar planificaciones..."
          /* 
             SOLUCIÓN AL LAYOUT: 
             1. 'text-base' (16px) en mobile evita el zoom de iOS.
             2. 'md:text-sm' (14px) mantiene la estética en PC.
          */
          className="w-full pl-9 h-10 text-base md:text-sm bg-muted/50 border-border/50 focus:bg-background transition-all rounded-xl"
        />

        {cargando && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Resultados con Portal-like behavior (Absolute) */}
      {abierto && (
        <div className="absolute top-full mt-2 w-full bg-popover border border-border shadow-2xl rounded-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 max-h-[70vh] overflow-y-auto">
            {resultados.length > 0 ? (
              resultados.map((r: any) => (
                <div key={r._id} className="group flex items-center justify-between gap-2 p-3 hover:bg-muted rounded-xl transition-colors">
                  <Link 
                    href={`/dashboard/${r.nivel || 'nivel-secundario'}/${r.grado}/${r.slug}`} 
                    onClick={() => { setAbierto(false); setQuery('') }}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">
                        {r.tema}
                      </p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-tight">
                        {r.materia} • {r.grado?.replace('-', ' ')}
                      </p>
                    </div>
                  </Link>

                  {puedeGestionar && (
                    <Link 
                      href={`/admin/planificaciones/editar/${r.materia}/${r.slug}`} 
                      onClick={() => { setAbierto(false); setQuery('') }}
                      className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                      title="Editar"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">No se encontraron resultados</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}