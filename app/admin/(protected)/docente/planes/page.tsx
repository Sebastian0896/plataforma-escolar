// app/admin/docente/planes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check, X, Crown, Star, Loader2, Calendar, CreditCard, Shield } from 'lucide-react'
import { PLANES_DOCENTES, Plan } from '@/lib/planes'
import { toast } from 'sonner'

interface SuscripcionActiva {
  id: string
  plan: string
  estado: string
  fechaInicio: string
  fechaFin: string | null
}

export default function PlanesDocentePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [ciclo, setCiclo] = useState<'mensual' | 'anual'>('mensual')
  const [suscripcionActiva, setSuscripcionActiva] = useState<SuscripcionActiva | null>(null)
  const [cargandoSuscripcion, setCargandoSuscripcion] = useState(true)

  const planActual = suscripcionActiva?.plan || 'gratis'
  const tieneSuscripcionActiva = suscripcionActiva && suscripcionActiva.estado === 'active'

  // Función para cargar suscripción activa
  const cargarSuscripcion = async () => {
    try {
      const res = await fetch('/api/docente/suscripcion-activa')
      const data = await res.json()
      setSuscripcionActiva(data.id ? data : null)
    } catch (error) {
      console.error('Error cargando suscripción:', error)
    } finally {
      setCargandoSuscripcion(false)
    }
  }

  // Función para refrescar todo después de una acción
  const refrescarTodo = async () => {
    await update() // Actualizar sesión
    await cargarSuscripcion() // Recargar suscripción
    router.refresh() // Refrescar la página
  }

  useEffect(() => {
    cargarSuscripcion()
  }, [])

  const handleCambiarAGratis = async () => {
    if (!tieneSuscripcionActiva) return
    
    setLoading('gratis')
    toast.loading('Cancelando suscripción...', { id: 'cancelar' })
    
    try {
      const res = await fetch('/api/docente/cancelar-suscripcion', {
        method: 'POST',
      })
      
      const data = await res.json()
      
      if (res.ok) {
        toast.success('Suscripción cancelada. Ahora estás en plan Gratis.', { id: 'cancelar' })
        await refrescarTodo()
      } else {
        toast.error(data.error || 'Error al cancelar la suscripción', { id: 'cancelar' })
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor', { id: 'cancelar' })
    } finally {
      setLoading(null)
    }
  }

  const handleSuscribirse = async (plan: Plan) => {
    if (plan.slug === 'gratis') {
      await handleCambiarAGratis()
      return
    }

    setLoading(plan.slug)
    toast.loading('Preparando checkout...', { id: 'checkout' })

    try {
      const res = await fetch('/api/lemon-squeezy/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: plan.slug,
          ciclo,
        }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        toast.success('Redirigiendo a la pasarela de pago...', { id: 'checkout' })
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Error al crear el checkout', { id: 'checkout' })
        setLoading(null)
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor', { id: 'checkout' })
      setLoading(null)
    }
  }

  const getPlanInfo = (planSlug: string) => {
    switch (planSlug) {
      case 'docente_pro':
        return { nombre: 'Docente Pro', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950/20' }
      case 'docente_premium':
        return { nombre: 'Docente Premium', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-950/20' }
      default:
        return { nombre: 'Gratis', color: 'text-gray-600', bgColor: 'bg-gray-50 dark:bg-gray-900/20' }
    }
  }

  const planInfo = getPlanInfo(planActual)

  if (cargandoSuscripcion) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Planes para Docentes
        </h1>
        <p className="text-muted-foreground mt-1">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Plan actual - Tarjeta destacada */}
      {tieneSuscripcionActiva && (
        <Card className={`border-2 ${planInfo.bgColor} border-primary/20`}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${planInfo.bgColor} flex items-center justify-center`}>
                  <Crown className={`h-6 w-6 ${planInfo.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Plan actual: {planInfo.nombre}</h2>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Activo
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Desde: {new Date(suscripcionActiva.fechaInicio).toLocaleDateString('es-ES')}
                    </span>
                    {suscripcionActiva.fechaFin && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Vence: {new Date(suscripcionActiva.fechaFin).toLocaleDateString('es-ES')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleCambiarAGratis}
                disabled={loading === 'gratis'}
              >
                {loading === 'gratis' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Cancelar suscripción
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan gratuito activo */}
      {!tieneSuscripcionActiva && (
        <Card className="border-dashed bg-muted/30">
          <CardContent className="p-6 text-center">
            <Shield className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Plan Gratuito activo</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Estás usando el plan gratuito. Actualiza para acceder a más funcionalidades.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Ciclo de facturación */}
      <div className="flex justify-end items-center gap-3">
        <Label className={`text-sm ${ciclo === 'mensual' ? 'font-semibold' : 'text-muted-foreground'}`}>
          Mensual
        </Label>
        <Switch
          checked={ciclo === 'anual'}
          onCheckedChange={(checked) => setCiclo(checked ? 'anual' : 'mensual')}
        />
        <Label className={`text-sm ${ciclo === 'anual' ? 'font-semibold' : 'text-muted-foreground'}`}>
          Anual <span className="text-green-600 text-xs ml-1">(Ahorra 2 meses)</span>
        </Label>
      </div>

      {/* Grid de planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLANES_DOCENTES.map((plan) => {
          const esActual = planActual === plan.slug && tieneSuscripcionActiva
          const esGratis = plan.slug === 'gratis'
          const precio = ciclo === 'mensual' ? plan.precio : plan.precioAnual
          const precioTexto = plan.precio === 0 ? 'Gratis' : `$${precio}`
          
          return (
            <Card
              key={plan.slug}
              className={`relative flex flex-col transition-all hover:shadow-lg overflow-visible ${
                plan.popular ? 'border-primary shadow-md' : ''
              } ${esActual ? 'ring-2 ring-primary bg-primary/5' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 shadow-lg border-none">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Más popular
                  </Badge>
                </div>
              )}

              <div className="pt-2 text-sm text-muted-foreground text-center">
                Pago seguro vía Lemon Squeezy
              </div>

              {esActual && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">
                    ✓ Activo
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8 pb-4">
                <div className="text-5xl mb-3">
                  {plan.slug === 'gratis' ? '🆓' : plan.slug === 'docente_pro' ? '👩‍🏫' : '👑'}
                </div>
                <CardTitle className="text-xl">{plan.nombre}</CardTitle>
                <div className="mt-3">
                  <span className="text-4xl font-bold">{precioTexto}</span>
                  {precio > 0 && (
                    <span className="text-muted-foreground ml-1">
                      /{ciclo === 'mensual' ? 'mes' : 'año'}
                    </span>
                  )}
                </div>
                {plan.slug !== 'gratis' && ciclo === 'anual' && (
                  <CardDescription className="text-green-600 dark:text-green-400 mt-1 text-sm">
                    Ahorra ${plan.precio * 12 - plan.precioAnual} al año
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      {feature.startsWith('✅') ? (
                        <Check className="h-4 w-4 text-green-500 shrink-0" />
                      ) : feature.startsWith('❌') ? (
                        <X className="h-4 w-4 text-red-500 shrink-0" />
                      ) : null}
                      <span className={feature.startsWith('❌') ? 'text-muted-foreground line-through' : ''}>
                        {feature.replace('✅', '').replace('❌', '').trim()}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.slug !== 'gratis' && (
                  <div className="pt-2 text-xs text-muted-foreground text-center">
                    <CreditCard className="h-3 w-3 inline mr-1" />
                    Pago seguro vía Lemon Squeezy
                  </div>
                )}
              </CardContent>

              <div className="p-6 pt-0">
                <Button
                  className="w-full gap-2"
                  variant={esActual ? 'outline' : plan.slug === 'gratis' ? 'secondary' : 'default'}
                  onClick={() => handleSuscribirse(plan)}
                  disabled={
                    loading === plan.slug || 
                    (esActual && plan.slug !== 'gratis') ||
                    (plan.slug === 'gratis' && !tieneSuscripcionActiva)
                  }
                >
                  {loading === plan.slug ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : esActual && plan.slug !== 'gratis' ? (
                    'Plan activo'
                  ) : plan.slug === 'gratis' ? (
                    tieneSuscripcionActiva ? 'Cambiar a Gratis' : 'Plan gratuito'
                  ) : (
                    <>
                      <Crown className="h-4 w-4" />
                      Suscribirse
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}