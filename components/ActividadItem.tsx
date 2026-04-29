// components/ActividadItem.tsx
'use client'

import { Actividad, Recurso, Rol } from '@/lib/types'
import TextToSpeech from './TextToSpeech'
import Image from 'next/image'

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
        <h5 className="font-medium text-green-800 dark:text-green-300 text-sm">{actividad.titulo}</h5>
        {actividad.duracion && (
          <span className="text-xs text-gray-500 whitespace-nowrap">⏱ {actividad.duracion}</span>
        )}
      </div>
      <p className="text-sm text-blue-800 dark:text-blue-300 mt-1 whitespace-pre-line">{contenido}</p>

      {/* Recursos multimedia */}
      {actividad.recursos?.map((recurso, idx) => (
        <RecursoRenderer key={idx} recurso={recurso} lang={lang} />
      ))}
    </div>
  )
}

function RecursoRenderer({ recurso, lang }: { recurso: Recurso; lang: string }) {
  switch (recurso.tipo) {
    case 'audio':
      return recurso.texto ? (
        <div className="mt-2">
          <TextToSpeech text={recurso.texto} traduccion={recurso.traduccion} lang={lang} />
        </div>
      ) : null

    case 'imagen':
      return recurso.url ? (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
          <Image
            src={recurso.url}
            alt={recurso.descripcion || 'Imagen'}
            width={400}
            height={300}
            className="w-full h-auto"
          />
          {recurso.descripcion && (
            <p className="text-xs text-gray-500 p-2 bg-white">{recurso.descripcion}</p>
          )}
        </div>
      ) : null

    case 'pdf':
      return recurso.url ? (
        <a
          href={recurso.url}
          target="_blank"
          rel="noopener"
          className="mt-2 inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 border border-red-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
          {recurso.descripcion || 'Ver documento PDF'}
        </a>
      ) : null

    case 'video':
      return recurso.url ? (
        <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
          <video src={recurso.url} controls className="w-full">
            Tu navegador no soporta video.
          </video>
          {recurso.descripcion && (
            <p className="text-xs text-gray-500 p-2 bg-white">{recurso.descripcion}</p>
          )}
        </div>
      ) : null

    case 'enlace':
      return recurso.url ? (
        <a
          href={recurso.url}
          target="_blank"
          rel="noopener"
          className="mt-2 inline-flex items-center gap-1 text-blue-600 text-sm hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
          </svg>
          {recurso.descripcion || recurso.url}
        </a>
      ) : null

      case 'imagen':
  return recurso.url ? (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
      <img
        src={recurso.url}
        alt={recurso.descripcion || 'Imagen'}
        className="w-full h-auto max-h-96 object-contain"
      />
      {recurso.descripcion && (
        <p className="text-xs text-gray-500 p-2 bg-white">{recurso.descripcion}</p>
      )}
    </div>
  ) : null

    default:
      return null
  }
}