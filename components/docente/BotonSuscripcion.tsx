// components/docente/BotonSuscripcion.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Crown, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface BotonSuscripcionProps {
  planSlug: string
  planNombre: string
  ciclo: 'mensual' | 'anual'
  variantId: string
  esActual?: boolean
}

export function BotonSuscripcion({ planSlug, ciclo, esActual }: BotonSuscripcionProps) {
  const [loading, setLoading] = useState(false)

  const handleSuscribirse = async () => {
    if (esActual) return
    
    setLoading(true)
    toast.loading('Preparando checkout...', { id: 'checkout' })
    
    try {
      const res = await fetch('/api/lemon-squeezy/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planSlug, ciclo }),
      })

      const data = await res.json()

      if (res.ok && data.url) {
        toast.success('Redirigiendo a la pasarela de pago...', { id: 'checkout' })
        // ✅ Redirigir inmediatamente
        window.location.href = data.url
        // ❌ No hacer setLoading(false) porque la página se va a recargar
      } else {
        toast.error(data.error || 'Error al procesar la suscripción', { id: 'checkout' })
        setLoading(false) // Solo detener loading si hay error
      }
    } catch (error) {
      toast.error('Error de conexión', { id: 'checkout' })
      setLoading(false)
    }
  }

  if (esActual) {
    return (
      <Button variant="outline" className="w-full" disabled>
        ✓ Plan actual
      </Button>
    )
  }

  return (
    <Button 
      onClick={handleSuscribirse} 
      disabled={loading}
      className="w-full gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Redirigiendo...
        </>
      ) : (
        <>
          <Crown className="h-4 w-4" />
          Suscribirse por {ciclo === 'mensual' ? 'mes' : 'año'}
        </>
      )}
    </Button>
  )
}