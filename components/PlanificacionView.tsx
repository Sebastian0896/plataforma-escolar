'use client'

import { useState } from 'react'
import { Planificacion, Rol } from '@/lib/types'
import MomentoSection from './MomentoSection'

import { useSession } from 'next-auth/react'
import Image from 'next/image'

import BotonPDF from './BotonPDF'

const getLang = (materia: string): string => {
  const langMap: Record<string, string> = {
    'Francés': 'fr-FR',
    'Frances': 'fr-FR',
    'francés': 'fr-FR',
    'frances': 'fr-FR',
    'Inglés': 'en-US',
    'Ingles': 'en-US',
    'inglés': 'en-US',
    'ingles': 'en-US',
  }

  
  return langMap[materia] || 'fr-FR'
}

interface PlanificacionViewProps {
  planificacion: Planificacion
  soloEstudiante?: boolean
}

export default function PlanificacionView({
  planificacion,
  soloEstudiante = false,
}: PlanificacionViewProps) {
  const { data: session } = useSession()
  const lang = getLang(planificacion.materia)
  
  const rol: Rol = soloEstudiante
  ? 'estudiante'
  : session ? 'profesor' : 'estudiante'
  
  function formatear(texto: string): string {
  if (!texto) return ''
  return texto
    .split('-')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ')
  }
  return (
    <article className="animate-in">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-4">
          <span>{formatear(planificacion.materia)}</span>
          <span>/</span>
          <span>{planificacion.tema}</span>
          {!soloEstudiante && session && (
            <span className="ml-auto text-xs bg-gray-50 dark:bg-slate-800/50 px-2 py-1 rounded">
              👩‍🏫 Vista docente
            </span>
          )}
        </div>

        {/* Cabecera institucional */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-4">
                        
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden relative">
              <Image
                src="/logo-salome-urena.png"
                alt="Logo Centro Educativo Salomé Ureña"
                width={56}
                height={56}
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="text-white">
              <h2 className="text-lg font-bold leading-tight">
                Centro Educativo Salomé Ureña
              </h2>
              <p className="text-blue-100 text-xs">Formando el futuro con excelencia</p>
            </div>
            
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-blue-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Maestro</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {planificacion.maestro || 'Sebastián González Rodríguez'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-purple-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Coordinadora</h3>
                  <p className="text-sm text-gray-700text-gray-700 dark:text-gray-200">
                    {planificacion.coordinadora || 'Susana'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Año escolar</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {planificacion.anoEscolar || '2025-2026'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Asignatura</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{formatear(planificacion.materia)}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Tema</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{planificacion.tema}</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {planificacion.tema}
        </h1>

        <div className="grid gap-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700">
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
              Competencia
            </span>
            <p className="text-sm text-gray-800text-gray-800 dark:text-gray-100 mt-0.5">{planificacion.competencia}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
              Indicador de Logro
            </span>
            <p className="text-sm text-gray-800 dark:text-gray-100 mt-0.5">{planificacion.indicadorLogro}</p>
          </div>
          {planificacion.contenidoEstudianteGeneral && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                📖 Para los estudiantes
              </span>
              <p className="text-sm text-gray-800 dark:text-gray-100 mt-0.5">
                {planificacion.contenidoEstudianteGeneral}
              </p>
            </div>
          )}
        </div>
      </header>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{planificacion.tema}</h1>
        <BotonPDF slug={planificacion.slug} grado={planificacion.grado} />
      </div>

      {/* Momentos */}
      <div className="space-y-4">
        {planificacion.momentos.map((momento, idx) => (
          <MomentoSection key={idx} momento={momento} rol={rol} lang={lang} />
        ))}
      </div>
    </article>
  )
}