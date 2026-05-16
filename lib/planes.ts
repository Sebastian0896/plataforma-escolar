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
  descripcion: string
}

export const PLANES_DOCENTES: Plan[] = [
  {
    slug: 'gratis',
    nombre: 'Gratis',
    precio: 0,
    precioAnual: 0,
    moneda: 'USD',

    features: [
      '✅ Consulta de grados y materias',
      '✅ Visualización de planificaciones',
      '✅ Acceso básico a la plataforma',
      '❌ Crear planificaciones',
      '❌ Diario del docente',
      '❌ Pase de lista',
      '❌ Reportes y estadísticas',
      '❌ Herramientas avanzadas',
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

    descripcion:
      'Comienza gratuitamente y descubre cómo modernizar tu experiencia educativa.',
  },

  {
    slug: 'docente_pro',
    nombre: 'Docente Pro',
    precio: 5,
    precioAnual: 50,
    moneda: 'USD',

    features: [
      '✅ Crear planificaciones ilimitadas',
      '✅ Diario del docente',
      '✅ Pase de lista inteligente',
      '✅ Reportes y estadísticas',
      '✅ Gestión de estudiantes',
      '✅ Importar y exportar datos',
      '✅ Acceso prioritario a nuevas funciones',
      '✅ Experiencia sin límites',
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
      mensual:
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_MENSUAL ||
        '1622245',

      anual:
        process.env
          .LEMON_VARIANT_DOCENTE_PRO_ANUAL ||
        '1622246',
    },

    popular: true,

    descripcion:
      'Optimiza tu flujo docente con herramientas avanzadas diseñadas para ahorrar tiempo y mejorar tu organización.',
  },

  {
    slug: 'docente_premium',
    nombre: 'Docente Premium',
    precio: 10,
    precioAnual: 100,
    moneda: 'USD',

    features: [
      '✅ Todo lo incluido en Docente Pro',
      '✅ Análisis avanzado de rendimiento',
      '✅ Herramientas inteligentes con IA',
      '✅ Estadísticas avanzadas',
      '✅ Automatizaciones educativas',
      '✅ Gestión ilimitada de estudiantes',
      '✅ Soporte prioritario 24/7',
      '✅ Acceso anticipado a funciones premium',
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
      mensual:
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_MENSUAL ||
        '1622250',

      anual:
        process.env
          .LEMON_VARIANT_DOCENTE_PREMIUM_ANUAL ||
        '1622251',
    },

    descripcion:
      'La experiencia educativa más completa para docentes e instituciones que buscan eficiencia, automatización y crecimiento.',
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