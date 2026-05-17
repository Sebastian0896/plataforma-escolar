// components/RequierePlanMessage.tsx
'use client'

import { Crown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface RequierePlanMessageProps {
  feature?: string
  requiredPlan?: 'pro' | 'premium'
}

export function RequierePlanMessage({ 
  feature = 'esta funcionalidad',
  requiredPlan = 'pro'
}: RequierePlanMessageProps) {
  const planNombre = requiredPlan === 'pro' ? 'Docente Pro' : 'Docente Premium'
  const planSlug = requiredPlan === 'pro' ? 'docente_pro' : 'docente_premium'

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full text-center border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="pt-8">
          <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-yellow-600" />
          </div>
          
          <h2 className="text-xl font-semibold mb-2">
            Contenido exclusivo para {planNombre}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Para usar {feature}, necesitas tener activo el plan {planNombre}.
            Actualiza tu plan y desbloquea todas las funcionalidades premium.
          </p>
          
          <div className="flex flex-col gap-3">
            <Link href="/admin/docente/planes">
              <Button className="w-full gap-2">
                <Crown className="h-4 w-4" />
                Ver planes disponibles
              </Button>
            </Link>
            
            <Link href="/admin/docente">
              <Button variant="outline" className="w-full">
                Volver a mi oficina
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}