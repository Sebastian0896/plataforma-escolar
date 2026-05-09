import mongoose, { Schema, Document } from 'mongoose'

export interface IDiario extends Document {
  estudianteId: mongoose.Types.ObjectId
  docenteId: mongoose.Types.ObjectId
  grado: string
  materia: string
  periodo: string
  fecha: Date
  participacion: number
  tarea: boolean
  observacion: string
  puntosExtra: number
  centroId: mongoose.Types.ObjectId
}

const DiarioSchema = new Schema<IDiario>({
  estudianteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  docenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  grado: { type: String, required: true },
  materia: { type: String, required: true },
  periodo: { type: String, default: 'P1' },
  fecha: { type: Date, required: true },
  participacion: { type: Number, default: 0, min: 0, max: 5 },
  tarea: { type: Boolean, default: false },
  observacion: { type: String, default: '' },
  puntosExtra: { type: Number, default: 0 },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
}, { timestamps: true })

//DiarioSchema.index({ estudianteId: 1, fecha: 1, materia: 1, periodo: 1 }, { unique: true })

export default mongoose.models.Diario || mongoose.model<IDiario>('Diario', DiarioSchema)