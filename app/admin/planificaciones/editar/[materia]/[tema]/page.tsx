// app/admin/planificaciones/editar/[materia]/[tema]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Actividad {
  titulo: string
  descripcion: string
  estudiante: string
  audio: string
  traduccion: string
  duracion: string
}

export default function EditarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [postId, setPostId] = useState<number | null>(null)

  const [form, setForm] = useState({
    materia: '',
    nivel: '',
    ciclo: '',
    grado: '',
    categoriaDocente: '',
    tema: '',
    competencia: '',
    indicadorLogro: '',
    estudianteGeneral: '',
    maestro: '',
    coordinadora: '',
    centroEducativo: '',
    anoEscolar: '',
    momentos: [
      { tipo: 'inicio' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
      { tipo: 'desarrollo' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
      { tipo: 'cierre' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
    ],
  })

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(
          `/api/planificaciones?materia=${params.materia}&tema=${params.tema}`
        )
        if (!res.ok) throw new Error('No encontrada')

        const data = await res.json()
        setPostId(data.id)

        // Extraer taxonomías de los términos embebidos
        const terms = data._embedded?.['wp:term']?.flat() || []
        const getTermSlug = (tax: string) =>
          terms.find((t: any) => t.taxonomy === tax)?.slug || ''

        setForm({
          maestro: data.acf?.maestro || '',
          coordinadora: data.acf?.coordinadora || '',
          centroEducativo: data.acf?.centro_educativo || '',
          anoEscolar: data.acf?.ano_escolar || '',
          materia: getTermSlug('materia'),
          nivel: getTermSlug('nivel'),
          ciclo: getTermSlug('ciclo'),
          grado: getTermSlug('grado'),
          categoriaDocente: getTermSlug('categoria_docente'),
          tema: data.title?.rendered || '',
          competencia: data.acf?.competencia || '',
          indicadorLogro: data.acf?.indicador_logro || '',
          estudianteGeneral: data.acf?.contenido_estudiante_general || '',
          momentos: [
            {
              tipo: 'inicio',
              descripcion: data.acf?.m1_descripcion || '',
              estudiante: data.acf?.m1_estudiante || '',
              actividades: JSON.parse(data.acf?.m1_actividades || '[]'),
            },
            {
              tipo: 'desarrollo',
              descripcion: data.acf?.m2_descripcion || '',
              estudiante: data.acf?.m2_estudiante || '',
              actividades: JSON.parse(data.acf?.m2_actividades || '[]'),
            },
            {
              tipo: 'cierre',
              descripcion: data.acf?.m3_descripcion || '',
              estudiante: data.acf?.m3_estudiante || '',
              actividades: JSON.parse(data.acf?.m3_actividades || '[]'),
            },
          ],
        })
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al cargar'
        setError(message)
      }
      setLoading(false)
    }
    cargar()
  }, [params.materia, params.tema])

  const agregarActividad = (idx: number) => {
    const nuevos = [...form.momentos]
    nuevos[idx].actividades.push({
      titulo: '',
      descripcion: '',
      estudiante: '',
      audio: '',
      traduccion: '',
      duracion: '',
    })
    setForm({ ...form, momentos: nuevos })
  }

  const eliminarActividad = (mIdx: number, aIdx: number) => {
    const nuevos = [...form.momentos]
    nuevos[mIdx].actividades.splice(aIdx, 1)
    setForm({ ...form, momentos: nuevos })
  }

  const actualizarActividad = (
    mIdx: number,
    aIdx: number,
    campo: keyof Actividad,
    valor: string
  ) => {
    setForm((prev) => {
      const nuevos = [...prev.momentos]
      nuevos[mIdx].actividades[aIdx] = {
        ...nuevos[mIdx].actividades[aIdx],
        [campo]: valor,
      }
      return { ...prev, momentos: nuevos }
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const data = {
        id: postId,
        title: form.tema,
        materia: form.materia,
        nivel: form.nivel,
        ciclo: form.ciclo,
        grado: form.grado,
        categoriaDocente: form.categoriaDocente,
        acf: {
          competencia: form.competencia,
          indicador_logro: form.indicadorLogro,
          contenido_estudiante_general: form.estudianteGeneral,
          maestro: form.maestro,
          coordinadora: form.coordinadora,
          centro_educativo: form.centroEducativo,
          ano_escolar: form.anoEscolar,
          m1_descripcion: form.momentos[0].descripcion,
          m1_estudiante: form.momentos[0].estudiante,
          m1_actividades: JSON.stringify(form.momentos[0].actividades),
          m2_descripcion: form.momentos[1].descripcion,
          m2_estudiante: form.momentos[1].estudiante,
          m2_actividades: JSON.stringify(form.momentos[1].actividades),
          m3_descripcion: form.momentos[2].descripcion,
          m3_estudiante: form.momentos[2].estudiante,
          m3_actividades: JSON.stringify(form.momentos[2].actividades),
        },
      }

      const res = await fetch('/api/planificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al actualizar')
      }

      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al guardar'
      setError(message)
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando planificación...</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Planificación</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos generales */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Datos Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maestro</label>
              <input
                type="text"
                value={form.maestro}
                onChange={(e) => setForm({ ...form, maestro: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coordinadora</label>
              <input
                type="text"
                value={form.coordinadora}
                onChange={(e) => setForm({ ...form, coordinadora: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Centro Educativo</label>
              <input
                type="text"
                value={form.centroEducativo}
                onChange={(e) => setForm({ ...form, centroEducativo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año Escolar</label>
              <input
                type="text"
                value={form.anoEscolar}
                onChange={(e) => setForm({ ...form, anoEscolar: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Materia</label>
              <select
                value={form.materia}
                onChange={(e) => setForm({ ...form, materia: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="frances">Francés</option>
                <option value="ingles">Inglés</option>
                <option value="sociales">Sociales</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
              <select
                value={form.nivel}
                onChange={(e) => setForm({ ...form, nivel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="nivel-primario">Nivel Primario</option>
                <option value="nivel-secundario">Nivel Secundario</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo</label>
              <select
                value={form.ciclo}
                onChange={(e) => setForm({ ...form, ciclo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="primer-ciclo">Primer Ciclo</option>
                <option value="segundo-ciclo">Segundo Ciclo</option>
              </select>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grado</label>
              <select
                value={form.grado}
                onChange={(e) => setForm({ ...form, grado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <optgroup label="Primaria">
                  <option value="1ro-primaria">1ro Primaria</option>
                  <option value="2do-primaria">2do Primaria</option>
                  <option value="3ro-primaria">3ro Primaria</option>
                  <option value="4to-primaria">4to Primaria</option>
                  <option value="5to-primaria">5to Primaria</option>
                  <option value="6to-primaria">6to Primaria</option>
                </optgroup>
                <optgroup label="Secundaria">
                  <option value="1ro-secundaria">1ro Secundaria</option>
                  <option value="2do-secundaria">2do Secundaria</option>
                  <option value="3ro-secundaria">3ro Secundaria</option>
                  <option value="4to-secundaria">4to Secundaria</option>
                  <option value="5to-secundaria">5to Secundaria</option>
                  <option value="6to-secundaria">6to Secundaria</option>
                </optgroup>
              </select>
            </div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grado</label>
              <select
                value={form.grado}
                onChange={(e) => setForm({ ...form, grado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="1ro">1ro</option>
                <option value="2do">2do</option>
                <option value="3ro">3ro</option>
                <option value="4to">4to</option>
                <option value="5to">5to</option>
                <option value="6to">6to</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Docente</label>
              <select
                value={form.categoriaDocente}
                onChange={(e) => setForm({ ...form, categoriaDocente: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Seleccionar...</option>
                <option value="idiomas">Idiomas</option>
                <option value="materias-basicas">Materias Básicas</option>
                <option value="otras-materias">Otras Materias</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
              <input
                type="text"
                value={form.tema}
                onChange={(e) => setForm({ ...form, tema: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Competencia</label>
              <textarea
                value={form.competencia}
                onChange={(e) => setForm({ ...form, competencia: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Indicador de Logro</label>
              <textarea
                value={form.indicadorLogro}
                onChange={(e) => setForm({ ...form, indicadorLogro: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenido visible para estudiantes (general)
              </label>
              <textarea
                value={form.estudianteGeneral}
                onChange={(e) => setForm({ ...form, estudianteGeneral: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                rows={2}
                placeholder="Texto introductorio que verán los estudiantes..."
              />
            </div>
          </div>
        </div>

        {/* Momentos */}
        {form.momentos.map((momento, mIdx) => (
          <div key={mIdx} className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 capitalize">
              {momento.tipo === 'inicio' ? '🚀' : momento.tipo === 'desarrollo' ? '📝' : '🎯'}{' '}
              Momento {mIdx + 1}: {momento.tipo}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (Guía Docente)</label>
                <textarea
                  value={momento.descripcion}
                  onChange={(e) => {
                    const nuevos = [...form.momentos]
                    nuevos[mIdx].descripcion = e.target.value
                    setForm({ ...form, momentos: nuevos })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido para estudiantes</label>
                <textarea
                  value={momento.estudiante}
                  onChange={(e) => {
                    const nuevos = [...form.momentos]
                    nuevos[mIdx].estudiante = e.target.value
                    setForm({ ...form, momentos: nuevos })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={2}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Actividades</label>
                  <button type="button" onClick={() => agregarActividad(mIdx)} className="text-xs text-blue-600 hover:text-blue-800">
                    + Añadir actividad
                  </button>
                </div>
                {momento.actividades.map((act, aIdx) => (
                  <div key={aIdx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Actividad {aIdx + 1}</span>
                      <button type="button" onClick={() => eliminarActividad(mIdx, aIdx)} className="text-xs text-red-500">Eliminar</button>
                    </div>
                    <input
                      type="text" placeholder="Título"
                      value={act.titulo}
                      onChange={(e) => actualizarActividad(mIdx, aIdx, 'titulo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" required
                    />
                    <textarea placeholder="Descripción (Guía Docente)" value={act.descripcion}
                      onChange={(e) => actualizarActividad(mIdx, aIdx, 'descripcion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2}
                    />
                    <textarea placeholder="Contenido para estudiantes" value={act.estudiante}
                      onChange={(e) => actualizarActividad(mIdx, aIdx, 'estudiante', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <textarea placeholder="Texto para audio (TTS)" value={act.audio}
                        onChange={(e) => actualizarActividad(mIdx, aIdx, 'audio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2}
                      />
                      <textarea placeholder="Traducción del audio" value={act.traduccion}
                        onChange={(e) => actualizarActividad(mIdx, aIdx, 'traduccion', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" rows={2}
                      />
                    </div>
                    <input type="text" placeholder="Duración (ej: 15 min)" value={act.duracion}
                      onChange={(e) => actualizarActividad(mIdx, aIdx, 'duracion', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
        )}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Actualizar Planificación'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}