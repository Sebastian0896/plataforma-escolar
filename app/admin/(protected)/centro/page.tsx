// app/admin/(protected)/centro/page.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function CentroRedirectPage() {
  const session = await auth()

  // Verificar que sea admin_centro
  if (session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  const centroId = session.user.centroId
  if (!centroId) {
    redirect('/dashboard')
  }

  // Redirigir al centro específico
  redirect(`/admin/centro/${centroId}`)
}