
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface Props {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function CoordinadorLayout({ children, params }: Props) {
  const session = await auth()
  const { id: centroId } = await params

  if (!session) redirect('/auth/login')

  const rol = session.user?.role
  const usuarioCentroId = session.user?.centroId

  // Verificar permisos
  const tienePermiso =
    rol === 'superadmin' ||
    (rol === 'admin_centro' && usuarioCentroId === centroId) ||
    (rol === 'coordinador' && usuarioCentroId === centroId)

  if (!tienePermiso) {
    redirect(`/admin/centros/${centroId}`)
  }

  // Obtener datos del centro para el layout
  const centro = await prisma.centro.findUnique({
    where: { id: centroId },
    select: { id: true, nombre: true, codigo: true },
  })

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header con breadcrumb */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{centro?.nombre}</span>
          <span>/</span>
          <span className="text-foreground font-medium">Coordinación Académica</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Panel de Coordinación
          </h1>
          <p className="text-muted-foreground mt-1">
            Supervisión académica y seguimiento de planificaciones
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}