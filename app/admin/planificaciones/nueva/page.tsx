'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_INICIALES: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

const DATOS_INICIALES: DatosGenerales = {
  materia: 'frances', nivel: 'nivel-secundario', ciclo: 'primer-ciclo',
  grado: '1ro-secundaria', categoriaDocente: '',
  tema: '', competencia: '', indicadorLogro: '', estudianteGeneral: '',
  maestro: '', coordinadora: 'Susana',
  centroEducativo: 'Salomé Ureña', anoEscolar: '2025-2026',
}

export default function NuevaPlanificacionPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [datos, setDatos] = useState<DatosGenerales>(DATOS_INICIALES)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_INICIALES)
  const { data: session } = useSession()

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
          acf: {
            competencia: datos.competencia,
            indicador_logro: datos.indicadorLogro,
            contenido_estudiante_general: datos.estudianteGeneral,
            maestro: session?.user.name?.toUpperCase(),
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
      setError(err instanceof Error ? err.message : 'Error al guardar')
      setSaving(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nueva Planificación</h1>
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
            {saving ? 'Guardando...' : 'Guardar Planificación'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}