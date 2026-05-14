// lib/suscripcion.ts
import { prisma } from './prisma'

// Obtener suscripción activa de un usuario
export async function getSuscripcionActiva(usuarioId: string) {
  return await prisma.suscripcion.findFirst({
    where: {
      usuarioId,
      estado: 'active',
      OR: [
        { fechaFin: null },
        { fechaFin: { gt: new Date() } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  })
}

// Verificar si un docente tiene acceso a una funcionalidad
export async function tieneAcceso(usuarioId: string, funcionalidad: string): Promise<boolean> {
  const suscripcion = await getSuscripcionActiva(usuarioId)
  
  if (!suscripcion) {
    // Plan gratis
    const funcionalidadesGratis = ['consulta', 'perfil', 'materias']
    return funcionalidadesGratis.includes(funcionalidad)
  }
  
  // Capacidades por plan
  const capacidades: Record<string, string[]> = {
    gratis: ['consulta', 'perfil', 'materias'],
    docente_pro: ['consulta', 'perfil', 'materias', 'diario', 'asistencia', 'planificaciones', 'reportes'],
    docente_premium: ['consulta', 'perfil', 'materias', 'diario', 'asistencia', 'planificaciones', 'reportes', 'api', 'whitelabel'],
  }
  
  return capacidades[suscripcion.plan]?.includes(funcionalidad) || false
}

// Crear una nueva suscripción (después de pago exitoso)
export async function crearSuscripcion({
  usuarioId,
  plan,
  lemonCustomerId,
  lemonSubscriptionId,
  lemonVariantId,
}: {
  usuarioId: string
  plan: string
  lemonCustomerId: string
  lemonSubscriptionId: string
  lemonVariantId: string
}) {
  // Desactivar suscripciones anteriores
  await prisma.suscripcion.updateMany({
    where: { usuarioId, estado: 'active' },
    data: { estado: 'inactive', fechaFin: new Date() }
  })
  
  // Crear nueva suscripción
  const suscripcion = await prisma.suscripcion.create({
    data: {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      usuarioId,
      plan,
      estado: 'active',
      lemonCustomerId,
      lemonSubscriptionId,
      lemonVariantId,
      fechaInicio: new Date(),
    }
  })
  
  return suscripcion
}

// Registrar un pago
export async function registrarPago({
  suscripcionId,
  monto,
  moneda,
  lemonOrderId,
  lemonPaymentId,
}: {
  suscripcionId: string
  monto: number
  moneda: string
  lemonOrderId: string
  lemonPaymentId: string
}) {
  return await prisma.pago.create({
    data: {
      id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      suscripcionId,
      monto,
      moneda,
      estado: 'completado',
      lemonOrderId,
      lemonPaymentId,
    }
  })
}

// Cancelar suscripción
export async function cancelarSuscripcion(lemonSubscriptionId: string) {
  return await prisma.suscripcion.update({
    where: { lemonSubscriptionId },
    data: {
      estado: 'inactive',
      fechaFin: new Date()
    }
  })
}