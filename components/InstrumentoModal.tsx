'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  slug: string
  onClose: () => void
}

export default function InstrumentoModal({ slug, onClose }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/instrumentos/generar?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [slug])

  const exportarPDF = () => window.open(`/api/instrumentos/pdf?slug=${slug}`, '_blank')

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>📋 Instrumento de Evaluación</DialogTitle>
        </DialogHeader>

        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Generando instrumento...</p>
        ) : (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6 p-1">
              <div className="bg-muted rounded-xl p-4">
                <p className="text-sm text-muted-foreground">Tipo sugerido</p>
                <p className="text-lg font-bold text-primary">{data?.tipo}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Criterios de Evaluación</h3>
                <div className="space-y-2">
                  {data?.criterios?.map((c: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <span className="text-primary font-bold">{i + 1}.</span>
                      <p className="text-sm">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Recomendaciones</h3>
                <div className="space-y-2">
                  {data?.recomendaciones?.map((r: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950 rounded-lg">
                      <span>💡</span>
                      <p className="text-sm text-amber-900 dark:text-amber-100">{r}</p>
                    </div>
                  ))}
                </div>
              </div>

              {data?.ejemplos && (
                <div>
                  <h3 className="font-semibold mb-3">Ejemplos</h3>
                  <div className="space-y-2">
                    {data.ejemplos.map((e: string, i: number) => (
                      <div key={i} className="p-3 bg-muted rounded-lg text-sm">{e}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}

        <div className="flex gap-3 mt-4">
          <Button variant="destructive" onClick={exportarPDF}>📄 Exportar PDF</Button>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}