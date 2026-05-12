import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

// Shadcn UI & Icons
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  Edit3, 
  UserMinus,
  Search,
  MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Params = Promise<{ centroId: string; rol: string }>

export default async function UsuariosPorCentroRolPage({ 
  params, 
  searchParams 
}: { 
  params: Params; 
  searchParams: Promise<{ page?: string }> 
}) {
  const session = await auth()
  
  if (!session || !['admin', 'superadmin', 'admin_centro'].includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  const { centroId, rol } = await params
  const sp = await searchParams
  const page = parseInt(sp.page || '1')
  const limit = 12 
  const skip = (page - 1) * limit

  // 1. Consulta del Centro
  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })
  
  if (!centro) notFound()

  // 2. Consulta de Usuarios y Conteo (Paginado)
  const whereFilter = { 
    centroId: centro.id, 
    rol: rol as any, // Cast a any si el enum de Prisma no coincide exactamente con el string
    activo: true 
  }

  const [usuarios, total] = await Promise.all([
    prisma.usuario.findMany({
      where: whereFilter,
      orderBy: { nombre: 'asc' },
      skip: skip,
      take: limit,
    }),
    prisma.usuario.count({
      where: whereFilter
    }),
  ])

  const coloresRol: Record<string, string> = {
    admin: 'bg-red-50 text-red-700 border-red-200',
    admin_centro: 'bg-blue-50 text-blue-700 border-blue-200',
    docente: 'bg-green-50 text-green-700 border-green-200',
    estudiante: 'bg-purple-50 text-purple-700 border-purple-200',
    coordinador: 'bg-orange-50 text-orange-700 border-orange-200',
  }

  return (
    <div className="space-y-8 pb-12 px-4 sm:px-0">
      {/* Cabecera Dinámica */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
            <Link href={`/admin/usuarios/centros/${centroId}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a {centro.nombre}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight capitalize flex items-center gap-3">
            {rol.replace('_', ' ')}s
            <Badge variant="secondary" className="text-lg px-2 py-0">
              {total}
            </Badge>
          </h1>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <Search className="h-3.5 w-3.5" /> Listado filtrado por institución y cargo
          </p>
        </div>

        <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/usuarios/nuevo">
            + Añadir {rol.replace('_', ' ')}
          </Link>
        </Button>
      </div>

      {/* Grid de Usuarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {usuarios.map((u) => (
          <Card key={u.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 border shadow-sm">
                  {u.nombre?.charAt(0).toUpperCase()}
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/usuarios/editar/${u.id}`}>
                        <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <UserMinus className="mr-2 h-4 w-4" /> Desactivar Usuario
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white truncate" title={u.nombre || ''}>
                  {u.nombre}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                  <Mail className="h-3 w-3" /> {u.email}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {u.grado && (
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-md">
                    <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                    <span className="uppercase">{u.grado.replace('-', ' ')}</span>
                  </div>
                )}
                {u.categoriaDocente && (
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-md">
                    <BookOpen className="h-3.5 w-3.5 text-green-500" />
                    <span className="capitalize">{u.categoriaDocente.replace('-', ' ')}</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="bg-slate-50/50 dark:bg-slate-900/50 border-t py-3 flex justify-between items-center">
              <Badge variant="outline" className={`text-[10px] ${coloresRol[u.rol] || ''}`}>
                {u.rol.replace('_', ' ')}
              </Badge>
              <Link 
                href={`/admin/usuarios/editar/${u.id}`} 
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
              >
                Gestionar
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {usuarios.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed">
          <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold">Sin resultados</h2>
          <p className="text-muted-foreground mt-1">No se encontraron {rol}s activos en este centro.</p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href={`/admin/usuarios/centros/${centroId}`}>Ver otras categorías</Link>
          </Button>
        </div>
      )}

      {/* Paginación */}
      {total > limit && (
        <div className="mt-10">
          <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
        </div>
      )}
    </div>
  )
}