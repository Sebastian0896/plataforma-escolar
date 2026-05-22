// components/docente/evaluaciones/types.ts
export interface Competencia {
  id: string;
  nombre: string;
}

export interface Estudiante {
  id: string;
  nombre: string;
  email: string;
}

export interface ResumenEstudiante {
  estrellas: number;
  tareas: number;
  totalDias: number;
}

export type NotasEstado = Record<string, Record<string, number>>;