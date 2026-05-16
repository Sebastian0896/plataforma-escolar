// app/admin/docente/planes/page.tsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import {
  Check,
  Crown,
  Loader2,
  Sparkles,
} from 'lucide-react'

import {
  PLANES_DOCENTES,
  Plan,
} from '@/lib/planes'

import { toast } from 'sonner'

export default function PlanesDocentePage() {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState<string | null>(
    null
  )

  const [ciclo, setCiclo] = useState<
    'mensual' | 'anual'
  >('mensual')

  const planActual = session?.user?.plan || 'gratis'

  const handleSuscribirse = async (plan: Plan) => {
    if (plan.slug === 'gratis') {
      if (planActual !== 'gratis') {
        setLoading(plan.slug)

        try {
          const res = await fetch(
            '/api/suscripcion/cancelar',
            {
              method: 'POST',
            }
          )

          if (res.ok) {
            await update()

            toast.success(
              'Tu suscripción fue cancelada correctamente.'
            )

            router.refresh()
          } else {
            toast.error(
              'No se pudo cancelar la suscripción.'
            )
          }
        } catch {
          toast.error(
            'Error al conectar con el servidor.'
          )
        } finally {
          setLoading(null)
        }
      }

      return
    }

    setLoading(plan.slug)

    try {
      const res = await fetch(
        '/api/lemon-squeezy/create-checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: plan.slug,
            ciclo,
          }),
        }
      )

      const data = await res.json()

      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        toast.error(
          data.error ||
            'No se pudo crear el checkout.'
        )
      }
    } catch {
      toast.error(
        'Error al conectar con el servidor.'
      )
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center rounded-full border bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
          Plataforma educativa premium
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Impulsa tu experiencia educativa
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Accede a herramientas avanzadas,
          automatizaciones, reportes y funciones
          inteligentes diseñadas para docentes y
          centros educativos modernos.
        </p>
      </div>

      {/* Toggle */}
      <div className="mt-12 flex items-center justify-center gap-4">
        <Label
          className={
            ciclo === 'mensual'
              ? 'font-semibold'
              : 'text-muted-foreground'
          }
        >
          Mensual
        </Label>

        <Switch
          checked={ciclo === 'anual'}
          onCheckedChange={(checked) =>
            setCiclo(
              checked ? 'anual' : 'mensual'
            )
          }
        />

        <Label
          className={
            ciclo === 'anual'
              ? 'font-semibold'
              : 'text-muted-foreground'
          }
        >
          Anual
        </Label>

        {ciclo === 'anual' && (
          <Badge
            variant="secondary"
            className="rounded-full"
          >
            Ahorra 2 meses
          </Badge>
        )}
      </div>

      {/* Plans */}
      <div className="mt-16 grid gap-8 lg:grid-cols-3">
        {PLANES_DOCENTES.map((plan) => {
          const esActual =
            planActual === plan.slug

          const precio =
            ciclo === 'mensual'
              ? plan.precio
              : plan.precioAnual

          const precioTexto =
            precio === 0
              ? 'Gratis'
              : `RD$${precio}`

          return (
            <Card
              key={plan.slug}
              className={`relative overflow-visible flex flex-col rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? 'border-primary ring-2 ring-primary/20'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="rounded-full px-4 py-1">
                    Más popular
                  </Badge>
                </div>
              )}

              {esActual && (
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="secondary"
                    className="rounded-full"
                  >
                    Plan actual
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                {plan.slug ===
                'docente_premium' ? (
                  <Sparkles className="h-7 w-7 text-primary" />
                ) : (
                  <Crown className="h-7 w-7 text-primary" />
                )}
              </div>

              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold">
                  {plan.nombre}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.slug === 'gratis' &&
                    'Comienza gratuitamente y organiza tus clases.'}

                  {plan.slug ===
                    'docente_pro' &&
                    'Optimiza tu flujo de trabajo docente con herramientas avanzadas.'}

                  {plan.slug ===
                    'docente_premium' &&
                    'Funciones inteligentes para docentes y centros educativos modernos.'}
                </p>
              </div>

              {/* Price */}
              <div className="mt-8">
                <span className="text-4xl font-bold">
                  {precioTexto}
                </span>

                {precio > 0 && (
                  <span className="ml-2 text-muted-foreground">
                    /{' '}
                    {ciclo === 'mensual'
                      ? 'mes'
                      : 'año'}
                  </span>
                )}
              </div>

              {/* Features */}
              <CardContent className="flex-1 px-0 pt-8">
                <ul className="space-y-4">
                  {plan.features
                    .filter((feature) =>
                      feature.startsWith('✅')
                    )
                    .map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                        <span>
                          {feature
                            .replace('✅', '')
                            .trim()}
                        </span>
                      </li>
                    ))}
                </ul>
              </CardContent>

              {/* CTA */}
              <div className="mt-10">
                <Button
                  className="h-12 w-full rounded-2xl text-base"
                  variant={
                    esActual
                      ? 'outline'
                      : 'default'
                  }
                  disabled={
                    loading === plan.slug ||
                    (esActual &&
                      plan.slug !== 'gratis')
                  }
                  onClick={() =>
                    handleSuscribirse(plan)
                  }
                >
                  {loading === plan.slug ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : esActual &&
                    plan.slug !== 'gratis' ? (
                    'Plan activo'
                  ) : plan.slug === 'gratis' ? (
                    planActual === 'gratis' ? (
                      'Plan gratuito'
                    ) : (
                      'Cambiar a Gratis'
                    )
                  ) : (
                    <>
                      <Crown className="mr-2 h-4 w-4" />
                      Suscribirme
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-24 rounded-3xl border bg-muted/30 p-10 text-center">
        <h3 className="text-2xl font-bold">
          Diseñado para la educación moderna
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Automatiza procesos, mejora la gestión
          académica y ofrece una experiencia más
          eficiente para docentes, estudiantes y
          centros educativos.
        </p>
      </div>
    </div>
  )
}