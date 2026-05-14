// components/RequierePlan.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { tieneAcceso } from '@/lib/suscripcion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Crown } from 'lucide-react'

interface RequierePlanProps {
  children: React.ReactNode
  funcionalidad: 'diario' | 'asistencia' | 'planificaciones' | 'reportes'
}

export function RequierePlan({ children, funcionalidad }: RequierePlanProps) {
  const { data: session } = useSession()
  const [acceso, setAcceso] = useState<boolean | null>(null)

  useEffect(() => {
    if (session?.user?.id) {
      tieneAcceso(session.user.id, funcionalidad).then(setAcceso)
    }
  }, [session, funcionalidad])

  if (acceso === null) {
    return <div className="p-8 text-center">Verificando acceso...</div>
  }

  if (!acceso) {
    return (
      <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
        <CardContent className="py-12 text-center">
          <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Funcionalidad Premium</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Esta funcionalidad está disponible solo para planes de pago.
            Suscríbete para acceder al diario del docente, asistencia y más.
          </p>
          <Link href="/admin/docente/planes">
            <Button className="gap-2">
              <Crown className="h-4 w-4" />
              Ver planes disponibles
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}