// app/admin/docente/confirmar/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CreditCard, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ConfirmarPagoPage() {
  const router = useRouter()
  const { update } = useSession()
  const [syncPaso, setSyncPaso] = useState('Verificando pago con Lemon Squeezy...')
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    let intentos = 0

    const verificarEstatus = async () => {
      intentos++
      
      if (intentos === 4) setSyncPaso('Actualizando tu suscripción en el sistema...')
      if (intentos === 8) setSyncPaso('Dando los últimos toques a tu cuenta...')

      try {
        // Consultamos a tu API de pagos existente
        const res = await fetch('/api/docente/pagos', { cache: 'no-store' })
        const data = await res.json()

        // Si ya hay un pago registrado o la suscripción pasó a activa
        const pagoExitoso = data?.pagos?.length > 0 || data?.suscripcion?.estado === 'active'

        if (pagoExitoso) {
          setCompletado(true)
          setSyncPaso('¡Todo listo! Redirigiendo...')
          toast.success('¡Pago procesado con éxito!')
          
          setTimeout(async () => {
            await update() // Actualiza la sesión de Next-Auth
            router.push('/admin/docente') // Nos movemos al historial normal limpio
            router.refresh()
          }, 4000)
          
          return true // Detiene el bucle
        }
      } catch (error) {
        console.error('Error verificando pago:', error)
      }

      // Si pasa más de 30 segundos (12 intentos x 2.5s) liberamos al usuario
      if (intentos >= 12) {
        toast.error('El pago se está procesando en segundo plano. Te redirigimos a tu panel.')
        router.push('/admin/docente')
        return true
      }

      return false
    }

    // Primer chequeo inmediato
    verificarEstatus().then((terminado) => {
      if (terminado) return

      // Bucle cada 2.5 segundos
      const interval = setInterval(async () => {
        const terminadoInterval = await verificarEstatus()
        if (terminadoInterval) {
          clearInterval(interval)
        }
      }, 4000)

      return () => clearInterval(interval)
    })
  }, [router, update])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center max-w-sm text-center px-6">
        {completado ? (
          <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce mb-4" />
        ) : (
          <div className="relative flex items-center justify-center mb-6">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <CreditCard className="h-6 w-6 text-primary absolute" />
          </div>
        )}
        <h2 className="text-xl font-bold tracking-tight mb-2">Procesando tu suscripción</h2>
        <p className="text-sm text-muted-foreground animate-pulse font-medium">
          {syncPaso}
        </p>
      </div>
    </div>
  )
}