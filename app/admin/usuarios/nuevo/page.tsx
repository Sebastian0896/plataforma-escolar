'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, UserPlus, ArrowLeft } from "lucide-react"

// --- Constantes de configuración (se mantienen igual) ---
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

const GRADOS_PRIMER_CICLO_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria']
const GRADOS_SEGUNDO_CICLO_PRIMARIA = ['4to-primaria', '5to-primaria', '6to-primaria']
const GRADOS_PRIMER_CICLO_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria']
const GRADOS_SEGUNDO_CICLO_SECUNDARIA = ['4to-secundaria', '5to-secundaria', '6to-secundaria']

function getGradosPorCiclo(nivel: string, ciclo: string): string[] {
  if (!nivel || !ciclo) return []
  if (nivel === 'nivel-primario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_PRIMARIA : GRADOS_SEGUNDO_CICLO_PRIMARIA
  }
  if (nivel === 'nivel-secundario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_SECUNDARIA : GRADOS_SEGUNDO_CICLO_SECUNDARIA
  }
  return []
}

const ROLES_DISPONIBLES: Record<string, string[]> = {
  superadmin: ['admin', 'admin_centro', 'docente', 'estudiante', 'coordinador', 'registro'],
  admin: ['admin_centro', 'docente', 'estudiante', 'coordinador', 'registro'],
  admin_centro: ['docente', 'estudiante', 'coordinador', 'registro',],
}

