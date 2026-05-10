// app/admin/docente/page.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  BookOpen,
  Calendar,
  ClipboardList,
  Eye,
  FileBarChart2,
  FilePlus2,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Users,
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function DocenteDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/stats')
        .then((r) => r.json())
        .then((data) => setStats(data))
        .catch(() => {})
    }
  }, [session])

  if (!session) return null

  const quickLinks = [
    {
      title: 'Nueva Planificación',
      description: 'Crear contenido académico',
      href: '/admin/planificaciones/nueva',
      icon: FilePlus2,
    },
    {
      title: 'Mis Planificaciones',
      description: 'Ver y gestionar',
      href: '/admin/docente/planificaciones',
      icon: BookOpen,
    },
    {
      title: 'Mis Recursos',
      description: 'Biblioteca de archivos',
      href: '/admin/docente/recursos',
      icon: FolderOpen,
    },
    {
      title: 'Mis Estudiantes',
      description: 'Lista de estudiantes',
      href: '/admin/docente/estudiantes',
      icon: GraduationCap,
    },
    {
      title: 'Asistencia',
      description: 'Registro diario',
      href: '/admin/docente/asistencia',
      icon: ClipboardList,
    },
    {
      title: 'Diario',
      description: 'Seguimiento diario',
      href: '/admin/docente/diario',
      icon: Calendar,
    },
    {
      title: 'Evaluaciones',
      description: 'Calificar estudiantes',
      href: '/admin/docente/evaluaciones',
      icon: FileBarChart2,
    },
    {
      title: 'Vista Previa',
      description: 'Como ven los estudiantes',
      href: '/dashboard',
      icon: Eye,
    },
    {
      title: 'Calendario',
      description: 'Programación académica',
      href: '/admin/docente/calendario',
      icon: Calendar,
    },
    {
      title: 'Vista Semanal',
      description: 'Semana actual',
      href: '/admin/docente/semana',
      icon: LayoutDashboard,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Oficina Virtual
        </h1>

        <p className="text-muted-foreground">
          Bienvenido nuevamente,{' '}
          <span className="font-medium text-foreground">
            {session.user?.name}
          </span>
        </p>
      </div>

      {/* Alertas */}
      {stats?.pendientes?.length > 0 && (
        <div className="space-y-4">
          {stats.pendientes.map((p: any) => (
            <Card
              key={p.grado}
              className={`border-l-4 shadow-sm ${
                p.urgente
                  ? 'border-l-red-500 bg-red-50/60 dark:bg-red-950/20'
                  : 'border-l-amber-500 bg-amber-50/60 dark:bg-amber-950/20'
              }`}
            >
              <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={p.urgente ? 'destructive' : 'secondary'}
                    >
                      {p.urgente ? 'Urgente' : 'Pendiente'}
                    </Badge>

                    <p className="font-semibold">
                      {p.grado?.replace('-', ' ')}
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Sin planificación esta semana{' '}
                    {p.urgente &&
                      `(quedan ${p.diasRestantes} días)`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link
                      href={`/admin/planificaciones/nueva?grado=${p.grado}`}
                    >
                      Crear planificación
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      fetch('/api/docente/pendientes', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          grado: p.grado,
                        }),
                      }).then(() => {
                        setStats((prev: any) => ({
                          ...prev,
                          pendientes: prev.pendientes.filter(
                            (x: any) => x.grado !== p.grado
                          ),
                        }))
                      })
                    }}
                  >
                    Ignorar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Reportes */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart2 className="h-5 w-5" />
            Reportes
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700"
          >
            <a href="/api/docente/reportes?formato=excel">
              📥 Exportar Excel
            </a>
          </Button>

          <Button
            asChild
            variant="destructive"
          >
            <a
              href="/api/docente/reportes?formato=pdf"
              target="_blank"
            >
              📄 Exportar PDF
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Accesos rápidos */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Accesos rápidos
          </h2>

          <p className="text-sm text-muted-foreground">
            Gestiona tu espacio docente rápidamente
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => {
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <Card className="group h-full border transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Stats */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Estadísticas
          </h2>

          <p className="text-sm text-muted-foreground">
            Resumen general de tu actividad
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Planificaciones
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats?.totalPlanificaciones || 0}
              </h3>
            </CardContent>
          </Card>
          {stats?.recientes?.length > 0 && (
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>📝 Últimas Planificaciones</CardTitle>
              <Link href="/admin/planificaciones"><Button variant="link" size="sm">Ver todas →</Button></Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.recientes.map((r: any) => (
                  <div key={r.slug} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{r.tema}</p>
                      <p className="text-xs text-muted-foreground">{r.materia} · {r.grado?.replace('-', ' ')}</p>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/dashboard/${r.nivel || 'nivel-secundario'}/${r.grado}/${r.slug}`}>
                        <Button variant="ghost" size="sm">👁️</Button>
                      </Link>
                      <Link href={`/admin/planificaciones/editar/${r.materia}/${r.slug}`}>
                        <Button variant="ghost" size="sm">✏️</Button>
                      </Link>
                      <Link href={`/admin/planificaciones/clonar/${r.slug}`}>
                        <Button variant="ghost" size="sm">📋</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Materias
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats?.porMateria?.length || 0}
              </h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Grados
              </p>

              <h3 className="mt-2 text-4xl font-bold">
                {stats?.porGrado?.length || 0}
              </h3>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Estudiantes
              </p>

              <h3 className="mt-2 flex items-center gap-2 text-4xl font-bold">
                <Users className="h-7 w-7 text-primary" />
                {stats?.totalEstudiantes || 0}
              </h3>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}