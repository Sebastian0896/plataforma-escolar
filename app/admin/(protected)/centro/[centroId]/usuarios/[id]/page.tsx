// app/admin/(protected)/centro/[centroId]/usuarios/[id]/page.tsx
import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Edit, Mail, Calendar, User, GraduationCap, BookOpen } from 'lucide-react'

interface Props {
  params: Promise<{ centroId: string; id: string }>
}

const roleLabels: Record<string, { label: string; color: string }> = {
  docente: { label: 'Docente', color: 'bg-blue-100 text-blue-700' },
  estudiante: { label: 'Estudiante', color: 'bg-emerald-100 text-emerald-700' },
  admin_centro: { label: 'Administrativo', color: 'bg-purple-100 text-purple-700' },
}

export default async function VerUsuarioPage({ params }: Props) {
  const session = await auth()
  const { centroId, id } = await params

  if (session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  if (session.user.centroId !== centroId) {
    redirect('/dashboard')
  }

  const usuario = await prisma.usuario.findFirst({
    where: { id, centroId, activo: true }
  })

  if (!usuario) {
    notFound()
  }

  const roleInfo = roleLabels[usuario.rol] || { label: usuario.rol, color: 'bg-gray-100 text-gray-700' }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/admin/centro/${centroId}/usuarios`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Detalle de Usuario</h1>
            <p className="text-muted-foreground text-sm">
              Información completa del usuario
            </p>
          </div>
        </div>
        <Link href={`/admin/centro/${centroId}/usuarios/${id}/editar`}>
          <Button className="rounded-xl">
            <Edit className="mr-2 h-4 w-4" />
            Editar Usuario
          </Button>
        </Link>
      </div>

      {/* Info Personal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-bold text-primary">
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{usuario.nombre}</h2>
              <Badge className={`mt-1 ${roleInfo.color}`}>
                {roleInfo.label}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{usuario.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Registrado: {new Date(usuario.createdAt).toLocaleDateString('es-DO')}</span>
            </div>
            {usuario.genero && (
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="capitalize">Género: {usuario.genero}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información Académica - Estudiante */}
      {usuario.rol === 'estudiante' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Información Académica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {usuario.grado && (
                <div>
                  <p className="text-sm text-muted-foreground">Grado</p>
                  <p className="font-medium">{usuario.grado?.replace('-', ' ')}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Información Académica - Docente */}
      {usuario.rol === 'docente' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Carga Académica
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {usuario.categoriaDocente && (
              <div>
                <p className="text-sm text-muted-foreground">Categoría</p>
                <p className="font-medium capitalize">{usuario.categoriaDocente?.replace('-', ' ')}</p>
              </div>
            )}
            {usuario.materias && usuario.materias.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Materias</p>
                <div className="flex flex-wrap gap-2">
                  {usuario.materias.map((materia: string) => (
                    <Badge key={materia} variant="outline">
                      {materia.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {usuario.grados && usuario.grados.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Grados</p>
                <div className="flex flex-wrap gap-2">
                  {usuario.grados.map((grado: string) => (
                    <Badge key={grado} variant="outline">
                      {grado.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {usuario.niveles && usuario.niveles.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Niveles</p>
                <div className="flex flex-wrap gap-2">
                  {usuario.niveles.map((nivel: string) => (
                    <Badge key={nivel} variant="outline">
                      {nivel.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Metadatos</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground space-y-1">
          <p>ID: {usuario.id}</p>
          <p>Centro ID: {usuario.centroId}</p>
          <p>Última actualización: {new Date(usuario.updatedAt).toLocaleString('es-DO')}</p>
        </CardContent>
      </Card>
    </div>
  )
}