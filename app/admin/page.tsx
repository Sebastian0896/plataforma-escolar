import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session.user?.role

  // Estos roles van a su propio panel
  if (rol === 'docente') redirect('/admin/docente')
  if (rol === 'registro') redirect('/admin/registro/comprobantes')
  if (rol === 'admin_centro' && session.user?.centroId) redirect(`/admin/centros/${session.user.centroId}`)

  // Admin y superadmin se quedan
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido, {session.user?.name}</h1>
      <p className="text-gray-500">Panel de gestión</p>
    </div>
  )
}