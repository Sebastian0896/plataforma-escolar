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
const centroId = session?.user?.role === 'admin_centro' ? session.user.centroId : undefined
estructura = await getEstructuraCompleta(
  (rol === 'admin_centro' || rol === 'docente') ? centroId : undefined,
  rol === 'docente' ? session?.user?.categoriaDocente : undefined,
  rol === 'docente' && grados.length > 0 ? grados : undefined,
  rol === 'docente' && materias.length > 0 ? materias : undefined,
  rol === 'docente' ? creadoPorId : undefined)
} else {
  estructura = []
}

  return <Sidebar estructura={estructura} />
}