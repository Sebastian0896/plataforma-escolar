'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    codigo: '',
    grado: '',
    rne: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar')
      }

      setSuccess('¡Registro exitoso! Redirigiendo...')
      setTimeout(() => router.push('/acceso'), 1500)
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
            <span className="text-3xl">🎒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Registro Estudiantil</h1>
          <p className="text-sm text-gray-500 mt-1">
            Creá tu cuenta con el código de tu centro
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
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
                minLength={6}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grado</label>
              <select
                value={form.grado}
                onChange={(e) => setForm({ ...form, grado: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar grado...</option>
                <optgroup label="Primaria">
                  <option value="1ro-primaria">1ro Primaria</option>
                  <option value="2do-primaria">2do Primaria</option>
                  <option value="3ro-primaria">3ro Primaria</option>
                  <option value="4to-primaria">4to Primaria</option>
                  <option value="5to-primaria">5to Primaria</option>
                  <option value="6to-primaria">6to Primaria</option>
                </optgroup>
                <optgroup label="Secundaria">
                  <option value="1ro-secundaria">1ro Secundaria</option>
                  <option value="2do-secundaria">2do Secundaria</option>
                  <option value="3ro-secundaria">3ro Secundaria</option>
                  <option value="4to-secundaria">4to Secundaria</option>
                  <option value="5to-secundaria">5to Secundaria</option>
                  <option value="6to-secundaria">6to Secundaria</option>
                </optgroup>
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RNE (Código de estudiante)</label>
                <input
                    type="text"
                    value={form.rne}
                    onChange={(e) => setForm({ ...form, rne: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: RNE-2025-001"
                    required
                />
                <p className="text-xs text-gray-400 mt-1">El RNE te lo asigna tu centro educativo</p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          ¿Ya tenés cuenta?{' '}
          <Link href="/acceso" className="text-blue-600 hover:underline">
            Ingresar
          </Link>
        </p>
      </div>
    </div>
  )
}