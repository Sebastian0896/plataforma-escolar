import mongoose, { Schema, Document } from 'mongoose'

export interface INotificacion extends Document {
  tipo: 'recordatorio' | 'pendiente' | 'senal' | 'nueva_plan' | 'actualizacion' | 'resumen'
  titulo: string
  mensaje: string
  destinatarioId?: mongoose.Types.ObjectId
  grado?: string
  planificacionId?: mongoose.Types.ObjectId
  planificacionSlug?: string
  centroId: mongoose.Types.ObjectId
  leida: boolean
  destacada: boolean
  createdAt: Date
}

const NotificacionSchema = new Schema<INotificacion>({
  tipo: { type: String, required: true },
  titulo: { type: String, required: true },
  mensaje: { type: String, required: true },
  destinatarioId: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  grado: { type: String },
  planificacionId: { type: Schema.Types.ObjectId, ref: 'Planificacion' },
  planificacionSlug: { type: String },
  centroId: { type: Schema.Types.ObjectId, ref: 'Centro', required: true },
  leida: { type: Boolean, default: false },
  destacada: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.Notificacion || mongoose.model<INotificacion>('Notificacion', NotificacionSchema)