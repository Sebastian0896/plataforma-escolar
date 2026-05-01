import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) redirect('/login')

  if (session.user?.role === 'estudiante') {
    redirect(`/estudiante/${session.user.grado}`)
  }

  // Admin, docente, coordinador, técnico: se quedan viendo el sidebar
  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold text-gray-900">
        Bienvenido, {session.user?.name}
      </h1>
      <p className="text-gray-500 mt-2">
        Seleccioná una planificación del menú lateral para ver su contenido
      </p>
    </div>
  )
}