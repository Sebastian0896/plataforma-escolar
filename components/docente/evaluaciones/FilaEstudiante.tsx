// components/docente/evaluaciones/FilaEstudiante.tsx
import React, { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { NotaInput } from '@/components/ui/NotaInput';
import { Estudiante, ResumenEstudiante, Competencia } from './types';

interface FilaEstudianteProps {
  estudiante: Estudiante;
  resumen?: ResumenEstudiante;
  competencias?: Competencia[];
  notasEstudiante?: Record<string, number>;
  onNotaChange: (competenciaId: string, valor: number) => void;
  onNextCompetencia?: (competenciaId: string) => void;
}

//Estos nombres coinciden exactamente con los de la bd, para poder filtrar los nombres cortos.
const NOMBRES_CORTOS: Record<string, string> = {
  'Comunicativa': 'C1',
  'Pensamiento Lógico, Crítico y Creativo; Resolución de Problema': 'C2-C3',
  'Ética y Ciudadana; Científica y Tecnológica': 'C4-C5',
  'Ambiental y de la Salud; Desarrollo Personal y Espiritual': 'C6-C7',
};

const getColorNota = (n: number | undefined) => {
  if (n === undefined || n === null || isNaN(n)) return '';
  if (n >= 80) return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900 dark:text-green-300';
  if (n >= 65) return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
  return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300';
};

export const FilaEstudiante = React.memo(function FilaEstudiante({
  estudiante,
  resumen,
  competencias = [],
  notasEstudiante = {},
  onNotaChange,
  onNextCompetencia,
}: FilaEstudianteProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleNext = (currentIndex: number) => {
    // Ir al siguiente input del mismo estudiante
    if (currentIndex + 1 < competencias.length) {
      inputRefs.current[currentIndex + 1]?.focus();
    } else if (onNextCompetencia && competencias.length > 0) {
      // Si es la última competencia, pasar al siguiente estudiante (lo maneja el padre)
      onNextCompetencia(competencias[currentIndex].id);
    }
  };

  const handlePrev = (currentIndex: number) => {
    if (currentIndex - 1 >= 0) {
      inputRefs.current[currentIndex - 1]?.focus();
    }
  };

  if (competencias.length === 0) {
    return (
      <div className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">{estudiante.nombre}</p>
          <p className="truncate text-xs text-muted-foreground">{estudiante.email}</p>
          <p className="text-xs text-muted-foreground mt-1">Cargando competencias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-foreground">{estudiante.nombre}</p>
        <p className="truncate text-xs text-muted-foreground">{estudiante.email}</p>
        
        {resumen && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">⭐ {resumen.estrellas}</Badge>
            <Badge variant="outline" className="text-xs">📝 {resumen.tareas} / {resumen.totalDias}</Badge>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:flex sm:items-center sm:gap-3">
        {competencias.map((comp, idx) => {
          const notaActual = notasEstudiante?.[comp.id];
          const nombreCorto = NOMBRES_CORTOS[comp.nombre] || comp.nombre.substring(0, 3);
          const colorNota = getColorNota(notaActual);
          
          return (
            <div key={comp.id} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium uppercase text-muted-foreground sm:text-xs">
                {nombreCorto}
              </span>
              
              <NotaInput
                ref={(el) => { inputRefs.current[idx] = el }}
                value={notaActual}
                onChange={(valor) => onNotaChange(comp.id, valor)}
                onNext={() => handleNext(idx)}
                onPrev={() => handlePrev(idx)}
                className={`h-11 w-full rounded-xl border shadow-sm transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-primary sm:w-16 ${colorNota}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});