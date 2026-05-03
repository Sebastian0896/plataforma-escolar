import { getEstructuraCompleta } from '@/lib/planificaciones'
import SidebarEstudiante from '@/components/estudiante/SidebarEstudiante'
import { auth } from '@/auth'

type Params = Promise<{ grado: string }>

export default async function EstudianteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { grado } = await params
  const session = await auth();
  const estructura = await getEstructuraCompleta(session?.user.centroId)

  return (
    <div className="flex">
      <SidebarEstudiante estructura={estructura} grado={grado} />
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}