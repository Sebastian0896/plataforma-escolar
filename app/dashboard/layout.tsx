import SidebarWrapper from '@/components/SidebarWrapper'
import Navbar from '@/components/Navbar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) redirect('/login')

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <SidebarWrapper />
        <main className="flex-1 p-4 lg:p-6 max-w-6xl mx-auto w-full">
           <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  )
}