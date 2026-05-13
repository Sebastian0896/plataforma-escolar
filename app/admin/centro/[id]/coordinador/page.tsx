// app/admin/centro/[id]/coordinador/page.tsx
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { CoordinadorDashboardClient } from '@/components/coordinador/CoordinadorDashboard'

interface Props {
  params: Promise<{ id: string }>
}

export default async function CoordinadorPage({ params }: Props) {
  const session = await auth()
  const { id } = await params
  
  const centroIdActual = id || session?.user?.centroId
  
  if (!centroIdActual) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold text-red-500">Error</h1>
        <p>No se pudo identificar el centro educativo.</p>
      </div>
    )
  }
  
  // Obtener datos del centro
  const centro = await prisma.centro.findUnique({
    where: { id: centroIdActual },
    select: { id: true, nombre: true, codigo: true, plan: true }
  })
  
  // Obtener docentes del centro
  const docentes = await prisma.usuario.findMany({
    where: {
      centroId: centroIdActual,
      rol: 'docente',
      activo: true,
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      materias: true,
      grados: true,
      categoriaDocente: true,
    },
    orderBy: { nombre: 'asc' }
  })
  
  // Obtener estadísticas
  const [totalEstudiantes, periodosActivos] = await Promise.all([
    prisma.usuario.count({
      where: { centroId: centroIdActual, rol: 'estudiante', activo: true }
    }),
    prisma.periodo.count({
      where: { centroId: centroIdActual, activo: true }
    })
  ])
  
  // Obtener distribución por grado
  const estudiantesPorGrado = await prisma.usuario.groupBy({
    by: ['grado'],
    where: { centroId: centroIdActual, rol: 'estudiante', activo: true },
    _count: { id: true },
  })
  
  // Obtener materias totales
  const totalMaterias = await prisma.materia.count({
    where: { activo: true }
  })
  
  // Construir objeto stats
  const stats = {
    totalDocentes: docentes.length,
    totalEstudiantes,
    totalMaterias,
    periodosActivos,
    estudiantesPorGrado: estudiantesPorGrado.map(g => ({
      grado: g.grado || 'No asignado',
      cantidad: g._count.id
    }))
  }
  
  return (
    <CoordinadorDashboardClient
      centro={centro}
      stats={stats}
      docentes={docentes}
    />
  )
}