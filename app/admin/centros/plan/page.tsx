// app/admin/centros/plan/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import PlanButtonClient from '@/components/PlanButtonClient'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

const PLANES_DISPONIBLES = [
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
  },
]

export default async function PlanPage() {
  const session = await auth()

  if (
    !session ||
    (session.user?.role !== 'admin_centro' &&
      session.user?.role !== 'admin')
  ) {
    redirect('/dashboard')
  }

  await connectDB()

  const centro = session.user?.centroId
    ? await Centro.findById(session.user.centroId).lean()
    : null

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Planes
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          {centro
            ? `Centro: ${centro.nombre}`
            : 'Seleccioná el plan que mejor se adapte'}
        </p>
      </div>

      {/* Plan actual */}
      {centro && (
        <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  📌 Plan actual
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <span className="capitalize font-semibold">
                    {centro.plan}
                  </span>{' '}
                  — {centro.maxDocentes} docentes,{' '}
                  {centro.maxEstudiantes} estudiantes
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-5">
        {PLANES_DISPONIBLES.map((plan) => {
          const esActual = centro?.plan === plan.slug

          return (
            <Card
              key={plan.slug}
              className={`relative flex flex-col border transition-all duration-200 hover:shadow-md ${
                !plan.activo
                  ? 'opacity-70'
                  : 'hover:-translate-y-1'
              }`}
            >
              {!plan.activo && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full">
                  Próximamente
                </Badge>
              )}

              <CardHeader className="pb-4 text-center">
                <div className="text-4xl mb-3">{plan.icono}</div>

                <CardTitle className="text-lg">
                  {plan.nombre}
                </CardTitle>

                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {plan.precio}
                </p>

                <CardDescription className="text-sm leading-relaxed pt-2">
                  {plan.descripcion}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-between gap-6">
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <span>👩‍🏫</span>
                    <span>{plan.docentes} docentes</span>
                  </li>

                  <li className="flex items-center gap-2">
                    <span>🎒</span>
                    <span>{plan.estudiantes} estudiantes</span>
                  </li>
                </ul>

                {plan.activo && (
                  <div className="pt-2">
                    <PlanButtonClient
                      variantId={plan.variantId}
                      esActual={esActual}
                      planNombre={plan.nombre}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-5 sm:p-6 text-center">
          <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
            💡 ¿Necesitás un plan personalizado?
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Contactanos en{' '}
            <a
              href="mailto:info@mieducacion.es"
              className="font-medium text-slate-700 dark:text-slate-200 underline underline-offset-4"
            >
              info@mieducacion.es
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}