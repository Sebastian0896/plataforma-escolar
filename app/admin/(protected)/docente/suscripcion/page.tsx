// app/admin/docente/suscripcion/page.tsx

export const dynamic = 'force-dynamic'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { HistorialPagos } from '@/components/docente/HistorialPagos'
import { Card, CardContent } from '@/components/ui/card'
import { Crown, Calendar, CreditCard, Shield } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function SuscripcionPage() {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    redirect('/dashboard')
  }

  // Obtener suscripción activa para mostrar en las cards
  const suscripcion = await prisma.suscripcion.findFirst({
    where: {
      usuarioId: session.user.id,
      estado: 'active',
    },
    orderBy: { fechaInicio: 'desc' },
  })

  const planNombre = suscripcion?.plan === 'docente_pro' ? 'Docente Pro' 
    : suscripcion?.plan === 'docente_premium' ? 'Docente Premium' 
    : 'Gratis'

  const planColor = suscripcion?.plan === 'docente_premium' ? 'text-purple-600' 
    : suscripcion?.plan === 'docente_pro' ? 'text-blue-600' 
    : 'text-gray-500'

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          💳 Gestión de suscripción
        </h1>
        <p className="text-muted-foreground mt-1">
          Administra tu plan, pagos y facturación
        </p>
      </div>

      {/* Cards informativas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Crown className={`h-8 w-8 ${planColor} opacity-70`} />
            <div>
              <p className="text-xs text-muted-foreground">Plan actual</p>
              <p className="font-semibold">{planNombre}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary opacity-70" />
            <div>
              <p className="text-xs text-muted-foreground">Próximo pago</p>
              <p className="font-semibold">
                {suscripcion?.fechaFin ? new Date(suscripcion.fechaFin).toLocaleDateString('es-ES') : '—'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary opacity-70" />
            <div>
              <p className="text-xs text-muted-foreground">Estado</p>
              <p className={`font-semibold ${suscripcion ? 'text-green-600' : 'text-yellow-600'}`}>
                {suscripcion ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de pagos */}
      <HistorialPagos />

      {/* Enlaces rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/docente/planes">
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center gap-3">
              <Crown className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">Cambiar de plan</h3>
                <p className="text-xs text-muted-foreground">Upgrade o downgrade</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="https://app.lemonsqueezy.com/dashboard" target="_blank">
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-medium">Portal de facturación</h3>
                <p className="text-xs text-muted-foreground">Gestionar método de pago</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}