import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

// Shadcn UI & Icons
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  ChevronRight, 
  UserCircle, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck,
  ClipboardList,
  Building2,
  Users2
} from "lucide-react"

type Params = Promise<{ centroId: string }>

export default async function CategoriasPorCentroPage({ params }: { params: Params }) {
  const session = await auth()
  
  const rolesPermitidos = ['admin', 'superadmin', 'admin_centro']
  if (!session || !rolesPermitidos.includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  const { centroId } = await params
  
  // Consulta del Centro con Prisma
  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })
  
  if (!centro) redirect('/admin/usuarios/centros')

  // Agregación con Prisma: Agrupamos por el campo 'rol'
  const categoriasRaw = await prisma.usuario.groupBy({
    by: ['rol'],
    where: { 
      centroId: centro.id, 
      activo: true 
    },
    _count: {
      id: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    }
  })

  // Adaptamos el formato de Prisma al que espera el componente (usando _id para mantener compatibilidad con tu lógica de UI)
  const categorias = categoriasRaw.map(c => ({
    _id: c.rol,
    total: c._count.id
  }))

  // Mapeo de iconos y colores por rol
  const configRoles: Record<string, { icon: any, color: string, label: string }> = {
    admin: { icon: ShieldCheck, color: 'text-red-600 bg-red-50', label: 'Administradores' },
    admin_centro: { icon: Building2, color: 'text-blue-600 bg-blue-50', label: 'Directivos' },
    docente: { icon: GraduationCap, color: 'text-green-600 bg-green-50', label: 'Cuerpo Docente' },
    estudiante: { icon: UserCircle, color: 'text-purple-600 bg-purple-50', label: 'Estudiantes' },
    coordinador: { icon: ClipboardList, color: 'text-orange-600 bg-orange-50', label: 'Coordinadores' },
    tecnico_distrital: { icon: Briefcase, color: 'text-teal-600 bg-teal-50', label: 'Técnicos' },
    superadmin: { icon: ShieldCheck, color: 'text-yellow-600 bg-yellow-50', label: 'Superusuario' },
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-500 px-4 sm:px-0">
      
      {/* Breadcrumbs & Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/admin/usuarios" className="hover:text-primary transition-colors">Usuarios</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/admin/usuarios/centros" className="hover:text-primary transition-colors">Centros</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{centro.nombre}</span>
      </nav>

      {/* Header Sección */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="rounded-full shrink-0">
            <Link href="/admin/usuarios/centros">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{centro.nombre}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="font-mono">{centro.codigo}</Badge>
              <span className="text-muted-foreground text-sm">•</span>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users2 className="h-3.5 w-3.5" />
                Personal clasificado por roles
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Grid de Categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((c) => {
          const config = configRoles[c._id] || { icon: UserCircle, color: 'text-gray-600 bg-gray-50', label: c._id }
          const Icon = config.icon

          return (
            <Link
              key={c._id}
              href={`/admin/usuarios/centros/${centroId}/${c._id}`}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-md overflow-hidden relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className={`p-3 rounded-xl transition-colors ${config.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-4xl font-black tracking-tighter text-slate-200 group-hover:text-primary/20 transition-colors">
                    {c.total}
                  </span>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg leading-none group-hover:text-primary transition-colors">
                      {config.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ver {c.total} {c.total === 1 ? 'usuario registrado' : 'usuarios registrados'}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center text-xs font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    Acceder al listado <ChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Fallback si no hay usuarios en el centro */}
      {categorias.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
          <div className="bg-background p-4 rounded-full shadow-sm mb-4">
            <Users2 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No hay usuarios activos</h3>
          <p className="text-muted-foreground mt-2">Este centro educativo aún no tiene personal registrado o activo.</p>
          <Button asChild className="mt-6" variant="default">
            <Link href="/admin/usuarios/nuevo">Registrar Primer Usuario</Link>
          </Button>
        </div>
      )}
    </div>
  )
}