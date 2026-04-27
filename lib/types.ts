// lib/types.ts

export interface Actividad {
  titulo: string;
  descripcion: string;
  contenidoEstudiante?: string;
  audioTexto?: string;
  audioTraduccion?: string;
  recursos?: string;
  duracion?: string;
}

export interface Momento {
  tipo: 'inicio' | 'desarrollo' | 'cierre';
  descripcion: string;
  contenidoEstudiante?: string;
  actividades: Actividad[];
}

export interface Planificacion {
  slug: string;
  materia: string;
  tema: string;
  competencia: string;
  indicadorLogro: string;
  contenidoEstudianteGeneral?: string;
  momentos: Momento[];
  maestro: string;
  coordinadora: string;
  centroEducativo: string;
  anoEscolar: string;
}

export interface Materia {
  nombre: string;
  slug: string;
  temas: {
    slug: string;
    tema: string;
  }[];
}

export type Rol = 'estudiante' | 'profesor';