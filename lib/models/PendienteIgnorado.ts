import mongoose, { Schema, Document } from 'mongoose'

export interface IPendienteIgnorado extends Document {
  docenteId: mongoose.Types.ObjectId
  grado: string
  semana: string // formato '2025-W18'
  centroId: mongoose.Types.ObjectId
}

const PendienteIgnoradoSchema = new Schema<IPendienteIgnorado>({
  docenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  grado: { type: String, required: true },
  semana: { type: String, required: true },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
}, { timestamps: true })

PendienteIgnoradoSchema.index({ docenteId: 1, grado: 1, semana: 1 }, { unique: true })

export default mongoose.models.PendienteIgnorado || mongoose.model<IPendienteIgnorado>('PendienteIgnorado', PendienteIgnoradoSchema)