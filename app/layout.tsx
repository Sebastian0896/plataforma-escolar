import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import ThemeProvider from '@/components/ThemeProvider'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoadingOverlay } from '@/components/loading-overlay';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: {
    default: 'Plataforma Educativa',
    template: '%s | Plataforma Educativa'
  },
  description: 'Sistema de gestión educativa para centros escolares, docentes y estudiantes',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '192x192' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Plataforma Educativa',
    description: 'Sistema de gestión educativa',
    images: '/og-image.png',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        {/* Previene zoom en inputs en Safari iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes" />
      </head>
      <body className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <SessionProvider>
          <ThemeProvider>
            {children}
            <LoadingOverlay />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}