'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Switch } from '@/components/ui/switch'

import {
  UserPlus,
  GraduationCap,
  School,
  ShieldAlert,
} from 'lucide-react'

const GRADOS_PRIMER_CICLO_PRIMARIA = [
  '1ro-primaria',
  '2do-primaria',
  '3ro-primaria',
]

const GRADOS_SEGUNDO_CICLO_PRIMARIA = [
  '4to-primaria',
  '5to-primaria',
  '6to-primaria',
]

const GRADOS_PRIMER_CICLO_SECUNDARIA = [
  '1ro-secundaria',
  '2do-secundaria',
  '3ro-secundaria',
]

const GRADOS_SEGUNDO_CICLO_SECUNDARIA = [
  '4to-secundaria',
  '5to-secundaria',
  '6to-secundaria',
]

function getGradosPorCiclo(nivel: string, ciclo: string): string[] {
  if (!nivel || !ciclo) return []

  if (nivel === 'nivel-primario') {
    return ciclo === 'primer-ciclo'
      ? GRADOS_PRIMER_CICLO_PRIMARIA
      : GRADOS_SEGUNDO_CICLO_PRIMARIA
  }

  if (nivel === 'nivel-secundario') {
    return ciclo === 'primer-ciclo'
      ? GRADOS_PRIMER_CICLO_SECUNDARIA
      : GRADOS_SEGUNDO_CICLO_SECUNDARIA
  }

  return []
}

export default function NuevoEstudiantePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [esEscolar, setEsEscolar] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    genero: '',
    nivel: '',
    ciclo: '',
    grado: '',
    rne: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          rol: 'estudiante',
          nivel: esEscolar ? form.nivel : '',
          ciclo: esEscolar ? form.ciclo : '',
          grado: esEscolar ? form.grado : 'libre',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      router.push('/admin/docente/estudiantes')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          <UserPlus className="h-8 w-8 text-primary" />
          Nuevo estudiante
        </h1>

        <p className="text-sm text-muted-foreground">
          Registrar un nuevo estudiante dentro de la plataforma académica.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-1 border-b bg-muted/30">
            <CardTitle className="text-lg">
              Información del estudiante
            </CardTitle>

            <CardDescription>
              Completa los datos personales y académicos.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 p-6">
            {/* Switch escolar */}
            <div className="flex items-start justify-between gap-4 rounded-xl border bg-muted/30 p-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />

                  <p className="font-medium text-slate-900 dark:text-white">
                    Estudiante escolar
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  Activar para asignar nivel, ciclo y grado académico.
                </p>
              </div>

              <Switch
                checked={esEscolar}
                onCheckedChange={(checked) => {
                  setEsEscolar(checked)

                  setForm({
                    ...form,
                    nivel: '',
                    ciclo: '',
                    grado: '',
                  })
                }}
              />
            </div>

            {/* Datos básicos */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-muted-foreground" />

                <h2 className="text-base font-semibold">
                  Datos personales
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Nombre */}
                <div className="space-y-2">
                  <Label>Nombre completo</Label>

                  <Input
                    type="text"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nombre: e.target.value,
                      })
                    }
                    placeholder="Nombre del estudiante"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Correo electrónico</Label>

                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>Contraseña</Label>

                  <Input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                      })
                    }
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>

                {/* Género */}
                <div className="space-y-2">
                  <Label>Género</Label>

                  <Select
                    value={form.genero}
                    onValueChange={(value) =>
                      setForm({
                        ...form,
                        genero: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="masculino">
                        Masculino
                      </SelectItem>

                      <SelectItem value="femenino">
                        Femenino
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* RNE */}
                <div className="space-y-2 md:col-span-2">
                  <Label>RNE (opcional)</Label>

                  <Input
                    type="text"
                    value={form.rne}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        rne: e.target.value,
                      })
                    }
                    placeholder="Código RNE del estudiante"
                  />
                </div>
              </div>
            </div>

            {/* Escolar */}
            {esEscolar && (
              <div className="space-y-5 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    Información académica
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Configuración del nivel y grado escolar.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  {/* Nivel */}
                  <div className="space-y-2">
                    <Label>Nivel</Label>

                    <Select
                      value={form.nivel}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          nivel: value,
                          ciclo: '',
                          grado: '',
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nivel" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="nivel-primario">
                          Primario
                        </SelectItem>

                        <SelectItem value="nivel-secundario">
                          Secundario
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ciclo */}
                  <div className="space-y-2">
                    <Label>Ciclo</Label>

                    <Select
                      value={form.ciclo}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          ciclo: value,
                          grado: '',
                        })
                      }
                      disabled={!form.nivel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ciclo" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="primer-ciclo">
                          Primer ciclo
                        </SelectItem>

                        <SelectItem value="segundo-ciclo">
                          Segundo ciclo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Grado */}
                  <div className="space-y-2">
                    <Label>Grado</Label>

                    <Select
                      value={form.grado}
                      onValueChange={(value) =>
                        setForm({
                          ...form,
                          grado: value,
                        })
                      }
                      disabled={!form.ciclo}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar grado" />
                      </SelectTrigger>

                      <SelectContent>
                        {getGradosPorCiclo(form.nivel, form.ciclo).map(g => (
                          <SelectItem key={g} value={g}>
                            {g.replace('-', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
            <CardContent className="flex items-center gap-2 p-4 text-sm text-red-700 dark:text-red-300">
              <ShieldAlert className="h-4 w-4" />
              {error}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="min-w-[180px]"
          >
            {loading ? 'Creando estudiante...' : 'Crear estudiante'}
          </Button>
        </div>
      </form>
    </div>
  )
}