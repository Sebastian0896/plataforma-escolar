import { getEstructuraCompleta } from '@/lib/planificaciones'
import SidebarEstudiante from '@/components/estudiante/SidebarEstudiante'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'

type Params = Promise<{ grado: string }>

export default async function EstudianteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { grado } = await params

  const session = await auth()
  const centroId = session?.user?.centroId

  const estructura = await getEstructuraCompleta(centroId)

  return (
    <div className="min-h-screen bg-background">
      
      {/* Navbar */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <SidebarEstudiante
          estructura={estructura}
          grado={grado}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          
          <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}