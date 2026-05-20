'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, Clock, FileText, StickyNote, PlusCircle, RefreshCw, BarChart3, MessageSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// Tipo de datos estricto para las notificaciones
interface Notificacion {
  _id: string
  tipo: string
  titulo: string
  mensaje: string
  leida: boolean
  createdAt: string
  grado?: string
  planificacionId?: string
  planificacionSlug?: string
}

interface PanelProps {
  notificaciones: Notificacion[]
  totalNoLeidas: number
  onMarcarTodas: () => void
  onCerrar: () => void
  onHandleAction: (n: Notificacion) => void
  iconos: Record<string, React.ReactNode>
}

// 1. COMPONENTE: PANEL DE NOTIFICACIONES
function Panel({ 
  notificaciones, 
  totalNoLeidas, 
  onMarcarTodas, 
  onCerrar, 
  onHandleAction,
  iconos 
}: PanelProps) {
  return (
    <div className="flex flex-col h-full bg-background min-h-0">
      
      {/* Header Fijo */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        <h3 className="font-bold text-sm">Notificaciones</h3>
        <div className="flex items-center gap-1">
          {totalNoLeidas > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarcarTodas} className="h-8 text-xs">
              <CheckCheck className="w-3.5 h-3.5 mr-1" /> Marcar todas
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCerrar}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Contenedor de la lista con Scroll independiente y seguro */}
      <div className="flex-1 overflow-y-auto min-h-0 w-full">
        <ListaNotificaciones 
          notificaciones={notificaciones} 
          iconos={iconos} 
          onHandleAction={onHandleAction} 
        />
      </div>
    </div>
  )
}

interface ListaNotificacionesProps {
  notificaciones: Notificacion[]
  iconos: Record<string, React.ReactNode>
  onHandleAction: (n: Notificacion) => void
}

// 2. COMPONENTE: LISTA INTERNA
function ListaNotificaciones({ notificaciones, iconos, onHandleAction }: ListaNotificacionesProps) {
  if (notificaciones.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 opacity-40">
        <Bell className="w-10 h-10 mb-2" />
        <p className="text-sm">Sin notificaciones</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border/40">
      {notificaciones.map((n) => (
        <div 
          key={n._id} 
          onClick={() => onHandleAction(n)}
          className={cn(
            "p-4 cursor-pointer flex gap-3 border-l-2 transition-colors",
            !n.leida ? "bg-primary/5 border-l-primary hover:bg-primary/10" : "border-l-transparent hover:bg-muted/50"
          )}
        >
          <div className="mt-1 shrink-0">
            {iconos[n.tipo] || <MessageSquare className="w-4 h-4 text-muted-foreground" />}
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className={cn("text-sm truncate", !n.leida ? "font-bold" : "font-medium text-muted-foreground")}>
                {n.titulo}
              </p>
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
  )
}

interface NotificacionesBellProps {
  up?: boolean
  defaultOpen?: boolean
  onClose?: () => void
  soloPanel?: boolean
  maxNotificaciones?: number
}

// 3. COMPONENTE PRINCIPAL
export default function NotificacionesBell({ 
  up = false, 
  defaultOpen = false, 
  onClose, 
  soloPanel = false,
  maxNotificaciones = 5
}: NotificacionesBellProps) {
  const router = useRouter()
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [totalNoLeidas, setTotalNoLeidas] = useState(0)
  const [open, setOpen] = useState(defaultOpen)

  
  useEffect(() => { 
    const fetchData = async () => {
      try {
        const [resNoLeidas, resTodas] = await Promise.all([
          fetch('/api/notificaciones?noLeidas=true'),
          fetch('/api/notificaciones')
        ])
        const d1 = await resNoLeidas.json()
        const d2 = await resTodas.json()
        setTotalNoLeidas(d1.totalNoLeidas || 0)
        setNotificaciones(d2.notificaciones || [])
      } catch (error) {
        console.error("Error cargando notificaciones:", error)
      }
    }
    fetchData() 
  }, [])

  useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener('toggle-notifications', handler)
    return () => document.removeEventListener('toggle-notifications', handler)
  }, [])

  const marcarLeida = async (id: string) => {
    try {
      await fetch('/api/notificaciones', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ id, leida: true }) 
      })
      setNotificaciones(prev => prev.map(x => x._id === id ? { ...x, leida: true } : x))
      setTotalNoLeidas(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error al marcar como leída:", error)
    }
  }

  const marcarTodas = async () => {
    try {
      await fetch('/api/notificaciones', { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ todas: true, leida: true }) 
      })
      setTotalNoLeidas(0)
      setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
    } catch (error) {
      console.error("Error al marcar todas:", error)
    }
  }

  const handleAction = async (n: Notificacion) => {
    if (!n.leida) await marcarLeida(n._id)
    setOpen(false)
    onClose?.()
    if (n.planificacionId) {
      router.push(`/estudiante/${n.grado}/${n.planificacionSlug || n.planificacionId}`)
    }
  }

  const iconos = useMemo<Record<string, React.ReactNode>>(() => ({
    recordatorio: <Clock className="w-4 h-4 text-amber-500" />,
    pendiente: <FileText className="w-4 h-4 text-blue-500" />,
    senal: <StickyNote className="w-4 h-4 text-rose-500" />,
    nueva_plan: <PlusCircle className="w-4 h-4 text-emerald-500" />,
    actualizacion: <RefreshCw className="w-4 h-4 text-indigo-500" />,
    resumen: <BarChart3 className="w-4 h-4 text-orange-500" />,
  }), [])

  const handleCerrar = () => {
    setOpen(false)
    onClose?.()
  }

  // Vista en Modal (Para móviles o cuando se fuerza de manera centrada)
  if (open && (soloPanel || up)) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Fondo oscuro congelado */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm fixed" onClick={handleCerrar} />
        
        {/* Contenedor del Modal con freno duro en el 70% de la pantalla */}
        <div className="relative w-full max-w-md max-h-[70vh] bg-background rounded-2xl shadow-2xl border flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-150">
          <Panel 
            notificaciones={notificaciones}
            totalNoLeidas={totalNoLeidas}
            onMarcarTodas={marcarTodas}
            onCerrar={handleCerrar}
            onHandleAction={handleAction}
            iconos={iconos}
          />
        </div>
      </div>
    )
  }

  // Vista Dropdown Estándar (Alineado bajo la campana)
  return (
    <div className="relative inline-block text-left">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="w-5 h-5 text-muted-foreground" />
        {totalNoLeidas > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground animate-pulse">
            {totalNoLeidas}
          </Badge>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={handleCerrar} />
          <div className="absolute right-0 top-full mt-2 z-50 w-[380px] max-h-[450px] bg-background rounded-xl shadow-xl border flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <Panel 
              notificaciones={notificaciones}
              totalNoLeidas={totalNoLeidas}
              onMarcarTodas={marcarTodas}
              onCerrar={handleCerrar}
              onHandleAction={handleAction}
              iconos={iconos}
            />
          </div>
        </>
      )}
    </div>
  )
}