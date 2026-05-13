// app/admin/planificaciones/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEstructuraCompleta } from '@/lib/planificaciones'
import CardsNiveles from '@/components/admin/CardsNiveles'

export const metadata = { title: 'Planificaciones' }

export default async function PlanificacionesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session?.user?.role
  const grados = session?.user?.grados || []
  const materias = session?.user?.materias || []
  const esAdmin = rol === 'admin' || rol === 'superadmin' || (rol === 'admin_centro' && session?.user?.categoriaDocente)

  let creadoPorId: any = undefined

  if (rol === 'docente') {
    creadoPorId = session?.user?.id ?session.user.id : undefined
  }

  if (rol === 'admin_centro') {
    const centro = await Centro.findById(session.user.centroId).lean()
    if (centro?.tipo === 'individual') {
      creadoPorId = session?.user?.id ?session.user.id : undefined
    }
  }

  const centroId = rol === 'admin_centro' ? session.user.centroId : undefined

  const estructura = await getEstructuraCompleta(
    centroId,
    esAdmin ? undefined : session?.user?.categoriaDocente,
    esAdmin ? undefined : (grados.length > 0 ? grados : undefined),
    esAdmin ? undefined : (materias.length > 0 ? materias : undefined),
    creadoPorId
  )

  return (
    <div>
      <CardsNiveles estructura={estructura} />
    </div>
  )
}