
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CoordinadorStats } from '@/components/coordinador/CoordinadorStats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, BookOpen, TrendingUp } from 'lucide-react'

interface StatsData {
  resumen: {
    totalDocentes: number
    totalEstudiantes: number
    totalMaterias: number
    periodosActivos: number
    totalPlanificaciones: number
    planificacionesSemana: number
    ratioEstudianteDocente: number
  }
  estudiantesPorGrado: { grado: string; cantidad: number }[]
  docentesPorMateria: { materia: string; cantidad: number }[]
  docentesTop: { docenteId: string; nombre: string; email: string; total: number }[]
}

export default function CoordinadorDashboard() {
  const params = useParams()
  const centroId = params?.id as string
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await fetch(`/api/coordinador/stats?centroId=${centroId}`)
        const result = await res.json()
        setData(result)
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        setLoading(false)
      }
    }

    if (centroId) {
      cargarDatos()
    }
  }, [centroId])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No se pudieron cargar los datos
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas */}
      <CoordinadorStats stats={data.resumen} />

      {/* Distribución de estudiantes por grado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Distribución de Estudiantes por Grado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.estudiantesPorGrado.map((grado) => (
              <div key={grado.grado}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{grado.grado.replace('-', ' ')}</span>
                  <span className="font-semibold">{grado.cantidad} estudiantes</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${(grado.cantidad / data.resumen.totalEstudiantes) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Docentes por materia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Docentes por Materia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.docentesPorMateria.slice(0, 10).map((item) => (
                <div key={item.materia} className="flex justify-between items-center">
                  <span className="text-sm capitalize">{item.materia.replace('-', ' ')}</span>
                  <span className="text-sm font-medium">
                    {item.cantidad} docente{item.cantidad !== 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top docentes con más planificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Docentes más activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.docentesTop.map((docente, idx) => (
                <div key={docente.docenteId} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{docente.nombre}</p>
                      <p className="text-xs text-muted-foreground">{docente.email}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold bg-primary/10 px-2 py-1 rounded">
                    {docente.total} planif.
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}