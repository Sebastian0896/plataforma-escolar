// scripts/seed.ts
import { connectDB } from '../lib/db'
import Centro from '../lib/models/Centro'
import Usuario from '../lib/models/Usuario'
import Materia from '../lib/models/Materia'
import Competencia from '../lib/models/Competencia'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

async function seed() {
  await connectDB()

  // Limpiar todo
  await Centro.deleteMany({})
  await Usuario.deleteMany({})
  await Materia.deleteMany({})
  await Competencia.deleteMany({})

  const hash = await bcrypt.hash('admin123', 10)

  // Superadmin (sin centro)
  await Usuario.create({
    nombre: 'Superadmin',
    email: 'superadmin@educacion.es',
    password: hash,
    rol: 'superadmin',
    activo: true,
  })

  // Admin
  await Usuario.create({
    nombre: 'Admin',
    email: 'admin@educacion.es',
    password: hash,
    rol: 'admin',
    activo: true,
  })

  // Coordinador
  await Usuario.create({
    nombre: 'Coordinador',
    email: 'coordinador@educacion.es',
    password: hash,
    rol: 'coordinador',
    activo: true,
  })

  // Técnico Distrital
  await Usuario.create({
    nombre: 'Técnico Distrital',
    email: 'tecnico@educacion.es',
    password: hash,
    rol: 'tecnico_distrital',
    activo: true,
  })

  // Registro
  await Usuario.create({
    nombre: 'Registro',
    email: 'registro@educacion.es',
    password: hash,
    rol: 'registro',
    activo: true,
  })

  // Materias
  const materias = [
    { nombre: 'Francés', slug: 'frances', categoriaDocente: 'idiomas' },
    { nombre: 'Inglés', slug: 'ingles', categoriaDocente: 'idiomas' },
    { nombre: 'Lengua Española', slug: 'lengua-espanola', categoriaDocente: 'materias-basicas' },
    { nombre: 'Matemática', slug: 'matematica', categoriaDocente: 'materias-basicas' },
    { nombre: 'Ciencias Sociales', slug: 'ciencias-sociales', categoriaDocente: 'materias-basicas' },
    { nombre: 'Ciencias Naturales', slug: 'ciencias-naturales', categoriaDocente: 'materias-basicas' },
    { nombre: 'Educación Física', slug: 'educacion-fisica', categoriaDocente: 'otras-materias' },
    { nombre: 'Artística', slug: 'artistica', categoriaDocente: 'otras-materias' },
  ]
  await Materia.insertMany(materias)

  // Competencias
  const competencias = [
    { nombre: 'Comunicativa', orden: 1 },
    { nombre: 'Pensamiento Lógico, Crítico y Creativo', orden: 2 },
    { nombre: 'Resolución de Problemas', orden: 3 },
    { nombre: 'Científica y Tecnológica', orden: 4 },
    { nombre: 'Ética y Ciudadana', orden: 5 },
    { nombre: 'Ambiental y de la Salud', orden: 6 },
    { nombre: 'Desarrollo Personal y Espiritual', orden: 7 },
  ]
  await Competencia.insertMany(competencias)

  console.log('✅ Seed completado')
  console.log('   superadmin@educacion.es / admin123 (superadmin)')
  console.log('   admin@educacion.es / admin123 (admin)')
  console.log('   coordinador@educacion.es / admin123 (coordinador)')
  console.log('   tecnico@educacion.es / admin123 (técnico distrital)')
  console.log('   registro@educacion.es / admin123 (registro)')
  console.log(`   ${materias.length} materias creadas`)
  console.log(`   ${competencias.length} competencias creadas`)
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })