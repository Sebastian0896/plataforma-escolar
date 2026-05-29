// app/admin/(protected)/centro/[centroId]/usuarios/[id]/editar/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, X, ChevronLeft, User, School, BookOpen } from "lucide-react"

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

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '', email: '', password: '', genero: '', rol: '',
    grado: '', rne: '',
    categoriaDocente: '',
    materias: [] as string[],
    niveles: [] as string[],
    grados: [] as string[],
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('🔍 Fetching usuario:', usuarioId, 'centro:', centroId)
        const res = await fetch(`/api/admin/centro/${centroId}/usuarios/${usuarioId}`)
        
        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Usuario no encontrado')
        }
        
        const data = await res.json()
        console.log('📦 Datos recibidos:', data)

        setForm({
          nombre: data.nombre || '',
          email: data.email || '',
          password: '',
          genero: data.genero || '',
          rol: data.rol || '',
          grado: data.grado || '',
          rne: data.rne || '',
          categoriaDocente: data.categoriaDocente || '',
          materias: data.materias || [],
          niveles: data.niveles || [],
          grados: data.grados || [],
        })
      } catch (err: any) {
        console.error('❌ Error:', err)
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
        nombre: form.nombre,
        email: form.email,
        rol: form.rol,
        genero: form.genero,
        grado: form.grado,
        rne: form.rne,
        categoriaDocente: form.categoriaDocente,
        materias: form.materias,
        niveles: form.niveles,
        grados: form.grados,
      }
      if (form.password) body.password = form.password

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
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editar Usuario</h1>
          <p className="text-muted-foreground text-sm">Modifica la información del usuario</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Datos del Usuario</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nombre Completo</Label>
              <Input value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Correo Electrónico</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Contraseña (opcional)</Label>
              <Input type="password" placeholder="Dejar en blanco para mantener" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
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

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={form.rol} onValueChange={(v) => setForm({...form, rol: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ROLES_PERMITIDOS_ADMIN_CENTRO.map(rol => (
                    <SelectItem key={rol.value} value={rol.value}>{rol.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {form.rol === 'estudiante' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><School className="h-5 w-5" /> Datos Estudiantiles</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Grado</Label>
                <Input value={form.grado || ''} onChange={(e) => setForm({...form, grado: e.target.value})} placeholder="Ej: 1ro-secundaria" />
              </div>
            </CardContent>
          </Card>
        )}

        {form.rol === 'docente' && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Carga Académica</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select value={form.categoriaDocente} onValueChange={(v) => setForm({...form, categoriaDocente: v, materias: []})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idiomas">Idiomas</SelectItem>
                    <SelectItem value="materias-basicas">Materias Básicas</SelectItem>
                    <SelectItem value="otras-materias">Otras Materias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.categoriaDocente && (
                <div className="space-y-2">
                  <Label>Materias</Label>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAS_DISPONIBLES
                      .filter(m => MATERIAS_POR_CATEGORIA[form.categoriaDocente]?.includes(m.slug))
                      .map(m => (
                        <Badge
                          key={m.slug}
                          variant={form.materias.includes(m.slug) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleArray('materias', m.slug)}
                        >
                          {m.label}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Niveles</Label>
                <div className="flex gap-4">
                  {['nivel-primario', 'nivel-secundario'].map(n => (
                    <div key={n} className="flex items-center space-x-2">
                      <Checkbox checked={form.niveles.includes(n)} onCheckedChange={() => toggleArray('niveles', n)} />
                      <label className="text-sm">{n === 'nivel-primario' ? 'Primario' : 'Secundario'}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Grados</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria', '1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria'].map(g => (
                    <div key={g} className="flex items-center space-x-2">
                      <Checkbox checked={form.grados.includes(g)} onCheckedChange={() => toggleArray('grados', g)} />
                      <label className="text-xs">{g.replace('-', ' ')}</label>
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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <X className="h-4 w-4 mr-2" /> Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}