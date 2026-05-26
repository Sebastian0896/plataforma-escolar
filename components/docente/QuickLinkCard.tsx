// components/docente/QuickLinkCard.tsx
'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown } from 'lucide-react'

interface QuickLinkCardProps {
  title: string
  description: string
  href: string
  icon: React.ElementType
  isPremium: boolean
  hasAccess: boolean
}

export function QuickLinkCard({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  isPremium, 
  hasAccess 
}: QuickLinkCardProps) {
  const bloqueado = isPremium && !hasAccess
  const linkHref = bloqueado ? '#' : href

  const contenido = (
    <Card className={`group h-full border transition-all hover:shadow-md ${bloqueado ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg cursor-pointer'}`}>
      <CardContent className="flex items-start gap-4 p-5">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${bloqueado ? 'bg-gray-100 dark:bg-gray-800' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
          <Icon className={`h-6 w-6 ${bloqueado ? 'text-gray-400' : 'text-primary'}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${bloqueado ? 'text-muted-foreground' : 'text-slate-900 dark:text-white'}`}>
              {title}
            </h3>
            
            {isPremium && !hasAccess && (
              <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">
                <Crown className="h-3 w-3 mr-1" />
                Pro
              </Badge>
            )}
            {isPremium && hasAccess && (
              <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                ✓ Disponible
              </Badge>
            )}

            {!isPremium  && (<Badge variant="outline" className="text-xs border-gray-500 text-gray-600">
              <Crown className="h-3 w-3 mr-1" />
              Gratis
            </Badge>)}
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {bloqueado ? 'Actualiza tu plan para acceder' : description}
          </p>
        </div>
      </CardContent>
    </Card>
  )

  if (bloqueado) {
    return (
      <div onClick={() => window.location.href = '/admin/docente/planes'}>
        {contenido}
      </div>
    )
  }

  return <Link href={linkHref}>{contenido}</Link>
}