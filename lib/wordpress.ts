// lib/wordpress.ts

import { Planificacion, Materia, Actividad } from './types';

const API_URL = process.env.WORDPRESS_API_URL || 'http://localhost/plataforma-escolar/wp-json';

interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: WPPlanificacionACF;
  materia: number[];
}

interface WPPlanificacionACF {
  competencia: string;
  indicador_logro: string;
  contenido_estudiante_general: string;
  m1_descripcion: string;
  m1_estudiante: string;
  m1_actividades: string;
  m2_descripcion: string;
  m2_estudiante: string;
  m2_actividades: string;
  m3_descripcion: string;
  m3_estudiante: string;
  m3_actividades: string;
  maestro: string;
  coordinadora: string;
  centro_educativo: string;
  ano_escolar: string;
}

interface WPTerm {
  id: number;
  slug: string;
  name: string;
}

function parseActividades(jsonString: string): Actividad[] {
  if (!jsonString || jsonString.trim() === '' || jsonString === '[]') return [];
  try {
    const raw = JSON.parse(jsonString);
    if (!Array.isArray(raw)) return [];
    return raw.map((item: any) => ({
      titulo: item.titulo || '',
      descripcion: item.descripcion || '',
      contenidoEstudiante: item.estudiante || '',
      audioTexto: item.audio || '',
      audioTraduccion: item.traduccion || '',
      recursos: item.recursos || '',
      duracion: item.duracion || '',
    }));
  } catch (e) {
    console.error('Error parseando JSON de actividades:', e);
    return [];
  }
}

function transformarPlanificacion(post: WPPost, materiaNombre: string): Planificacion {
  const acf = post.acf;

  return {
    slug: post.slug,
    materia: materiaNombre,
    tema: post.title.rendered,
    competencia: acf.competencia || '',
    indicadorLogro: acf.indicador_logro || '',
    contenidoEstudianteGeneral: acf.contenido_estudiante_general || '',
    maestro: acf.maestro || '',
    coordinadora: acf.coordinadora || '',
    centroEducativo: acf.centro_educativo || '',
    anoEscolar: acf.ano_escolar || '',
    momentos: [
      {
        tipo: 'inicio',
        descripcion: acf.m1_descripcion || '',
        contenidoEstudiante: acf.m1_estudiante || '',
        actividades: parseActividades(acf.m1_actividades),
      },
      {
        tipo: 'desarrollo',
        descripcion: acf.m2_descripcion || '',
        contenidoEstudiante: acf.m2_estudiante || '',
        actividades: parseActividades(acf.m2_actividades),
      },
      {
        tipo: 'cierre',
        descripcion: acf.m3_descripcion || '',
        contenidoEstudiante: acf.m3_estudiante || '',
        actividades: parseActividades(acf.m3_actividades),
      },
    ],
  };
}


export async function getMaterias(): Promise<Materia[]> {
  // 1. Obtener todas las materias
  const res = await fetch(`${API_URL}/wp/v2/materias`, {
    next: { revalidate: 3600 },
  })
  const terms: WPTerm[] = await res.json()

  // 2. Obtener todas las planificaciones
  const allPostsRes = await fetch(
    `${API_URL}/wp/v2/planificaciones?per_page=100&status=publish`,
    { next: { revalidate: 3600 } }
  )
  const allPosts: WPPost[] = await allPostsRes.json()

  // 3. Para cada materia, filtrar sus planificaciones
  const materias: Materia[] = terms
    .filter((t) => t.slug !== 'sin-categoria')
    .map((term) => {
      const postsDeEstaMateria = allPosts.filter((post) => {
        // post.materias es un array de IDs (números)
        if (post.materias && Array.isArray(post.materias)) {
          return post.materias.includes(term.id)
        }
        return false
      })

      return {
        nombre: term.name,
        slug: term.slug,
        temas: postsDeEstaMateria.map((p) => ({
          slug: p.slug,
          tema: p.title.rendered,
        })),
      }
    })

  return materias
}

export async function getPlanificacion(
  materiaSlug: string,
  temaSlug: string
): Promise<Planificacion | null> {
  // Obtener todas las planificaciones filtradas por la materia (por slug)
  const url = `${API_URL}/wp/v2/planificaciones?materia=${materiaSlug}&per_page=50`;
  const postsRes = await fetch(url, { next: { revalidate: 3600 } });
  const posts: WPPost[] = await postsRes.json();

  if (posts.length === 0) return null;

  // Buscar la que coincida con el slug del tema
  const post = posts.find((p) => p.slug === temaSlug);

  if (!post) return null;

  // Obtener el nombre de la materia
  const termRes = await fetch(`${API_URL}/wp/v2/materias?slug=${materiaSlug}`);
  const terms: WPTerm[] = await termRes.json();
  const materiaNombre = terms[0]?.name || materiaSlug;

  return transformarPlanificacion(post, materiaNombre);
}