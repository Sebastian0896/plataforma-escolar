'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    nombre: '', email: '', password: '',
    genero: '', materia: '',
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
      if (!res.ok) { const data = await res.json(); throw new Error(data.error) }
      setSuccess('¡Registro exitoso! Redirigiendo...')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">👩‍🏫</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Registro Docente</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Creá tu cuenta gratuita</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-400">{success}</div>}

          <div className="space-y-4">
            <div><label className={labelClass}>Nombre completo</label><input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Contraseña</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} required minLength={6} /></div>
            <div>
              <label className={labelClass}>Género</label>
              <select value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} className={inputClass}>
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Materia principal</label>
              <select value={form.materia} onChange={(e) => setForm({ ...form, materia: e.target.value })} className={inputClass} required>
                <option value="">Seleccionar...</option>
                {MATERIAS_DISPONIBLES.map(m => <option key={m.slug} value={m.slug}>{m.label}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
              {loading ? 'Registrando...' : 'Crear cuenta gratuita'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          ¿Ya tenés cuenta? <a href="/login" className="text-blue-600 hover:underline">Ingresar</a>
        </p>
      </div>
    </div>
  )
}