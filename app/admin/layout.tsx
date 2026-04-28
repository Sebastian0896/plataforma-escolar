import { auth } from "@/auth"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/AdminSidebar"

export const runtime = "nodejs"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // No está logueado
  if (!session) {
    return redirect("/login")
  }

  // Está logueado pero no es admin ni docente
  if (session.user?.role !== 'admin' && session.user?.role !== 'docente') {
    return redirect("/acceso")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}