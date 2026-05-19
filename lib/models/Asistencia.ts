import mongoose, { Schema, Document } from 'mongoose'

export interface IAsistencia extends Document {
  estudianteId: string
  docenteId: string
  grado: string
  materia: string
  fecha: Date
  periodo: string
  presente: boolean
  observacion: string
  centroId: string
}

const AsistenciaSchema = new Schema<IAsistencia>({
  estudianteId: { type: String, required: true },
  docenteId: { type: String, required: true },
  grado: { type: String, required: true },
  materia: { type: String, required: true },
  fecha: { type: Date, required: true },
  periodo: { type: String, default: 'P1' },
  presente: { type: Boolean, default: true },
  observacion: { type: String, default: '' },
  centroId: { type: String, required: true },
}, { timestamps: true })


// ✅ Índice único para evitar duplicados
AsistenciaSchema.index(
  { estudianteId: 1, grado: 1, materia: 1, periodo: 1, fecha: 1 },
  { unique: true }
)

export default mongoose.models.Asistencia || mongoose.model<IAsistencia>('Asistencia', AsistenciaSchema)