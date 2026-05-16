// components/RequierePlanPremium.tsx
'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Crown, AlertCircle } from 'lucide-react'

interface RequierePlanPremiumProps {
  children: React.ReactNode
}

export function RequierePlanPremium({ children }: RequierePlanPremiumProps) {
  const { data: session } = useSession()
  const plan = session?.user?.plan || 'gratis'
  
  const tienePlanPremium = plan === 'docente_pro' || plan === 'docente_premium'

  if (!tienePlanPremium) {
    return (
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="py-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Funcionalidad Premium</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Esta funcionalidad está disponible solo para planes de pago.
            Suscríbete para acceder al diario del docente, asistencia y más.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/admin/docente/planes">
              <Button className="gap-2">
                <Crown className="h-4 w-4" />
                Ver planes
              </Button>
            </Link>
            <Link href="/admin/docente/dashboard">
              <Button variant="outline" className="gap-2">
                Ver mi plan actual
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}