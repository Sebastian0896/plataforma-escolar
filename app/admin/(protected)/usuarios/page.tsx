// app/admin/usuarios/page.tsx

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import {
  Users,
  UserPlus,
  School,
  Filter,
  MoreHorizontal,
  Edit2,
  UserX,
  UserCheck,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function UsuariosPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    inactivos?: string
  }>
}) {
  const session = await auth()

  // =====================================================
  // PROTECCIÓN
  // =====================================================

  const rolesPermitidos = [
    'admin',
    'admin_centro',
    'superadmin',
  ]

  if (
    !session ||
    !rolesPermitidos.includes(
      session.user?.role || ''
    )
  ) {
    redirect('/dashboard')
  }

  const params = await searchParams

  const page = parseInt(
    params.page || '1'
  )

  const limit = 12

  const skip = (page - 1) * limit

  const mostrarInactivos =
    params.inactivos === 'true'

  // =====================================================
  // FILTRO
  // =====================================================

  const where: any = {
    activo: !mostrarInactivos,
  }

  // Admin centro → solo su centro
  if (
    session.user.role ===
    'admin_centro'
  ) {
    where.centroId =
      session.user.centroId
  }

  // =====================================================
  // CONSULTAS PRISMA
  // =====================================================

  const [usuarios, total] =
    await Promise.all([
      prisma.usuario.findMany({
        where,

        include: {
          centro: {
            select: {
              id: true,
              nombre: true,
              codigo: true,
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },

        skip,
        take: limit,
      }),

      prisma.usuario.count({
        where,
      }),
    ])

  // =====================================================
  // AGRUPAR POR CENTRO
  // =====================================================

  const agrupados = usuarios.reduce(
    (
      acc: Record<string, typeof usuarios>,
      u
    ) => {
      const centroKey =
        u.centro?.nombre ||
        'Personal sin Centro Asignado'

      if (!acc[centroKey]) {
        acc[centroKey] = []
      }

      acc[centroKey].push(u)

      return acc
    },
    {}
  )

  // =====================================================
  // VARIANTES DE ROL
  // =====================================================

  const variantesRol: Record<
    string,
    any
  > = {
    superadmin: 'destructive',
    admin: 'default',
    admin_centro: 'outline',
    docente: 'secondary',
    coordinador: 'secondary',
    estudiante: 'secondary',
  }

  return (
    <div className="space-y-8 pb-10">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-background p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Gestión de Usuarios
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            {mostrarInactivos
              ? 'Listado de cuentas suspendidas'
              : 'Cuentas activas en el sistema'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            asChild
            size="sm"
          >
            <Link href="/admin/usuarios/centros">
              <School className="mr-2 h-4 w-4" />
              Por Centro
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            size="sm"
          >
            <Link
              href={`?inactivos=${!mostrarInactivos}`}
            >
              <Filter className="mr-2 h-4 w-4" />

              {mostrarInactivos
                ? 'Ver Activos'
                : 'Ver Inactivos'}
            </Link>
          </Button>

          <Button
            asChild
            size="sm"
          >
            <Link href="/admin/usuarios/nuevo">
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* GRUPOS */}
      {/* ===================================================== */}

      {Object.entries(agrupados).map(
        ([centroNombre, users]) => (
          <section
            key={centroNombre}
            className="space-y-4"
          >
            {/* Header grupo */}
            <div className="flex items-center gap-3 px-1">
              <div className="h-8 w-1 rounded-full bg-primary" />

              <h2 className="text-lg font-bold tracking-tight">
                {centroNombre}
              </h2>

              <Badge
                variant="secondary"
                className="font-mono"
              >
                {users.length}
              </Badge>
            </div>

            {/* Grid usuarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {users.map((u) => (
                <Card
                  key={u.id}
                  className={`group overflow-hidden transition-all hover:shadow-md rounded-2xl ${
                    !u.activo
                      ? 'opacity-70'
                      : ''
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      {/* Left */}
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Avatar */}
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                          {u.nombre
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        {/* Datos */}
                        <div className="space-y-1 min-w-0">
                          <p className="font-semibold truncate">
                            {u.nombre}
                          </p>

                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {u.email}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-48"
                        >
                          <DropdownMenuLabel>
                            Acciones
                          </DropdownMenuLabel>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            asChild
                          >
                            <Link
                              href={`/admin/usuarios/editar/${u.id}`}
                              className="cursor-pointer"
                            >
                              <Edit2 className="mr-2 h-4 w-4" />
                              Editar Perfil
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className={
                              u.activo
                                ? 'text-red-600'
                                : 'text-green-600'
                            }
                          >
                            {u.activo ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                Desactivar
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activar
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Footer badges */}
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          variantesRol[
                            u.rol
                          ] || 'outline'
                        }
                        className="capitalize"
                      >
                        {u.rol?.replace(
                          '_',
                          ' '
                        )}
                      </Badge>

                      {u.grado && (
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase"
                        >
                          🎓{' '}
                          {u.grado.replace(
                            '-',
                            ' '
                          )}
                        </Badge>
                      )}

                      {u.centro?.codigo && (
                        <Badge
                          variant="secondary"
                          className="text-[10px]"
                        >
                          🏫{' '}
                          {u.centro.codigo}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      )}

      {/* ===================================================== */}
      {/* EMPTY STATE */}
      {/* ===================================================== */}

      {usuarios.length === 0 && (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4 opacity-70">
              👥
            </div>

            <h3 className="text-lg font-bold">
              No hay usuarios
            </h3>

            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Todavía no existen usuarios
              registrados para este filtro.
            </p>
          </CardContent>
        </Card>
      )}

      {/* ===================================================== */}
      {/* PAGINACIÓN */}
      {/* ===================================================== */}

      {total > limit && (
        <div className="pt-6 border-t">
          <PaginacionServer
            totalPaginas={Math.ceil(
              total / limit
            )}
            paginaActual={page}
          />
        </div>
      )}
    </div>
  )
}