import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import Navbar from '@/components/Navbar'
import Breadcrumbs from '@/components/Breadcrumbs'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { SugerenciaButton } from '@/components/SugerenciaButton'

export const runtime = 'nodejs'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    return redirect('/login')
  }

  const rol = session.user?.role

  // Registro usa layout independiente
  if (rol === 'registro') {
    return <>{children}</>
  }

  const rolesPermitidos = [
    'admin',
    'admin_centro',
    'coordinador',
    'superadmin',
    'docente',
    'registro',
  ]

  if (
    !rolesPermitidos.includes(
      session.user?.role || ''
    )
  ) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <main className=" flex-1 w-full bg-background">
          {/* Content Wrapper */}
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 md:px-6 lg:px-8 lg:py-8">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <Breadcrumbs />
            </div>

            {/* Page Content */}
            <div className="mt-6 space-y-8 pb-24">
              {children}
              <div><SugerenciaButton /></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}