'use client'

import { Planificacion } from '@/lib/types'
import RecursoAudio from './planificacion/RecursoAudio'
import RecursoImagen from './planificacion/RecursoImagen'
import RecursoPDF from './planificacion/RecursoPDF'
import RecursoVideo from './planificacion/RecursoVideo'
import RecursoEnlace from './planificacion/RecursoEnlace'
import ThemeToggle from './ThemeToggle'

const getLang = (materia: string): string => {
  return materia === 'ingles' || materia === 'Inglés' ? 'en-US' : 'fr-FR'
}

interface Props {
  planificacion: Planificacion
}

export default function EstudianteView({ planificacion }: Props) {
  const lang = getLang(planificacion.materia)

  return (
    <article>
      <header className="mb-6">
        <h1 className="flex justify-between text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {planificacion.tema}
            <ThemeToggle />
        </h1>

        {planificacion.contenidoEstudianteGeneral && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-line">
              {planificacion.contenidoEstudianteGeneral}
            </p>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {planificacion.materia} · {planificacion.grado?.replace('-', ' ')}
        </div>
      </header>

      <div className="space-y-6">
        {planificacion.momentos?.map((momento, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
              {momento.tipo === 'inicio' ? '🚀' : momento.tipo === 'desarrollo' ? '📝' : '🎯'} {momento.tipo}
            </h3>
            
            {momento.contenidoEstudiante && (
              <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
                {momento.contenidoEstudiante}
              </p>
            )}

            {momento.actividades?.length > 0 && (
              <div className="space-y-3">
                {momento.actividades.map((act, aIdx) => (
                  <div key={aIdx} className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {act.titulo}
                    </h4>
                    
                    {act.contenidoEstudiante && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                        {act.contenidoEstudiante}
                      </p>
                    )}

                    {act.descripcion && !act.contenidoEstudiante && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-line">
                        {act.descripcion}
                      </p>
                    )}

                    {/* Recursos multimedia */}
                    {act.recursos?.map((recurso, rIdx) => (
                      <div key={rIdx} className="mt-2">
                        {recurso.tipo === 'audio' && recurso.texto && (
                          <RecursoAudio texto={recurso.texto} traduccion={recurso.traduccion} lang={lang} />
                        )}
                        {recurso.tipo === 'imagen' && recurso.url && (
                          <RecursoImagen url={recurso.url} descripcion={recurso.descripcion} />
                        )}
                        {recurso.tipo === 'pdf' && recurso.url && (
                          <RecursoPDF url={recurso.url} descripcion={recurso.descripcion} />
                        )}
                        {recurso.tipo === 'video' && recurso.url && (
                          <RecursoVideo url={recurso.url} descripcion={recurso.descripcion} />
                        )}
                        {recurso.tipo === 'enlace' && recurso.url && (
                          <RecursoEnlace url={recurso.url} descripcion={recurso.descripcion} />
                        )}
                      </div>
                    ))}

                    {act.duracion && (
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        ⏱ {act.duracion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}