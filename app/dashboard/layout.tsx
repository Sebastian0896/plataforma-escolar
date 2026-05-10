import SidebarWrapper from '@/components/SidebarWrapper'
import Navbar from '@/components/Navbar'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Navbar */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <SidebarWrapper />

        {/* Main */}
        <main className="flex-1 overflow-x-hidden">
          
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            
            {/* Breadcrumbs */}
            <div className="mb-5">
              <Breadcrumbs />
            </div>

            {/* Content */}
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}