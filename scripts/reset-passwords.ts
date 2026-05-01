import { connectDB } from '../lib/db'
import Usuario from '../lib/models/Usuario'
import bcrypt from 'bcryptjs'

async function reset() {
  await connectDB()
  const hash = await bcrypt.hash('admin123', 10)
  await Usuario.updateMany({}, { password: hash })
  console.log('✅ Contraseñas reseteadas a admin123')
  process.exit(0)
}

reset()