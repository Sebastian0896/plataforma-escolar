'use client'

import { Momento } from './formTypes'
import FormActividad from './FormActividad'

import {
  Card,
  CardContent,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'

import { Plus } from 'lucide-react'

interface Props {
  momento: Momento
  index: number
  onChange: (momento: Momento) => void
}

export default function FormMomento({
  momento,
  index,
  onChange,
}: Props) {
  const iconos: Record<string, string> = {
    inicio: '🚀',
    desarrollo: '📝',
    cierre: '🎯',
  }

  return (
    <Card className="rounded-3xl border-border/60 shadow-sm">
      
      <CardContent className="space-y-6 p-5 sm:p-6 lg:p-7">
        
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold capitalize text-foreground">
              {iconos[momento.tipo]} Momento {index + 1}:{' '}
              {momento.tipo}
            </h2>

            <p className="text-sm text-muted-foreground">
              Gestioná el contenido y actividades de este momento.
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto rounded-xl"
            onClick={() =>
              onChange({
                ...momento,
                actividades: [
                  ...momento.actividades,
                  {
                    titulo: '',
                    descripcion: '',
                    estudiante: '',
                    duracion: '',
                    recursos: [],
                  },
                ],
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir actividad
          </Button>
        </div>

        {/* Fields */}
        <div className="space-y-5">
          
          {/* Docente */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Descripción (Guía Docente)
            </label>

            <Textarea
              value={momento.descripcion}
              onChange={(e) =>
                onChange({
                  ...momento,
                  descripcion: e.target.value,
                })
              }
              rows={4}
              required
              placeholder="Escribí las instrucciones o guía para el docente..."
              className="resize-none rounded-2xl"
            />
          </div>

          {/* Estudiante */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Contenido visible para estudiantes
            </label>

            <Textarea
              value={momento.estudiante}
              onChange={(e) =>
                onChange({
                  ...momento,
                  estudiante: e.target.value,
                })
              }
              rows={4}
              placeholder="Contenido que verán los estudiantes..."
              className="resize-none rounded-2xl"
            />
          </div>
        </div>

        {/* Actividades */}
        <div className="space-y-4">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                Actividades
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Añadí dinámicas y tareas para este momento.
              </p>
            </div>
          </div>

          {momento.actividades.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No hay actividades agregadas todavía.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {momento.actividades.map((actividad, aIdx) => (
              <FormActividad
                key={aIdx}
                actividad={actividad}
                index={aIdx}
                onChange={(nueva) => {
                  const nuevas = [...momento.actividades]

                  nuevas[aIdx] = nueva

                  onChange({
                    ...momento,
                    actividades: nuevas,
                  })
                }}
                onDelete={() => {
                  const nuevas =
                    momento.actividades.filter(
                      (_, i) => i !== aIdx
                    )

                  onChange({
                    ...momento,
                    actividades: nuevas,
                  })
                }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}