import mongoose, { Schema, Document } from 'mongoose'

export interface IPendienteIgnorado extends Document {
  docenteId: string
  grado: string
  semana: string // formato '2025-W18'
  centroId: string
}

const PendienteIgnoradoSchema = new Schema<IPendienteIgnorado>({
  docenteId: { type: String, required: true },
  grado: { type: String, required: true },
  semana: { type: String, required: true },
  centroId: { type: String, required: true },
}, { timestamps: true })

PendienteIgnoradoSchema.index({ docenteId: 1, grado: 1, semana: 1 }, { unique: true })

export default mongoose.models.PendienteIgnorado || mongoose.model<IPendienteIgnorado>('PendienteIgnorado', PendienteIgnoradoSchema)