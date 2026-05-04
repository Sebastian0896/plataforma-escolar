import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Planificacion from '@/lib/models/Planificacion'

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
  const tema = searchParams.get('tema')

  if (!tema) {
    return NextResponse.json({ error: 'Falta parámetro tema' }, { status: 400 })
  }

  await connectDB()
  const plan = await Planificacion.findOne({ slug: tema })

  if (!plan) {
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  }

  return NextResponse.json(plan)
}

// POST
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
      competencia: data.acf.competencia,
      indicadorLogro: data.acf.indicador_logro,
      contenidoEstudiante: data.acf.contenido_estudiante_general,
      maestro: data.acf.maestro,
      coordinadora: data.acf.coordinadora,
      centroEducativo: data.acf.centro_educativo,
      anoEscolar: data.acf.ano_escolar,
      centroId: session.user?.centroId,
      creadoPor: session.user?.id, // ← NUEVO
      momentos: [
        {
          tipo: 'inicio',
          descripcion: data.acf.m1_descripcion,
          contenidoEstudiante: data.acf.m1_estudiante,
          actividades: JSON.parse(data.acf.m1_actividades || '[]'),
        },
        {
          tipo: 'desarrollo',
          descripcion: data.acf.m2_descripcion,
          contenidoEstudiante: data.acf.m2_estudiante,
          actividades: JSON.parse(data.acf.m2_actividades || '[]'),
        },
        {
          tipo: 'cierre',
          descripcion: data.acf.m3_descripcion,
          contenidoEstudiante: data.acf.m3_estudiante,
          actividades: JSON.parse(data.acf.m3_actividades || '[]'),
        },
      ],
    })

    console.log("Imprimiendo plan creada: ", plan)

    return NextResponse.json(plan, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()
    await connectDB()

    const plan = await Planificacion.findByIdAndUpdate(
      data.id,
      {
        tema: data.title,
        materia: data.materia,
        nivel: data.nivel,
        ciclo: data.ciclo,
        grado: data.grado,
        categoriaDocente: data.categoriaDocente,
        competencia: data.acf.competencia,
        indicadorLogro: data.acf.indicador_logro,
        contenidoEstudiante: data.acf.contenido_estudiante_general,
        maestro: data.acf.maestro,
        coordinadora: data.acf.coordinadora,
        centroEducativo: data.acf.centro_educativo,
        anoEscolar: data.acf.ano_escolar,
        momentos: [
          {
            tipo: 'inicio',
            descripcion: data.acf.m1_descripcion,
            contenidoEstudiante: data.acf.m1_estudiante,
            actividades: JSON.parse(data.acf.m1_actividades || '[]'),
          },
          {
            tipo: 'desarrollo',
            descripcion: data.acf.m2_descripcion,
            contenidoEstudiante: data.acf.m2_estudiante,
            actividades: JSON.parse(data.acf.m2_actividades || '[]'),
          },
          {
            tipo: 'cierre',
            descripcion: data.acf.m3_descripcion,
            contenidoEstudiante: data.acf.m3_estudiante,
            actividades: JSON.parse(data.acf.m3_actividades || '[]'),
          },
        ],
      },
      { new: true }
    )

    if (!plan) {
      return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
    }

    return NextResponse.json(plan)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error'
    return NextResponse.json({ error: message }, { status: 500 })
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
  await Planificacion.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}