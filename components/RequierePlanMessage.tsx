// components/RequierePlanMessage.tsx
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, Lock } from 'lucide-react'

interface RequierePlanMessageProps {
  feature?: string
}

export function RequierePlanMessage({ feature }: RequierePlanMessageProps) {
  const featureName = feature === 'diario' ? 'el Diario del Docente' :
                      feature === 'planificaciones' ? 'las Planificaciones' :
                      feature === 'asistencia' ? 'el Pase de Lista' :
                      feature === 'evaluaciones' ? 'el sistema de Evaluaciones' :
                      'esta funcionalidad'
  
  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
      <CardContent className="py-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <Lock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Funcionalidad Premium</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Para usar {featureName}, necesitas un plan de pago.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/admin/docente/planes">
            <Button className="gap-2">
              <Crown className="h-4 w-4" />
              Ver planes
            </Button>
          </Link>
          <Link href="/admin/docente">
            <Button variant="outline">
              Volver a mi oficina
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}