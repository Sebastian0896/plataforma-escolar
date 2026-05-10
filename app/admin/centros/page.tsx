import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

export default async function CentrosPage() {
  const session = await auth()

  if (session?.user?.role !== 'superadmin') {
    redirect('/dashboard')
  }

  await connectDB()

  const centros = await Centro.find({})
    .sort({ createdAt: -1 })
    .lean()

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
        {centros.map((c: any) => (
          <Link
            key={c._id}
            href={`/admin/centros/${c._id}`}
            className="group"
          >
            <Card className="h-full rounded-2xl border-border/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              
              <CardContent className="p-5">
                
                {/* Top */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-2xl">
                    🏫
                  </div>

                  <Badge
                    variant={c.activo ? 'default' : 'destructive'}
                    className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                      c.activo
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : ''
                    }`}
                  >
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  
                  <h2 className="line-clamp-2 text-base sm:text-lg font-semibold text-foreground transition-colors group-hover:text-muted-foreground">
                    {c.nombre}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Código: {c.codigo}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {centros.length === 0 && (
        <Card className="rounded-2xl border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-14 text-center">
            
            <div className="mb-4 text-5xl">
              🏫
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              No hay centros registrados
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Todavía no se han creado centros educativos.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}