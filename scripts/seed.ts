// scripts/seed.ts
import { connectDB } from '../lib/db'
import Centro from '../lib/models/Centro'
import Usuario from '../lib/models/Usuario'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

async function seed() {
  await connectDB()

  await Centro.deleteMany({})
  await Usuario.deleteMany({})

  const centro = await Centro.create({
    nombre: 'Centro Educativo Salomé Ureña',
    codigo: 'SALE2025',
  })

  const hash = await bcrypt.hash('admin123', 10)

  const usuarios = [
    { nombre: 'Sebastián González', email: 'admin@salome.edu.do', password: hash, rol: 'admin', centroId: centro._id },
   {
    nombre: 'María Docente',
    email: 'maria@salome.edu.do',
    password: hash,
    rol: 'docente',
    categoriaDocente: 'idiomas',
    grados: ['1ro-secundaria', '2do-secundaria'],
    materias: ['ingles', 'frances'],
    centroId: centro._id,
  },
    { nombre: 'Juan Estudiante', email: 'juan@salome.edu.do', password: hash, rol: 'estudiante', grado: '1ro-secundaria', rne: 'RNE-2025-001', centroId: centro._id },
    { nombre: 'Ana Coordinadora', email: 'ana@salome.edu.do', password: hash, rol: 'coordinador', centroId: centro._id },
    { nombre: 'Carlos Técnico', email: 'carlos@salome.edu.do', password: hash, rol: 'tecnico_distrital', centroId: centro._id },
  ]

  for (const u of usuarios) {
    await Usuario.create(u)
  }

  console.log('✅ Seed completado')
  console.log('   admin@salome.edu.do / admin123 (admin)')
  console.log('   maria@salome.edu.do / admin123 (docente idiomas)')
  console.log('   juan@salome.edu.do / admin123 (estudiante)')
  console.log('   ana@salome.edu.do / admin123 (coordinadora)')
  console.log('   carlos@salome.edu.do / admin123 (técnico distrital)')
  process.exit(0)
}

seed()