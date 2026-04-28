import { getEstructuraCompleta } from '@/lib/wordpress'
import SidebarEstudiante from '@/components/estudiante/SidebarEstudiante'

type Params = Promise<{ grado: string }>

export default async function EstudianteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { grado } = await params
  const estructura = await getEstructuraCompleta()

  return (
    <div className="flex min-h-screen">
      <SidebarEstudiante estructura={estructura} grado={grado} />
      <main className="flex-1 p-6 max-w-8xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}