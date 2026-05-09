import mongoose, { Schema, Document } from 'mongoose'

export interface IAsistencia extends Document {
  estudianteId: mongoose.Types.ObjectId
  docenteId: mongoose.Types.ObjectId
  grado: string
  materia: string
  fecha: Date
  periodo: string
  presente: boolean
  observacion: string
  centroId: mongoose.Types.ObjectId
}

const AsistenciaSchema = new Schema<IAsistencia>({
  estudianteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  docenteId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  grado: { type: String, required: true },
  materia: { type: String, required: true },
  fecha: { type: Date, required: true },
  periodo: { type: String, default: 'P1' },
  presente: { type: Boolean, default: true },
  observacion: { type: String, default: '' },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
}, { timestamps: true })

export default mongoose.models.Asistencia || mongoose.model<IAsistencia>('Asistencia', AsistenciaSchema)