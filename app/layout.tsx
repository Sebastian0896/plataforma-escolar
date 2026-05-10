import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import ThemeProvider from '@/components/ThemeProvider'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Plataforma Educativa',
    template: '%s | Plataforma Educativa',
  },
  description: 'Sistema de planificaciones docentes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
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