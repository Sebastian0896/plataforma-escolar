'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

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
import { Switch } from '@/components/ui/switch'

export default function EditarCentroPage() {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    nombre: '',
    codigo: '',
    activo: true,
  })

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`/api/centros?id=${params.id}`)
        const data = await res.json()

        if (data) {
          setForm({
            nombre: data.nombre,
            codigo: data.codigo,
            activo: data.activo,
          })
        }
      } finally {
        setLoading(false)
      }
    }

    cargar()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)

    const res = await fetch('/api/centros', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: params.id,
        ...form,
      }),
    })

    if (res.ok) {
      router.push('/admin/centros')
      router.refresh()
    } else {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Cargando centro...
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Editar Centro
        </h1>

        <p className="text-sm text-muted-foreground">
          Modificá la información del centro educativo.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card className="rounded-2xl border-border/60 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">
              Información del Centro
            </CardTitle>

            <CardDescription>
              Actualizá los datos generales y el estado del centro.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">
                Nombre del Centro
              </Label>

              <Input
                id="nombre"
                type="text"
                required
                value={form.nombre}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nombre: e.target.value,
                  })
                }
                className="h-11"
                placeholder="Ej. Colegio Santa María"
              />
            </div>

            {/* Código */}
            <div className="space-y-2">
              <Label htmlFor="codigo">
                Código
              </Label>

              <Input
                id="codigo"
                type="text"
                required
                value={form.codigo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    codigo: e.target.value.toUpperCase(),
                  })
                }
                className="h-11 uppercase"
                placeholder="Ej. CSM001"
              />
            </div>

            {/* Estado */}
            <div className="flex items-center justify-between rounded-xl border border-border/60 p-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Centro activo
                </p>

                <p className="text-xs text-muted-foreground">
                  Permitir acceso y funcionamiento del centro.
                </p>
              </div>

              <Switch
                checked={form.activo}
                onCheckedChange={(value) =>
                  setForm({
                    ...form,
                    activo: value,
                  })
                }
              />
            </div>

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
                disabled={saving}
                className="h-11 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}