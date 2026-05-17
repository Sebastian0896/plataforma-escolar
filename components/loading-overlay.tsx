// components/loading-overlay.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export function LoadingOverlay() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const handleStart = () => {
      timeout = setTimeout(() => setLoading(true), 200)
    }
    
    const handleComplete = () => {
      clearTimeout(timeout)
      setLoading(false)
    }

    handleStart()
    const timer = setTimeout(handleComplete, 500)

    return () => {
      clearTimeout(timeout)
      clearTimeout(timer)
    }
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  )
}