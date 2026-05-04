import { connectDB } from '../lib/db'
import Planificacion from '../lib/models/Planificacion'
import mongoose from 'mongoose'

async function main() {
  await connectDB()
  const count = await Planificacion.countDocuments({
    publicado: true,
    centroId: new mongoose.Types.ObjectId('69f41f96d827145b4166d97e'),
    categoriaDocente: 'idiomas',
    grado: { $in: ['1ro-secundaria', '2do-secundaria', '6to-primaria'] },
    materia: { $in: ['ingles', 'frances'] },
    creadoPor: new mongoose.Types.ObjectId('69f41f96d827145b4166d980')
  })
  console.log('Con filtros:', count)
  const total = await Planificacion.countDocuments({ publicado: true })
  console.log('Sin filtros:', total)

  // Solo categoría
const c1 = await Planificacion.countDocuments({ publicado: true, categoriaDocente: 'idiomas' })
console.log('Solo categoría idiomas:', c1)

// Solo grado
const c2 = await Planificacion.countDocuments({ publicado: true, grado: { $in: ['1ro-secundaria', '2do-secundaria', '6to-primaria'] } })
console.log('Solo grados:', c2)

// Solo materia
const c3 = await Planificacion.countDocuments({ publicado: true, materia: { $in: ['ingles', 'frances'] } })
console.log('Solo materias:', c3)

// Solo centroId
const c4 = await Planificacion.countDocuments({ publicado: true, centroId: new mongoose.Types.ObjectId('69f41f96d827145b4166d97e') })
console.log('Solo centroId:', c4)

// Solo creadoPor
const c5 = await Planificacion.countDocuments({ publicado: true, creadoPor: new mongoose.Types.ObjectId('69f41f96d827145b4166d980') })
console.log('Solo creadoPor:', c5)
  process.exit(0)
}

const test = await Planificacion.findOne({ categoriaDocente: 'idiomas' })
console.log('Ejemplo grado:', test?.grado)
console.log('Ejemplo materia:', test?.materia)
main()