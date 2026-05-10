'use client'

import { Button } from '@/components/ui/button'
import { FileDown } from 'lucide-react'

interface BotonPDFProps {
  slug: string
  grado: string
}

export default function BotonPDF({ slug, grado }: BotonPDFProps) {
  const descargar = () => window.open(`/api/exportar-pdf?slug=${slug}&grado=${grado}`, '_blank')

  return (
    <Button variant="outline" size="sm" onClick={descargar}>
      <FileDown className="w-4 h-4 mr-1" /> PDF
    </Button>
  )
}