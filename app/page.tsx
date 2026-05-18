// app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, UserPlus, ArrowRight, BookOpen } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <Card className="border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl">
          <CardContent className="pt-12 pb-8 px-8 text-center">
           
            <div className="relative inline-flex mb-8">
              <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse" />
              <div className="relative w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-slate-800">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
            </div>

         
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

          
            <div className="grid gap-4">
              <Button asChild size="lg" className="h-14 text-lg font-semibold shadow-lg shadow-blue-600/20 group">
                <Link className='flex items-center' href="/auth/login">
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
/* 

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Server, Rocket, Mail } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        
      
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">En desarrollo activo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plataforma Educativa
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modernizando la educación para el futuro
          </p>
        </div>

    
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Server className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Migración en curso</h3>
              <p className="text-sm text-muted-foreground">
                Estamos actualizando nuestra infraestructura para ofrecer un servicio más robusto y seguro.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Rocket className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nuevo dominio</h3>
              <p className="text-sm text-muted-foreground">
                Próximamente estrenaremos nuestro dominio definitivo con todas las funcionalidades.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">¿Eres inversor?</h3>
              <p className="text-sm text-muted-foreground">
                Contáctanos para conocer más sobre el proyecto y fechas de lanzamiento.
              </p>
            </CardContent>
          </Card>
        </div>


        <Card className="max-w-2xl mx-auto border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded-lg p-4 mb-6">
              <p className="text-yellow-800 dark:text-yellow-400 font-medium">
                🚧 Plataforma en fase de migración y mejora técnica
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Actualmente estamos en proceso de migración hacia una nueva arquitectura y dominio definitivo.
              La plataforma estará disponible en su versión final en las próximas semanas.
            </p>
            <p className="text-sm text-muted-foreground">
              Para más información sobre el proyecto o para consultas comerciales,
              por favor contáctanos directamente.
            </p>
          </CardContent>
        </Card>
        
    
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
} */