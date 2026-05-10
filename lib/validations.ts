import { z } from 'zod'

export const usuarioSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  rol: z.enum(['admin', 'docente', 'registro', 'estudiante', 'admin_centro', 'superadmin', 'coordinador', 'tecnico_distrital']),
})