import mongoose, { Schema, Document } from 'mongoose'

export interface IUsuario extends Document {
  nombre: string
  email: string
  password: string
  rol: 'admin' | 'docente' | 'estudiante'
  grado?: string
  categoriaDocente?: string
  rne: string
  activo: boolean
  centroId: mongoose.Types.ObjectId
}

// lib/models/Usuario.ts
const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'docente', 'estudiante'], default: 'estudiante' },
  grado: { type: String },
  categoriaDocente: { type: String },
  rne: { type: String, unique: true, sparse: true }, // NUEVO
  activo: { type: Boolean, default: true },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
}, { timestamps: true })

export default mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', UsuarioSchema)