import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session.user?.role

  if (rol === 'docente') redirect('/admin/docente')
  if (rol === 'admin_centro') redirect('/admin')
  if (rol === 'admin' || rol === 'superadmin') redirect('/admin')
  if (rol === 'registro') redirect('/admin/registro/comprobantes')
  if (rol === 'estudiante') redirect(`/estudiante/${session.user?.grado}`)

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold">Bienvenido</h1>
    </div>
  )
}