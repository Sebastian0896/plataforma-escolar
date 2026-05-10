'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [intentos, setIntentos] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (bloqueado) { setLoginError('Demasiados intentos. Esperá un minuto.'); return }
    setLoading(true)
    setLoginError('')

    const result = await signIn('credentials', { email, password, redirect: false })

    if (result?.error) {
      const nuevo = intentos + 1
      setIntentos(nuevo)
      if (nuevo >= 5) {
        setBloqueado(true)
        setLoginError('Demasiados intentos. Esperá un minuto.')
        setTimeout(() => { setBloqueado(false); setIntentos(0) }, 60000)
      } else {
        setLoginError('Email o contraseña incorrectos')
      }
      setLoading(false)
      return
    }
    window.location.href = '/dashboard'
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl">📚</span>
        </div>
        <h1 className="text-xl font-bold">Iniciar Sesión</h1>
        <p className="text-sm text-muted-foreground mt-1">Plataforma Educativa</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {(error || loginError) && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
              {loginError || (error === 'CredentialsSignin' ? 'Email o contraseña incorrectos' : 'Error al iniciar sesión')}
            </div>
          )}

          {intentos >= 3 && intentos < 5 && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mb-3 text-center">
              {5 - intentos} intentos restantes antes del bloqueo
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@salome.edu.do" required autoFocus disabled={bloqueado} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required disabled={bloqueado} />
            </div>
            <Button type="submit" className="w-full" disabled={loading || bloqueado}>
              {bloqueado ? 'Bloqueado por 1 minuto' : loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <Suspense fallback={<div className="text-muted-foreground">Cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}