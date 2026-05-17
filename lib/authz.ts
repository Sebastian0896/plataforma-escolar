// lib/authz.ts
import { auth } from '@/auth'
import { prisma } from './prisma'
import { PLAN_FEATURES, Feature, Plan, getFeatureValue, getLimiteEstudiantes } from './permissions'
import { cache } from 'react'

// Cachear la suscripción activa para evitar múltiples consultas
export const getSuscripcionActiva = cache(async (usuarioId: string) => {
  if (!usuarioId) return null
  
  return await prisma.suscripcion.findFirst({
    where: {
      usuarioId,
      estado: 'active',
      OR: [
        { fechaFin: null },
        { fechaFin: { gt: new Date() } }
      ]
    },
    orderBy: { fechaInicio: 'desc' }
  })
})

// Obtener el plan activo del usuario
export async function getPlanActivo(usuarioId?: string): Promise<Plan> {
  if (!usuarioId) return 'gratis'
  
  const suscripcion = await getSuscripcionActiva(usuarioId)
  const plan = suscripcion?.plan as Plan
  
  return plan && plan !== 'gratis' ? plan : 'gratis'
}

// Verificar si un usuario puede usar una funcionalidad específica
export async function canUseFeature(feature: Feature): Promise<boolean> {
  const session = await auth()
  
  if (!session?.user?.id) return false
  
  // Superadmin y admin siempre tienen acceso
  if (session.user.role === 'superadmin' || session.user.role === 'admin') {
    return true
  }
  
  const plan = await getPlanActivo(session.user.id)
  return getFeatureValue(plan, feature)
}

// Verificar si puede acceder a la ruta (para middleware)
export async function canAccessRoute(route: string): Promise<boolean> {
  const session = await auth()
  
  if (!session?.user?.id) return false
  
  // Mapeo de rutas a features
  const routeFeatureMap: Record<string, Feature> = {
    '/admin/docente/diario': 'diario',
    '/admin/docente/asistencia': 'asistencia',
    '/admin/docente/evaluaciones': 'evaluaciones',
    '/admin/docente/planificaciones': 'planificaciones',
    '/admin/docente/calendario': 'calendario',
  }
  
  const feature = routeFeatureMap[route]
  if (!feature) return true // rutas no premium
  
  return await canUseFeature(feature)
}

// Obtener límite de estudiantes para el usuario actual
export async function getLimiteEstudiantesUsuario(): Promise<number> {
  const session = await auth()
  if (!session?.user?.id) return 0
  
  const plan = await getPlanActivo(session.user.id)
  return getLimiteEstudiantes(plan)
}

// Verificar si puede agregar más estudiantes
export async function puedeAgregarEstudiante(centroId: string): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.id) return false
  
  const limite = await getLimiteEstudiantesUsuario()
  if (limite === -1) return true // ilimitado
  
  const totalEstudiantes = await prisma.usuario.count({
    where: {
      centroId,
      rol: 'estudiante',
      activo: true,
    }
  })
  
  return totalEstudiantes < limite
}

//Obtener plan requerido
export async function requirePlan(
  requiredPlan: Plan
) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('No autorizado')
  }

  // Superadmin y admin bypass
  if (
    session.user.role === 'superadmin' ||
    session.user.role === 'admin'
  ) {
    return true
  }

  const plan = await getPlanActivo(session.user.id)

  // Premium accede a todo
  if (plan === 'docente_premium') {
    return true
  }

  // Pro accede solo a pro
  if (
    requiredPlan === 'docente_pro' &&
    plan === 'docente_pro'
  ) {
    return true
  }

  // Gratis
  if (
    requiredPlan === 'gratis'
  ) {
    return true
  }

  throw new Error('Plan insuficiente')
}