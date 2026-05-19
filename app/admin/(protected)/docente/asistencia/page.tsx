// app/admin/docente/asistencia/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays, ClipboardList, Users, ArrowRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function AsistenciaHubPage() {
  const { data: session } = useSession()

  // Saludo personalizado basado en el horario actual
  const obtenerSaludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return '¡Buenos días!'
    if (hora < 18) return '¡Buenas tardes!'
    return '¡Buenas noches!'
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8 min-h-[80vh] flex flex-col justify-center animate-in fade-in duration-300">
      {/* Banner de Bienvenida */}
      <div className="text-center space-y-3">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
          <GraduationCap className="h-7 w-7" />
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {obtenerSaludo()} {session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
            Bienvenido al módulo de asistencia. Selecciona la acción que deseas realizar hoy.
          </p>
        </div>
      </div>

      {/* Panel de Opciones (Tarjetas de Navegación) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full pt-4">
        
        {/* Tarjeta 1: Pasar Lista */}
        <Card className="group hover:border-primary/50 transition-all duration-200 shadow-md flex flex-col justify-between overflow-hidden relative border-muted/70">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10 group-hover:bg-primary transition-colors" />
          <CardHeader className="p-6 pb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              Pase de Lista Diario
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed pt-1">
              Registra la asistencia en tiempo real para tus grupos asignados. Configura materias, periodos escolares y añade observaciones personalizadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/admin/docente/asistencia/lista">
              <Button className="w-full justify-between h-11 text-sm font-semibold group-hover:bg-primary/95 shadow-sm">
                Iniciar Pase de Lista
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tarjeta 2: Historial */}
        <Card className="group hover:border-primary/50 transition-all duration-200 shadow-md flex flex-col justify-between overflow-hidden relative border-muted/70">
          <div className="absolute top-0 left-0 right-0 h-1 bg-primary/10 group-hover:bg-primary transition-colors" />
          <CardHeader className="p-6 pb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-105 transition-transform">
              <ClipboardList className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              Historial y Reportes
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed pt-1">
              Consulta registros pasados con filtrado inteligente. Identifica de forma temprana a los estudiantes con niveles críticos de inasistencia.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/admin/docente/asistencia/historial">
              <Button variant="outline" className="w-full justify-between h-11 text-sm font-semibold group-hover:bg-muted shadow-sm">
                Ver Historial Completo
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>

      {/* Footer Informativo / Contexto Escolar */}
      {(session?.user?.grados || session?.user?.materias) && (
        <div className="text-center text-xs text-muted-foreground max-w-xs mx-auto border-t pt-4 border-muted/60 flex flex-col gap-1">
          <span>
            Cursos activos:{' '}
            <span className="font-semibold text-foreground">
              {session?.user?.grados?.length || 0} asignados
            </span>
          </span>
          <span>
            Carga académica:{' '}
            <span className="font-semibold text-foreground">
              {session?.user?.materias?.length || 0} asignaturas
            </span>
          </span>
        </div>
      )}
    </div>
  )
}