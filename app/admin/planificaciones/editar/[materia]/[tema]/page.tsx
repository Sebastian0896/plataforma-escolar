'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Recurso {
  tipo: string
  url: string
  texto: string
  traduccion: string
  descripcion: string
}

interface Actividad {
  titulo: string
  descripcion: string
  estudiante: string
  duracion: string
  recursos: Recurso[]
}

export default function EditarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [postId, setPostId] = useState<string | null>(null)

  const [form, setForm] = useState({
    materia: '', nivel: '', ciclo: '', grado: '', categoriaDocente: '',
    tema: '', competencia: '', indicadorLogro: '', estudianteGeneral: '',
    maestro: '', coordinadora: '', centroEducativo: '', anoEscolar: '',
    momentos: [
      { tipo: 'inicio' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
      { tipo: 'desarrollo' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
      { tipo: 'cierre' as const, descripcion: '', estudiante: '', actividades: [] as Actividad[] },
    ],
  })

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`/api/planificaciones?tema=${params.tema}`)
        if (!res.ok) throw new Error('No encontrada')
        const data = await res.json()
        setPostId(data._id || data.id)

        const parseActividades = (jsonStr: string) => {
          if (!jsonStr || jsonStr === '[]') return []
          return JSON.parse(jsonStr).map((a: any) => ({
            titulo: a.titulo || '', descripcion: a.descripcion || '',
            estudiante: a.estudiante || '', duracion: a.duracion || '',
            recursos: a.recursos || [],
          }))
        }

        setForm({
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
          momentos: [
            { tipo: 'inicio', descripcion: data.momentos?.[0]?.descripcion || data.acf?.m1_descripcion || '', estudiante: data.momentos?.[0]?.contenidoEstudiante || data.acf?.m1_estudiante || '', actividades: data.momentos?.[0]?.actividades || parseActividades(data.acf?.m1_actividades || '[]') },
            { tipo: 'desarrollo', descripcion: data.momentos?.[1]?.descripcion || data.acf?.m2_descripcion || '', estudiante: data.momentos?.[1]?.contenidoEstudiante || data.acf?.m2_estudiante || '', actividades: data.momentos?.[1]?.actividades || parseActividades(data.acf?.m2_actividades || '[]') },
            { tipo: 'cierre', descripcion: data.momentos?.[2]?.descripcion || data.acf?.m3_descripcion || '', estudiante: data.momentos?.[2]?.contenidoEstudiante || data.acf?.m3_estudiante || '', actividades: data.momentos?.[2]?.actividades || parseActividades(data.acf?.m3_actividades || '[]') },
          ],
        })
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      }
      setLoading(false)
    }
    cargar()
  }, [params.tema])

  const agregarActividad = (idx: number) => {
    const nuevos = [...form.momentos]
    nuevos[idx].actividades.push({ titulo: '', descripcion: '', estudiante: '', duracion: '', recursos: [] })
    setForm({ ...form, momentos: nuevos })
  }

  const eliminarActividad = (mIdx: number, aIdx: number) => {
    const nuevos = [...form.momentos]
    nuevos[mIdx].actividades.splice(aIdx, 1)
    setForm({ ...form, momentos: nuevos })
  }

  const agregarRecurso = (mIdx: number, aIdx: number) => {
    const nuevos = [...form.momentos]
    nuevos[mIdx].actividades[aIdx].recursos.push({ tipo: 'audio', url: '', texto: '', traduccion: '', descripcion: '' })
    setForm({ ...form, momentos: nuevos })
  }

  const eliminarRecurso = (mIdx: number, aIdx: number, rIdx: number) => {
    const nuevos = [...form.momentos]
    nuevos[mIdx].actividades[aIdx].recursos.splice(rIdx, 1)
    setForm({ ...form, momentos: nuevos })
  }

  const actualizarRecurso = (mIdx: number, aIdx: number, rIdx: number, campo: string, valor: string) => {
    setForm((prev) => {
      const nuevos = [...prev.momentos]
      ;(nuevos[mIdx].actividades[aIdx].recursos[rIdx] as any)[campo] = valor
      return { ...prev, momentos: nuevos }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formatearActividades = (acts: Actividad[]) =>
      acts.map((a) => ({
        titulo: a.titulo, descripcion: a.descripcion, estudiante: a.estudiante,
        recursos: a.recursos.filter((r) => r.url || r.texto), duracion: a.duracion,
      }))

    try {
      const data = {
        id: postId, title: form.tema, materia: form.materia, nivel: form.nivel,
        ciclo: form.ciclo, grado: form.grado, categoriaDocente: form.categoriaDocente,
        acf: {
          competencia: form.competencia, indicador_logro: form.indicadorLogro,
          contenido_estudiante_general: form.estudianteGeneral,
          maestro: form.maestro, coordinadora: form.coordinadora,
          centro_educativo: form.centroEducativo, ano_escolar: form.anoEscolar,
          m1_descripcion: form.momentos[0].descripcion, m1_estudiante: form.momentos[0].estudiante,
          m1_actividades: JSON.stringify(formatearActividades(form.momentos[0].actividades)),
          m2_descripcion: form.momentos[1].descripcion, m2_estudiante: form.momentos[1].estudiante,
          m2_actividades: JSON.stringify(formatearActividades(form.momentos[1].actividades)),
          m3_descripcion: form.momentos[2].descripcion, m3_estudiante: form.momentos[2].estudiante,
          m3_actividades: JSON.stringify(formatearActividades(form.momentos[2].actividades)),
        },
      }

      const res = await fetch('/api/planificaciones', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error) }
      router.push('/admin/planificaciones'); router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error'); setSaving(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
  const textareaClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
  const selectClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gray-500 dark:text-gray-400">Cargando planificación...</p></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar Planificación</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={cardClass}>
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Datos Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Materia</label><select value={form.materia} onChange={(e) => setForm({ ...form, materia: e.target.value })} className={selectClass}><option value="">Seleccionar...</option><option value="frances">Francés</option><option value="ingles">Inglés</option></select></div>
            <div><label className={labelClass}>Nivel</label><select value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value })} className={selectClass}><option value="">Seleccionar...</option><option value="nivel-primario">Nivel Primario</option><option value="nivel-secundario">Nivel Secundario</option></select></div>
            <div><label className={labelClass}>Ciclo</label><select value={form.ciclo} onChange={(e) => setForm({ ...form, ciclo: e.target.value })} className={selectClass}><option value="">Seleccionar...</option><option value="primer-ciclo">Primer Ciclo</option><option value="segundo-ciclo">Segundo Ciclo</option></select></div>
            <div><label className={labelClass}>Grado</label><select value={form.grado} onChange={(e) => setForm({ ...form, grado: e.target.value })} className={selectClass}><option value="">Seleccionar...</option><optgroup label="Primaria"><option value="1ro-primaria">1ro Primaria</option><option value="2do-primaria">2do Primaria</option><option value="3ro-primaria">3ro Primaria</option><option value="4to-primaria">4to Primaria</option><option value="5to-primaria">5to Primaria</option><option value="6to-primaria">6to Primaria</option></optgroup><optgroup label="Secundaria"><option value="1ro-secundaria">1ro Secundaria</option><option value="2do-secundaria">2do Secundaria</option><option value="3ro-secundaria">3ro Secundaria</option><option value="4to-secundaria">4to Secundaria</option><option value="5to-secundaria">5to Secundaria</option><option value="6to-secundaria">6to Secundaria</option></optgroup></select></div>
            <div><label className={labelClass}>Categoría Docente</label><select value={form.categoriaDocente} onChange={(e) => setForm({ ...form, categoriaDocente: e.target.value })} className={selectClass}><option value="">Seleccionar...</option><option value="idiomas">Idiomas</option><option value="materias-basicas">Materias Básicas</option><option value="otras-materias">Otras Materias</option></select></div>
            <div><label className={labelClass}>Tema</label><input type="text" value={form.tema} onChange={(e) => setForm({ ...form, tema: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Maestro</label><input type="text" value={form.maestro} onChange={(e) => setForm({ ...form, maestro: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Coordinadora</label><input type="text" value={form.coordinadora} onChange={(e) => setForm({ ...form, coordinadora: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Centro Educativo</label><input type="text" value={form.centroEducativo} onChange={(e) => setForm({ ...form, centroEducativo: e.target.value })} className={inputClass} /></div>
            <div><label className={labelClass}>Año Escolar</label><input type="text" value={form.anoEscolar} onChange={(e) => setForm({ ...form, anoEscolar: e.target.value })} className={inputClass} /></div>
            <div className="md:col-span-2"><label className={labelClass}>Competencia</label><textarea value={form.competencia} onChange={(e) => setForm({ ...form, competencia: e.target.value })} className={textareaClass} rows={2} required /></div>
            <div className="md:col-span-2"><label className={labelClass}>Indicador de Logro</label><textarea value={form.indicadorLogro} onChange={(e) => setForm({ ...form, indicadorLogro: e.target.value })} className={textareaClass} rows={2} required /></div>
            <div className="md:col-span-2"><label className={labelClass}>Contenido visible para estudiantes (general)</label><textarea value={form.estudianteGeneral} onChange={(e) => setForm({ ...form, estudianteGeneral: e.target.value })} className={textareaClass} rows={2} /></div>
          </div>
        </div>

        {form.momentos.map((momento, mIdx) => (
          <div key={mIdx} className={cardClass}>
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4 capitalize">{momento.tipo === 'inicio' ? '🚀' : momento.tipo === 'desarrollo' ? '📝' : '🎯'} Momento {mIdx + 1}: {momento.tipo}</h2>
            <div className="space-y-4">
              <div><label className={labelClass}>Descripción (Guía Docente)</label><textarea value={momento.descripcion} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].descripcion = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={textareaClass} rows={2} required /></div>
              <div><label className={labelClass}>Contenido para estudiantes</label><textarea value={momento.estudiante} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].estudiante = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={textareaClass} rows={2} /></div>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Actividades</label><button type="button" onClick={() => agregarActividad(mIdx)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">+ Añadir actividad</button></div>
                {momento.actividades.map((act, aIdx) => (
                  <div key={aIdx} className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 space-y-3">
                    <div className="flex justify-between"><span className="text-xs text-gray-500 dark:text-gray-400">Actividad {aIdx + 1}</span><button type="button" onClick={() => eliminarActividad(mIdx, aIdx)} className="text-xs text-red-500">Eliminar</button></div>
                    <input type="text" placeholder="Título" value={act.titulo} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].actividades[aIdx].titulo = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={inputClass} required />
                    <textarea placeholder="Descripción (Guía Docente)" value={act.descripcion} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].actividades[aIdx].descripcion = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={textareaClass} rows={2} />
                    <textarea placeholder="Contenido para estudiantes" value={act.estudiante} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].actividades[aIdx].estudiante = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={textareaClass} rows={2} />
                    <input type="text" placeholder="Duración (ej: 15 min)" value={act.duracion} onChange={(e) => { const nuevos = [...form.momentos]; nuevos[mIdx].actividades[aIdx].duracion = e.target.value; setForm({ ...form, momentos: nuevos }) }} className={inputClass} />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between"><label className="text-xs font-medium text-gray-700 dark:text-gray-300">Recursos multimedia</label><button type="button" onClick={() => agregarRecurso(mIdx, aIdx)} className="text-xs text-green-600 dark:text-green-400 hover:underline">+ Añadir recurso</button></div>
                      {act.recursos.map((recurso, rIdx) => (
                        <div key={rIdx} className="p-2 bg-white dark:bg-slate-600 rounded border border-gray-200 dark:border-slate-500 space-y-2">
                          <div className="flex justify-between">
                            <select value={recurso.tipo} onChange={(e) => actualizarRecurso(mIdx, aIdx, rIdx, 'tipo', e.target.value)} className="text-xs px-2 py-1 border rounded bg-white dark:bg-slate-700 text-gray-900 dark:text-white">
                              <option value="audio">🎵 Audio</option><option value="imagen">🖼️ Imagen</option><option value="pdf">📄 PDF</option><option value="video">🎬 Video</option><option value="enlace">🔗 Enlace</option>
                            </select>
                            <button type="button" onClick={() => eliminarRecurso(mIdx, aIdx, rIdx)} className="text-xs text-red-500">Eliminar</button>
                          </div>
                          {recurso.tipo === 'audio' && (<><textarea placeholder="Texto para audio" value={recurso.texto} onChange={(e) => actualizarRecurso(mIdx, aIdx, rIdx, 'texto', e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white" rows={2} /><textarea placeholder="Traducción" value={recurso.traduccion} onChange={(e) => actualizarRecurso(mIdx, aIdx, rIdx, 'traduccion', e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white" rows={2} /></>)}
                          {(recurso.tipo === 'imagen' || recurso.tipo === 'pdf' || recurso.tipo === 'video' || recurso.tipo === 'enlace') && (<><input type="text" placeholder="URL" value={recurso.url} onChange={(e) => actualizarRecurso(mIdx, aIdx, rIdx, 'url', e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /><input type="text" placeholder="Descripción" value={recurso.descripcion} onChange={(e) => actualizarRecurso(mIdx, aIdx, rIdx, 'descripcion', e.target.value)} className="w-full px-2 py-1 border rounded text-xs bg-white dark:bg-slate-700 text-gray-900 dark:text-white" /></>)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">{saving ? 'Guardando...' : 'Actualizar Planificación'}</button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">Cancelar</button>
        </div>
      </form>
    </div>
  )
}