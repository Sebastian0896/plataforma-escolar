// lib/types.ts

/* export interface Actividad {
  titulo: string
  descripcion: string
  contenidoEstudiante?: string
  audioTexto?: string
  audioTraduccion?: string
  recursos?: string
  duracion?: string
} */

export interface Recurso {
  tipo: 'audio' | 'imagen' | 'pdf' | 'video' | 'enlace'
  url?: string
  texto?: string
  traduccion?: string
  descripcion?: string
}

export interface Actividad {
  titulo: string
  descripcion: string
  contenidoEstudiante?: string
  recursos: Recurso[]
  duracion?: string
}


export interface Momento {
  tipo: 'inicio' | 'desarrollo' | 'cierre'
  descripcion: string
  contenidoEstudiante?: string
  actividades: Actividad[]
}

export interface Planificacion {
  id: number
  slug: string
  materia: string
  tema: string
  competencia: string
  indicadorLogro: string
  contenidoEstudianteGeneral?: string
  momentos: Momento[]
  maestro: string
  coordinadora: string
  centroEducativo: string
  anoEscolar: string
  // Nuevos campos
  nivel: string
  ciclo: string
  grado: string
  categoriaDocente: string
}

export interface Materia {
  nombre: string
  slug: string
  temas: {
    id?: string
    slug: string
    tema: string
  }[]
}

// Nuevas interfaces para la jerarquía
export interface GradoInfo {
  nombre: string
  slug: string
  materias: Materia[]
}

export interface CicloInfo {
  nombre: string
  slug: string
  grados: GradoInfo[]
}

export interface NivelInfo {
  nombre: string
  slug: string
  ciclos: CicloInfo[]
}

export interface CategoriaDocente {
  nombre: string
  slug: string
  niveles: NivelInfo[]
}


export type Rol = 'estudiante' | 'profesor'