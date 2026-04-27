// components/PlanificacionView.tsx
'use client';

import { useState } from 'react';
import { Planificacion, Rol } from '@/lib/types';
import MomentoSection from './MomentoSection';

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
  };
  
  return langMap[materia] || 'fr-FR';
};

export default function PlanificacionView({ planificacion }: { planificacion: Planificacion }) {
  const [rol, setRol] = useState<Rol>('estudiante');
  const lang = getLang(planificacion.materia);

  //console.log('🌐 Materia:', planificacion.materia, '→ Idioma:', lang);

  return (
    <article className="animate-in">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{planificacion.materia}</span>
            <span>/</span>
            <span>{planificacion.tema}</span>
          </div>
          
          {/* Selector de rol temporal */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setRol('estudiante')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                rol === 'estudiante'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🎒 Estudiante
            </button>
            <button
              onClick={() => setRol('profesor')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                rol === 'profesor'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              👩‍🏫 Profesor
            </button>
          </div>
        </div>

        {/* Cabecera institucional */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
              </svg>
            </div>
            <div className="text-white">
              <h2 className="text-lg font-bold leading-tight">Centro Educativo Salomé Ureña</h2>
              <p className="text-blue-100 text-xs">Formando el futuro con excelencia</p>
            </div>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Maestro</h3>
                  <p className="text-sm text-gray-700">{planificacion.maestro || 'Sebastián González Rodríguez'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-600">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Coordinadora</h3>
                  <p className="text-sm text-gray-700">{planificacion.coordinadora || 'Susana'}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block">Año escolar</span>
                <span className="font-medium text-gray-700">{planificacion.anoEscolar || '2025-2026'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Asignatura</span>
                <span className="font-medium text-gray-700">{planificacion.materia}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Tema</span>
                <span className="font-medium text-gray-700">{planificacion.tema}</span>
              </div>
              {/* <div>
                <span className="text-gray-500 block">Idioma</span>
                <span className="font-medium text-gray-700">{lang === 'fr-FR' ? 'Francés' : 'Inglés'}</span>
              </div> */}
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {planificacion.tema}
        </h1>
        
        <div className="grid gap-2 bg-white p-4 rounded-xl border border-gray-200">
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Competencia</span>
            <p className="text-sm text-gray-800 mt-0.5">{planificacion.competencia}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">Indicador de Logro</span>
            <p className="text-sm text-gray-800 mt-0.5">{planificacion.indicadorLogro}</p>
          </div>
          {planificacion.contenidoEstudianteGeneral && (
            <div>
              <span className="text-xs font-semibold uppercase text-gray-500 tracking-wide">📖 Para los estudiantes</span>
              <p className="text-sm text-gray-800 mt-0.5">{planificacion.contenidoEstudianteGeneral}</p>
            </div>
          )}
        </div>
      </header>

      {/* Momentos - Pasando lang */}
      <div className="space-y-4">
        {planificacion.momentos.map((momento, idx) => (
          <MomentoSection key={idx} momento={momento} rol={rol} lang={lang} />
        ))}
      </div>
    </article>
  );
}