// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/planificaciones'
import { auth } from '@/auth'
import Sidebar from './Sidebar'
import mongoose from 'mongoose'
import Centro from '@/lib/models/Centro'

export default async function SidebarWrapper() {
  const session = await auth()
  const rol = session?.user?.role
  const grados = session?.user?.grados || []
  const categoria = session?.user?.categoriaDocente
  const materias = session?.user?.materias || []

  let estructura
  let creadoPorId: any = undefined

  // Docente siempre filtra por creadoPor
  if (rol === 'docente') {
    creadoPorId = session?.user?.id
      ? new mongoose.Types.ObjectId(session.user.id)
      : undefined
  }

  console.log('🆔 creadoPorId antes de llamar:', creadoPorId)

  // Docente individual (admin_centro con centro tipo 'individual') también
  if (rol === 'admin_centro') {
  console.log('👤 centroId:', session.user.centroId)
  const centro = await Centro.findById(session.user.centroId).lean()
  console.log('🏫 centro:', centro?.nombre, 'tipo:', centro?.tipo)
  if (centro?.tipo === 'individual') {
    creadoPorId = new mongoose.Types.ObjectId(session.user.id)
    console.log('✅ creadoPorId asignado')
  }
}

  if (rol === 'admin' || rol === 'coordinador' || rol === 'tecnico_distrital' || rol === 'superadmin') {
    estructura = await getEstructuraCompleta()
  } else if (rol === 'docente' || rol === 'admin_centro') {
    const centroId = rol === 'admin_centro' ? session.user.centroId : undefined

    estructura = await getEstructuraCompleta(
      centroId,
      rol === 'docente' ? categoria : undefined,
      rol === 'docente' && grados.length > 0 ? grados : undefined,
      rol === 'docente' && materias.length > 0 ? materias : undefined,
      creadoPorId
    )
  } else {
    estructura = []
  }

  return <Sidebar estructura={estructura} />
}