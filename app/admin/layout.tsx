import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"
import Navbar from "@/components/Navbar"
import Breadcrumbs from "@/components/Breadcrumbs"

export const runtime = "nodejs"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) return redirect("/login")
  if (session.user?.role !== 'admin' && session.user?.role !== 'docente') return redirect("/dashboard")

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
    </div>
  )
}