//import { PrismaClient } from '@/generated/prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'

async function seed() {
  // Limpiar
  await prisma.evaluacion.deleteMany()
  await prisma.periodo.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.centro.deleteMany()
  await prisma.competencia.deleteMany()
  await prisma.materia.deleteMany()

  const hash = await bcrypt.hash('admin123', 10)

  // Superadmin
  await prisma.usuario.create({
    data: {
      nombre: 'Superadmin',
      email: 'superadmin@educacion.es',
      password: hash,
      rol: 'superadmin',
    },
  })

  // Coordinador
  await prisma.usuario.create({
    data: {
      nombre: 'Coordinador',
      email: 'coordinador@educacion.es',
      password: hash,
      rol: 'coordinador',
    },
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

  for (const m of materias) {
    await prisma.materia.create({ data: m })
  }

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

  for (const c of competencias) {
    await prisma.competencia.create({ data: c })
  }

  console.log('✅ Seed PostgreSQL completado')
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())