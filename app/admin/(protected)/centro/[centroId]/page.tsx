// app/admin/(protected)/centro/[centroId]/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, School, ShieldCheck, Building, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ centroId: string }>
}

export default async function CentroDashboardPage({ params }: Props) {
  const session = await auth()
  const { centroId } = await params

  if (session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  if (session.user.centroId !== centroId) {
    redirect('/dashboard')
  }

  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })

  if (!centro) {
    redirect('/dashboard')
  }

  const [totalUsuarios, totalDocentes, totalEstudiantes, totalAdmin] = await Promise.all([
    prisma.usuario.count({ where: { centroId, activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'docente', activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'estudiante', activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'admin_centro', activo: true } }),
  ])

  return (
    <div className="space-y-8">
      {/* Info del centro */}
      <Card className="border shadow-sm bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{centro.nombre}</h2>
                <p className="text-sm text-muted-foreground">
                  Plan: <span className="font-medium capitalize">{centro.plan || 'Gratis'}</span>
                </p>
              </div>
            </div>
            <Link href={`/admin/centro/${centroId}/info`}>
              <Button variant="outline" size="sm" className="rounded-xl">
                <Settings className="mr-2 h-4 w-4" />
                Editar Centro
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{totalUsuarios}</span>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <Link 
              href={`/admin/centro/${centroId}/usuarios`}
              className="text-xs text-primary mt-2 inline-block hover:underline"
            >
              Ver todos →
            </Link>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Docentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">{totalDocentes}</span>
              <GraduationCap className="h-5 w-5 text-blue-500" />
            </div>
            <Link 
              href={`/admin/centro/${centroId}/usuarios?rol=docente`}
              className="text-xs text-primary mt-2 inline-block hover:underline"
            >
              Ver docentes →
            </Link>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-emerald-600">{totalEstudiantes}</span>
              <School className="h-5 w-5 text-emerald-500" />
            </div>
            <Link 
              href={`/admin/centro/${centroId}/usuarios?rol=estudiante`}
              className="text-xs text-primary mt-2 inline-block hover:underline"
            >
              Ver estudiantes →
            </Link>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-purple-600">{totalAdmin}</span>
              <ShieldCheck className="h-5 w-5 text-purple-500" />
            </div>
            <Link 
              href={`/admin/centro/${centroId}/usuarios?rol=admin_centro`}
              className="text-xs text-primary mt-2 inline-block hover:underline"
            >
              Ver administrativos →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href={`/admin/centro/${centroId}/usuarios/nuevo`}>
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Users className="mr-2 h-4 w-4" />
                Crear nuevo usuario
              </Button>
            </Link>
            <Link href={`/admin/centro/${centroId}/info`}>
              <Button variant="outline" className="w-full justify-start rounded-xl">
                <Building className="mr-2 h-4 w-4" />
                Editar información del centro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}