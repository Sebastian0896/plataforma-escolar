// components/docente/HistorialPagos.tsx
'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
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
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Detectar si el usuario viene redirigido desde el checkout exitoso
  const esPostCompra = searchParams.get('session_check') === 'true'

  const [pagos, setPagos] = useState<Pago[]>([])
  const [suscripcion, setSuscripcion] = useState<Suscripcion | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancelando, setCancelando] = useState(false)
  
  // Estados para el Loader de Sincronización Inteligente
  const [sincronizando, setSincronizando] = useState(esPostCompra)
  const [syncPaso, setSyncPaso] = useState('Verificando pago con Lemon Squeezy...')

  // ✅ Memorizar función de carga para evitar renders infinitos
  const cargarHistorial = useCallback(async () => {
    try {
      const res = await fetch('/api/docente/pagos', {
        cache: 'no-store',
      })
      const data = await res.json()
      setPagos(data.pagos || [])
      setSuscripcion(data.suscripcion)
      return data
    } catch (error) {
      console.error('Error cargando historial:', error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // =====================================================
  // EFECTO DE CONTROL PRINCIPAL Y POLLING OPTIMIZADO
  // =====================================================
  useEffect(() => {
    // 🕵️‍♂️ EXTRACCIÓN ULTRA-SEGURA NATIVA: Evita los problemas de hidratación de Next.js
    const paramsNativos = new URLSearchParams(window.location.search)
    const tieneSessionCheck = paramsNativos.get('session_check') === 'true'

    if (!tieneSessionCheck) {
      // Flujo normal: Si no viene de pagar, carga inmediata sin esperas
      cargarHistorial()
      setSincronizando(false)
      return
    }

    // Flujo inteligente: Activamos el loader explícitamente en el cliente
    setSincronizando(true)
    let intentos = 0

    const ejecutarPolling = async () => {
      intentos++
      
      if (intentos === 4) setSyncPaso('Actualizando tu suscripción en el sistema...')
      if (intentos === 8) setSyncPaso('Dando los últimos toques a tu cuenta...')

      const data = await cargarHistorial()

      // Condición de éxito: Si ya se registró el pago o la suscripción se activó
      const pagoExitoso = data?.pagos?.length > 0 || data?.suscripcion?.estado === 'active'

      if (pagoExitoso) {
        setSyncPaso('¡Todo listo! Redirigiendo...')
        toast.success('¡Pago procesado con éxito! Gracias por tu compra.')
        
        // Breve respiro visual antes de liberar la pantalla
        setTimeout(async () => {
          await update() // Actualiza la sesión en Next-Auth
          setSincronizando(false)
          router.replace('/admin/docente') // Limpia el ?session_check de la barra
          router.refresh()
        }, 1500)
        
        return true 
      }

      // Evitar bucle infinito si el webhook se retrasa demasiado
      if (intentos >= 12) {
        setSincronizando(false)
        router.replace('/admin/docente')
        toast.error('El pago está tomando más tiempo de lo normal. Tu cuenta se actualizará automáticamente en breve.')
        return true
      }

      return false
    }

    // Arrancar el primer chequeo inmediatamente
    ejecutarPolling().then((terminado) => {
      if (terminado) return

      // Si no ha impactado el pago, ejecutamos el intervalo cada 2.5 segundos
      const interval = setInterval(async () => {
        const terminadoInterval = await ejecutarPolling()
        if (terminadoInterval) {
          clearInterval(interval)
        }
      }, 2500)

      return () => clearInterval(interval)
    })

  }, [cargarHistorial, router, update])

  
  const handleCancelar = async () => {
    if (!confirm('¿Cancelar tu suscripción? Perderás acceso a funciones premium al final del período.')) {
      return
    }

    setCancelando(true)
    try {
      const res = await fetch('/api/docente/cancelar-suscripcion', { method: 'POST' })

      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Error al cancelar')
        return
      }

      toast.success('Suscripción cancelada')
      await new Promise((resolve) => setTimeout(resolve, 2500))
      await cargarHistorial()
      await update()
      router.refresh()
    } catch (error) {
      console.error(error)
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

  // =====================================================
  // COMPONENTE VISUAL: LOADER DE PANTALLA COMPLETA
  // =====================================================
  if (sincronizando) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-all duration-500">
        <div className="flex flex-col items-center max-w-sm text-center px-6">
          {syncPaso.includes('¡Todo listo!') ? (
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce mb-4" />
          ) : (
            <div className="relative flex items-center justify-center mb-6">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <CreditCard className="h-6 w-6 text-primary absolute" />
            </div>
          )}
          <h2 className="text-xl font-bold tracking-tight mb-2"> Procesando tu suscripción </h2>
          <p className="text-sm text-muted-foreground animate-pulse font-medium">
            {syncPaso}
          </p>
        </div>
      </div>
    )
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