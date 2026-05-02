import mongoose, { Schema, Document } from 'mongoose'

export interface IMateria extends Document {
  nombre: string
  slug: string
  categoriaDocente: string
  activo: boolean
}

const MateriaSchema = new Schema<IMateria>({
  nombre: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  categoriaDocente: { type: String, required: true },
  activo: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Materia || mongoose.model<IMateria>('Materia', MateriaSchema)