// lib/planes.ts
export interface Plan {
  slug: string
  nombre: string
  precio: number
  precioAnual: number
  moneda: string
  features: string[]
  limits: {
    diario: boolean
    asistencia: boolean
    planificaciones: boolean
    reportes: boolean
    maxEstudiantes: number // -1 = ilimitado
    maxPlanificaciones: number // -1 = ilimitado
  }
  variantIds: {
    mensual: string
    anual: string
  }
  popular?: boolean
}

export const PLANES_DOCENTES: Plan[] = [
  {
    slug: 'gratis',
    nombre: 'Gratis',
    precio: 0,
    precioAnual: 0,
    moneda: 'USD',
    features: [
      '✅ Gestión básica de estudiantes',
      '✅ Consulta de grados y materias',
      '✅ Visualización de planificaciones',
      '❌ Diario del docente',
      '❌ Pase de lista',
      '❌ Crear planificaciones',
      '❌ Reportes y estadísticas',
    ],
    limits: {
      diario: false,
      asistencia: false,
      planificaciones: false,
      reportes: false,
      maxEstudiantes: 10,
      maxPlanificaciones: 0,
    },
    variantIds: {
      mensual: '',
      anual: '',
    },
  },
  {
    slug: 'docente_pro',
    nombre: 'Docente Pro',
    precio: 5,
    precioAnual: 50,
    moneda: 'USD',
    features: [
      '✅ Gestión completa de estudiantes',
      '✅ Crear planificaciones ilimitadas',
      '✅ Diario del docente',
      '✅ Pase de lista',
      '✅ Reportes y estadísticas',
      '✅ Importar/exportar datos',
      '✅ Soporte prioritario',
    ],
    limits: {
      diario: true,
      asistencia: true,
      planificaciones: true,
      reportes: true,
      maxEstudiantes: 200,
      maxPlanificaciones: -1,
    },
    variantIds: {
      mensual: process.env.LEMON_VARIANT_DOCENTE_PRO_MENSUAL || '1622245',
      anual: process.env.LEMON_VARIANT_DOCENTE_PRO_ANUAL || '1622246',
    },
    popular: true,
  },
  {
    slug: 'docente_premium',
    nombre: 'Docente Premium',
    precio: 10,
    precioAnual: 100,
    moneda: 'USD',
    features: [
      '✅ Todo Docente Pro',
      '✅ Estudiantes ilimitados',
      '✅ Certificados de logro',
      '✅ Análisis avanzado',
      '✅ API de integración',
      '✅ White-label opcional',
      '✅ Soporte 24/7',
    ],
    limits: {
      diario: true,
      asistencia: true,
      planificaciones: true,
      reportes: true,
      maxEstudiantes: -1,
      maxPlanificaciones: -1,
    },
    variantIds: {
      mensual: process.env.LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL || '1622250',
      anual: process.env.LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL || '1622251',
    },
  },
]

export function getPlanBySlug(slug: string): Plan | undefined {
  return PLANES_DOCENTES.find(plan => plan.slug === slug)
}

export function getPlanByVariantId(variantId: string): Plan | undefined {
  return PLANES_DOCENTES.find(plan => 
    plan.variantIds.mensual === variantId || 
    plan.variantIds.anual === variantId
  )
}