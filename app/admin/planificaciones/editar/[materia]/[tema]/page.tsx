'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import BotonVolver from '@/components/BotonVolver'

import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_VACIOS: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

export default function EditarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()

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

        if (!res.ok) {
          throw new Error('No encontrada')
        }

        const data = await res.json()

        setPostId(data._id || data.id)

        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: data.grado || '',
          categoriaDocente: data.categoriaDocente || '',
          tema: data.tema || data.title?.rendered || '',
          competencia: data.competencia || data.acf?.competencia || '',
          indicadorLogro: data.indicadorLogro || data.acf?.indicador_logro || '',
          estudianteGeneral:
            data.contenidoEstudiante ||
            data.acf?.contenido_estudiante_general ||
            '',
          maestro: data.maestro || data.acf?.maestro || '',
          coordinadora: data.coordinadora || data.acf?.coordinadora || '',
          centroEducativo:
            data.centroEducativo || data.acf?.centro_educativo || '',
          anoEscolar: data.anoEscolar || data.acf?.ano_escolar || '',
          fechaProgramada: data.fechaProgramada || '',
        })

        const parseActividades = (jsonStr: string) => {
          if (!jsonStr || jsonStr === '[]') return []

          return JSON.parse(jsonStr).map((a: any) => ({
            titulo: a.titulo || '',
            descripcion: a.descripcion || '',
            estudiante: a.estudiante || '',
            duracion: a.duracion || '',
            recursos: a.recursos || [],
          }))
        }

        setMomentos([
          {
            tipo: 'inicio',
            descripcion:
              data.momentos?.[0]?.descripcion ||
              data.acf?.m1_descripcion ||
              '',
            estudiante:
              data.momentos?.[0]?.contenidoEstudiante ||
              data.acf?.m1_estudiante ||
              '',
            actividades:
              data.momentos?.[0]?.actividades ||
              parseActividades(data.acf?.m1_actividades || '[]'),
          },
          {
            tipo: 'desarrollo',
            descripcion:
              data.momentos?.[1]?.descripcion ||
              data.acf?.m2_descripcion ||
              '',
            estudiante:
              data.momentos?.[1]?.contenidoEstudiante ||
              data.acf?.m2_estudiante ||
              '',
            actividades:
              data.momentos?.[1]?.actividades ||
              parseActividades(data.acf?.m2_actividades || '[]'),
          },
          {
            tipo: 'cierre',
            descripcion:
              data.momentos?.[2]?.descripcion ||
              data.acf?.m3_descripcion ||
              '',
            estudiante:
              data.momentos?.[2]?.contenidoEstudiante ||
              data.acf?.m3_estudiante ||
              '',
            actividades:
              data.momentos?.[2]?.actividades ||
              parseActividades(data.acf?.m3_actividades || '[]'),
          },
        ])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      }

      setLoading(false)
    }

    cargar()
  }, [params.tema, session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/planificaciones', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          title: datos.tema,
          materia: datos.materia,
          nivel: datos.nivel,
          ciclo: datos.ciclo,
          grado: datos.grado,
          categoriaDocente: datos.categoriaDocente,
          fechaProgramada: datos.fechaProgramada || undefined,

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

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error')
      }

      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-muted-foreground">
          Cargando planificación...
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      <div className="space-y-4">
        <BotonVolver label="Volver a planificaciones" />

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Editar planificación
          </h1>

          <p className="text-sm text-muted-foreground">
            Actualiza los datos generales y los momentos pedagógicos.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <FormDatosGenerales
            datos={datos}
            onChange={setDatos}
          />
        </div>

        <div className="space-y-6">
          {momentos.map((momento, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <FormMomento
                momento={momento}
                index={idx}
                onChange={(nuevo) => {
                  const nuevos = [...momentos]
                  nuevos[idx] = nuevo
                  setMomentos(nuevos)
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto h-11 px-5 rounded-xl border border-gray-300 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Guardando...' : 'Actualizar planificación'}
          </button>
        </div>
      </form>
    </div>
  )
}