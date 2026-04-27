// components/MomentoSection.tsx
'use client';

import { Momento, Rol } from '@/lib/types';
import ActividadItem from './ActividadItem';
import { useState } from 'react';

const momentoConfig = {
  inicio: {
    color: 'bg-green-50 border-green-200',
    dot: 'bg-green-500',
    label: 'Inicio',
    icon: '🚀',
  },
  desarrollo: {
    color: 'bg-blue-50 border-blue-200',
    dot: 'bg-blue-500',
    label: 'Desarrollo',
    icon: '📝',
  },
  cierre: {
    color: 'bg-purple-50 border-purple-200',
    dot: 'bg-purple-500',
    label: 'Cierre',
    icon: '🎯',
  },
};

interface MomentoSectionProps {
  momento: Momento;
  rol?: Rol;
  lang?: string;
}

export default function MomentoSection({ momento, rol = 'estudiante', lang = "fr-FR" }: MomentoSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const config = momentoConfig[momento.tipo];
  
  const descripcionVisible = rol === 'estudiante' && momento.contenidoEstudiante
    ? momento.contenidoEstudiante
    : momento.descripcion;

  return (
    <div className={`p-4 rounded-xl border ${config.color}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${config.dot}`} />
          <h3 className="font-semibold text-gray-900">
            {config.icon} {config.label}
          </h3>
        </div>
        {rol === 'profesor' && momento.contenidoEstudiante && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-md bg-white/60 hover:bg-white px-2 py-1 rounded border border-gray-300 text-gray-600 transition-colors"
          >
            {expanded ? '👁 Ocultar guía' : '👁 Ver guía docente'}
          </button>
        )}
      </div>
      
      <p className="text-md text-gray-700 mb-3">{descripcionVisible}</p>
      
      {expanded && rol === 'profesor' && (
        <div className="mb-3 p-3 bg-white/70 border border-dashed border-purple-300 rounded-lg">
          <p className="text-md font-semibold text-purple-800 mb-1">📋 Guía para el docente:</p>
          <p className="text-lg text-purple-700">{momento.descripcion}</p>
          <p className="text-md font-semibold text-purple-800 mt-2 mb-1">👩‍🎓 Lo que ve el estudiante:</p>
          <p className="text-md text-purple-700">{momento.contenidoEstudiante}</p>
        </div>
      )}
      
       <div className="space-y-2">
        {momento.actividades.map((act, idx) => (
          <ActividadItem key={idx} actividad={act} rol={rol} lang={lang} />
      ))}
      </div>
    </div>
  );
}