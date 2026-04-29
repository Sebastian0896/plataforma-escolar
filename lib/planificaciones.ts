import { connectDB } from './db'
import Planificacion from './models/Planificacion'
import type { Planificacion as IPlanificacion, NivelInfo } from './types'

export async function getEstructuraCompleta(
  categoriaDocenteSlug?: string,
  gradosPermitidos?: string[],
  materiasPermitidas?: string[]
): Promise<NivelInfo[]> {
  await connectDB()

  let filter: any = { publicado: true }

  if (categoriaDocenteSlug) {
    filter.categoriaDocente = categoriaDocenteSlug
  }

  if (gradosPermitidos && gradosPermitidos.length > 0) {
    filter.grado = { $in: gradosPermitidos }
  }

  if (materiasPermitidas && materiasPermitidas.length > 0) {
    filter.materia = { $in: materiasPermitidas }
  }

  const planificaciones = await Planificacion.find(filter).lean()

  if (!planificaciones || planificaciones.length === 0) return []

  const nivelesMap = new Map<string, NivelInfo>()

  for (const p of planificaciones) {
    const nivelKey = p.nivel
    const cicloKey = `${p.nivel}-${p.ciclo}`
    const gradoKey = `${p.nivel}-${p.ciclo}-${p.grado}`
    const materiaKey = `${p.nivel}-${p.ciclo}-${p.grado}-${p.materia}`

    if (!nivelesMap.has(nivelKey)) {
      nivelesMap.set(nivelKey, { 
        nombre: p.nivel, 
        slug: p.nivel, 
        ciclos: [] 
      })
    }

    const nivel = nivelesMap.get(nivelKey)!

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

    materia.temas.push({ slug: p.slug, tema: p.tema })
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