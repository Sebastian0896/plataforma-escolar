import mongoose, { Schema, Document } from 'mongoose'

export interface ICompetencia extends Document {
  nombre: string
  orden: number
}

const CompetenciaSchema = new Schema<ICompetencia>({
  nombre: { type: String, required: true },
  orden: { type: Number, required: true },
}, { timestamps: true })

export default mongoose.models.Competencia || mongoose.model<ICompetencia>('Competencia', CompetenciaSchema)