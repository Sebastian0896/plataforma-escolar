// app/admin/centros/plan/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PlanButtonClient from '@/components/PlanButtonClient'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Tipado para los planes
type PlanSlug = 'gratis' | 'docente_pro' | 'centro' | 'distrital' | 'ministerial'

interface Plan {
  slug: PlanSlug
  nombre: string
  precio: string
  docentes: number | 'Ilimitado'
  estudiantes: number | 'Ilimitado'
  activo: boolean
  icono: string
  descripcion: string
  variantId: string | null
  limites: {
    maxDocentes: number | null
    maxEstudiantes: number | null
  }
}

const PLANES_DISPONIBLES: Plan[] = [
  {
    slug: 'gratis',
    nombre: 'Gratis',
    precio: '$0',
    docentes: 1,
    estudiantes: 20,
    activo: true,
    icono: '🆓',
    descripcion: 'Para empezar a usar la plataforma sin costo.',
    variantId: null,
    limites: {
      maxDocentes: 1,
      maxEstudiantes: 20,
    },
  },
  {
    slug: 'docente_pro',
    nombre: 'Docente Pro',
    precio: '$0.50',
    docentes: 1,
    estudiantes: 100,
    activo: true,
    icono: '👩‍🏫',
    descripcion:
      'Para docentes independientes que quieren todas las funcionalidades.',
    variantId: '1622245',
    limites: {
      maxDocentes: 1,
      maxEstudiantes: 100,
    },
  },
  {
    slug: 'centro',
    nombre: 'Centro',
    precio: '$1.00',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: true,
    icono: '🏫',
    descripcion:
      'Para instituciones educativas con múltiples docentes y estudiantes.',
    variantId: '1622250',
    limites: {
      maxDocentes: null, // null = ilimitado
      maxEstudiantes: null,
    },
  },
  {
    slug: 'distrital',
    nombre: 'Distrital',
    precio: 'Personalizado',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: false,
    icono: '🏛️',
    descripcion:
      'Para distritos escolares con múltiples centros educativos.',
    variantId: null,
    limites: {
      maxDocentes: null,
      maxEstudiantes: null,
    },
  },
  {
    slug: 'ministerial',
    nombre: 'Ministerial',
    precio: 'Personalizado',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: false,
    icono: '🇩🇴',
    descripcion:
      'Para el Ministerio de Educación. Implementación nacional.',
    variantId: null,
    limites: {
      maxDocentes: null,
      maxEstudiantes: null,
    },
  },
]

export default async function PlanPage() {
  const session = await auth()

  // Validación de roles
  if (
    !session ||
    (session.user?.role !== 'admin_centro' &&
      session.user?.role !== 'admin')
  ) {
    redirect('/dashboard')
  }

  // Obtener centro desde PostgreSQL con Prisma
  const centro = session.user?.centroId
    ? await prisma.centro.findUnique({
        where: { id: session.user.centroId },
        select: {
          id: true,
          nombre: true,
          plan: true,
          maxDocentes: true,
          maxEstudiantes: true,
        },
      })
    : null

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Planes y Suscripciones
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground">
          {centro
            ? `Gestionando: ${centro.nombre}`
            : 'Seleccioná el plan que mejor se adapte a tus necesidades'}
        </p>
      </div>

      {/* Plan actual */}
      {centro && (
        <Card className="border-border bg-muted/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  📌 Plan actual
                </p>

                <p className="text-sm text-muted-foreground">
                  <span className="capitalize font-semibold text-foreground">
                    {centro.plan}
                  </span>{' '}
                  — {centro.maxDocentes === null ? 'Ilimitados' : centro.maxDocentes} docentes,{' '}
                  {centro.maxEstudiantes === null ? 'Ilimitados' : centro.maxEstudiantes} estudiantes
                </p>
              </div>

              <Badge
                variant="secondary"
                className="w-fit rounded-full px-3 py-1 text-xs"
              >
                Activo
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid de planes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {PLANES_DISPONIBLES.map((plan) => {
          const esActual = centro?.plan === plan.slug
          const isIlimitadoDocentes = plan.docentes === 'Ilimitado'
          const isIlimitadoEstudiantes = plan.estudiantes === 'Ilimitado'

          return (
            <Card
              key={plan.slug}
              className={`relative flex flex-col transition-all duration-200 ${
                plan.activo
                  ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                  : 'opacity-60 grayscale-[10%]'
              }`}
            >
              {!plan.activo && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full z-10"
                >
                  Próximamente
                </Badge>
              )}

              <CardHeader className="pb-4 text-center">
                <div className="text-5xl mb-3">{plan.icono}</div>

                <CardTitle className="text-xl">
                  {plan.nombre}
                </CardTitle>

                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">
                    {plan.precio}
                  </span>
                  {plan.precio !== 'Personalizado' && plan.precio !== '$0' && (
                    <span className="text-sm text-muted-foreground ml-1">
                      /mes
                    </span>
                  )}
                </div>

                <CardDescription className="text-sm leading-relaxed pt-3">
                  {plan.descripcion}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <span className="text-base">👩‍🏫</span>
                    <span>
                      {isIlimitadoDocentes 
                        ? 'Docentes ilimitados' 
                        : `${plan.docentes} docente${plan.docentes !== 1 ? 's' : ''}`
                      }
                    </span>
                  </li>

                  <li className="flex items-center gap-2.5">
                    <span className="text-base">🎒</span>
                    <span>
                      {isIlimitadoEstudiantes 
                        ? 'Estudiantes ilimitados' 
                        : `${plan.estudiantes} estudiante${plan.estudiantes !== 1 ? 's' : ''}`
                      }
                    </span>
                  </li>

                  {(plan.slug === 'distrital' || plan.slug === 'ministerial') && (
                    <li className="flex items-center gap-2.5">
                      <span className="text-base">🏢</span>
                      <span>Múltiples centros</span>
                    </li>
                  )}
                </ul>

                {plan.activo && (
                  <div className="pt-2">
                    <PlanButtonClient
                      variantId={plan.variantId}
                      esActual={esActual}
                      planNombre={plan.nombre}
                      planSlug={plan.slug}
                    />
                  </div>
                )}

                {!plan.activo && (
                  <div className="pt-2">
                    <Badge variant="outline" className="w-full justify-center">
                      Próximamente disponible
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer con contacto */}
      <Card className="border-border bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <CardContent className="p-5 sm:p-6 text-center">
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">
              💡 ¿Necesitás un plan personalizado?
            </p>

            <p className="text-sm text-muted-foreground">
              Contactanos para obtener una solución adaptada a las necesidades de tu institución
            </p>

            <div className="pt-2">
              <a
                href="mailto:info@mieducacion.es"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                ✉️ info@mieducacion.es
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}