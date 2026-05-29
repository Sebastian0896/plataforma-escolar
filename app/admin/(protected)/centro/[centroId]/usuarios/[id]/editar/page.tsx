// app/admin/(protected)/centro/[centroId]/usuarios/[id]/editar/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Componentes de Shadcn UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, X, ChevronLeft, User, School, BookOpen } from "lucide-react"

// --- Datos Maestros ---
const MATERIAS_DISPONIBLES = [
  { slug: 'frances', label: 'Francés' },
  { slug: 'ingles', label: 'Inglés' },
  { slug: 'lengua-espanola', label: 'Lengua Española' },
  { slug: 'matematica', label: 'Matemática' },
  { slug: 'ciencias-sociales', label: 'Ciencias Sociales' },
  { slug: 'ciencias-naturales', label: 'Ciencias Naturales' },
  { slug: 'educacion-fisica', label: 'Educación Física' },
  { slug: 'artistica', label: 'Artística' },
]

const MATERIAS_POR_CATEGORIA: Record<string, string[]> = {
  idiomas: ['frances', 'ingles'],
  'materias-basicas': ['lengua-espanola', 'matematica', 'ciencias-sociales', 'ciencias-naturales'],
  'otras-materias': ['educacion-fisica', 'artistica'],
}

const GRADOS: Record<string, string[]> = {
  'nivel-primario-primer-ciclo': ['1ro-primaria', '2do-primaria', '3ro-primaria'],
  'nivel-primario-segundo-ciclo': ['4to-primaria', '5to-primaria', '6to-primaria'],
  'nivel-secundario-primer-ciclo': ['1ro-secundaria', '2do-secundaria', '3ro-secundaria'],
  'nivel-secundario-segundo-ciclo': ['4to-secundaria', '5to-secundaria', '6to-secundaria'],
}

// Roles permitidos para admin_centro
const ROLES_PERMITIDOS_ADMIN_CENTRO = [
  { value: 'estudiante', label: 'Estudiante' },
  { value: 'docente', label: 'Docente' },
  { value: 'admin_centro', label: 'Admin de Centro' },
]

