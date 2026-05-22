// components/docente/evaluaciones/FilaEstudiante.tsx
import { Badge } from '@/components/ui/badge';
import { Estudiante, ResumenEstudiante } from './types';

interface FilaEstudianteProps {
  estudiante: Estudiante;
  resumen?: ResumenEstudiante;
  nota: number | undefined;
  onNotaChange: (valor: number) => void;
}

export function FilaEstudiante({ estudiante, resumen, nota, onNotaChange }: FilaEstudianteProps) {
  const getColorNota = (n: number | undefined) => {
    if (n === undefined || n === null) return '';
    if (n >= 80) return 'bg-green-50 border-green-200 text-green-700 dark:bg-green-950/30 dark:border-green-900 dark:text-green-300';
    if (n >= 65) return 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-300';
    return 'bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300';
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/20">
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{estudiante.nombre}</p>
        <p className="truncate text-xs text-muted-foreground">{estudiante.email}</p>
        
        {resumen && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">⭐ {resumen.estrellas}</Badge>
            <Badge variant="outline">📝 {resumen.tareas} / {resumen.totalDias}</Badge>
          </div>
        )}
      </div>

      <div className="shrink-0">
        <input
          type="number"
          min="0"
          max="100"
          inputMode="numeric"
          value={nota ?? ''}
          onChange={(e) => {
            const valor = Number(e.target.value);
            if (valor >= 0 && valor <= 100) onNotaChange(valor);
          }}
          onFocus={(e) => e.target.select()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const inputs = Array.from(document.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
              const index = inputs.indexOf(e.currentTarget);
              inputs[index + 1]?.focus();
            }
          }}
          className={`h-12 w-20 rounded-2xl border text-center text-base font-bold shadow-sm outline-none transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-primary [appearance:textfield] ${getColorNota(nota)}`}
        />
      </div>
    </div>
  );
}