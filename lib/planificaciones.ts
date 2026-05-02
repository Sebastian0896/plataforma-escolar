import { connectDB } from './db'
import Planificacion from './models/Planificacion'
import type { Planificacion as IPlanificacion, NivelInfo } from './types'
import mongoose from 'mongoose'
export async function getEstructuraCompleta(
  categoriaDocenteSlug?: string,
  gradosPermitidos?: string[],
  materiasPermitidas?: string[],
  creadoPorId?: any
): Promise<NivelInfo[]> {
  await connectDB()

    const filter: any = { publicado: true }

    if (categoriaDocenteSlug) filter.categoriaDocente = categoriaDocenteSlug
    if (gradosPermitidos?.length) filter.grado = { $in: gradosPermitidos }
    if (materiasPermitidas?.length) filter.materia = { $in: materiasPermitidas }
    if (creadoPorId) filter.creadoPor = creadoPorId
  
  console.log('🔍 Filter completo:', JSON.stringify(filter))

  const planificaciones = await Planificacion.find(filter).lean()

console.log('📊 Con filtro:', planificaciones.length)

  if (!planificaciones?.length) return []

  const nivelesMap = new Map<string, any>()

  for (const p of planificaciones) {
    
    if (!nivelesMap.has(p.nivel)) {
      nivelesMap.set(p.nivel, { nombre: p.nivel, slug: p.nivel, ciclos: [] })
    }
    const nivel = nivelesMap.get(p.nivel)

    let ciclo = nivel.ciclos.find((c: any) => c.slug === p.ciclo)
    if (!ciclo) {
      ciclo = { nombre: p.ciclo, slug: p.ciclo, grados: [] }
      nivel.ciclos.push(ciclo)
    }

    let grado = ciclo.grados.find((g: any) => g.slug === p.grado)
    if (!grado) {
      grado = { nombre: p.grado, slug: p.grado, materias: [] }
      ciclo.grados.push(grado)
    }

    let materia = grado.materias.find((m: any) => m.slug === p.materia)
    if (!materia) {
      materia = { nombre: p.materia, slug: p.materia, temas: [] }
      grado.materias.push(materia)
    }

    materia.temas.push({ id: p._id.toString(), slug: p.slug, tema: p.tema })
  }

  return Array.from(nivelesMap.values())
}
export async function getPlanificacion(
  nivelSlug: string,
  gradoSlug: string,
  temaSlug: string
): Promise<IPlanificacion | null> {
  await connectDB()

  const plan = await Planificacion.findOne({
    slug: temaSlug,
    nivel: nivelSlug,
    grado: gradoSlug,
    publicado: true,
  }).lean()

  if (!plan) return null

  return {
    id: plan._id.toString(),
    slug: plan.slug,
    materia: plan.materia,
    tema: plan.tema,
    competencia: plan.competencia,
    indicadorLogro: plan.indicadorLogro,
    contenidoEstudianteGeneral: plan.contenidoEstudiante,
    maestro: plan.maestro,
    coordinadora: plan.coordinadora,
    centroEducativo: plan.centroEducativo,
    anoEscolar: plan.anoEscolar,
    nivel: plan.nivel,
    ciclo: plan.ciclo,
    grado: plan.grado,
    categoriaDocente: plan.categoriaDocente,
    momentos: plan.momentos.map((m: any) => ({
      tipo: m.tipo,
      descripcion: m.descripcion,
      contenidoEstudiante: m.contenidoEstudiante,
      actividades: m.actividades.map((a: any) => ({
        titulo: a.titulo,
        descripcion: a.descripcion,
        contenidoEstudiante: a.contenidoEstudiante,
        recursos: a.recursos || [],
        duracion: a.duracion,
      })),
    })),
  }
}