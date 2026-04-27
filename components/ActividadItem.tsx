// components/ActividadItem.tsx
'use client';

import { Actividad, Rol } from '@/lib/types';
import TextToSpeech from './TextToSpeech';
import { useState } from 'react';

interface ActividadItemProps {
  actividad: Actividad;
  rol?: Rol;
  lang?: string;
}

export default function ActividadItem({ actividad, rol = 'estudiante', lang="fr-FR" }: ActividadItemProps) {
  const [expanded, setExpanded] = useState(false);
  const contenidoEspanol = rol === 'estudiante' && actividad.audioTexto
    ? actividad.audioTexto
    : actividad.descripcion;

  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between gap-2">
        <h5 className="font-medium text-gray-800 text-sm">
          {actividad.titulo}
        </h5>
        <div className="flex items-center gap-2">
          {actividad.duracion && (
            <span className="text-xs text-gray-500 whitespace-nowrap tabular-nums">
              ⏱ {actividad.duracion}
            </span>
          )}
          {/* Botón para mostrar guía docente (solo en modo profesor) */}
          {rol === 'profesor' && actividad.contenidoEstudiante && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-purple-600 hover:text-purple-800 underline"
            >
              {expanded ? 'Ver menos' : 'Guía docente'}
            </button>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{contenidoEspanol}</p>
      
      {expanded && rol === 'profesor' && (
        <div className="mt-2 p-2 bg-purple-50 border border-purple-200 rounded text-md text-purple-800">
          <p className="font-semibold mb-1">📋 Vista del estudiante:</p>
          <p className="whitespace-pre-line">{actividad.contenidoEstudiante}</p>
        </div>
      )}
      
      {actividad.audioTexto && (
      <div className="mt-2">
        <TextToSpeech 
          text={actividad.audioTexto} 
          traduccion={actividad.audioTraduccion}
          lang={lang} // Se pasa el idioma
        />
      </div>
      )}
    </div>
  );
}