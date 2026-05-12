import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { auth } from '@/auth'
import { connectDB } from '@/lib/db'
import Usuario from '@/lib/models/Usuario'
import { PLANES, ACTIVAR_PLANES } from '@/lib/planes'
import Centro from '@/lib/models/Centro'
import { usuarioSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'


export const runtime = "nodejs"

// Jerarquía de creación
const JERARQUIA: Record<string, string[]> = {
  superadmin: ['admin', 'admin_centro', 'docente', 'estudiante', 'coordinador', 'tecnico_distrital', 'registro'],
  admin: ['admin_centro', 'docente', 'estudiante', 'coordinador', 'tecnico_distrital', 'registro'],
  admin_centro: ['docente', 'estudiante', 'coordinador', 'tecnico_distrital', 'registro'],
}

function puedeGestionar(rolCreador: string, rolObjetivo: string): boolean {
  return JERARQUIA[rolCreador]?.includes(rolObjetivo) || false
}

function verificarPermiso(rolRequerido?: string) {
  return async () => {
    const session = await auth()
    if (!session) return null
    if (rolRequerido && !puedeGestionar(session.user?.role || '', rolRequerido)) return null
    return session
  }
}

// GET — Listar usuarios

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  // Buscar uno solo por ID
  if (id) {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { centro: { select: { nombre: true, codigo: true } } },
    })
    if (!usuario) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
    return NextResponse.json(usuario)
  }

  // Listar con paginación
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const mostrarInactivos = searchParams.get('inactivos') === 'true'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '9')
  const skip = (page - 1) * limit

  const where: any = { activo: mostrarInactivos ? false : true }
  if (session.user?.centroId && session.user?.role === 'admin_centro') {
    where.centroId = session.user.centroId
  }

  const [usuarios, total] = await Promise.all([
    prisma.usuario.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { centro: { select: { nombre: true, codigo: true } } },
    }),
    prisma.usuario.count({ where }),
  ])

  const usuariosConCentro = usuarios.map((u: any) => ({
    ...u,
    centroNombre: u.centro?.nombre || 'Sin centro',
    centroCodigo: u.centro?.codigo || '',
  }))

  return NextResponse.json({
    usuarios: usuariosConCentro,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}
// POST — Crear usuario
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      nombre, email, password, rol, genero,
      rne, categoriaDocente, materias,
      niveles, ciclos, grados, centroId, grado
    } = body

    const session = await auth()

    // 1. Validaciones de Seguridad y Roles
    if (rol === 'superadmin') {
      const count = await prisma.usuario.count({ where: { rol: 'superadmin' } })
      if (count > 0) {
        if (!session || session.user?.role !== 'superadmin') {
          return NextResponse.json({ error: 'No autorizado para crear superadmins' }, { status: 401 })
        }
      }
    } else {
      if (!session || !puedeGestionar(session.user?.role || '', rol)) {
        return NextResponse.json({ error: 'No autorizado para crear este rol' }, { status: 401 })
      }
    }

    // 2. Validación de campos obligatorios
    if (!nombre || !email || !password || !rol) {
      return NextResponse.json({ error: 'Nombre, email, password y rol son requeridos' }, { status: 400 })
    }

    // 3. Verificar si el usuario ya existe
    const existe = await prisma.usuario.findUnique({ where: { email } })
    if (existe) {
      return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 409 })
    }

    // 4. Preparación de datos
    const passwordHash = await bcrypt.hash(password, 10)

    let idDelCentro = centroId
    console.log('🏫 centroId recibido:', idDelCentro)
    if (session?.user?.role === 'admin_centro') {
      idDelCentro = session.user.centroId
    }


    // Validar que el centro exista antes de conectarlo
    if (idDelCentro) {
      const centroExiste = await prisma.centro.findUnique({ where: { id: idDelCentro } })
      if (!centroExiste) {
        return NextResponse.json({ error: 'El centro especificado no existe' }, { status: 400 })
      }
    }

    // Convertir ciclos a array plano si es necesario
    const ciclosArray = (rol === 'docente' && ciclos)
      ? (Array.isArray(ciclos) ? ciclos : Object.values(ciclos))
      : []

    // 5. Creación del Usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHash,
        rol,
        genero: genero || null,
        centroId: idDelCentro || null,
        grado: rol === 'estudiante' ? grado || null : null,
        rne: rol === 'estudiante' ? rne || null : null,
        niveles: rol === 'docente' ? niveles || [] : [],
        ciclos: ciclosArray,
        grados: rol === 'docente' ? grados || [] : [],
        categoriaDocente: rol === 'docente' ? categoriaDocente || null : null,
        materias: rol === 'docente' ? materias || [] : [],
      },
    })

    return NextResponse.json({ success: true, id: nuevoUsuario.id }, { status: 201 })

  } catch (error: any) {
    console.error("Error al crear usuario:", error)

    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'El email ya existe' }, { status: 409 })
    }

    return NextResponse.json(
      { error: 'Error interno del servidor al crear el usuario' },
      { status: 500 }
    )
  }
}

// PUT — Actualizar usuario
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await request.json()
  const { id, password, centroId } = body

  // 1. Campos que SÍ pertenecen a la tabla Usuario
  const dataToUpdate: any = {
    nombre: body.nombre,
    email: body.email,
    rol: body.rol,
    genero: body.genero,
    grado: body.grado,
    grados: body.grados,
    niveles: body.niveles,
    ciclos: body.ciclos,
    materias: body.materias,
    categoriaDocente: body.categoriaDocente,
    rne: body.rne,
    activo: body.activo,
  }

  // 2. Manejo de contraseña
  if (password && password.trim() !== "") {
    dataToUpdate.password = await bcrypt.hash(password, 10)
  }

  // 3. Relación: Aquí es donde conectas al Usuario con el Centro usando el ID
  // El "codigo" del centro ya vive en la tabla Centro, no necesitas enviarlo aquí.
  if (centroId) {
    dataToUpdate.centro = {
      connect: { id: centroId }
    }
  }

  try {
    await prisma.usuario.update({
      where: { id },
      data: dataToUpdate
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al actualizar:", error)
    return NextResponse.json({ error: 'Error en la base de datos' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const accion = searchParams.get('accion')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  await connectDB()
  await Usuario.findByIdAndUpdate(id, { activo: accion === 'activar' })

  return NextResponse.json({ success: true })
}