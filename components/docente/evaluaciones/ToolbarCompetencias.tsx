// components/docente/evaluaciones/ToolbarCompetencias.tsx
import { Button } from '@/components/ui/button';
import { Competencia } from './types';

interface ToolbarCompetenciasProps {
  competencias: Competencia[];
  competenciaActiva: string;
  setCompetenciaActiva: (id: string) => void;
}

export function ToolbarCompetencias({
  competencias,
  competenciaActiva,
  setCompetenciaActiva,
}: ToolbarCompetenciasProps) {
  const currentIndex = competencias.findIndex((c) => c.id === competenciaActiva);

  const navegar = (direccion: 'prev' | 'next') => {
    const nuevoIndex = direccion === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (nuevoIndex >= 0 && nuevoIndex < competencias.length) {
      setCompetenciaActiva(competencias[nuevoIndex].id);
    }
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1">
        <h3 className="font-semibold">Captura de notas</h3>
        <p className="text-sm text-muted-foreground">
          Registra las notas rápidamente seleccionando la competencia correspondiente.
        </p>
      </div>

     {/*  <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => navegar('prev')}
          >
            ←
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentIndex === competencias.length - 1}
            onClick={() => navegar('next')}
          >
            →
          </Button>
        </div>

        <select
          value={competenciaActiva}
          onChange={(e) => setCompetenciaActiva(e.target.value)}
          className="h-11 w-full rounded-xl border bg-background px-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-primary md:w-[320px]"
        >
          {competencias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
}