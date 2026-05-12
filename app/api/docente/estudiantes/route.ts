// app/api/docente/estudiantes/route.ts — GET completo con Prisma
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import Planificacion from '@/lib/models/Planificacion'

export const runtime = "nodejs"

export async function GET(request: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro' && session.user?.role !== 'registro')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const grado = searchParams.get('grado')

  let grados: string[] = []

  if (grado) {
    grados = [grado]
  } else {
    // Obtener grados del docente desde su perfil (Prisma)
    const docente = await prisma.usuario.findUnique({ where: { id: session.user?.id || '' } })
    grados = docente?.grados?.length ? docente.grados : (docente?.grado ? [docente.grado] : [])

    // Si no tiene grados, buscar en sus planificaciones (MongoDB)
    if (grados.length === 0) {
      const planes = await Planificacion.find({
        centroId: session.user.centroId,
        categoriaDocente: session.user.categoriaDocente,
        publicado: true,
      }).select('grado').lean()
      grados = [...new Set(planes.map((p: any) => p.grado).filter(Boolean))]
    }

    // Si no hay grados, buscar en usuarios del mismo centro (Prisma)
    if (grados.length === 0) {
      const usuarios = await prisma.usuario.findMany({
        where: { centroId: session.user.centroId, rol: 'estudiante', activo: true },
        select: { grado: true },
      })
      grados = [...new Set(usuarios.map(u => u.grado).filter(Boolean))]
    }
  }

  // Buscar estudiantes con Prisma
  const where: any = {
    centroId: session.user.centroId,
    rol: 'estudiante',
    activo: true,
  }
  if (grados.length > 0) where.grado = { in: grados }

  const estudiantes = await prisma.usuario.findMany({
    where,
    orderBy: [{ grado: 'asc' }, { nombre: 'asc' }],
    select: { id: true, nombre: true, email: true, grado: true, genero: true, rne: true, createdAt: true },
  })

  // Agrupar por grado
  const porGrado: Record<string, any[]> = {}
  estudiantes.forEach(e => {
    const g = e.grado || 'sin-grado'
    if (!porGrado[g]) porGrado[g] = []
    porGrado[g].push(e)
  })

  return NextResponse.json({ estudiantes, porGrado, total: estudiantes.length })
}