import mongoose, { Schema, Document } from 'mongoose'

export interface ICentro extends Document {
  nombre: string
  codigo: string
  logo?: string
  activo: boolean
}

const CentroSchema = new Schema<ICentro>({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  logo: { type: String },
  activo: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Centro || mongoose.model<ICentro>('Centro', CentroSchema)