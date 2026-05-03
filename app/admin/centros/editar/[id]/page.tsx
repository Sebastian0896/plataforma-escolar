'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditarCentroPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ nombre: '', codigo: '', activo: true })

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch(`/api/centros?id=${params.id}`)
      const data = await res.json()
      if (data) setForm({ nombre: data.nombre, codigo: data.codigo, activo: data.activo })
      setLoading(false)
    }
    cargar()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/centros', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: params.id, ...form }),
    })
    if (res.ok) { router.push('/admin/centros'); router.refresh() }
    else setSaving(false)
  }

  if (loading) return <p className="text-gray-500">Cargando...</p>

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar Centro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-700 dark:text-white" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Código</label>
          <input type="text" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })} className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-700 dark:text-white" required />
        </div>
        <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm">
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  )
}