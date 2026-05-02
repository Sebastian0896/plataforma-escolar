import mongoose, { Schema, Document } from 'mongoose'

export interface IRecurso {
  tipo: 'audio' | 'imagen' | 'pdf' | 'video' | 'enlace'
  url?: string
  texto?: string
  traduccion?: string
  descripcion?: string
}

interface IActividad {
  titulo: string
  descripcion: string
  contenidoEstudiante?: string
  recursos: IRecurso[]
  duracion?: string
}

interface IMomento {
  tipo: 'inicio' | 'desarrollo' | 'cierre'
  descripcion: string
  contenidoEstudiante?: string
  actividades: IActividad[]
}

export interface IPlanificacion extends Document {
  slug: string
  tema: string
  materia: string
  nivel: string
  ciclo: string
  grado: string
  categoriaDocente: string
  competencia: string
  indicadorLogro: string
  contenidoEstudiante?: string
  maestro: string
  coordinadora: string
  centroEducativo: string
  anoEscolar: string
  publicado: boolean
  momentos: IMomento[]
  creadoPor?: mongoose.Types.ObjectId
}

const RecursoSchema = new Schema<IRecurso>({
  tipo: { type: String, enum: ['audio', 'imagen', 'pdf', 'video', 'enlace'], required: true },
  url: { type: String },
  texto: { type: String },
  traduccion: { type: String },
  descripcion: { type: String },
}, { _id: false })

const ActividadSchema = new Schema<IActividad>({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: '' },
  contenidoEstudiante: { type: String },
  recursos: [RecursoSchema],
  duracion: { type: String },
}, { _id: false })

const MomentoSchema = new Schema<IMomento>({
  tipo: { type: String, enum: ['inicio', 'desarrollo', 'cierre'], required: true },
  descripcion: { type: String, default: '' },
  contenidoEstudiante: { type: String },
  actividades: [ActividadSchema],
}, { _id: false })

const PlanificacionSchema = new Schema<IPlanificacion>({
  slug: { type: String, required: true, unique: true },
  tema: { type: String, required: true },
  materia: { type: String, required: true },
  nivel: { type: String, required: true },
  ciclo: { type: String, required: true },
  grado: { type: String, required: true },
  categoriaDocente: { type: String, required: true },
  competencia: { type: String, default: '' },
  indicadorLogro: { type: String, default: '' },
  contenidoEstudiante: { type: String },
  maestro: { type: String, default: '' },
  coordinadora: { type: String, default: '' },
  centroEducativo: { type: String, default: '' },
  anoEscolar: { type: String, default: '2025-2026' },
  publicado: { type: Boolean, default: true },
  momentos: [MomentoSchema],
  creadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: true })

export default mongoose.models.Planificacion || mongoose.model<IPlanificacion>('Planificacion', PlanificacionSchema)