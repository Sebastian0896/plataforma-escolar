// app/admin/docente/planes/page.tsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Check, X, Crown, Star, Loader2 } from 'lucide-react'
import { PLANES_DOCENTES, Plan } from '@/lib/planes'
import { toast } from 'sonner'

export default function PlanesDocentePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [ciclo, setCiclo] = useState<'mensual' | 'anual'>('mensual')

  const planActual = session?.user?.plan || 'gratis'

  const handleSuscribirse = async (plan: Plan) => {
    if (plan.slug === 'gratis') {
      // Cambiar a plan gratis (cancelar suscripción)
      if (planActual !== 'gratis') {
        setLoading(plan.slug)
        try {
          const res = await fetch('/api/suscripcion/cancelar', {
            method: 'POST',
          })
          if (res.ok) {
            await update()
            toast.success('Plan cancelado. Ahora estás en plan Gratis.')
            router.refresh()
          } else {
            toast.error('Error al cancelar la suscripción')
          }
        } catch (error) {
          toast.error('Error al conectar con el servidor')
        } finally {
          setLoading(null)
        }
      }
      return
    }

    // Suscripción a plan de pago
    setLoading(plan.slug)
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
        // Redirigir a Lemon Squeezy
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Error al crear el checkout')
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Planes para Docentes
        </h1>
        <p className="text-muted-foreground mt-1">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANES_DOCENTES.map((plan) => {
          const esActual = planActual === plan.slug
          const precio = ciclo === 'mensual' ? plan.precio : plan.precioAnual
          const precioTexto = plan.precio === 0 ? 'Gratis' : `$${precio}`
          
          return (
            <Card
              key={plan.slug}
              className={`relative flex flex-col transition-all hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-md' : ''
              } ${esActual ? 'ring-2 ring-primary' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Más popular
                  </Badge>
                </div>
              )}

              {esActual && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Plan actual
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="text-4xl mb-2">
                  {plan.slug === 'gratis' ? '🆓' : plan.slug === 'docente_pro' ? '👩‍🏫' : '👑'}
                </div>
                <CardTitle className="text-xl">{plan.nombre}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{precioTexto}</span>
                  {precio > 0 && (
                    <span className="text-muted-foreground ml-1">
                      /{ciclo === 'mensual' ? 'mes' : 'año'}
                    </span>
                  )}
                </div>
                {plan.slug !== 'gratis' && ciclo === 'anual' && (
                  <CardDescription className="text-green-600 dark:text-green-400 mt-1">
                    Ahorra ${plan.precio * 12 - plan.precioAnual} al año
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="flex-1">
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
              </CardContent>

              <div className="p-6 pt-0">
                <Button
                  className="w-full gap-2"
                  variant={esActual ? 'outline' : plan.slug === 'gratis' ? 'secondary' : 'default'}
                  onClick={() => handleSuscribirse(plan)}
                  disabled={loading === plan.slug || (esActual && plan.slug !== 'gratis')}
                >
                  {loading === plan.slug ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : esActual && plan.slug !== 'gratis' ? (
                    'Plan activo'
                  ) : plan.slug === 'gratis' ? (
                    planActual === 'gratis' ? 'Plan gratuito' : 'Cambiar a Gratis'
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

      {/* Centro educativo gratuito note */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground">
            🏫 Los centros educativos pueden gestionar usuarios de forma gratuita.<br />
            Los docentes se suscriben individualmente para acceder a funcionalidades premium.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}