import mongoose, { Schema, Document } from 'mongoose'

export interface IEvaluacion extends Document {
  estudianteId: mongoose.Types.ObjectId
  periodo: string
  grado: string
  materia: string
  notas: Record<string, number> // { competenciaId: nota }
  docenteId: mongoose.Types.ObjectId
  centroId: mongoose.Types.ObjectId
}

const EvaluacionSchema = new Schema<IEvaluacion>({
  estudianteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  periodo: { type: String, required: true },
  grado: { type: String, required: true },
  materia: { type: String, required: true },
  notas: { type: Map, of: Number, default: {} },
  docenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
}, { timestamps: true })

EvaluacionSchema.index({ estudianteId: 1, periodo: 1, materia: 1 }, { unique: true })

export default mongoose.models.Evaluacion || mongoose.model<IEvaluacion>('Evaluacion', EvaluacionSchema)