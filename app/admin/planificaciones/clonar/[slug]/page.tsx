'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_VACIOS: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

export default function ClonarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [datos, setDatos] = useState<DatosGenerales>({} as DatosGenerales)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_VACIOS)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`/api/planificaciones?tema=${params.slug}`)
        if (!res.ok) throw new Error('No encontrada')
        const data = await res.json()

        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: '', // Vacío para que el docente elija
          categoriaDocente: session?.user?.categoriaDocente || data.categoriaDocente || '',
          tema: '', // Vacío para que ponga nuevo nombre
          competencia: data.competencia || '',
          indicadorLogro: data.indicadorLogro || '',
          estudianteGeneral: data.contenidoEstudiante || '',
          maestro: (session?.user?.name || data.maestro || '').toUpperCase(),
          coordinadora: data.coordinadora || '',
          centroEducativo: data.centroEducativo || '',
          anoEscolar: data.anoEscolar || '',
          fechaProgramada: '',
        })

        setMomentos(
          data.momentos?.map((m: any) => ({
            tipo: m.tipo,
            descripcion: m.descripcion || '',
            estudiante: m.contenidoEstudiante || '',
            actividades: m.actividades?.map((a: any) => ({
              titulo: a.titulo || '',
              descripcion: a.descripcion || '',
              estudiante: a.contenidoEstudiante || '',
              duracion: a.duracion || '',
              recursos: a.recursos || [],
            })) || [],
          })) || MOMENTOS_VACIOS
        )
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      }
      setLoading(false)
    }
    cargar()
  }, [params.slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/planificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: datos.tema,
          materia: datos.materia,
          nivel: datos.nivel,
          ciclo: datos.ciclo,
          grado: datos.grado,
          categoriaDocente: datos.categoriaDocente,
          fechaProgramada: datos.fechaProgramada || null,
          acf: {
            competencia: datos.competencia,
            indicador_logro: datos.indicadorLogro,
            contenido_estudiante_general: datos.estudianteGeneral,
            maestro: datos.maestro,
            coordinadora: datos.coordinadora,
            centro_educativo: datos.centroEducativo,
            ano_escolar: datos.anoEscolar,
            m1_descripcion: momentos[0].descripcion,
            m1_estudiante: momentos[0].estudiante,
            m1_actividades: JSON.stringify(momentos[0].actividades),
            m2_descripcion: momentos[1].descripcion,
            m2_estudiante: momentos[1].estudiante,
            m2_actividades: JSON.stringify(momentos[1].actividades),
            m3_descripcion: momentos[2].descripcion,
            m3_estudiante: momentos[2].estudiante,
            m3_actividades: JSON.stringify(momentos[2].actividades),
          },
        }),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Error') }
      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Cargando planificación...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Clonar Planificación</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Los datos se copiaron. Cambiá el grado y tema, y guardá como nueva.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormDatosGenerales datos={datos} onChange={setDatos} />
        {momentos.map((momento, idx) => (
          <FormMomento key={idx} momento={momento} index={idx} onChange={(nuevo) => {
            const nuevos = [...momentos]; nuevos[idx] = nuevo; setMomentos(nuevos)
          }} />
        ))}
        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar como Nueva'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}