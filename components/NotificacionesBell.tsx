// components/NotificacionesBell.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, Clock, FileText, StickyNote, PlusCircle, RefreshCw, BarChart3, MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  up?: boolean
  defaultOpen?: boolean
  onClose?: () => void
  soloPanel?: boolean
}

export default function NotificacionesBell({ up = false, defaultOpen = false, onClose, soloPanel = false }: Props) {
  const router = useRouter()
  const [notificaciones, setNotificaciones] = useState<any[]>([])
  const [totalNoLeidas, setTotalNoLeidas] = useState(0)
  const [open, setOpen] = useState(defaultOpen)

  const fetchData = async () => {
    const [resNoLeidas, resTodas] = await Promise.all([
      fetch('/api/notificaciones?noLeidas=true'),
      fetch('/api/notificaciones')
    ])
    const d1 = await resNoLeidas.json()
    const d2 = await resTodas.json()
    setTotalNoLeidas(d1.totalNoLeidas || 0)
    setNotificaciones(d2.notificaciones || [])
  }

  useEffect(() => { fetchData() }, [])

  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('toggle-notifications', handler)
    return () => document.removeEventListener('toggle-notifications', handler)
  }, [])

  const marcarLeida = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    await fetch('/api/notificaciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, leida: true }) })
    setNotificaciones(prev => prev.map(x => x._id === id ? { ...x, leida: true } : x))
    setTotalNoLeidas(prev => Math.max(0, prev - 1))
  }

  const marcarTodas = async () => {
    await fetch('/api/notificaciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ todas: true, leida: true }) })
    setTotalNoLeidas(0)
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
  }

  const handleAction = async (n: any) => {
    if (!n.leida) await marcarLeida(n._id)
    setOpen(false)
    onClose?.()
    if (n.planificacionId) {
      router.push(`/estudiante/${n.grado}/${n.planificacionSlug || n.planificacionId}`)
    }
  }

  const iconos: Record<string, React.ReactNode> = {
    recordatorio: <Clock className="w-4 h-4 text-amber-500" />,
    pendiente: <FileText className="w-4 h-4 text-blue-500" />,
    senal: <StickyNote className="w-4 h-4 text-rose-500" />,
    nueva_plan: <PlusCircle className="w-4 h-4 text-emerald-500" />,
    actualizacion: <RefreshCw className="w-4 h-4 text-indigo-500" />,
    resumen: <BarChart3 className="w-4 h-4 text-orange-500" />,
  }

  const Panel = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-bold text-sm">Notificaciones</h3>
        <div className="flex items-center gap-1">
          {totalNoLeidas > 0 && (
            <Button variant="ghost" size="sm" onClick={marcarTodas} className="h-8 text-xs">
              <CheckCheck className="w-3 h-3 mr-1" /> Marcar todas
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setOpen(false); onClose?.() }}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className={cn("flex-1", up ? "max-h-[60vh]" : "max-h-[400px]")}>
        {notificaciones.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 opacity-40">
            <Bell className="w-10 h-10 mb-2" />
            <p className="text-sm">Sin notificaciones</p>
          </div>
        ) : (
          <div>
            {notificaciones.map((n) => (
              <div key={n._id} onClick={() => handleAction(n)}
                className={cn("p-4 cursor-pointer flex gap-3 border-l-2 transition-colors",
                  !n.leida ? "bg-primary/5 border-l-primary hover:bg-primary/10" : "border-l-transparent hover:bg-muted/50")}>
                <div className="mt-1 shrink-0">{iconos[n.tipo] || <MessageSquare className="w-4 h-4" />}</div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("text-sm truncate", !n.leida ? "font-bold" : "font-medium text-muted-foreground")}>{n.titulo}</p>
                    {!n.leida && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{n.mensaje}</p>
                  <p className="text-[10px] text-muted-foreground/60">
                    {new Date(n.createdAt).toLocaleDateString('es-DO', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )

  // Modal para soloPanel o mobile
  if (open && (soloPanel || up)) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/30" onClick={() => { setOpen(false); onClose?.() }} />
        <div className="relative w-full max-w-md max-h-[80vh] bg-background rounded-2xl shadow-xl overflow-hidden z-10 animate-in zoom-in-95">
          <Panel />
        </div>
      </div>
    )
  }

  return (
    <>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="w-5 h-5 text-muted-foreground" />
        {totalNoLeidas > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full bg-destructive text-white">
            {totalNoLeidas}
          </Badge>
        )}
      </Button>

      {open && !up && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-[380px] bg-background rounded-xl shadow-xl border overflow-hidden">
            <Panel />
          </div>
        </>
      )}
    </>
  )
}