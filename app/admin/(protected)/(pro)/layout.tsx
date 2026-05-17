// app/admin/(pro)/layout.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { RequierePlanMessage } from '@/components/RequierePlanMessage'

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session || session.user?.role !== 'docente') {
    redirect('/dashboard')
  }

  // ✅ Verificar si tiene plan de pago (Pro o Premium)
  const suscripcion = await prisma.suscripcion.findFirst({
    where: {
      usuarioId: session.user.id,
      estado: 'active',
      OR: [
        { fechaFin: null },
        { fechaFin: { gt: new Date() } }
      ]
    }
  })

  const tienePlanPago = suscripcion?.plan === 'docente_pro' || suscripcion?.plan === 'docente_premium'

  if (!tienePlanPago) {
    return <RequierePlanMessage feature="estas funcionalidades" requiredPlan="pro" />
  }
  
  return <>{children}</>
}