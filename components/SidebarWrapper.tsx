import { getEstructuraCompleta } from '@/lib/planificaciones'
import { auth } from '@/auth'
import Sidebar from './Sidebar'
import mongoose from 'mongoose'

export default async function SidebarWrapper() {
  const session = await auth()
  const rol = session?.user?.role
  const grados = session?.user?.grados || []
  const categoria = session?.user?.categoriaDocente
  const materias = session?.user?.materias || []

  console.log('📡 SidebarWrapper ejecutado')

  console.log('👤 Session:', JSON.stringify(session?.user))

  let estructura

  if (rol === 'admin' || rol === 'coordinador' || rol === 'tecnico_distrital') {
    estructura = await getEstructuraCompleta()
  } else if (rol === 'docente') {
    const creadoPorId = session?.user?.id
      ? new mongoose.Types.ObjectId(session.user.id)
      : undefined

    console.log('👤 Session id:', session?.user?.id)
    console.log('🆔 creadoPorId:', creadoPorId)
    console.log('👤 Session categoriaDocente:', session?.user?.categoriaDocente)

//const centroId = session?.user?.centroId
estructura = await getEstructuraCompleta(
  session?.user?.centroId,
  session?.user?.categoriaDocente,
  grados.length > 0 ? grados : undefined,
  materias.length > 0 ? materias : undefined,
  creadoPorId
)
} else {
  estructura = []
}

  return <Sidebar estructura={estructura} />
}