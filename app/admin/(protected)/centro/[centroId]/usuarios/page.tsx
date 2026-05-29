// app/admin/(protected)/centro/[centroId]/usuarios/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Edit, UserPlus, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ centroId: string }>
  searchParams: Promise<{ rol?: string }>
}

const roleLabels: Record<string, string> = {
  docente: 'Docentes',
  estudiante: 'Estudiantes',
  admin_centro: 'Administrativos',
}

const roleBadge: Record<string, string> = {
  docente: 'bg-blue-100 text-blue-700',
  estudiante: 'bg-emerald-100 text-emerald-700',
  admin_centro: 'bg-purple-100 text-purple-700',
}

export default async function CentroUsuariosPage({ params, searchParams }: Props) {
  const session = await auth()
  const { centroId } = await params
  const { rol } = await searchParams

  if (session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  if (session.user.centroId !== centroId) {
    redirect('/dashboard')
  }

  // Construir el filtro WHERE
  const whereCondition: any = { 
    centroId, 
    activo: true 
  }
  
  // ✅ Filtrar por rol si viene en la URL
  if (rol && ['docente', 'estudiante', 'admin_centro'].includes(rol)) {
    whereCondition.rol = rol
  }

  const usuarios = await prisma.usuario.findMany({
    where: whereCondition,
    orderBy: { createdAt: 'desc' }
  })

  const titulo = rol ? roleLabels[rol] || 'Usuarios' : 'Todos los Usuarios'
  const descripcion = rol 
    ? `Lista de ${titulo.toLowerCase()} del centro` 
    : 'Gestiona todos los usuarios de tu centro educativo'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {rol && (
            <Link href={`/admin/centro/${centroId}/usuarios`}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{titulo}</h1>
            <p className="text-muted-foreground text-sm">{descripcion}</p>
          </div>
        </div>
        <Link href={`/admin/centro/${centroId}/usuarios/nuevo`}>
          <Button className="rounded-xl">
            <UserPlus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </Link>
      </div>

      {usuarios.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex h-64 items-center justify-center">
            <p className="text-muted-foreground">No hay usuarios registrados</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usuarios.map((usuario) => (
            <Card key={usuario.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                      {usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{usuario.nombre}</h3>
                      <p className="text-xs text-muted-foreground">{usuario.email}</p>
                      <Badge className={`mt-1 text-xs ${roleBadge[usuario.rol] || 'bg-gray-100'}`}>
                        {usuario.rol === 'admin_centro' ? 'Admin Centro' : usuario.rol}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Link href={`/admin/centro/${centroId}/usuarios/${usuario.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/centro/${centroId}/usuarios/${usuario.id}/editar`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}