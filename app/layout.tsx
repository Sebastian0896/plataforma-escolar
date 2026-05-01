import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import ThemeProvider from '@/components/ThemeProvider'
import PWAInstall from '@/components/PWAInstall'

export const viewport: Metadata = {
  title: 'Plataforma Educativa — Salomé Ureña',
  description: 'Sistema de planificaciones docentes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}