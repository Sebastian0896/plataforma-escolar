'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccesoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    codigo: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/acceso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      // Guardar en sessionStorage para mantenerlo al navegar
        sessionStorage.setItem('estudiante_nombre', data.nombre)
        sessionStorage.setItem('estudiante_grado', data.grado)

        router.push(`/estudiante/${data.grado}`)

      if (!res.ok) {
        throw new Error(data.error || 'Acceso denegado')
      }

      // Redirigir al grado del estudiante
      router.push(`/estudiante/${data.grado}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Acceso Estudiantil</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ingresá con tu cuenta de estudiante
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RNE o Email</label>
                <input
                    type="text"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="RNE-2025-001 o tu@email.com"
                    required
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código del Centro</label>
              <input
                type="text"
                value={form.codigo}
                onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: SALE2025"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Verificando...' : 'Acceder'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          ¿No tenés cuenta?{' '}
          <a href="/registro" className="text-blue-600 hover:underline">
            Registrate
          </a>
        </p>
      </div>
    </div>
  )
}