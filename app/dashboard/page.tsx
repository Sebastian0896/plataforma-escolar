// app/dashboard/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardContent } from '@/components/dashboard/DashboardContent'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session) redirect('/auth/login')
  
  const rol = session.user?.role
  const centroId = session.user?.centroId
  const usuarioId = session.user?.id
  
  // Datos comunes para todos los roles
  const data = {
    rol,
    nombre: session.user?.name,
    centroNombre: null as string | null,
    totalDocentes: 0,
    totalEstudiantes: 0,
    planificacionesRecientes: 0,
    proximasActividades: [] as any[],
  }
  
  if (centroId) {
    const [centro, docentes, estudiantes] = await Promise.all([
      prisma.centro.findUnique({
        where: { id: centroId },
        select: { nombre: true, plan: true }
      }),
      prisma.usuario.count({
        where: { centroId, rol: 'docente', activo: true }
      }),
      prisma.usuario.count({
        where: { centroId, rol: 'estudiante', activo: true }
      }),
    ])
    
    data.centroNombre = centro?.nombre || null
    data.totalDocentes = docentes
    data.totalEstudiantes = estudiantes
  }
  
  // Datos específicos según rol
  if (rol === 'docente' && usuarioId) {
    // Para docente: contar sus planificaciones
    // Esto vendría de MongoDB
    // data.planificacionesRecientes = await Planificacion.countDocuments({ creadoPor: usuarioId })
  }
  
  if (rol === 'coordinador' && centroId) {
    // Para coordinador: contar planificaciones de sus docentes
    // data.planificacionesRecientes = await getPlanificacionesCountByCentro(centroId)
  }
  
  return <DashboardContent data={data} />
}