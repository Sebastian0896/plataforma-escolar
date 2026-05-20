// app/admin/sugerencias/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface Sugerencia {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  estado: string
  usuarioNombre: string
  usuarioRol: string
  createdAt: string
}

export default function AdminSugerenciasPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([])
  const [loading, setLoading] = useState(true)
  const [estadoActivo, setEstadoActivo] = useState('pendiente')

  // ✅ Verificar permisos
  const rol = session?.user?.role
  const esAdmin = rol === 'admin' || rol === 'superadmin'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }
    if (status === 'authenticated' && !esAdmin) {
      router.push('/dashboard')
      return
    }
  }, [status, esAdmin, router])

  const cargarSugerencias = async (estado: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/sugerencias?estado=${estado}`)
      if (!res.ok) throw new Error('Error al cargar')
      const data = await res.json()
      setSugerencias(data.sugerencias || [])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al cargar sugerencias')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (esAdmin) {
      cargarSugerencias(estadoActivo)
    }
  }, [estadoActivo, esAdmin])

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      const res = await fetch('/api/sugerencias', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, estado: nuevoEstado }),
      })
      if (res.ok) {
        toast.success('Estado actualizado')
        cargarSugerencias(estadoActivo)
      }
    } catch (error) {
      toast.error('Error al actualizar')
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'bug': return '🐛'
      case 'mejora': return '💡'
      case 'nueva': return '✨'
      default: return '📝'
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700"><Clock className="h-3 w-3 mr-1" /> Pendiente</Badge>
      case 'revisada':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Revisada</Badge>
      case 'implementada':
        return <Badge variant="outline" className="bg-green-50 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Implementada</Badge>
      case 'rechazada':
        return <Badge variant="outline" className="bg-red-50 text-red-700"><XCircle className="h-3 w-3 mr-1" /> Rechazada</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  // ✅ Mostrar loading mientras verifica sesión
  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // ✅ Si no es admin, no mostrar nada (redirige)
  if (!esAdmin) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Sugerencias de usuarios</h1>
        <p className="text-muted-foreground">Gestiona el feedback de los usuarios</p>
      </div>

      <Tabs value={estadoActivo} onValueChange={setEstadoActivo}>
        <TabsList>
          <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
          <TabsTrigger value="revisada">Revisadas</TabsTrigger>
          <TabsTrigger value="implementada">Implementadas</TabsTrigger>
          <TabsTrigger value="rechazada">Rechazadas</TabsTrigger>
        </TabsList>

        <TabsContent value={estadoActivo} className="mt-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : sugerencias.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No hay sugerencias {estadoActivo === 'pendiente' ? 'pendientes' : `con estado ${estadoActivo}`}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {sugerencias.map((sug) => (
                <Card key={sug.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{getTipoIcon(sug.tipo)}</span>
                          <h3 className="font-semibold">{sug.titulo}</h3>
                          {getEstadoBadge(sug.estado)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{sug.descripcion}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{sug.usuarioNombre}</span>
                          <span className="capitalize">{sug.usuarioRol}</span>
                          <span>{new Date(sug.createdAt).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                      {sug.estado === 'pendiente' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => actualizarEstado(sug.id, 'revisada')}>
                            Revisar
                          </Button>
                          <Button size="sm" variant="default" onClick={() => actualizarEstado(sug.id, 'implementada')}>
                            Implementar
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => actualizarEstado(sug.id, 'rechazada')}>
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}