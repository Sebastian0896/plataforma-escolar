'use client'

import { Actividad, Recurso, Rol } from '@/lib/types'
import RecursoAudio from './planificacion/RecursoAudio'
import RecursoImagen from './planificacion/RecursoImagen'
import RecursoPDF from './planificacion/RecursoPDF'
import RecursoVideo from './planificacion/RecursoVideo'
import RecursoEnlace from './planificacion/RecursoEnlace'

interface ActividadItemProps {
  actividad: Actividad
  rol?: Rol
  lang?: string
}

export default function ActividadItem({ actividad, rol = 'estudiante', lang = 'fr-FR' }: ActividadItemProps) {
  const contenido = rol === 'estudiante' && actividad.contenidoEstudiante
    ? actividad.contenidoEstudiante
    : actividad.descripcion

  return (
    <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-slate-700">
      <div className="flex items-start justify-between gap-2">
        <h5 className="font-medium text-gray-800 dark:text-gray-100 text-sm">{actividad.titulo}</h5>
        {actividad.duracion && <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">⏱ {actividad.duracion}</span>}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line">{contenido}</p>

      {actividad.recursos?.map((recurso, idx) => (
        <RecursoRenderer key={idx} recurso={recurso} lang={lang} />
      ))}
    </div>
  )
}

function RecursoRenderer({ recurso, lang }: { recurso: Recurso; lang: string }) {
  switch (recurso.tipo) {
    case 'audio':
      return recurso.texto ? <RecursoAudio texto={recurso.texto} traduccion={recurso.traduccion} lang={lang} /> : null
    case 'imagen':
      return recurso.url ? <RecursoImagen url={recurso.url} descripcion={recurso.descripcion} /> : null
    case 'pdf':
      return recurso.url ? <RecursoPDF url={recurso.url} descripcion={recurso.descripcion} /> : null
    case 'video':
      return recurso.url ? <RecursoVideo url={recurso.url} descripcion={recurso.descripcion} /> : null
    case 'enlace':
      return recurso.url ? <RecursoEnlace url={recurso.url} descripcion={recurso.descripcion} /> : null
    default:
      return null
  }
}