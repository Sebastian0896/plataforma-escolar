// components/admin/ProtegeRutaPremium.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { canUseFeature, Feature } from '@/lib/authz'
import { RequierePlanMessage } from '@/components/RequierePlanMessage'

interface ProtegeRutaPremiumProps {
  children: React.ReactNode
  feature: Feature
  redirectTo?: string
}

export async function ProtegeRutaPremium({ 
  children, 
  feature, 
  redirectTo = '/admin/docente/planes' 
}: ProtegeRutaPremiumProps) {
  const session = await auth()
  
  // Verificar autenticación
  if (!session || session.user?.role !== 'docente') {
    redirect('/dashboard')
  }
  
  // Verificar permiso
  const puedeUsar = await canUseFeature(feature)
  
  if (!puedeUsar) {
    return <RequierePlanMessage feature={feature} />
  }
  
  return <>{children}</>
}