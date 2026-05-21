import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'
import Notificacion from '@/lib/models/Notificacion'

export const runtime = "nodejs"

function generarSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const tema = searchParams.get('tema')

  // Buscar por ID
  if (id) {
    await connectDB()
    const plan = await Planificacion.findById(id).lean()
    if (!plan) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(plan)
  }

  // Buscar por tema (slug)
  if (tema) {
    await connectDB()
    const plan = await Planificacion.findOne({ slug: tema, publicado: true }).lean()
    if (!plan) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(plan)
  }

  // Listado paginado
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '9')
  const skip = (page - 1) * limit

  await connectDB()
  const filter: any = { publicado: true }
  /* if (session.user?.role === 'admin_centro') filter.centroId = session.user.centroId */ // Funcionaba antes de sacar a superadmin de centro
  if (session.user?.centroId && session.user?.role === 'admin_centro') {
  filter.centroId = session.user.centroId
}
  const [planificaciones, total] = await Promise.all([
    Planificacion.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Planificacion.countDocuments(filter),
  ])

  return NextResponse.json({ planificaciones, total, page, totalPages: Math.ceil(total / limit) })
}

// POST
// app/api/planificaciones/route.ts (POST)
export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()
    await connectDB()
    const slugBase = generarSlug(data.title)
    const slug = `${slugBase}-${session.user?.centroId?.toString().slice(-6)}`

    const plan = await Planificacion.create({
      slug,
      tema: data.title,
      materia: data.materia,
      nivel: data.nivel,
      ciclo: data.ciclo,
      grado: data.grado,
      categoriaDocente: data.categoriaDocente,
      competencia: data.acf?.competencia || data.competencia,  // ← flexible
      indicadorLogro: data.acf?.indicador_logro || data.indicadorLogro,  // ← flexible
      contenidoEstudiante: data.acf?.contenido_estudiante_general || data.estudianteGeneral,  // ← flexible
      maestro: data.acf?.maestro || data.maestro,
      coordinadora: data.acf?.coordinadora || data.coordinadora,
      centroEducativo: data.acf?.centro_educativo || data.centroEducativo,
      anoEscolar: data.acf?.ano_escolar || data.anoEscolar,
      centroId: session.user?.centroId,
      creadoPor: session.user?.id,
      fechaProgramada: data.fechaProgramada ? new Date(data.fechaProgramada) : null,
      momentos: [
        {
          tipo: 'inicio',
          descripcion: data.acf?.m1_descripcion || data.momentos?.[0]?.descripcion || '',
          contenidoEstudiante: data.acf?.m1_estudiante || data.momentos?.[0]?.contenidoEstudiante || '',
          actividades: JSON.parse(data.acf?.m1_actividades || '[]'),
        },
        {
          tipo: 'desarrollo',
          descripcion: data.acf?.m2_descripcion || data.momentos?.[1]?.descripcion || '',
          contenidoEstudiante: data.acf?.m2_estudiante || data.momentos?.[1]?.contenidoEstudiante || '',
          actividades: JSON.parse(data.acf?.m2_actividades || '[]'),
        },
        {
          tipo: 'cierre',
          descripcion: data.acf?.m3_descripcion || data.momentos?.[2]?.descripcion || '',
          contenidoEstudiante: data.acf?.m3_estudiante || data.momentos?.[2]?.contenidoEstudiante || '',
          actividades: JSON.parse(data.acf?.m3_actividades || '[]'),
        },
      ],
    })

    // Notificar a estudiantes
    await Notificacion.create({
      tipo: 'nueva_plan',
      titulo: 'Nueva planificación',
      mensaje: `${data.title} - ${data.grado}`,
      grado: data.grado,
      planificacionId: plan._id,
      planificacionSlug: plan.slug,
      centroId: session.user?.centroId,
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT
// app/api/planificaciones/route.ts (PUT)
export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, slug, ...data } = body

    console.log('🔵 [PUT] Datos recibidos:', JSON.stringify({ id, slug, ...data }, null, 2))

    if (!id && !slug) {
      return NextResponse.json({ error: 'ID o slug de planificación requerido' }, { status: 400 })
    }

    await connectDB()

    // Buscar por ID o slug
    const query = id ? { _id: id } : { slug: slug }
    const existe = await Planificacion.findOne(query)

    if (!existe) {
      return NextResponse.json({ error: 'Planificación no encontrada' }, { status: 404 })
    }

    // Construir objeto de actualización
    const updateData: any = {
      tema: data.tema,
      materia: data.materia,
      nivel: data.nivel,
      ciclo: data.ciclo,
      grado: data.grado,
      categoriaDocente: data.categoriaDocente,
      competencia: data.competencia,
      indicadorLogro: data.indicadorLogro,
      contenidoEstudiante: data.estudianteGeneral,
      maestro: data.maestro,
      coordinadora: data.coordinadora,
      centroEducativo: data.centroEducativo,
      anoEscolar: data.anoEscolar,
      updatedAt: new Date(),
    }

    // Fecha programada
    if (data.fechaProgramada) {
      updateData.fechaProgramada = new Date(data.fechaProgramada)
    }

    // Momentos
    if (data.momentos && Array.isArray(data.momentos)) {
      updateData.momentos = data.momentos.map((momento: any) => ({
        tipo: momento.tipo,
        descripcion: momento.descripcion || '',
        contenidoEstudiante: momento.contenidoEstudiante || '',
        actividades: momento.actividades || [],
      }))
    }

    console.log('🔵 [PUT] UpdateData:', JSON.stringify(updateData, null, 2))

    const planificacion = await Planificacion.findByIdAndUpdate(
      existe._id,
      { $set: updateData },
      { new: true }
    ).lean()

    console.log('✅ [PUT] Planificación actualizada:', planificacion?._id)

    return NextResponse.json({ success: true, planificacion })
  } catch (error) {
    console.error('❌ [PUT] Error:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()

  // Eliminar notificaciones asociadas
  await Notificacion.deleteMany({ planificacionId: id })

  // Eliminar planificación
  await Planificacion.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}