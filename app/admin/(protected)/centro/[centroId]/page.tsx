// app/admin/(protected)/centro/[centroId]/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, School, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

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

  const [totalUsuarios, totalDocentes, totalEstudiantes, totalAdmin] = await Promise.all([
    prisma.usuario.count({ where: { centroId, activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'docente', activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'estudiante', activo: true } }),
    prisma.usuario.count({ where: { centroId, rol: 'admin_centro', activo: true } }),
  ])

  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel del Centro</h1>
        <p className="text-muted-foreground mt-1">
          {centro?.nombre} - Gestiona tu centro educativo
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/admin/centro/${centroId}/usuarios`}>
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{totalUsuarios}</span>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/admin/centro/${centroId}/usuarios?rol=docente`}>
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Docentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">{totalDocentes}</span>
                <GraduationCap className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/admin/centro/${centroId}/usuarios?rol=estudiante`}>
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-emerald-600">{totalEstudiantes}</span>
                <School className="h-5 w-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/admin/centro/${centroId}/usuarios?rol=admin_centro`}>
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Administrativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-purple-600">{totalAdmin}</span>
                <ShieldCheck className="h-5 w-5 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}