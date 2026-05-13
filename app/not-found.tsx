'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Loader2, Home, LayoutDashboard, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [redirectUrl, setRedirectUrl] = useState('/')

  useEffect(() => {
    // Determinar la ruta de redirección según el rol
    if (status === 'authenticated') {
      const rol = session?.user?.role
      
      if (rol === 'docente') {
        setRedirectUrl('/admin/docente')
      } else if (rol === 'estudiante') {
        setRedirectUrl('/dashboard')
      } else if (rol === 'admin_centro') {
        setRedirectUrl(`/admin/centros/${session?.user?.centroId}`)
      } else if (rol === 'admin' || rol === 'superadmin') {
        setRedirectUrl('/admin')
      } else if (rol === 'coordinador') {
        setRedirectUrl('/admin/coordinador')
      } else if (rol === 'registro') {
        setRedirectUrl('/admin/registro')
      } else if (rol === 'tecnico_distrital') {
        setRedirectUrl('/admin/distrital')
      } else {
        setRedirectUrl('/')
      }
    } else if (status === 'unauthenticated') {
      setRedirectUrl('/auth/login')
    }
  }, [session, status])

  // Mostrar loading mientras se determina la redirección
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="text-center max-w-md">
        {/* Animación 404 */}
        <div className="relative mb-8">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl">🔍</div>
          </div>
        </div>
        
        {/* Mensaje principal */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          ¡Ups! Página no encontrada
        </h1>
        
        <p className="text-muted-foreground mb-8">
          La página que estás buscando no existe, fue movida o no tienes acceso a ella.
        </p>

        {/* Opciones de navegación */}
        <div className="space-y-3">
          {/* Botón principal según rol */}
          <Link href={redirectUrl}>
            <Button size="lg" className="w-full gap-2">
              <Home className="h-4 w-4" />
              Volver a {session ? 'mi panel' : 'inicio'}
            </Button>
          </Link>

          {/* Botón secundario para ir al dashboard general */}
          {session && redirectUrl !== '/admin' && redirectUrl !== '/dashboard' && (
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Volver atrás
            </Button>
          )}

          {/* Mostrar el rol del usuario (debug) */}
          {session && (
            <p className="text-xs text-muted-foreground mt-4">
              Redirigiendo a: {redirectUrl}
            </p>
          )}
        </div>

        {/* Footer decorativo */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex justify-center gap-2 text-xs text-muted-foreground">
            <span>📚 Plataforma Educativa</span>
            <span>•</span>
            <span>v5.12.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}