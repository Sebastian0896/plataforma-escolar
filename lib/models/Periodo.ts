import mongoose, { Schema, Document } from 'mongoose'

export interface IPeriodo extends Document {
  nombre: string // P1, P2, P3, P4
  fechaInicio: Date
  fechaFin: Date
  centroId: mongoose.Types.ObjectId
  activo: boolean
}

const PeriodoSchema = new Schema<IPeriodo>({
  nombre: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
  activo: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Periodo || mongoose.model<IPeriodo>('Periodo', PeriodoSchema)