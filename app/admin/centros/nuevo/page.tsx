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

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function NuevoCentroPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    adminNombre: '',
    adminEmail: '',
    adminPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/centros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }

      router.push('/admin/centros')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Nuevo Centro
        </h1>

        <p className="text-sm text-muted-foreground">
          Registrá un nuevo centro educativo y su administrador principal.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">
              Crear Centro Educativo
            </CardTitle>

            <CardDescription>
              Completá los datos del centro y del administrador.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Centro */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">
                  Información del Centro
                </h2>

                <p className="text-xs text-muted-foreground mt-1">
                  Datos generales del centro educativo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre">
                    Nombre del Centro
                  </Label>

                  <Input
                    id="nombre"
                    type="text"
                    required
                    placeholder="Ej. Colegio Santa María"
                    value={form.nombre}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nombre: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="codigo">
                    Código
                  </Label>

                  <Input
                    id="codigo"
                    type="text"
                    required
                    placeholder="Ej. CSM001"
                    value={form.codigo}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        codigo: e.target.value.toUpperCase(),
                      })
                    }
                    className="h-11 uppercase"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Admin */}
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">
                  Administrador del Centro
                </h2>

                <p className="text-xs text-muted-foreground mt-1">
                  Cuenta principal para gestionar el centro.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="adminNombre">
                    Nombre completo
                  </Label>

                  <Input
                    id="adminNombre"
                    type="text"
                    required
                    placeholder="Nombre del administrador"
                    value={form.adminNombre}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adminNombre: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminEmail">
                    Email
                  </Label>

                  <Input
                    id="adminEmail"
                    type="email"
                    required
                    placeholder="admin@centro.edu.do"
                    value={form.adminEmail}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adminEmail: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminPassword">
                    Contraseña
                  </Label>

                  <Input
                    id="adminPassword"
                    type="password"
                    required
                    placeholder="********"
                    value={form.adminPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        adminPassword: e.target.value,
                      })
                    }
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-11 rounded-xl"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {loading ? 'Creando...' : 'Crear Centro'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}