import connectDB from '../lib/db'
import Centro from '../lib/models/Centro'
import Usuario from '../lib/models/Usuario'
import bcrypt from 'bcryptjs'

async function seed() {
  await connectDB()
  console.log('📦 Conectado a MongoDB')

  // Limpiar colecciones existentes
  await Centro.deleteMany({})
  await Usuario.deleteMany({})

  // Crear centro
  const centro = await Centro.create({
    nombre: 'Centro Educativo Salemé Ureña',
    codigo: 'SALE2025',
  })

  // Crear admin
  const passwordHash = await bcrypt.hash('admin123', 10)
  await Usuario.create({
    nombre: 'Sebastián González Rodríguez',
    email: 'admin@salome.edu.do',
    password: passwordHash,
    rol: 'admin',
    centroId: centro._id,
  })

  // Crear docente idiomas
  const passDocente = await bcrypt.hash('docente123', 10)
  await Usuario.create({
    nombre: 'María Profesora',
    email: 'maria@salome.edu.do',
    password: passDocente,
    rol: 'docente',
    categoriaDocente: 'idiomas',
    centroId: centro._id,
  })

  console.log('✅ Seed completado')
  console.log('   Admin: admin@salome.edu.do / admin123')
  console.log('   Docente: maria@saleme.edu.do / docente123')
  process.exit(0)
}

seed().catch(console.error)