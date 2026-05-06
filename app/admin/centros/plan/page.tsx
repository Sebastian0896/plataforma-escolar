// app/admin/centros/plan/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Link from 'next/link'

const PLANES_DISPONIBLES = [
  {
    slug: 'gratis',
    nombre: 'Gratis',
    precio: '$0',
    docentes: 1,
    estudiantes: 20,
    activo: true,
    color: 'bg-gray-100 dark:bg-slate-800',
    icono: '🆓',
    descripcion: 'Para empezar a usar la plataforma sin costo.',
  },
  {
    slug: 'docente_pro',
    nombre: 'Docente Pro',
    precio: '$5/mes',
    docentes: 1,
    estudiantes: 100,
    activo: true,
    color: 'bg-blue-50 dark:bg-blue-900/20',
    icono: '👩‍🏫',
    descripcion: 'Para docentes independientes que quieren todas las funcionalidades.',
  },
  {
    slug: 'centro',
    nombre: 'Centro',
    precio: '$25/mes',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: true,
    color: 'bg-green-50 dark:bg-green-900/20',
    icono: '🏫',
    descripcion: 'Para instituciones educativas con múltiples docentes y estudiantes.',
  },
  {
    slug: 'distrital',
    nombre: 'Distrital',
    precio: '$150/mes',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: false,
    color: 'bg-purple-50 dark:bg-purple-900/20',
    icono: '🏛️',
    descripcion: 'Para distritos escolares con múltiples centros educativos.',
  },
  {
    slug: 'ministerial',
    nombre: 'Ministerial',
    precio: 'Personalizado',
    docentes: 'Ilimitado',
    estudiantes: 'Ilimitado',
    activo: false,
    color: 'bg-amber-50 dark:bg-amber-900/20',
    icono: '🇩🇴',
    descripcion: 'Para el Ministerio de Educación. Implementación nacional.',
  },
]

export default async function PlanPage() {
  const session = await auth()
  if (!session || (session.user?.role !== 'admin_centro' && session.user?.role !== 'admin')) {
    redirect('/dashboard')
  }

  await connectDB()
  const centro = await Centro.findById(session.user.centroId).lean()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Planes</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {centro ? `Centro: ${centro.nombre}` : 'Seleccioná el plan que mejor se adapte'}
        </p>
      </div>

      {centro && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            📌 Plan actual: <strong className="capitalize">{centro.plan}</strong> — {centro.maxDocentes} docentes, {centro.maxEstudiantes} estudiantes
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {PLANES_DISPONIBLES.map(plan => (
          <div
            key={plan.slug}
            className={`${plan.color} rounded-xl border border-gray-200 dark:border-slate-700 p-5 flex flex-col text-center relative ${!plan.activo ? 'opacity-60' : ''}`}
          >
            {!plan.activo && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gray-600 text-white text-xs px-3 py-0.5 rounded-full">
                Próximamente
              </span>
            )}
            <div className="text-3xl mb-3">{plan.icono}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{plan.nombre}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{plan.precio}</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-6 flex-1">
              <li>👩‍🏫 {plan.docentes} docentes</li>
              <li>🎒 {plan.estudiantes} estudiantes</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{plan.descripcion}</p>
            <button
              disabled={!plan.activo || centro?.plan === plan.slug}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                centro?.plan === plan.slug
                  ? 'bg-gray-300 dark:bg-slate-600 text-gray-500 cursor-not-allowed'
                  : plan.activo
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {centro?.plan === plan.slug ? 'Plan actual' : plan.activo ? 'Seleccionar' : 'Próximamente'}
            </button>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
        <p className="mb-2">💡 ¿Necesitás un plan personalizado?</p>
        <p>
          Contactanos en{' '}
          <a href="mailto:info@mieducacion.es" className="text-blue-600 hover:underline">
            info@mieducacion.es
          </a>
        </p>
        <p className="text-xs text-gray-400 mt-4">
          La funcionalidad de pago estará disponible próximamente.
        </p>
      </div>
    </div>
  )
}