import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEstructuraCompleta } from '@/lib/planificaciones'
import CardsNiveles from '@/components/admin/CardsNiveles'

export default async function PlanificacionesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session?.user?.role
  const esAdmin = rol === 'admin' || rol === 'superadmin' || rol === 'admin_centro' || rol === 'coordinador'
  const categoria = session?.user?.categoriaDocente
  const grados = session?.user?.grados || []
  const materias = session?.user?.materias || []

  const estructura = await getEstructuraCompleta(
    session?.user?.centroId,
    esAdmin ? undefined : categoria,
    esAdmin ? undefined : (grados.length > 0 ? grados : undefined),
    esAdmin ? undefined : (materias.length > 0 ? materias : undefined),
    session?.user?.id
  )

  return (
    <div>
      <CardsNiveles estructura={estructura} />
    </div>
  )
}