'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function MiCuentaPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<'perfil' | 'seguridad'>('perfil')
  const [nombre, setNombre] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')
  const [passwordActual, setPasswordActual] = useState('')
  const [passwordNueva, setPasswordNueva] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMensaje('')

    const res = await fetch('/api/cuenta', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: activeTab === 'perfil' ? nombre : undefined,
        email: activeTab === 'perfil' ? email : undefined,
        passwordActual: activeTab === 'seguridad' ? passwordActual : undefined,
        passwordNueva: activeTab === 'seguridad' ? passwordNueva : undefined,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setMensaje('✅ Cambios guardados correctamente')
      setPasswordActual('')
      setPasswordNueva('')
      setTimeout(() => setMensaje(''), 3000)
    } else {
      setError(data.error || 'Error al guardar')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl font-bold text-blue-700">
            {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{session?.user?.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{session?.user?.email}</p>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 capitalize">
              {session?.user?.role?.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
        {(['perfil', 'seguridad'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setMensaje(''); setError('') }}
            className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab === 'perfil' ? '👤 Perfil' : '🔒 Seguridad'}
          </button>
        ))}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        {mensaje && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-sm text-green-700 dark:text-green-400">
            {mensaje}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
              <input
                type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'seguridad' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contraseña actual</label>
              <input
                type="password" value={passwordActual} onChange={(e) => setPasswordActual(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nueva contraseña</label>
              <input
                type="password" value={passwordNueva} onChange={(e) => setPasswordNueva(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-slate-600 rounded-xl text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>
        )}

        <button
          type="submit" disabled={loading}
          className="mt-6 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  )
}