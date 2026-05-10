import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import Link from 'next/link'
import PaginacionServer from '@/components/PaginacionServer'

// Componentes Shadcn UI (Asumiendo que los tienes instalados)
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Users, 
  UserPlus, 
  School, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  UserX, 
  UserCheck 
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function UsuariosPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string; inactivos?: string }> 
}) {
  const session = await auth()
  
  // 1. Protección de Ruta
  const rolesPermitidos = ['admin', 'admin_centro', 'superadmin']
  if (!session || !rolesPermitidos.includes(session.user?.role || '')) {
    redirect('/dashboard')
  }

  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 12 // Aumentado para mejor aprovechamiento de grid
  const skip = (page - 1) * limit
  const mostrarInactivos = params.inactivos === 'true'

  // 2. Lógica de Base de Datos
  await connectDB()
  const filter: any = { activo: !mostrarInactivos }
  if (session.user?.role === 'admin_centro') filter.centroId = session.user.centroId

  const [usuarios, total] = await Promise.all([
    Usuario.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('centroId', 'nombre codigo')
      .lean(),
    Usuario.countDocuments(filter),
  ])

  // 3. Agrupación y Mapeo
  const agrupados = usuarios.reduce((acc: Record<string, any>, u: any) => {
    const centroKey = u.centroId?.nombre || 'Personal sin Centro Asignado'
    if (!acc[centroKey]) acc[centroKey] = []
    acc[centroKey].push(u)
    return acc
  }, {})

  const variantesRol: Record<string, string> = {
    superadmin: 'destructive', // Rojo/Amarillo
    admin: 'default', // Negro/Azul
    admin_centro: 'outline',
    docente: 'secondary',
    coordinador: 'secondary',
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Principal */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-muted-foreground">
            {mostrarInactivos ? 'Listado de cuentas suspendidas' : 'Cuentas activas en el sistema'}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" asChild size="sm">
            <Link href="/admin/usuarios/centros">
              <School className="mr-2 h-4 w-4" /> Por Centro
            </Link>
          </Button>
          
          <Button variant="ghost" asChild size="sm">
            <Link href={`?inactivos=${!mostrarInactivos}`}>
              <Filter className="mr-2 h-4 w-4" />
              {mostrarInactivos ? 'Ver Activos' : 'Ver Inactivos'}
            </Link>
          </Button>

          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/usuarios/nuevo">
              <UserPlus className="mr-2 h-4 w-4" /> Nuevo Usuario
            </Link>
          </Button>
        </div>
      </div>

      {/* Renderizado de Grupos */}
      {Object.entries(agrupados).map(([centroNombre, users]: [string, any]) => (
        <section key={centroNombre} className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="h-8 w-1 bg-blue-500 rounded-full" />
            <h2 className="text-lg font-bold tracking-tight">{centroNombre}</h2>
            <Badge variant="secondary" className="font-mono">{users.length}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {users.map((u: any) => (
              <Card key={u._id} className={`group overflow-hidden transition-all hover:shadow-md ${!u.activo ? 'bg-slate-50 opacity-75' : ''}`}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xl">
                        {u.nombre?.charAt(0).toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold leading-none">{u.nombre}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">{u.email}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/usuarios/editar/${u._id}`} className="cursor-pointer">
                            <Edit2 className="mr-2 h-4 w-4" /> Editar Perfil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={u.activo ? "text-red-600" : "text-green-600"}>
                          {u.activo ? (
                            <><UserX className="mr-2 h-4 w-4" /> Desactivar</>
                          ) : (
                            <><UserCheck className="mr-2 h-4 w-4" /> Activar Cuenta</>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Badge variant={variantesRol[u.rol] as any || 'outline'} className="capitalize">
                      {u.rol?.replace('_', ' ')}
                    </Badge>
                    {u.grado && (
                      <Badge variant="outline" className="text-[10px] uppercase border-slate-300">
                        🎓 {u.grado.replace('-', ' ')}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Footer / Paginación */}
      <div className="pt-6 border-t">
        <PaginacionServer totalPaginas={Math.ceil(total / limit)} paginaActual={page} />
      </div>
    </div>
  )
}