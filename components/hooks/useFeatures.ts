// hooks/useFeatures.ts
'use client'

import { useSession } from 'next-auth/react'

// Esto es SOLO para UX - las verificaciones reales están en el backend
export function useFeatures() {
  const { data: session } = useSession()
  const plan = session?.user?.plan || 'gratis'
  
  const features = {
    diario: plan === 'docente_pro' || plan === 'docente_premium',
    asistencia: plan === 'docente_pro' || plan === 'docente_premium',
    evaluaciones: plan === 'docente_pro' || plan === 'docente_premium',
    reportes: plan === 'docente_pro' || plan === 'docente_premium',
  }
  
  return { features, plan }
}