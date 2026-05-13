// components/dashboard/DashboardContent.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  TrendingUp,
  Users,
  School,
  ArrowRight,
  Bell,
  Clock,
  CheckCircle2,
} from 'lucide-react'

interface DashboardContentProps {
  data: {
    rol: string
    nombre: string
    centroNombre: string | null
    totalDocentes: number
    totalEstudiantes: number
    planificacionesRecientes: number
    proximasActividades: any[]
  }
}

export function DashboardContent({ data }: DashboardContentProps) {
  const { data: session } = useSession()
  const rol = data.rol
  const centroId = session?.user?.centroId
  
  // Accesos rápidos según rol
  const getAccesosRapidos = () => {
    const accesos = []
    
    if (rol === 'docente') {
      accesos.push(
        { href: '/admin/docente/diario', label: 'Diario del Docente', icon: CalendarDays, color: 'bg-blue-500' },
        { href: '/admin/docente/asistencia', label: 'Pase de Lista', icon: ClipboardCheck, color: 'bg-green-500' },
        { href: '/admin/planificaciones/nueva', label: 'Nueva Planificación', icon: BookOpen, color: 'bg-purple-500' }
      )
    }
    
    if (rol === 'coordinador' && centroId) {
      accesos.push(
        { href: `/admin/centro/${centroId}/coordinador`, label: 'Panel de Coordinación', icon: Users, color: 'bg-cyan-500' },
        { href: `/admin/centro/${centroId}`, label: 'Gestión del Centro', icon: School, color: 'bg-slate-500' }
      )
    }
    
    if (rol === 'admin_centro' && centroId) {
      accesos.push(
        { href: `/admin/centro/${centroId}`, label: 'Panel del Centro', icon: School, color: 'bg-cyan-500' },
        { href: '/admin/usuarios/centros', label: 'Gestión de Usuarios', icon: Users, color: 'bg-slate-500' }
      )
    }
    
    if (rol === 'admin' || rol === 'superadmin') {
      accesos.push(
        { href: '/admin', label: 'Panel Administrativo', icon: TrendingUp, color: 'bg-primary' },
        { href: '/admin/centros', label: 'Gestión de Centros', icon: School, color: 'bg-cyan-500' },
        { href: '/admin/materias', label: 'Gestión de Materias', icon: BookOpen, color: 'bg-purple-500' }
      )
    }
    
    if (rol === 'estudiante') {
      accesos.push(
        { href: '/dashboard/mis-notas', label: 'Mis Notas', icon: TrendingUp, color: 'bg-blue-500' },
        { href: '/dashboard/asistencia', label: 'Mi Asistencia', icon: ClipboardCheck, color: 'bg-green-500' }
      )
    }
    
    return accesos
  }
  
  const accesosRapidos = getAccesosRapidos()
  
  return (
    <div className="space-y-6 p-4 md:p-6">
      
      {/* Bienvenida */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            ¡Bienvenido, {data.nombre?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            {rol === 'coordinador' ? '👔 Coordinador' :
             rol === 'docente' ? '👨‍🏫 Docente' :
             rol === 'admin_centro' ? '🏫 Admin Centro' :
             rol === 'admin' ? '⚙️ Admin' :
             rol === 'superadmin' ? '👑 Super Admin' :
             rol === 'estudiante' ? '🎓 Estudiante' : rol}
          </Badge>
          
          {data.centroNombre && (
            <Badge variant="secondary" className="gap-1">
              <School className="h-3 w-3" />
              {data.centroNombre}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Tarjetas de KPIs (según rol) */}
      {(rol === 'coordinador' || rol === 'admin_centro' || rol === 'admin') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Docentes</p>
                <p className="text-2xl font-bold">{data.totalDocentes}</p>
              </div>
              <Users className="h-8 w-8 text-primary opacity-50" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estudiantes</p>
                <p className="text-2xl font-bold">{data.totalEstudiantes}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary opacity-50" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Planificaciones</p>
                <p className="text-2xl font-bold">{data.planificacionesRecientes}</p>
              </div>
              <ClipboardCheck className="h-8 w-8 text-primary opacity-50" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ratio E/D</p>
                <p className="text-2xl font-bold">
                  {data.totalDocentes > 0 
                    ? Math.round(data.totalEstudiantes / data.totalDocentes) 
                    : 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-50" />
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Accesos Rápidos */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          ⚡ Accesos rápidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {accesosRapidos.map((acceso) => (
            <Link key={acceso.href} href={acceso.href}>
              <Card className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`${acceso.color} p-2 rounded-lg text-white`}>
                      <acceso.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{acceso.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ir al panel
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground mt-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Actividades recientes y notificaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notificaciones recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="flex-1">Bienvenido a la plataforma</span>
                <span className="text-xs text-muted-foreground">Hoy</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="flex-1">Completa tu perfil</span>
                <span className="text-xs text-muted-foreground">Pendiente</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ayuda / Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              💡 Tips rápidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rol === 'coordinador' && (
                <>
                  <p className="text-sm">📋 Revisa las planificaciones de tus docentes desde el Panel de Coordinación</p>
                  <p className="text-sm">👥 Consulta la lista de docentes y sus materias asignadas</p>
                </>
              )}
              {rol === 'docente' && (
                <>
                  <p className="text-sm">📝 Registra el diario de clases diariamente</p>
                  <p className="text-sm">✅ Marca la asistencia de tus estudiantes</p>
                </>
              )}
              {rol === 'admin_centro' && (
                <>
                  <p className="text-sm">🏫 Gestiona los usuarios de tu centro educativo</p>
                  <p className="text-sm">📊 Visualiza las estadísticas académicas</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}