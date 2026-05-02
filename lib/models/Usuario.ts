import mongoose, { Schema, Document } from 'mongoose'

export interface IUsuario extends Document {
  nombre: string
  email: string
  password: string
  rol: string
  genero: string
  grado?: string
  grados?: string[]
  categoriaDocente?: string
  materias?: string[] // ← Agregar
  rne?: string
  activo: boolean
  centroId: mongoose.Types.ObjectId
  niveles?: string[],
  ciclos?: string[],
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'estudiante' },
  genero: { type: String, default: '' },
  grado: { type: String },
  grados: [{ type: String }],
  categoriaDocente: { type: String },
  materias: [{ type: String }], // ← Agregar
  rne: { type: String, unique: true, sparse: true },
  activo: { type: Boolean, default: true },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
  niveles: [{ type: String }],  
  ciclos: [{ type: String }], 
}, { timestamps: true })

export default mongoose.models.Usuario || mongoose.model<IUsuario>('Usuario', UsuarioSchema)