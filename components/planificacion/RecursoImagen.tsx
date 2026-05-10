'use client'

import { Card, CardContent } from '@/components/ui/card'

interface Props {
  url: string
  descripcion?: string
}

export default function RecursoImagen({
  url,
  descripcion,
}: Props) {
  return (
    <Card className="mt-3 overflow-hidden border-border/60 shadow-sm">
      <div className="bg-muted/20">
        <img
          src={url}
          alt={descripcion || 'Imagen'}
          className="h-auto max-h-[420px] w-full object-contain"
          loading="lazy"
        />
      </div>

      {descripcion && (
        <CardContent className="border-t bg-background/80 px-4 py-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {descripcion}
          </p>
        </CardContent>
      )}
    </Card>
  )
}