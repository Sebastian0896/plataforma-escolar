// app/(public)/layout.tsx
import SidebarWrapper from '@/components/SidebarWrapper'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarWrapper />
      <main className="flex-1 p-4 lg:p-6 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}