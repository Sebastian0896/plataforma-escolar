// components/docente/evaluaciones/FilaEstudiante.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Estudiante, ResumenEstudiante, Competencia } from './types';

interface FilaEstudianteProps {
  estudiante: Estudiante;
  resumen?: ResumenEstudiante;
  competencias?: Competencia[]; // ✅ Opcional con valor por defecto
  notasEstudiante?: Record<string, number>; // ✅ Opcional con valor por defecto
  onNotaChange: (competenciaId: string, valor: number) => void;
}

//He tomado los nombres largo directamente de la base de datos para poder comparar y hacer referencia  los nombres cortos
// Estos nombres están tal cual en la bd.
const NOMBRES_CORTOS: Record<string, string> = {
  'Comunicativa': 'C1',
  'Pensamiento Lógico, Crítico y Creativo; Resolución de Problema': 'C2-C3',
  'Ética y Ciudadana; Científica y Tecnológica': 'C4-C5',
  'Ambiental y de la Salud; Desarrollo Personal y Espiritual': 'C6-C7',
};

// Usamos React.memo para evitar que la fila entera se recalcule si cambian notas de OTROS estudiantes
export const FilaEstudiante = React.memo(function FilaEstudiante({
  estudiante,
  resumen,
  competencias = [], // ✅ Valor por defecto
  notasEstudiante = {}, // ✅ Valor por defecto
  onNotaChange,
}: FilaEstudianteProps) {
  
  const getColorNota = (n: number | undefined) => {
    if (n === undefined || n === null || isNaN(n)) return '';
    if (n >= 80) return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900 dark:text-green-300';
    if (n >= 65) return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
    return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300';
  };

  // ✅ Si no hay competencias, mostrar estado de carga
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
      {/* Datos del Estudiante */}
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

      {/* Grid de las 4 Notas Inline */}
      <div className="grid w-full grid-cols-4 gap-2 sm:w-auto sm:flex sm:items-center sm:gap-3">
        {competencias.map((comp) => {
          const notaActual = notasEstudiante?.[comp.id];
          const nombreCorto = NOMBRES_CORTOS[comp.nombre] || comp.nombre.substring(0, 3);
          
          return (
            <div key={comp.id} className="flex flex-col items-center gap-1">
              {/* Label pequeño de la competencia (ej: C1, C2-C3) */}
              <span className="text-[10px] font-medium uppercase text-muted-foreground sm:text-xs">
                {nombreCorto}
              </span>
              
              <input
                type="number"
                min="0"
                max="100"
                inputMode="numeric"
                placeholder="-"
                value={notaActual ?? ''}
                onChange={(e) => {
                  const valor = e.target.value === '' ? undefined : Number(e.target.value);
                  if (valor === undefined) {
                    onNotaChange(comp.id, 0);
                  } else if (valor >= 0 && valor <= 100) {
                    onNotaChange(comp.id, valor);
                  }
                }}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const inputs = Array.from(
                      document.querySelectorAll('input[type="number"]')
                    ) as HTMLInputElement[];
                    const index = inputs.indexOf(e.currentTarget);
                    inputs[index + 1]?.focus();
                  }
                }}
                className={`h-11 w-full rounded-xl border text-center text-sm font-bold shadow-sm outline-none transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-primary sm:w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${getColorNota(notaActual)}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Optimización de renderizado fina: Solo re-renderiza si cambian las notas de ESTE estudiante específico o sus datos
  return (
    prevProps.estudiante.id === nextProps.estudiante.id &&
    JSON.stringify(prevProps.notasEstudiante) === JSON.stringify(nextProps.notasEstudiante) &&
    prevProps.resumen?.estrellas === nextProps.resumen?.estrellas &&
    prevProps.competencias?.length === nextProps.competencias?.length
  );
});