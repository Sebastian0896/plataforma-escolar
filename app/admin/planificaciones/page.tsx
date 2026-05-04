import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getEstructuraCompleta } from '@/lib/planificaciones'
import CardsNiveles from '@/components/admin/CardsNiveles'

export default async function PlanificacionesPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session?.user?.role
  const grados = session?.user?.grados || []
  const materias = session?.user?.materias || []

  const centroId = session?.user?.centroId
  const creadoPorId = session?.user?.id
  let estructura = await getEstructuraCompleta(
  (rol === 'admin_centro' || rol === 'docente') ? centroId : undefined,
  rol === 'docente' ? session?.user?.categoriaDocente : undefined,
  rol === 'docente' && grados.length > 0 ? grados : undefined,
  rol === 'docente' && materias.length > 0 ? materias : undefined,
  rol === 'docente' ? creadoPorId : undefined
)

  return (
    <div>
      <CardsNiveles estructura={estructura} />
    </div>
  )
}