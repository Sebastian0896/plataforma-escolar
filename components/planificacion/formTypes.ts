export interface Recurso {
  tipo: string
  url: string
  texto: string
  traduccion: string
  descripcion: string
}

export interface Actividad {
  titulo: string
  descripcion: string
  estudiante: string
  duracion: string
  recursos: Recurso[]
}

export interface Momento {
  tipo: 'inicio' | 'desarrollo' | 'cierre'
  descripcion: string
  estudiante: string
  actividades: Actividad[]
}

export interface DatosGenerales {
  materia: string
  nivel: string
  ciclo: string
  grado: string
  categoriaDocente: string
  tema: string
  competencia: string
  indicadorLogro: string
  estudianteGeneral: string
  maestro: string
  coordinadora: string
  centroEducativo: string
  anoEscolar: string
}