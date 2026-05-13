// components/coordinador/CoordinadorDashboard.tsx
'use client'

interface CoordinadorDashboardClientProps {
  centro: any
  stats: any
  docentes: any[]
}

export function CoordinadorDashboardClient({ centro, stats, docentes }: CoordinadorDashboardClientProps) {
  if (!stats) {
    return <div>Cargando estadísticas...</div>
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Panel de Coordinación
        </h1>
        <p className="text-muted-foreground">
          {centro?.nombre || 'Centro Educativo'}
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Docentes</p>
          <p className="text-2xl font-bold">{stats.totalDocentes || 0}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Estudiantes</p>
          <p className="text-2xl font-bold">{stats.totalEstudiantes || 0}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Materias</p>
          <p className="text-2xl font-bold">{stats.totalMaterias || 0}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground">Periodos activos</p>
          <p className="text-2xl font-bold">{stats.periodosActivos || 0}</p>
        </div>
      </div>

      {/* Lista de docentes */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Docentes del Centro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {docentes?.map((docente) => (
            <div key={docente.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{docente.nombre}</h3>
              <p className="text-sm text-muted-foreground">{docente.email}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {docente.materias?.slice(0, 3).map((m: string) => (
                  <span key={m} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {m.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}