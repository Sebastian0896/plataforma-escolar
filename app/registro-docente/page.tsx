'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, UserPlus, Mail, Lock, User, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react'

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

export default function RegistroDocentePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    nombre: '', 
    email: '', 
    password: '',
    genero: '', 
    materia: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/registro-docente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      
      if (!res.ok) { 
        const data = await res.json()
        throw new Error(data.error || 'Error en el registro') 
      }

      setSuccess('¡Registro exitoso! Redirigiendo al login...')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] -z-10" />

      <div className="w-full max-w-lg space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 shadow-lg shadow-green-600/20 mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Unirse como Docente</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Completa tus datos para comenzar a planificar</p>
        </div>

        <Card className="border-none shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Información de Cuenta</CardTitle>
            <CardDescription>Todos los campos son obligatorios.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Alertas */}
              {error && (
                <Alert variant="destructive" className="animate-in slide-in-from-top-1">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900 text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="nombre"
                      placeholder="Ej. Juan Pérez"
                      className="pl-10"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email"
                      type="email"
                      placeholder="docente@escuela.edu"
                      className="pl-10"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Género */}
                <div className="space-y-2">
                  <Label>Género</Label>
                  <Select 
                    onValueChange={(val) => setForm({ ...form, genero: val })}
                    value={form.genero}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Materia */}
                <div className="space-y-2">
                  <Label>Materia Principal</Label>
                  <Select 
                    onValueChange={(val) => setForm({ ...form, materia: val })}
                    value={form.materia}
                    required
                  >
                    <SelectTrigger className="relative pl-10">
                      <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {MATERIAS_DISPONIBLES.map(m => (
                        <SelectItem key={m.slug} value={m.slug}>{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-base font-semibold transition-all mt-4 shadow-lg shadow-green-600/10" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Crear cuenta gratuita'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-sm text-slate-500 text-center">
          ¿Ya tienes una cuenta? {' '}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}