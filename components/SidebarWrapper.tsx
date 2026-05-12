// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/planificaciones'
import { auth } from '@/auth'
import Sidebar from './Sidebar'
import { prisma } from '@/lib/prisma' // Importamos prisma

export default async function SidebarWrapper() {
  const session = await auth()
  
  if (!session) return <Sidebar estructura={[]} />

  const rol = session.user?.role
  const grados = session.user?.grados || []
  const categoria = session.user?.categoriaDocente
  const materias = session.user?.materias || []

  let estructura
  let creadoPorId: string | undefined = undefined

  // 1. Lógica para Docente
  if (rol === 'docente') {
    creadoPorId = session.user?.id || undefined
  }

  // 2. Lógica para Admin Centro (tipo individual)
  if (rol === 'admin_centro' && session.user.centroId) {
    const centro = await prisma.centro.findUnique({
      where: { id: session.user.centroId },
      select: { tipo: true, nombre: true } // Solo traemos lo necesario
    })

    if (centro?.tipo === 'individual') {
      creadoPorId = session.user.id
    }
  }

  // 3. Obtención de la estructura según el rol
  const rolesAdmin = ['admin', 'coordinador', 'tecnico_distrital', 'superadmin']

  if (rolesAdmin.includes(rol || '')) {
    estructura = await getEstructuraCompleta()
  } else if (rol === 'docente' || rol === 'admin_centro') {
    const centroId = rol === 'admin_centro' ? session.user.centroId : undefined

    estructura = await getEstructuraCompleta(
      centroId,
      rol === 'docente' ? categoria : undefined,
      rol === 'docente' && grados.length > 0 ? grados : undefined,
      rol === 'docente' && materias.length > 0 ? materias : undefined,
      creadoPorId // Pasamos el string directamente
    )
  } else {
    estructura = []
  }

  return <Sidebar estructura={estructura} />
}