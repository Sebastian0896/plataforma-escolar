import mongoose, { Schema, Document } from 'mongoose'

interface IActividad {
  titulo: string
  descripcion: string
  contenidoEstudiante?: string
  audioTexto?: string
  audioTraduccion?: string
  recursos?: string
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
}

const ActividadSchema = new Schema<IActividad>({
  titulo: { type: String, required: true },
  descripcion: { type: String, default: '' },
  contenidoEstudiante: { type: String },
  audioTexto: { type: String },
  audioTraduccion: { type: String },
  recursos: { type: String },
  duracion: { type: String },
})

const MomentoSchema = new Schema<IMomento>({
  tipo: { type: String, enum: ['inicio', 'desarrollo', 'cierre'], required: true },
  descripcion: { type: String, default: '' },
  contenidoEstudiante: { type: String },
  actividades: [ActividadSchema],
})

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
}, { timestamps: true })

export default mongoose.models.Planificacion || mongoose.model<IPlanificacion>('Planificacion', PlanificacionSchema)