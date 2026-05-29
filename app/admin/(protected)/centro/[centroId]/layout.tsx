// app/admin/(protected)/centro/[centroId]/layout.tsx
import { auth } from '@/auth'
import { redirect, notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ReactNode } from 'react'

interface CentroLayoutProps {
  children: ReactNode
  params: Promise<{ centroId: string }>
}

export default async function CentroLayout({ children, params }: CentroLayoutProps) {
  const session = await auth()
  const { centroId } = await params

  // Verificar que sea admin_centro
  if (session?.user?.role !== 'admin_centro') {
    redirect('/dashboard')
  }

  // Verificar que el centroId de la URL coincida con el del usuario
  if (session.user.centroId !== centroId) {
    redirect('/dashboard')
  }

  // Verificar que el centro exista
  const centro = await prisma.centro.findUnique({
    where: { id: centroId }
  })

  if (!centro) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{centro.nombre}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Panel de gestión de tu centro educativo
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}