'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NuevoEstudiantePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: '', email: '', password: '',
    nivel: '', ciclo: '', grado: '', rne: '',
  })

  const gradosPorNivel: Record<string, string[]> = {
    'nivel-primario': ['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria'],
    'nivel-secundario': ['1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria'],
  }

  const gradosFiltrados = form.nivel ? gradosPorNivel[form.nivel] || [] : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rol: 'estudiante' }),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error) }
      router.push('/admin/usuarios')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuevo Estudiante</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={cardClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Nombre</label><input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Contraseña</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} required minLength={6} /></div>
            <div><label className={labelClass}>RNE</label><input type="text" value={form.rne} onChange={(e) => setForm({ ...form, rne: e.target.value })} className={inputClass} required /></div>
            <div>
              <label className={labelClass}>Nivel</label>
              <select value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value, ciclo: '', grado: '' })} className={inputClass} required>
                <option value="">Seleccionar...</option>
                <option value="nivel-primario">Nivel Primario</option>
                <option value="nivel-secundario">Nivel Secundario</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Ciclo</label>
              <select value={form.ciclo} onChange={(e) => setForm({ ...form, ciclo: e.target.value })} className={inputClass} required disabled={!form.nivel}>
                <option value="">Seleccionar...</option>
                <option value="primer-ciclo">Primer Ciclo</option>
                <option value="segundo-ciclo">Segundo Ciclo</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Grado</label>
              <select value={form.grado} onChange={(e) => setForm({ ...form, grado: e.target.value })} className={inputClass} required disabled={!form.nivel}>
                <option value="">Seleccionar...</option>
                {gradosFiltrados.map((g) => (
                  <option key={g} value={g}>{g.replace('-', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Creando...' : 'Crear Estudiante'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}