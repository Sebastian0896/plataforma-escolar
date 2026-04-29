// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/planificaciones'
import { auth } from '@/auth'
import Sidebar from './Sidebar'

export default async function SidebarWrapper() {
  const session = await auth()
  const rol = session?.user?.role
  const grados = session?.user?.grados || []
  const categoria = session?.user?.categoriaDocente
  const materias = session?.user?.materias || []

  let estructura

  if (rol === 'admin' || rol === 'coordinador' || rol === 'tecnico_distrital') {
    // Ven todo
    estructura = await getEstructuraCompleta()
  } else if (rol === 'docente') {
    // Solo su categoría, grados y materias
    estructura = await getEstructuraCompleta(
      undefined,
      grados.length > 0 ? grados : undefined,
      materias.length > 0 ? materias : undefined
    )
  } else {
    estructura = []
  }

  return <Sidebar estructura={estructura} />
}