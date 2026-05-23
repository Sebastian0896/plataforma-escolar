// app/dashboard/[nivel]/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { BookOpen, Menu } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NivelPage() {
  const { nivel } = useParams()
  const { data: session } = useSession()
  
  const nivelNormalizado = typeof nivel === 'string' ? nivel : nivel[0]
  const nombreNivel = nivelNormalizado.replace('nivel-', '').replace('-', ' ')
  
  // Obtener los grados de este nivel (para mostrar cuáles tiene)
  const mapaNiveles: Record<string, string> = {
    'nivel-secundario': 'secundaria',
    'nivel-primario': 'primaria',
  }
  
  const palabraClave = mapaNiveles[nivelNormalizado] || nivelNormalizado.replace('nivel-', '')
  const gradosDelNivel = session?.user?.grados?.filter((grado: string) => 
    grado.toLowerCase().includes(palabraClave.toLowerCase())
  ) || []

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Card className="max-w-2xl border-dashed shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl capitalize">
            {nombreNivel}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            Selecciona una opción del menú lateral para ver el contenido de este nivel.
          </p>
          
          {gradosDelNivel.length > 0 && (
            <div className="rounded-lg bg-muted/30 p-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Tus grados disponibles en {nombreNivel}:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {gradosDelNivel.map((grado: string) => (
                  <span key={grado} className="rounded-full bg-background px-3 py-1 text-xs">
                    {grado.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Menu className="h-4 w-4" />
            <span>Usa el menú lateral para navegar</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}