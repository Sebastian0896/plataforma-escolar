'use client'

import { Momento } from './formTypes'
import FormActividad from './FormActividad'

interface Props {
  momento: Momento
  index: number
  onChange: (momento: Momento) => void
}

export default function FormMomento({ momento, index, onChange }: Props) {
  const textareaClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  const iconos: Record<string, string> = { inicio: '🚀', desarrollo: '📝', cierre: '🎯' }

  return (
    <div className={cardClass}>
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4 capitalize">
        {iconos[momento.tipo]} Momento {index + 1}: {momento.tipo}
      </h2>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Descripción (Guía Docente)</label>
          <textarea value={momento.descripcion}
            onChange={(e) => onChange({ ...momento, descripcion: e.target.value })}
            className={textareaClass} rows={2} required />
        </div>
        <div>
          <label className={labelClass}>Contenido visible para estudiantes</label>
          <textarea value={momento.estudiante}
            onChange={(e) => onChange({ ...momento, estudiante: e.target.value })}
            className={textareaClass} rows={2} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Actividades</label>
            <button
              type="button"
              onClick={() => onChange({
                ...momento,
                actividades: [...momento.actividades, { titulo: '', descripcion: '', estudiante: '', duracion: '', recursos: [] }]
              })}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Añadir actividad
            </button>
          </div>
          {momento.actividades.map((actividad, aIdx) => (
            <FormActividad
              key={aIdx}
              actividad={actividad}
              index={aIdx}
              onChange={(nueva) => {
                const nuevas = [...momento.actividades]
                nuevas[aIdx] = nueva
                onChange({ ...momento, actividades: nuevas })
              }}
              onDelete={() => {
                const nuevas = momento.actividades.filter((_, i) => i !== aIdx)
                onChange({ ...momento, actividades: nuevas })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}