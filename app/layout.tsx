import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import ThemeProvider from '@/components/ThemeProvider'
import MobileFooter from '@/components/MobileFooter'

export const metadata: Metadata = {
  title: {
    default: 'Plataforma Educativa',
    template: '%s | Plataforma Educativa',
  },
  description: 'Sistema de planificaciones docentes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" >
      <body className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 pb-20 md:pb-0" suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">
                {children}
              </div>
              <div className="md:hidden">
                <MobileFooter />
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}