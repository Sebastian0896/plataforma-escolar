'use client'

import { Recurso } from './formTypes'
import FileUpload from '@/components/FileUpload'

interface Props {
  recurso: Recurso
  onChange: (recurso: Recurso) => void
  onDelete: () => void
}

export default function FormRecurso({ recurso, onChange, onDelete }: Props) {
  return (
    <div className="p-2 bg-white dark:bg-slate-600 rounded border border-gray-200 dark:border-slate-500 space-y-2">
      <div className="flex justify-between">
        <select
          value={recurso.tipo}
          onChange={(e) => onChange({ ...recurso, tipo: e.target.value, url: '', texto: '', traduccion: '' })}
          className="text-xs px-2 py-1 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
        >
          <option value="audio">🎵 Audio</option>
          <option value="imagen">🖼️ Imagen</option>
          <option value="pdf">📄 PDF</option>
          <option value="video">🎬 Video</option>
          <option value="enlace">🔗 Enlace</option>
        </select>
        <button type="button" onClick={onDelete} className="text-xs text-red-500">Eliminar</button>
      </div>

      {recurso.tipo === 'audio' && (
        <>
          <textarea
            placeholder="Texto para audio"
            value={recurso.texto}
            onChange={(e) => onChange({ ...recurso, texto: e.target.value })}
            className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            rows={2}
          />
          <textarea
            placeholder="Traducción"
            value={recurso.traduccion}
            onChange={(e) => onChange({ ...recurso, traduccion: e.target.value })}
            className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            rows={2}
          />
        </>
      )}

      {(recurso.tipo === 'imagen' || recurso.tipo === 'pdf' || recurso.tipo === 'video' || recurso.tipo === 'enlace') && (
        <>
          <input
            type="text" placeholder="URL"
            value={recurso.url}
            onChange={(e) => onChange({ ...recurso, url: e.target.value })}
            className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <input
            type="text" placeholder="Descripción"
            value={recurso.descripcion}
            onChange={(e) => onChange({ ...recurso, descripcion: e.target.value })}
            className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <FileUpload
            onUpload={(url) => onChange({ ...recurso, url })}
            accept={
              recurso.tipo === 'imagen' ? 'image/*' :
              recurso.tipo === 'pdf' ? '.pdf,.doc,.docx' :
              recurso.tipo === 'video' ? 'video/*' : '*/*'
            }
          />
        </>
      )}
    </div>
  )
}