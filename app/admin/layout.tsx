import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import Navbar from "@/components/Navbar"
import Breadcrumbs from "@/components/Breadcrumbs"
import MobileFooter from "@/components/MobileFooter"

export const runtime = "nodejs"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  const rol = session.user?.role

  if (rol === 'registro') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full bg-gray-50 dark:bg-slate-950">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <MobileFooter />

    </div>
  )
}