import 'dotenv/config'
import { connectDB } from '../lib/db'
import Planificacion from '../lib/models/Planificacion'

const WP_API = process.env.WORDPRESS_API_URL || 'http://localhost/wordpress/wp-json'

async function migrar() {
  await connectDB()
  console.log('📦 Conectado a MongoDB')

  const res = await fetch(`${WP_API}/wp/v2/planificaciones?per_page=100&status=publish&_embed`)
  const posts = await res.json()

  console.log(`📥 ${posts.length} planificaciones en WordPress`)

  let creadas = 0
  let errores = 0

  for (const post of posts) {
    try {
      const terms = (post._embedded?.['wp:term'] || []).flat()
      const getTerm = (tax: string) => terms.find((t: any) => t.taxonomy === tax)

      const acf = post.acf || {}

      const existe = await Planificacion.findOne({ slug: post.slug })
      if (existe) {
        console.log(`⏭️ Ya existe: ${post.title.rendered}`)
        continue
      }

      // Convertir actividades viejas a nuevo formato
      const convertirActividades = (jsonStr: string) => {
        if (!jsonStr || jsonStr === '[]') return []
        const acts = JSON.parse(jsonStr)
        return acts.map((a: any) => ({
          titulo: a.titulo || '',
          descripcion: a.descripcion || '',
          contenidoEstudiante: a.estudiante || '',
          recursos: a.audio
            ? [{ tipo: 'audio', texto: a.audio, traduccion: a.traduccion || '' }]
            : a.recursos || [],
          duracion: a.duracion || '',
        }))
      }

      await Planificacion.create({
        slug: post.slug,
        tema: post.title.rendered,
        materia: getTerm('materia')?.slug || '',
        nivel: getTerm('nivel')?.slug || '',
        ciclo: getTerm('ciclo')?.slug || '',
        grado: getTerm('grado')?.slug || '',
        categoriaDocente: getTerm('categoria_docente')?.slug || '',
        competencia: acf.competencia || '',
        indicadorLogro: acf.indicador_logro || '',
        contenidoEstudiante: acf.contenido_estudiante_general || '',
        maestro: acf.maestro || '',
        coordinadora: acf.coordinadora || '',
        centroEducativo: acf.centro_educativo || '',
        anoEscolar: acf.ano_escolar || '2025-2026',
        momentos: [
          {
            tipo: 'inicio',
            descripcion: acf.m1_descripcion || '',
            contenidoEstudiante: acf.m1_estudiante || '',
            actividades: convertirActividades(acf.m1_actividades),
          },
          {
            tipo: 'desarrollo',
            descripcion: acf.m2_descripcion || '',
            contenidoEstudiante: acf.m2_estudiante || '',
            actividades: convertirActividades(acf.m2_actividades),
          },
          {
            tipo: 'cierre',
            descripcion: acf.m3_descripcion || '',
            contenidoEstudiante: acf.m3_estudiante || '',
            actividades: convertirActividades(acf.m3_actividades),
          },
        ],
      })

      creadas++
      console.log(`✅ ${post.title.rendered}`)
    } catch (error: any) {
      errores++
      console.log(`❌ ${post.title?.rendered}: ${error.message}`)
    }
  }

  console.log(`\n📊 ${creadas} creadas, ${errores} errores`)
  process.exit(0)
}

migrar()