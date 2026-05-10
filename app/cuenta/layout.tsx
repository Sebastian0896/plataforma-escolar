'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Header Estilizado */}
      <header className="sticky top-0 z-10 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="sm" aschild="true" className="-ml-2 h-8 gap-1">
            <Link href="/admin/docente">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver</span>
            </Link>
          </Button>
          
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Configuración de Cuenta
          </h1>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="mx-auto max-w-5xl p-4 md:p-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  )
}