'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  up?: boolean
  defaultOpen?: boolean
  onClose?: () => void
}

export default function NotificacionesBell({ up = false, defaultOpen = false, onClose }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const [notificaciones, setNotificaciones] = useState<any[]>([])
  const [totalNoLeidas, setTotalNoLeidas] = useState(0)
  const [abierto, setAbierto] = useState(defaultOpen)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/notificaciones?noLeidas=true').then(r => r.json()).then(d => setTotalNoLeidas(d.totalNoLeidas || 0))
    fetch('/api/notificaciones').then(r => r.json()).then(d => setNotificaciones(d.notificaciones || []))
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const marcarLeida = async (id: string) => {
    await fetch('/api/notificaciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, leida: true }) })
    setNotificaciones(prev => prev.map(x => x._id === id ? { ...x, leida: true } : x))
    setTotalNoLeidas(prev => Math.max(0, prev - 1))
    setAbierto(false)
  }

  const marcarTodas = async () => {
    await fetch('/api/notificaciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ todas: true, leida: true }) })
    setTotalNoLeidas(0)
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
  }

  const iconos: Record<string, string> = {
    recordatorio: '⏰', pendiente: '📋', senal: '📌', nueva_plan: '🆕', actualizacion: '🔄', resumen: '📊',
  }

  return (
    <div ref={ref} className="relative">
      <Button variant="ghost" size="icon" onClick={() => setAbierto(!abierto)} className="relative">
        🔔
        {totalNoLeidas > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalNoLeidas}
          </span>
        )}
      </Button>

      {abierto && (
        up ? (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setAbierto(false)} />
            <div className="fixed bottom-16 left-0 right-0 z-50 bg-background rounded-t-2xl border shadow-xl max-h-[60vh]">
              <div className="flex items-center justify-between p-3 border-b sticky top-0 bg-background">
                <h3 className="font-semibold text-sm">Notificaciones</h3>
                {totalNoLeidas > 0 && <Button variant="link" size="sm" onClick={marcarTodas}>Marcar todas leídas</Button>}
              </div>
              <ScrollArea className="max-h-[50vh]">
                {notificaciones.map(n => (
                  <div key={n._id} className={`p-3 border-b hover:bg-muted cursor-pointer ${!n.leida ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{iconos[n.tipo] || '📢'}</span>
                      <div className="flex-1 min-w-0">
                        {n.planificacionId ? (
                          <span onClick={async (e) => { e.preventDefault(); await marcarLeida(n._id); router.push(`/estudiante/${n.grado}/${n.planificacionSlug || n.planificacionId}`) }} className="text-sm font-medium hover:text-primary cursor-pointer">{n.titulo}</span>
                        ) : <p className="text-sm font-medium">{n.titulo}</p>}
                        <p className="text-xs text-muted-foreground mt-0.5">{n.mensaje}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString('es-DO')}</p>
                          <button onClick={async (e) => { e.stopPropagation(); await marcarLeida(n._id) }} className="text-xs hover:underline">{n.leida ? '👁️' : '✅'}</button>
                        </div>
                      </div>
                      {!n.leida && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="absolute z-50 top-full mt-2 right-0 w-80 bg-background rounded-xl border shadow-xl">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold text-sm">Notificaciones</h3>
              {totalNoLeidas > 0 && <Button variant="link" size="sm" onClick={marcarTodas}>Marcar todas leídas</Button>}
            </div>
            <ScrollArea className="max-h-96">
              {notificaciones.map(n => (
                <div key={n._id} className={`p-3 border-b hover:bg-muted cursor-pointer ${!n.leida ? 'bg-primary/5' : ''}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{iconos[n.tipo] || '📢'}</span>
                    <div className="flex-1 min-w-0">
                      {n.planificacionId ? (
                        <span onClick={async (e) => { e.preventDefault(); await marcarLeida(n._id); router.push(`/estudiante/${n.grado}/${n.planificacionSlug || n.planificacionId}`) }} className="text-sm font-medium hover:text-primary cursor-pointer">{n.titulo}</span>
                      ) : <p className="text-sm font-medium">{n.titulo}</p>}
                      <p className="text-xs text-muted-foreground mt-0.5">{n.mensaje}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString('es-DO')}</p>
                        <button onClick={async (e) => { e.stopPropagation(); await marcarLeida(n._id) }} className="text-xs hover:underline">{n.leida ? '👁️' : '✅'}</button>
                      </div>
                    </div>
                    {!n.leida && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )
      )}
    </div>
  )
}