import { auth } from '@/auth'
import { redirect } from 'next/navigation'
// Importamos la instancia de prisma que configuraste anteriormente
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { School } from 'lucide-react' // Icono más profesional que el emoji

export default async function CentrosPage() {
  const session = await auth()

  // Verificación de rol
  if (session?.user?.role !== 'superadmin') {
    redirect('/dashboard')
  }

  // Consulta con Prisma
  // No necesitas connectDB(), Prisma gestiona la conexión automáticamente
  const centros = await prisma.centro.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Centros Educativos
          </h1>
          <p className="text-sm text-muted-foreground">
            {centros.length} centros registrados
          </p>
        </div>

        <Link href="/admin/centros/nuevo">
          <Button
            className="w-full sm:w-auto rounded-xl px-5 py-2.5"
            variant="secondary"
          >
            + Nuevo Centro
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {centros.map((centro) => (
          <Link
            key={centro.id} // Prisma usa 'id', no '_id'
            href={`/admin/usuarios/centros/${centro.id}`}
            className="group"
          >
            <Card className="h-full rounded-2xl border-border/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-5">
                
                {/* Top */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <School className="h-6 w-6" />
                  </div>

                  <Badge
                    variant={centro.activo ? 'default' : 'destructive'}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                      centro.activo
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : ''
                    }`}
                  >
                    {centro.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h2 className="line-clamp-2 text-base sm:text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {centro.nombre}
                  </h2>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Código: {centro.codigo}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Plan: <span className="capitalize">{centro.plan}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {centros.length === 0 && (
        <Card className="rounded-2xl border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <School className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No hay centros registrados
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Todavía no se han creado centros educativos en el sistema.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}