export default function NuevoUsuarioPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const rolesPermitidos = ROLES_DISPONIBLES[session?.user?.role || ''] || []

  const [form, setForm] = useState({
    nombre: '', email: '', password: '', genero: '', rol: '',
    codigoCentro: '',
    nivel: '', ciclo: '', grado: '', rne: '',
    categoriaDocente: '',
    materias: [] as string[],
    niveles: [] as string[],
    ciclos: {} as Record<string, string>,
    grados: [] as string[],
  })

  const toggleArray = (campo: 'niveles' | 'materias' | 'grados', valor: string) => {
    setForm((prev) => ({
      ...prev,
      [campo]: prev[campo].includes(valor)
        ? prev[campo].filter((v) => v !== valor)
        : [...prev[campo], valor],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!form.rol) { setError('Seleccioná un rol'); setLoading(false); return }
    if (form.rol === 'docente' && form.materias.length === 0) { setError('Seleccioná al menos una materia'); setLoading(false); return }
    if (form.rol === 'docente' && form.grados.length === 0) { setError('Seleccioná al menos un grado'); setLoading(false); return }

    let centroId = session?.user?.centroId

    if ((session?.user?.role === 'admin' || session?.user?.role === 'superadmin') && form.codigoCentro) {
      try {
        const resCentro = await fetch(`/api/centros?codigo=${form.codigoCentro.toUpperCase()}`)
        if (!resCentro.ok) { setError('Código de centro no encontrado o inactivo'); setLoading(false); return }
        const centroData = await resCentro.json()
        centroId = centroData._id
      } catch { setError('Error al validar el centro'); setLoading(false); return }
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, centroId }),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error) }
      router.push('/admin/usuarios/centros')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Nuevo Usuario</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Datos básicos de acceso y perfil.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input id="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
            </div>

            <div className="space-y-2">
              <Label>Género</Label>
              <Select value={form.genero} onValueChange={(v) => setForm({ ...form, genero: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rol del Sistema</Label>
              <Select 
                value={form.rol} 
                onValueChange={(v) => setForm({ ...form, rol: v, categoriaDocente: '', materias: [], niveles: [], ciclos: {}, grados: [], grado: '', rne: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Asignar un rol..." />
                </SelectTrigger>
                <SelectContent>
                  {rolesPermitidos.map(r => (
                    <SelectItem key={r} value={r}>{r.replace('_', ' ').toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(session?.user?.role === 'admin' || session?.user?.role === 'superadmin') && (
              <div className="space-y-2">
                <Label htmlFor="codigo">Código del Centro</Label>
                <Input 
                  id="codigo" 
                  value={form.codigoCentro} 
                  onChange={(e) => setForm({ ...form, codigoCentro: e.target.value.toUpperCase() })} 
                  placeholder="Ej: SALE2025" 
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sección específica para ESTUDIANTES */}
        {form.rol === 'estudiante' && (
          <Card className="border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-600">Datos Académicos (Estudiante)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Nivel</Label>
                <Select value={form.nivel} onValueChange={(v) => setForm({ ...form, nivel: v, ciclo: '', grado: '' })}>
                  <SelectTrigger><SelectValue placeholder="Nivel..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nivel-primario">Primario</SelectItem>
                    <SelectItem value="nivel-secundario">Secundario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ciclo</Label>
                <Select disabled={!form.nivel} value={form.ciclo} onValueChange={(v) => setForm({ ...form, ciclo: v, grado: '' })}>
                  <SelectTrigger><SelectValue placeholder="Ciclo..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primer-ciclo">Primer Ciclo</SelectItem>
                    <SelectItem value="segundo-ciclo">Segundo Ciclo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grado</Label>
                <Select disabled={!form.ciclo} value={form.grado} onValueChange={(v) => setForm({ ...form, grado: v })}>
                  <SelectTrigger><SelectValue placeholder="Grado..." /></SelectTrigger>
                  <SelectContent>
                    {getGradosPorCiclo(form.nivel, form.ciclo).map(g => (
                      <SelectItem key={g} value={g}>{g.replace('-', ' ')}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="rne">RNE (Registro Nacional de Estudiante)</Label>
                <Input id="rne" value={form.rne} onChange={(e) => setForm({ ...form, rne: e.target.value })} placeholder="Opcional" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sección específica para DOCENTES */}
        {form.rol === 'docente' && (
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="text-green-600">Configuración de Docente</CardTitle>
              <CardDescription>Materias, niveles y grados bajo su responsabilidad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Categoría de Docente</Label>
                  <Select value={form.categoriaDocente} onValueChange={(v) => setForm({ ...form, categoriaDocente: v, materias: [] })}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar categoría..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idiomas">Idiomas</SelectItem>
                      <SelectItem value="materias-basicas">Materias Básicas</SelectItem>
                      <SelectItem value="otras-materias">Otras Materias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Niveles en los que imparte</Label>
                  <div className="flex gap-4">
                    {['nivel-primario', 'nivel-secundario'].map(n => (
                      <div key={n} className="flex items-center space-x-2">
                        <Checkbox 
                          id={n} 
                          checked={form.niveles.includes(n)} 
                          onCheckedChange={() => toggleArray('niveles', n)}
                        />
                        <label htmlFor={n} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {n === 'nivel-primario' ? 'Primario' : 'Secundario'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {form.categoriaDocente && (
                <div className="space-y-3">
                  <Label>Materias</Label>
                  <div className="flex flex-wrap gap-2">
                    {MATERIAS_DISPONIBLES.filter(m => MATERIAS_POR_CATEGORIA[form.categoriaDocente]?.includes(m.slug)).map(m => (
                      <Badge 
                        key={m.slug}
                        variant={form.materias.includes(m.slug) ? "default" : "outline"}
                        className="cursor-pointer py-1.5 px-3"
                        onClick={() => toggleArray('materias', m.slug)}
                      >
                        {m.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {form.niveles.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-base font-bold">Grados asignados por nivel</Label>
                  {form.niveles.map(nivel => (
                    <div key={nivel} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <span className="font-semibold min-w-24">
                          {nivel === 'nivel-primario' ? '📌 Primaria' : '📌 Secundaria'}
                        </span>
                        <Select 
                          value={form.ciclos[nivel] || ''} 
                          onValueChange={(v) => setForm({ ...form, ciclos: { ...form.ciclos, [nivel]: v } })}
                        >
                          <SelectTrigger className="w-full md:w-[200px] h-8 text-xs">
                            <SelectValue placeholder="Seleccionar ciclo..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primer-ciclo">Primer Ciclo</SelectItem>
                            <SelectItem value="segundo-ciclo">Segundo Ciclo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {form.ciclos[nivel] && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {getGradosPorCiclo(nivel, form.ciclos[nivel]).map(g => (
                              <div key={g} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={g} 
                                  checked={form.grados.includes(g)} 
                                  onCheckedChange={() => toggleArray('grados', g)}
                                />
                                <label htmlFor={g} className="text-xs">{g.replace('-', ' ')}</label>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                            <Checkbox 
                              id={`all-${nivel}`}
                              checked={getGradosPorCiclo(nivel, form.ciclos[nivel]).every(g => form.grados.includes(g))}
                              onCheckedChange={(checked) => {
                                const gradosCiclo = getGradosPorCiclo(nivel, form.ciclos[nivel])
                                if (checked) {
                                  setForm({ ...form, grados: [...new Set([...form.grados, ...gradosCiclo])] })
                                } else {
                                  setForm({ ...form, grados: form.grados.filter(g => !gradosCiclo.includes(g)) })
                                }
                              }}
                            />
                            <Label htmlFor={`all-${nivel}`} className="text-xs text-muted-foreground">Seleccionar ciclo completo</Label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Selección Rápida Nivel Completo */}
                  <div className="pt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Selección rápida por nivel completo:</p>
                    <div className="flex flex-wrap gap-4">
                      {form.niveles.map(nivel => {
                        const todosLosGrados = nivel === 'nivel-primario'
                          ? [...GRADOS_PRIMER_CICLO_PRIMARIA, ...GRADOS_SEGUNDO_CICLO_PRIMARIA]
                          : [...GRADOS_PRIMER_CICLO_SECUNDARIA, ...GRADOS_SEGUNDO_CICLO_SECUNDARIA]

                        return (
                          <div key={nivel} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`full-${nivel}`}
                              checked={todosLosGrados.every(g => form.grados.includes(g))}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setForm({ ...form, grados: [...new Set([...form.grados, ...todosLosGrados])] })
                                } else {
                                  setForm({ ...form, grados: form.grados.filter(g => !todosLosGrados.includes(g)) })
                                }
                              }}
                            />
                            <Label htmlFor={`full-${nivel}`} className="text-xs font-semibold">
                              {nivel === 'nivel-primario' ? 'Toda la Primaria' : 'Toda la Secundaria'}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="px-8">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Crear Usuario
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}