// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, UserPlus, ArrowRight, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black flex items-center justify-center p-4">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
          <CardContent className="pt-12 pb-8 px-8 text-center">
            {/* Logo Icon */}
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-slate-800">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Texto Principal */}
            <div className="space-y-2 mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Plataforma Educativa
              </h1>
              <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider text-xs">
                <BookOpen className="h-3 w-3" />
                <span>Gestión de Planificaciones</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[250px] mx-auto mt-4">
                Bienvenido al sistema centralizado de planificación docentes.
              </p>
            </div>

            {/* Acciones */}
            <div className="grid gap-4">
              <Button asChild size="lg" className="h-14 text-lg font-semibold shadow-lg shadow-blue-600/20 group">
                <Link className='flex items-center' href="/login">
                  Ingresar al Sistema
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="h-14 text-lg font-medium border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Link className='flex items-center' href="/registro-docente">
                  <UserPlus className="mr-2 h-5 w-5 text-green-600" />
                  Registro Docente
                </Link>
              </Button>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                &copy; {new Date().getFullYear()} Plataforma Educativa Planificación Docentes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}