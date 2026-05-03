'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error) }
      router.push('/admin/centros')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border rounded-lg text-sm dark:bg-slate-700 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuevo Centro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-800 p-5 rounded-xl border dark:border-slate-700">
        <div><label className={labelClass}>Nombre del Centro</label><input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Código</label><input type="text" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })} className={inputClass} required /></div>
        <hr className="dark:border-slate-600" />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Admin del Centro</p>
        <div><label className={labelClass}>Nombre</label><input type="text" value={form.adminNombre} onChange={(e) => setForm({ ...form, adminNombre: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Email</label><input type="email" value={form.adminEmail} onChange={(e) => setForm({ ...form, adminEmail: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Contraseña</label><input type="password" value={form.adminPassword} onChange={(e) => setForm({ ...form, adminPassword: e.target.value })} className={inputClass} required /></div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm">
          {loading ? 'Creando...' : 'Crear Centro'}
        </button>
      </form>
    </div>
  )
}