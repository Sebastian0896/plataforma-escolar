'use client'

import { signIn } from 'next-auth/react'
import { useState, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Mail, Key, AlertCircle, GraduationCap } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

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
    if (bloqueado) {
      setLoginError('Demasiados intentos. Por seguridad, espera un minuto.')
      return
    }
    
    setLoading(true)
    setLoginError('')

    const result = await signIn('credentials', { 
      email, 
      password, 
      redirect: false 
    })

    if (result?.error) {
      const nuevo = intentos + 1
      setIntentos(nuevo)
      
      if (nuevo >= 5) {
        setBloqueado(true)
        setLoginError('Demasiados intentos. Acceso bloqueado por 1 minuto.')
        setTimeout(() => {
          setBloqueado(false)
          setIntentos(0)
          setLoginError('')
        }, 60000)
      } else {
        setLoginError('Email o contraseña incorrectos')
      }
      setLoading(false)
      return
    }

    // Redirección exitosa
    window.location.href = '/admin'
  }

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      toast.success('¡Pago exitoso! Ahora puedes iniciar sesión con tu cuenta')
    }
  }, [searchParams])

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Branding / Header */}
      <div className="text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20 mb-6 ring-4 ring-background">
          <GraduationCap className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Bienvenido</h1>
        <p className="text-muted-foreground mt-2">
          Ingresa a la Plataforma Educativa
        </p>
      </div>

      <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Usa tus credenciales institucionales
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          
          {/* Alertas de Error */}
          {(error || loginError) && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {loginError || (error === 'CredentialsSignin' ? 'Credenciales no válidas' : 'Error de autenticación')}
              </AlertDescription>
            </Alert>
          )}

          {/* Aviso de Intentos */}
          {intentos >= 3 && intentos < 5 && !bloqueado && (
            <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                ⚠️ Te quedan {5 - intentos} intentos antes de bloquear la cuenta.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Institucional</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email"
                  type="email" 
                  className="pl-10"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@salome.edu.do" 
                  required 
                  autoFocus 
                  disabled={bloqueado || loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password"
                  type="password" 
                  className="pl-10"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  disabled={bloqueado || loading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-semibold transition-all active:scale-[0.98]" 
              disabled={loading || bloqueado}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : bloqueado ? (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Temporalmente Bloqueado
                </>
              ) : (
                'Acceder al Sistema'
              )}
            </Button>
            <Link
              href="/auth/forgot-password"
              className="text-sm inline-block w-full text-center text-muted-foreground hover:text-primary transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </form>
        </CardContent>
      </Card>
      
      <footer className="text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Plataforma Educativa. Todos los derechos reservados.</p>
        <p className='my-4'>Desarrollado por: Sebastian Gonzalez R.</p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 relative overflow-hidden">
      {/* Decoración de fondo opcional */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="z-10 w-full flex justify-center">
        <Suspense fallback={
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Iniciando entorno seguro...</span>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}