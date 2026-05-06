import mongoose, { Schema, Document } from 'mongoose'

export interface ICentro extends Document {
  nombre: string
  codigo: string
  logo?: string
  activo: boolean
  plan?: string
  maxDocentes?: number
  maxEstudiantes?: number
  trialEndsAt?: Date
}

const CentroSchema = new Schema<ICentro>({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  logo: { type: String },
  activo: { type: Boolean, default: true },
  plan: { type: String, default: 'gratis' },
  maxDocentes: { type: Number, default: 3 },
  maxEstudiantes: { type: Number, default: 30 },
  trialEndsAt: { type: Date },
}, { timestamps: true })

export default mongoose.models.Centro || mongoose.model<ICentro>('Centro', CentroSchema)