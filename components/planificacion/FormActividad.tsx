'use client'

import { Actividad } from './formTypes'
import FormRecurso from './FormRecurso'

interface Props {
  actividad: Actividad
  index: number
  onChange: (actividad: Actividad) => void
  onDelete: () => void
}

export default function FormActividad({ actividad, index, onChange, onDelete }: Props) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const textareaClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"

  return (
    <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-xs text-gray-500 dark:text-gray-400">Actividad {index + 1}</span>
        <button type="button" onClick={onDelete} className="text-xs text-red-500 hover:text-red-700">Eliminar</button>
      </div>

      <input type="text" placeholder="Título" value={actividad.titulo}
        onChange={(e) => onChange({ ...actividad, titulo: e.target.value })}
        className={inputClass} required />

      <textarea placeholder="Descripción (Guía Docente)" value={actividad.descripcion}
        onChange={(e) => onChange({ ...actividad, descripcion: e.target.value })}
        className={textareaClass} rows={2} />

      <textarea placeholder="Contenido visible para estudiantes" value={actividad.estudiante}
        onChange={(e) => onChange({ ...actividad, estudiante: e.target.value })}
        className={textareaClass} rows={2} />

      <input type="text" placeholder="Duración (ej: 15 min)" value={actividad.duracion}
        onChange={(e) => onChange({ ...actividad, duracion: e.target.value })}
        className={inputClass} />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Recursos multimedia</label>
          <button
            type="button"
            onClick={() => onChange({
              ...actividad,
              recursos: [...actividad.recursos, { tipo: 'audio', url: '', texto: '', traduccion: '', descripcion: '' }]
            })}
            className="text-xs text-green-600 dark:text-green-400 hover:underline"
          >
            + Añadir recurso
          </button>
        </div>
        {actividad.recursos.map((recurso, rIdx) => (
          <FormRecurso
            key={rIdx}
            recurso={recurso}
            onChange={(nuevo) => {
              const nuevos = [...actividad.recursos]
              nuevos[rIdx] = nuevo
              onChange({ ...actividad, recursos: nuevos })
            }}
            onDelete={() => {
              const nuevos = actividad.recursos.filter((_, i) => i !== rIdx)
              onChange({ ...actividad, recursos: nuevos })
            }}
          />
        ))}
      </div>
    </div>
  )
}