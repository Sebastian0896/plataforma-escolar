// lib/permissions.ts

export type Plan = 'gratis' | 'docente_pro' | 'docente_premium'

export interface PlanFeatures {
  // Funcionalidades (booleanos)
  diario: boolean
  asistencia: boolean
  evaluaciones: boolean
  planificaciones: boolean
  estudiantes: boolean
  calendario: boolean
  reportes: boolean
  analytics: boolean
  exportar: boolean
  
  // Límites numéricos
  maxEstudiantes: number     // -1 = ilimitado
  maxPlanificaciones: number // -1 = ilimitado
}

export const PLAN_FEATURES: Record<Plan, PlanFeatures> = {
  gratis: {
    diario: false,
    asistencia: false,
    evaluaciones: false,
    planificaciones: true,
    estudiantes: true,
    calendario: false,
    reportes: false,
    analytics: false,
    exportar: false,
    maxEstudiantes: 10,
    maxPlanificaciones: 5,
  },
  docente_pro: {
    diario: true,
    asistencia: true,
    evaluaciones: true,
    planificaciones: true,
    estudiantes: true,
    calendario: false,
    reportes: true,
    analytics: false,
    exportar: true,
    maxEstudiantes: 200,
    maxPlanificaciones: -1,
  },
  docente_premium: {
    diario: true,
    asistencia: true,
    evaluaciones: true,
    planificaciones: true,
    estudiantes: true,
    calendario: false,
    reportes: true,
    analytics: true,
    exportar: true,
    maxEstudiantes: -1,
    maxPlanificaciones: -1,
  },
}

export type Feature = keyof Omit<PlanFeatures, 'maxEstudiantes' | 'maxPlanificaciones'>

export function getFeatureValue(plan: Plan, feature: Feature): boolean {
  return PLAN_FEATURES[plan]?.[feature] ?? false
}

export function getLimiteEstudiantes(plan: Plan): number {
  return PLAN_FEATURES[plan]?.maxEstudiantes ?? 0
}

export function getLimitePlanificaciones(plan: Plan): number {
  return PLAN_FEATURES[plan]?.maxPlanificaciones ?? 0
}