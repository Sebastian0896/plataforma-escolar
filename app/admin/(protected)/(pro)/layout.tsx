import { requirePlan } from '@/lib/authz'
import { redirect } from 'next/navigation'

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await requirePlan('docente_pro')
  } catch {
    redirect('/admin/docente/planes')
  }

  return <>{children}</>
}