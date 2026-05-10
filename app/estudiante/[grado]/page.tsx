import {
  Card,
  CardContent,
} from '@/components/ui/card'

type Params = Promise<{ grado: string }>

export default async function EstudiantePage({
  params,
}: {
  params: Params
}) {
  const { grado } = await params

  return (
    <div className="flex items-center justify-center py-10 sm:py-16">
      
      <Card className="w-full max-w-2xl rounded-3xl border-border/60 shadow-sm">
        
        <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
          
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-4xl">
            🎒
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Bienvenido estudiante
          </h1>

          {/* Grade */}
          <p className="mt-3 text-sm sm:text-base font-medium text-muted-foreground capitalize">
            Grado: {grado?.replace('-', ' ')}
          </p>

          {/* Description */}
          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
            Seleccioná un tema desde el menú lateral para visualizar
            el contenido, actividades y recursos disponibles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}