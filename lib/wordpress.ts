// lib/wordpress.ts
import { Planificacion, Actividad, Momento, NivelInfo } from './types'

const API_URL = process.env.WORDPRESS_API_URL || 'http://localhost/wordpress/wp-json'

interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  acf: WPPlanificacionACF
  niveles: number[]
  ciclos: number[]
  grados: number[]
  materia: number[]
  'categorias-docentes': number[]
  _embedded?: { 'wp:term'?: WPTerm[][] }
}

interface WPPlanificacionACF {
  competencia: string
  indicador_logro: string
  contenido_estudiante_general: string
  m1_descripcion: string
  m1_estudiante: string
  m1_actividades: string
  m2_descripcion: string
  m2_estudiante: string
  m2_actividades: string
  m3_descripcion: string
  m3_estudiante: string
  m3_actividades: string
  maestro: string
  coordinadora: string
  centro_educativo: string
  ano_escolar: string
}

interface WPTerm {
  id: number
  slug: string
  name: string
  taxonomy: string
}

function parseActividades(jsonString: string): Actividad[] {
  if (!jsonString || jsonString.trim() === '' || jsonString === '[]') return []
  try {
    const raw = JSON.parse(jsonString)
    if (!Array.isArray(raw)) return []
    return raw.map((item: any) => ({
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      contenidoEstudiante: item.estudiante || '',
      audioTexto: item.audio || '',
      audioTraduccion: item.traduccion || '',
      recursos: item.recursos || '',
      duracion: item.duracion || '',
    }))
  } catch { return [] }
}

function getTermName(embedded: WPTerm[][] | undefined, taxonomy: string): string {
  if (!embedded) return ''
  return embedded.flat().find((t) => t.taxonomy === taxonomy)?.name || ''
}

function transformarPlanificacion(post: WPPost): Planificacion {
  const acf = post.acf
  const embedded = post._embedded?.['wp:term']
  return {
    id: post.id,
    slug: post.slug,
    materia: getTermName(embedded, 'materia'),
    tema: post.title.rendered,
    competencia: acf.competencia || '',
    indicadorLogro: acf.indicador_logro || '',
    contenidoEstudianteGeneral: acf.contenido_estudiante_general || '',
    maestro: acf.maestro || '',
    coordinadora: acf.coordinadora || '',
    centroEducativo: acf.centro_educativo || '',
    anoEscolar: acf.ano_escolar || '',
    nivel: getTermName(embedded, 'nivel'),
    ciclo: getTermName(embedded, 'ciclo'),
    grado: getTermName(embedded, 'grado'),
    categoriaDocente: getTermName(embedded, 'categoria_docente'),
    momentos: [
      { tipo: 'inicio', descripcion: acf.m1_descripcion || '', contenidoEstudiante: acf.m1_estudiante || '', actividades: parseActividades(acf.m1_actividades) },
      { tipo: 'desarrollo', descripcion: acf.m2_descripcion || '', contenidoEstudiante: acf.m2_estudiante || '', actividades: parseActividades(acf.m2_actividades) },
      { tipo: 'cierre', descripcion: acf.m3_descripcion || '', contenidoEstudiante: acf.m3_estudiante || '', actividades: parseActividades(acf.m3_actividades) },
    ],
  }
}

// lib/wordpress.ts - Reemplazar getEstructuraCompleta

export async function getEstructuraCompleta(
  categoriaDocenteSlug?: string
): Promise<NivelInfo[]> {
  const [nivelesRes, ciclosRes, gradosRes, materiasRes, planificacionesRes] = await Promise.all([
    fetch(`${API_URL}/wp/v2/niveles`),
    fetch(`${API_URL}/wp/v2/ciclos`),
    fetch(`${API_URL}/wp/v2/grados?per_page=100&hide_empty=false`),
    fetch(`${API_URL}/wp/v2/materia`),
    fetch(`${API_URL}/wp/v2/planificaciones?per_page=100&status=publish`),
  ])

  const niveles: WPTerm[] = await nivelesRes.json()
  const ciclos: WPTerm[] = await ciclosRes.json()
  const grados: WPTerm[] = await gradosRes.json()
  const materias: WPTerm[] = await materiasRes.json()
  let planificaciones: WPPost[] = await planificacionesRes.json()

  if (!Array.isArray(niveles) || niveles.length === 0) return []
  if (!Array.isArray(planificaciones)) planificaciones = []

  // Filtrar por categoría docente
  if (categoriaDocenteSlug) {
    const catRes = await fetch(
      `${API_URL}/wp/v2/categorias-docentes?slug=${categoriaDocenteSlug}`
    )
    const cats = await catRes.json()
    const catId = cats[0]?.id

    if (catId) {
      planificaciones = planificaciones.filter((p) =>
        p['categorias-docentes']?.includes(catId)
      )
    }
  }

  const nivelMap = new Map(niveles.map((n) => [n.id, n]))
  const cicloMap = new Map(ciclos.map((c) => [c.id, c]))
  const gradoMap = new Map(grados.map((g) => [g.id, g]))
  const materiaMap = new Map(materias.map((m) => [m.id, m]))

  return niveles
    .map((nivel) => ({
      nombre: nivel.name,
      slug: nivel.slug,
      ciclos: ciclos
        .map((ciclo) => ({
          nombre: ciclo.name,
          slug: ciclo.slug,
          grados: grados
            .map((grado) => ({
              nombre: grado.name,
              slug: grado.slug,
              materias: materias
                .map((materia) => ({
                  nombre: materia.name,
                  slug: materia.slug,
                  temas: planificaciones
                    .filter(
                      (p) =>
                        p.niveles?.[0] === nivel.id &&
                        p.ciclos?.[0] === ciclo.id &&
                        p.grados?.includes(grado.id) &&
                        p.materia?.includes(materia.id)
                    )
                    .map((p) => ({ slug: p.slug, tema: p.title.rendered })),
                }))
                .filter((m) => m.temas.length > 0),
            }))
            .filter((g) => g.materias.length > 0),
        }))
        .filter((c) => c.grados.length > 0),
    }))
    .filter((n) => n.ciclos.length > 0)
}

export async function getPlanificacion(
  nivelSlug: string,
  gradoSlug: string,
  temaSlug: string
): Promise<Planificacion | null> {
  const res = await fetch(`${API_URL}/wp/v2/planificaciones?slug=${temaSlug}&_embed&per_page=50`)
  const posts: WPPost[] = await res.json()
  if (!Array.isArray(posts) || posts.length === 0) return null

  const post = posts.find((p) => {
    const terms = (p._embedded?.['wp:term'] || []).flat()
    return terms.some((t) => t.taxonomy === 'nivel' && t.slug === nivelSlug) &&
           terms.some((t) => t.taxonomy === 'grado' && t.slug === gradoSlug)
  })

  
  return post ? transformarPlanificacion(post) : null
}