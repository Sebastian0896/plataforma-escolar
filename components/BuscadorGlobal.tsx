// components/BuscadorGlobal.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function BuscadorGlobal() {
  const { data: session } = useSession()
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState<any[]>([])
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const puedeGestionar = session?.user?.role === 'docente' || session?.user?.role === 'admin' || session?.user?.role === 'admin_centro'

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (query.length < 2) { setResultados([]); setAbierto(false); return }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/buscar?q=${encodeURIComponent(query)}`)
      setResultados(await res.json())
      setAbierto(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar planificaciones..."
          className="w-full pl-8 h-9 max-w-md h-9 text-sm"
        />
      </div>

      {abierto && resultados.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-popover rounded-lg border shadow-lg z-50 max-h-80 overflow-y-auto">
          {resultados.map((r: any) => (
            <div key={r._id} className="px-4 py-2.5 border-b last:border-0 hover:bg-muted">
              <div className="flex items-start justify-between gap-2">
                <Link href={`/dashboard/${r.nivel || 'nivel-secundario'}/${r.grado}/${r.slug}`} onClick={() => { setAbierto(false); setQuery('') }} className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.tema}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.materia} · {r.grado?.replace('-', ' ')}</p>
                </Link>
                {puedeGestionar && (
                  <Link href={`/admin/planificaciones/editar/${r.materia}/${r.slug}`} onClick={() => { setAbierto(false); setQuery('') }} className="text-xs text-primary hover:underline whitespace-nowrap">
                    ✏️ Editar
                  </Link>
                )}
              </div>
        </div>
          ))}
        </div>
      )}
    </div>
  )
}