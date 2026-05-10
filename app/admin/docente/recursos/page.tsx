'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function MisRecursosPage() {
  const { data: session } = useSession()
  const [recursos, setRecursos] = useState<any[]>([])
  const [filtro, setFiltro] = useState('todos')

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/recursos').then(r => r.json()).then(data => setRecursos(Array.isArray(data) ? data : []))
    }
  }, [session])

  const filtrados = filtro === 'todos' ? recursos : recursos.filter(r => r.tipo === filtro)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Mis Recursos</h1>
      <p className="text-muted-foreground mb-6">{recursos.length} archivos</p>

      <div className="flex gap-2 mb-6">
        {['todos', 'imagen', 'pdf', 'video', 'audio', 'enlace'].map(f => (
          <Button key={f} variant={filtro === f ? 'default' : 'outline'} size="sm" onClick={() => setFiltro(f)} className="capitalize">
            {f}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtrados.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{r.tipo === 'imagen' ? '🖼️' : r.tipo === 'pdf' ? '📄' : r.tipo === 'video' ? '🎬' : r.tipo === 'audio' ? '🎵' : '🔗'}</span>
                <span className="text-xs capitalize bg-muted px-2 py-0.5 rounded">{r.tipo}</span>
              </div>
              <a href={r.url} target="_blank" className="text-sm text-primary hover:underline break-all">{r.url}</a>
              {r.descripcion && <p className="text-xs text-muted-foreground mt-1">{r.descripcion}</p>}
              <p className="text-xs text-muted-foreground mt-2">De: {r.planificacionTema}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}