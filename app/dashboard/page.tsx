import {
  Card,
  CardContent,
} from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center py-10 sm:py-16">
      
      <Card className="w-full max-w-2xl rounded-3xl border-border/60 shadow-sm">
        
        <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
          
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-4xl">
            📚
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Planificaciones
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Seleccioná un tema desde el menú lateral para comenzar a
            visualizar o editar tus planificaciones.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}