import { requirePlan } from '@/lib/authz'
import { redirect } from 'next/navigation'

export default async function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requirePlan('docente_premium')
  } catch {
    redirect('/admin/upgrade')
  }

  return <>{children}</>
}