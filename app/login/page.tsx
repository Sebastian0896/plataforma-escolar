'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setLoginError('')

  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  if (result?.error) {
    setLoginError('Email o contraseña incorrectos')
    setLoading(false)
    return
  }

  // Redirigir según el rol usando window.location después de un pequeño delay
  setTimeout(async () => {
    const res = await fetch('/api/auth/session')
    const session = await res.json()
    
    if (session?.user?.role === 'estudiante') {
      window.location.href = `/estudiante/${session.user.grado}`
    } else if (session?.user?.role === 'admin' || session?.user?.role === 'docente') {
      window.location.href = '/admin'
    } else {
      window.location.href = '/dashboard'
    }
  }, 300)
}

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl">📚</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Iniciar Sesión</h1>
        <p className="text-sm text-gray-500 mt-1">Centro Educativo Salomé Ureña</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {(error || loginError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {loginError || (error === 'CredentialsSignin' ? 'Email o contraseña incorrectos' : 'Error al iniciar sesión')}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="admin@salome.edu.do" required autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="••••••••" required
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        ¿Sos estudiante?{' '}
        <Link href="/acceso" className="text-blue-600 hover:underline">Ingresá con código</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950">
      <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}