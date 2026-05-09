import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import Navbar from "@/components/Navbar"
import Breadcrumbs from "@/components/Breadcrumbs"
import MobileFooter from "@/components/MobileFooter"

export const runtime = "nodejs"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) return redirect("/login")

  const rol = session.user?.role

  // Registro usa su propio layout
  if (rol === 'registro') {
    return <>{children}</>
  }

  const rolesPermitidos = ['admin', 'admin_centro', 'superadmin', 'docente', 'registro']
  if (!rolesPermitidos.includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 max-w-6xl mx-auto w-full bg-gray-50 dark:bg-slate-950">
          <Breadcrumbs />
          {children}
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}