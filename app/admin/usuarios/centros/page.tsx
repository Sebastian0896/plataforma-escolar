import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Centro from '@/lib/models/Centro'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'

// Shadcn UI & Icons
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  School, 
  Users, 
  ChevronRight, 
  Plus, 
  ArrowLeft,
  LayoutGrid
} from "lucide-react"

export const metadata = { title: 'Usuarios por Centro | Admin' }

export default async function CentrosUsuariosPage() {
  const session = await auth()
  
  const rolesPermitidos = ['admin', 'superadmin', 'admin_centro']
  if (!session || !rolesPermitidos.includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  await connectDB()

  // 1. Filtro de seguridad por rol
  const filter: any = { activo: true }
  if (session.user?.role === 'admin_centro') {
    filter._id = session.user.centroId
  }

  // 2. Consulta de Centros
  const centros = await Centro.find(filter).select('nombre codigo').lean()

  // 3. Optimización: Conteo agrupado en una sola consulta
  const conteos = await Usuario.aggregate([
    { $match: { activo: true, centroId: { $in: centros.map(c => c._id) } } },
    { $group: { _id: '$centroId', total: { $sum: 1 } } }
  ])

  // Mapear conteos a un objeto para acceso rápido
  const conteoMap = conteos.reduce((acc: any, curr: any) => {
    acc[curr._id.toString()] = curr.total
    return acc
  }, {})

  const centrosConCount = centros.map((c: any) => ({
    ...c,
    total: conteoMap[c._id.toString()] || 0
  }))

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Header con navegación */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Link href="/admin/usuarios" className="hover:text-primary transition-colors text-sm">Usuarios</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sm font-medium text-foreground">Directorios por Centro</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <LayoutGrid className="h-8 w-8 text-blue-600" />
            Usuarios por Centro
          </h1>
          <p className="text-muted-foreground">
            Visualiza la carga de usuarios activos distribuida por institución educativa.
          </p>
        </div>

        <div className="flex items-center gap-3">
           <Button variant="outline" aschild="true" size="lg">
            <Link className='flex flex-1' href="/admin/usuarios">
               <ArrowLeft className="mr-2 h-4 w-4" /> Ver Listado General
            </Link>
          </Button>
          <Button aschild="true" size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Link className='flex flex-1' href="/admin/usuarios/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Grid de Centros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {centrosConCount.map((c: any) => (
          <Link key={c._id} href={`/admin/usuarios/centros/${c._id}`}>
            <Card className="group relative h-full transition-all hover:ring-2 hover:ring-blue-500/20 hover:shadow-xl border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <School className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="font-mono text-lg px-3 py-1">
                    {c.total}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <CardTitle className="text-base leading-tight group-hover:text-blue-600 transition-colors">
                    {c.nombre}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1 font-mono uppercase">
                    Cód: {c.codigo}
                  </p>
                </div>

                <div className="pt-4 flex items-center text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar usuarios <ChevronRight className="ml-1 h-3 w-3" />
                </div>
              </CardContent>

              {/* Decoración visual sutil */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State si no hay centros */}
      {centrosConCount.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-3xl">
          <School className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No se encontraron centros</h3>
          <p className="text-muted-foreground">Parece que no tienes centros asignados o activos.</p>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground bg-muted/30 p-4 rounded-xl border border-dashed">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span>{centrosConCount.length} Instituciones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span>Total Usuarios: {centrosConCount.reduce((a, b) => a + b.total, 0)}</span>
        </div>
      </div>
    </div>
  )
}