export default function EditarUsuarioPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  
  const centroId = params.centroId as string
  const usuarioId = params.id as string
  
  const userRole = session?.user?.role
  const isAdminCentro = userRole === 'admin_centro'

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [centroInfo, setCentroInfo] = useState<{ nombre: string; codigo: string } | null>(null)

  const [form, setForm] = useState({
    nombre: '', email: '', password: '', genero: '', rol: '',
    centroId: '',
    nivel: '', ciclo: '', grado: '', rne: '',
    categoriaDocente: '',
    materias: [] as string[],
    niveles: [] as string[],
    ciclos: {} as Record<string, string>,
    grados: [] as string[],
  })

  // Carga inicial de datos
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ✅ API CORRECTA
        const res = await fetch(`/api/admin/centro/${centroId}/usuarios/${usuarioId}`)
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Usuario no encontrado')
        }
        const data = await res.json()

        // Cargar información del centro (para mostrar)
        const resCentro = await fetch(`/api/centros/${centroId}`)
        if (resCentro.ok) {
          const centroData = await resCentro.json()
          setCentroInfo({ nombre: centroData.nombre, codigo: centroData.codigo })
        }

        setForm({
          nombre: data.nombre || '',
          email: data.email || '',
          password: '',
          genero: data.genero || '',
          rol: data.rol || '',
          centroId: data.centroId || centroId,
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: data.grado || '',
          rne: data.rne || '',
          categoriaDocente: data.categoriaDocente || '',
          materias: data.materias || [],
          niveles: data.niveles || [],
          ciclos: data.ciclos || {},
          grados: data.grados || [],
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    if (centroId && usuarioId) {
      fetchUserData()
    }
  }, [centroId, usuarioId])

  const toggleArray = (campo: 'niveles' | 'materias' | 'grados', valor: string) => {
    setForm(prev => ({
      ...prev,
      [campo]: prev[campo].includes(valor)
        ? prev[campo].filter(v => v !== valor)
        : [...prev[campo], valor]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const body: any = { 
        ...form, 
        centroId: centroId,
      }
      if (!body.password) delete body.password

      // ✅ API CORRECTA
      const res = await fetch(`/api/admin/centro/${centroId}/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al actualizar el perfil')
      }

      router.push(`/admin/centro/${centroId}/usuarios`)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="-ml-2">
            <ChevronLeft className="h-4 w-4 mr-1" /> Volver
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Editar Perfil</h1>
          <p className="text-muted-foreground text-sm">
            {isAdminCentro && centroInfo && `Centro: ${centroInfo.nombre} (${centroInfo.codigo})`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card: Información Principal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Datos del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input id="nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass">Contraseña (opcional)</Label>
              <Input id="pass" type="password" placeholder="Dejar en blanco para mantener" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Género</Label>
              <Select value={form.genero} onValueChange={(v) => setForm({...form, genero: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Card: Rol */}
        <Card className="border-blue-100 dark:border-blue-900 bg-blue-50/20">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Rol del Sistema</Label>
              <Select 
                value={form.rol} 
                onValueChange={(v) => setForm({...form, rol: v})}
              >
                <SelectTrigger className="bg-white dark:bg-slate-950">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES_PERMITIDOS_ADMIN_CENTRO.map(rol => (
                    <SelectItem key={rol.value} value={rol.value}>
                      {rol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {isAdminCentro && "Nota: Solo puedes asignar roles de Estudiante, Docente o Admin de Centro"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Estudiante */}
        {form.rol === 'estudiante' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><School className="h-5 w-5" /> Datos Estudiantiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Grado</Label>
                <Input 
                  value={form.grado || ''} 
                  onChange={(e) => setForm({...form, grado: e.target.value})}
                  placeholder="Ej: 1ro-secundaria"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sección: Docente */}
        {form.rol === 'docente' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><BookOpen className="h-5 w-5" /> Carga Académica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select value={form.categoriaDocente} onValueChange={(v) => setForm({...form, categoriaDocente: v, materias: []})}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar categoría" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idiomas">Idiomas</SelectItem>
                      <SelectItem value="materias-basicas">Materias Básicas</SelectItem>
                      <SelectItem value="otras-materias">Otras Materias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Niveles que atiende</Label>
                  <div className="flex gap-4 pt-2">
                    {['nivel-primario', 'nivel-secundario'].map(n => (
                      <div key={n} className="flex items-center space-x-2">
                        <Checkbox 
                          id={n} 
                          checked={form.niveles.includes(n)} 
                          onCheckedChange={() => toggleArray('niveles', n)} 
                        />
                        <label htmlFor={n} className="text-sm cursor-pointer">{n.includes('primario') ? 'Primario' : 'Secundario'}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {form.categoriaDocente && (
                <div className="space-y-3">
                  <Label>Materias Asignadas</Label>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAS_DISPONIBLES
                      .filter(m => MATERIAS_POR_CATEGORIA[form.categoriaDocente]?.includes(m.slug))
                      .map(m => (
                        <Badge
                          key={m.slug}
                          variant={form.materias.includes(m.slug) ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1"
                          onClick={() => toggleArray('materias', m.slug)}
                        >
                          {m.label}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Grados que atiende</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria', '1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria'].map(g => (
                    <div key={g} className="flex items-center space-x-2">
                      <Checkbox 
                        id={g} 
                        checked={form.grados.includes(g)} 
                        onCheckedChange={() => toggleArray('grados', g)} 
                      />
                      <label htmlFor={g} className="text-xs cursor-pointer">{g.replace('-', ' ')}</label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={saving}>
            <X className="h-4 w-4 mr-2" /> Cancelar
          </Button>
          <Button type="submit" disabled={saving} className="min-w-[150px]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  )
}