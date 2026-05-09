import SidebarWrapper from '@/components/SidebarWrapper'
import Navbar from '@/components/Navbar'
import Breadcrumbs from '@/components/Breadcrumbs'
import MobileFooter from '@/components/MobileFooter'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SidebarWrapper />
        <main className="flex-1 p-4 lg:p-6 max-w-4xl mx-auto w-full">
          <Breadcrumbs />
          {children}
        </main>
      </div>
      <MobileFooter />
    </div>
  )
}