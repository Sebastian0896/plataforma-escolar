// components/coordinador/CoordinadorStats.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, BookOpen, TrendingUp, FileText, Clock } from 'lucide-react'

interface StatsData {
  totalDocentes: number
  totalEstudiantes: number
  totalMaterias: number
  periodosActivos: number
  totalPlanificaciones: number
  planificacionesSemana: number
  ratioEstudianteDocente: number
}

interface CoordinadorStatsProps {
  stats: StatsData
}

export function CoordinadorStats({ stats }: CoordinadorStatsProps) {
  const cards = [
    {
      title: 'Docentes',
      value: stats.totalDocentes,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Estudiantes',
      value: stats.totalEstudiantes,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Materias',
      value: stats.totalMaterias,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: 'Planificaciones',
      value: stats.totalPlanificaciones,
      icon: FileText,
      color: 'bg-orange-500',
    },
    {
      title: 'Esta semana',
      value: stats.planificacionesSemana,
      icon: Clock,
      color: 'bg-cyan-500',
    },
    {
      title: 'Ratio E/D',
      value: stats.ratioEstudianteDocente,
      icon: TrendingUp,
      color: 'bg-indigo-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <div className={`h-10 w-10 rounded-lg ${card.color}/10 flex items-center justify-center`}>
              <card.icon className={`h-5 w-5 ${card.color.replace('bg-', 'text-')}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}