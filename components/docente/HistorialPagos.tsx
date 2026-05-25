// components/docente/HistorialPagos.tsx
'use client'

import { useCallback, useEffect, useState } from 'react' // ✅ Agregar useCallback
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'

interface Pago {
  id: string
  monto: number
  moneda: string
  estado: string
  fecha: string
  lemonOrderId: string | null
}

interface Suscripcion {
  id: string
  plan: string
  estado: string
  fechaInicio: string
  fechaFin: string | null
}

export function HistorialPagos() {
  const { data: session, update } = useSession()
  const [pagos, setPagos] = useState<Pago[]>([])
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelando, setCancelando] = useState(false)

  const router = useRouter()
  // ✅ Mover cargarHistorial ANTES de usarlo en useEffect
  
  // ✅ Ahora cargarHistorial ya está declarado
  const cargarHistorial = useCallback(async () => {
  try {
    const res = await fetch('/api/docente/pagos')

    const data = await res.json()

    setPagos(data.pagos || [])
    setSuscripcion(data.suscripcion)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    setLoading(false)
  }
}, [])
  useEffect(() => {
    const init = async () =>{
      await cargarHistorial()

    }

    init();
  }, [cargarHistorial])

  
  const handleCancelar = async () => {
    if (!confirm('¿Cancelar tu suscripción? Perderás acceso a funciones premium al final del período.')) return
    
    setCancelando(true)
    try {
      const res = await fetch('/api/docente/cancelar-suscripcion', {
        method: 'POST',
      })
      
      if (res.ok) {
        
        await update()
        router.refresh();
        toast.success('Suscripción cancelada exitosamente')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Error al cancelar')
      }
    } catch (error) {
      console.error("SG - ERROR: ", error)
      toast.error('Error al cancelar')
    } finally {
      setCancelando(false)

    }
  }



  const getPlanNombre = (plan: string) => {
    switch (plan) {
      case 'docente_pro': return 'Docente Pro'
      case 'docente_premium': return 'Docente Premium'
      default: return 'Gratis'
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completado':
        return <Badge className="bg-green-500">Completado</Badge>
      case 'pendiente':
        return <Badge variant="outline" className="text-yellow-600">Pendiente</Badge>
      case 'fallido':
        return <Badge variant="destructive">Fallido</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>💳 Historial de pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    )
  }

  const tieneSuscripcionActiva = suscripcion && suscripcion.estado === 'active' && suscripcion.plan !== 'gratis'

  return (
    <div className="space-y-6">
      {/* Suscripción actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Suscripción actual
            </span>
            {/* <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSincronizar}
              disabled={sincronizando}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${sincronizando ? 'animate-spin' : ''}`} />
              Sincronizar
            </Button> */}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tieneSuscripcionActiva ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Badge className="bg-primary">{getPlanNombre(suscripcion.plan)}</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Desde: {new Date(suscripcion.fechaInicio).toLocaleDateString('es-ES')}
                </p>
                {suscripcion.fechaFin && (
                  <p className="text-sm text-muted-foreground">
                    Vence: {new Date(suscripcion.fechaFin).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://app.lemonsqueezy.com/dashboard', '_blank')}
                >
                  Gestionar pago
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleCancelar}
                  disabled={cancelando}
                >
                  {cancelando ? 'Cancelando...' : 'Cancelar suscripción'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">No tienes una suscripción activa</p>
              <Button variant="link" onClick={() => window.location.href = '/admin/docente/planes'}>
                Ver planes disponibles
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historial de pagos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📜 Historial de pagos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pagos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>No hay pagos registrados</p>
              <p className="text-sm">Tus pagos aparecerán aquí cuando realices una compra</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Orden</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagos.map((pago) => (
                    <TableRow key={pago.id}>
                      <TableCell>{new Date(pago.fecha).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell>
                        {pago.monto} {pago.moneda}
                      </TableCell>
                      <TableCell>{getEstadoBadge(pago.estado)}</TableCell>
                      <TableCell>
                        {pago.lemonOrderId ? (
                          <code className="text-xs bg-muted px-2 py-1 rounded">
                            #{pago.lemonOrderId.slice(-6)}
                          </code>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}