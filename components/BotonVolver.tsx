'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function BotonVolver({ label = 'Volver' }: { label?: string }) {
  const router = useRouter()

  return (
    <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
      <ArrowLeft className="w-4 h-4 mr-1" />
      {label}
    </Button>
  )
}