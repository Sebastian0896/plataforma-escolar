import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Asistencia from '@/lib/models/Asistencia'
import { prisma } from '@/lib/prisma'

export const runtime = "nodejs"

// GET
export async function GET(request: Request) {
  const session = await auth()
  
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')
  const materia = searchParams.get('materia')
  const fecha = searchParams.get('fecha')
  const periodo = searchParams.get('periodo')

  await connectDB()

  // 1. Filtro base de seguridad restringido al centro del usuario
  const filter: any = { centroId: session.user.centroId }

  // Filtros condicionales procedentes de la UI
  if (grado && grado !== 'todos') filter.grado = grado
  if (materia && materia !== 'todos') filter.materia = materia
  if (periodo && periodo !== 'todos') filter.periodo = periodo

  if (fecha) {
    const inicio = new Date(fecha)
    inicio.setHours(0, 0, 0, 0)
    
    const fin = new Date(fecha)
    fin.setHours(23, 59, 59, 999)
    
    filter.fecha = { $gte: inicio, $lte: fin }
  }

  try {
    // 2. Primera Petición: MongoDB (Registros de asistencia)
    const registrosMongo = await Asistencia.find(filter).sort({ fecha: -1 }).lean()

    if (registrosMongo.length === 0) {
      return NextResponse.json([])
    }

    // 3. Extraer IDs únicos de estudiantes implicados
    const estudianteIds = Array.from(
      new Set(registrosMongo.map((reg: any) => reg.estudianteId))
    )

    // 4. Segunda Petición: Postgres (Nombres de estudiantes en bloque)
    const estudiantesPostgres = await prisma.usuario.findMany({
      where: {
        id: { in: estudianteIds }
      },
      select: {
        id: true,
        nombre: true
      }
    })

    // 5. Indexar en un mapa O(1) para asociar velozmente { id: nombre }
    const mapaEstudiantes = estudiantesPostgres.reduce((acc: Record<string, string>, est) => {
      acc[est.id] = est.nombre
      return acc
    }, {})

    // 6. Hidratar los datos de MongoDB inyectando el nombre correspondiente de Postgres
    const registrosHistorialCompleto = registrosMongo.map((reg: any) => ({
      ...reg,
      estudianteNombre: mapaEstudiantes[reg.estudianteId] || 'Estudiante no encontrado'
    }))

    return NextResponse.json(registrosHistorialCompleto)

  } catch (error) {
    console.error("Error en la sincronización de las bases de datos:", error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
// POST
export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { grado, materia, fecha, periodo, registros } = await request.json()

  await connectDB()

  const docs = registros.map((r: any) => ({
    updateOne: {
      filter: { estudianteId: r.estudianteId, fecha: new Date(fecha), materia },
      update: {
        $set: {
          estudianteId: r.estudianteId,
          docenteId: session.user?.id,
          grado, materia,
          fecha: new Date(fecha),
          periodo: periodo || 'P1',
          presente: r.presente,
          observacion: r.observacion || '',
          centroId: session.user?.centroId,
        },
      },
      upsert: true,
    },
  }))

  if (docs.length > 0) await Asistencia.bulkWrite(docs as any)
  return NextResponse.json({ success: true })
}

// PUT
export async function PUT(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id, ...data } = await request.json()

  await connectDB()
  await Asistencia.findByIdAndUpdate(id, data)

  return NextResponse.json({ success: true })
}

// DELETE
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Asistencia.findByIdAndDelete(id)

  return NextResponse.json({ success: true })
}