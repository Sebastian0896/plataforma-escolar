import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import {
  Badge,
} from '@/components/ui/badge'

type Params = Promise<{ id: string }>

export default async function UsuariosPorCentroPage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Promise<{ page?: string }>
}) {
  const session = await auth()

  if (session?.user?.role !== 'superadmin') {
    redirect('/dashboard')
  }

  const { id } = await params
  const sp = await searchParams

  const page = parseInt(sp.page || '1')
  const limit = 9
  const skip = (page - 1) * limit

  // Obtener centro con Prisma
  const centro = await prisma.centro.findUnique({
    where: { id },
    select: { id: true, nombre: true, codigo: true },
  })

  if (!centro) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Centro no encontrado</p>
      </div>
    )
  }

  // Obtener usuarios y total con Prisma
  const [usuarios, total] = await Promise.all([
    prisma.usuario.findMany({
      where: {
        centroId: id,
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }),
    prisma.usuario.count({
      where: {
        centroId: id,
        activo: true,
      },
    }),
  ])

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link
            href={`/admin/centros/${id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← {centro.nombre}
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Usuarios
          </h1>

          <p className="text-sm text-muted-foreground">
            {total} usuarios registrados
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {usuarios.map((u) => (
          <Card
            key={u.id}
            className="border-border/60 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl"
          >
            <CardContent className="p-5">
              
              <div className="flex items-start gap-4">
                
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted text-base font-semibold text-foreground">
                  {u.nombre?.charAt(0)?.toUpperCase()}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-2">
                  
                  <div className="space-y-1">
                    <h3 className="truncate text-sm sm:text-base font-semibold text-foreground">
                      {u.nombre}
                    </h3>

                    <p className="truncate text-xs sm:text-sm text-muted-foreground">
                      {u.email}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className="capitalize rounded-md px-2.5 py-0.5 text-xs font-medium"
                  >
                    {u.rol?.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {usuarios.length === 0 && (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            <div className="text-5xl mb-4">👥</div>

            <h3 className="text-lg font-semibold text-foreground">
              No hay usuarios
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Este centro todavía no tiene usuarios registrados.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {total > limit && (
        <div className="pt-2">
          <PaginacionServer
            totalPaginas={Math.ceil(total / limit)}
            paginaActual={page}
          />
        </div>
      )}
    </div>
  )
}