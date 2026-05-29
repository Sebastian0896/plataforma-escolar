// app/admin/(protected)/centro/[centroId]/info/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EditarCentroPage() {
  const router = useRouter()
  const { centroId } = useParams()
  const [loading, setLoading] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [formData, setFormData] = useState({
    nombre: '',
    codigo: '',
    plan: '',
  })

  useEffect(() => {
    cargarCentro()
  }, [])

  const cargarCentro = async () => {
    const res = await fetch(`/api/centro/${centroId}`)
    const data = await res.json()

    if (res.ok) {
      setFormData({
        nombre: data.nombre || '',
        codigo: data.codigo || '',
        plan: data.plan || 'gratis',
      })
    }
    setCargando(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(`/api/centro/${centroId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      toast.success('Centro actualizado exitosamente')
      router.push(`/admin/centro/${centroId}`)
    } else {
      toast.error('Error al actualizar el centro')
    }
    setLoading(false)
  }

  if (cargando) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/centro/${centroId}`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Editar Centro</h2>
          <p className="text-muted-foreground mt-1">
            Modifica la información de tu centro educativo
          </p>
        </div>
      </div>

      <Card className="border shadow-sm max-w-2xl">
        <CardHeader>
          <CardTitle>Información del Centro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Centro</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigo">Código del Centro</Label>
              <Input
                id="codigo"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <select
                id="plan"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                className="h-10 w-full rounded-xl border bg-background px-3"
              >
                <option value="gratis">Gratis</option>
                <option value="basico">Básico</option>
                <option value="profesional">Profesional</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="rounded-xl">
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              <Link href={`/admin/centro/${centroId}`}>
                <Button type="button" variant="outline" className="rounded-xl">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}