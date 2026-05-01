'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_VACIOS: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

export default function EditarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [postId, setPostId] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosGenerales>({} as DatosGenerales)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_VACIOS)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`/api/planificaciones?tema=${params.tema}`)
        if (!res.ok) throw new Error('No encontrada')
        const data = await res.json()
        setPostId(data._id || data.id)

        setDatos({
          materia: data.materia || '', nivel: data.nivel || '', ciclo: data.ciclo || '',
          grado: data.grado || '', categoriaDocente: data.categoriaDocente || '',
          tema: data.tema || data.title?.rendered || '',
          competencia: data.competencia || data.acf?.competencia || '',
          indicadorLogro: data.indicadorLogro || data.acf?.indicador_logro || '',
          estudianteGeneral: data.contenidoEstudiante || data.acf?.contenido_estudiante_general || '',
          maestro: data.maestro || data.acf?.maestro || '',
          coordinadora: data.coordinadora || data.acf?.coordinadora || '',
          centroEducativo: data.centroEducativo || data.acf?.centro_educativo || '',
          anoEscolar: data.anoEscolar || data.acf?.ano_escolar || '',
        })

        const parseActividades = (jsonStr: string) => {
          if (!jsonStr || jsonStr === '[]') return []
          return JSON.parse(jsonStr).map((a: any) => ({
            titulo: a.titulo || '', descripcion: a.descripcion || '',
            estudiante: a.estudiante || '', duracion: a.duracion || '', recursos: a.recursos || [],
          }))
        }

        setMomentos([
          { tipo: 'inicio', descripcion: data.momentos?.[0]?.descripcion || data.acf?.m1_descripcion || '', estudiante: data.momentos?.[0]?.contenidoEstudiante || data.acf?.m1_estudiante || '', actividades: data.momentos?.[0]?.actividades || parseActividades(data.acf?.m1_actividades || '[]') },
          { tipo: 'desarrollo', descripcion: data.momentos?.[1]?.descripcion || data.acf?.m2_descripcion || '', estudiante: data.momentos?.[1]?.contenidoEstudiante || data.acf?.m2_estudiante || '', actividades: data.momentos?.[1]?.actividades || parseActividades(data.acf?.m2_actividades || '[]') },
          { tipo: 'cierre', descripcion: data.momentos?.[2]?.descripcion || data.acf?.m3_descripcion || '', estudiante: data.momentos?.[2]?.contenidoEstudiante || data.acf?.m3_estudiante || '', actividades: data.momentos?.[2]?.actividades || parseActividades(data.acf?.m3_actividades || '[]') },
        ])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      }
      setLoading(false)
    }
    cargar()
  }, [params.tema])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/planificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: postId, title: datos.tema,
          materia: datos.materia, nivel: datos.nivel, ciclo: datos.ciclo,
          grado: datos.grado, categoriaDocente: datos.categoriaDocente,
          acf: {
            competencia: datos.competencia, indicador_logro: datos.indicadorLogro,
            contenido_estudiante_general: datos.estudianteGeneral,
            maestro: datos.maestro, coordinadora: datos.coordinadora,
            centro_educativo: datos.centroEducativo, ano_escolar: datos.anoEscolar,
            m1_descripcion: momentos[0].descripcion, m1_estudiante: momentos[0].estudiante,
            m1_actividades: JSON.stringify(momentos[0].actividades),
            m2_descripcion: momentos[1].descripcion, m2_estudiante: momentos[1].estudiante,
            m2_actividades: JSON.stringify(momentos[1].actividades),
            m3_descripcion: momentos[2].descripcion, m3_estudiante: momentos[2].estudiante,
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

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-500 dark:text-gray-400">Cargando...</p></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar Planificación</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormDatosGenerales datos={datos} onChange={setDatos} />

        {momentos.map((momento, idx) => (
          <FormMomento
            key={idx}
            momento={momento}
            index={idx}
            onChange={(nuevo) => {
              const nuevos = [...momentos]
              nuevos[idx] = nuevo
              setMomentos(nuevos)
            }}
          />
        ))}

        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar Planificación'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}