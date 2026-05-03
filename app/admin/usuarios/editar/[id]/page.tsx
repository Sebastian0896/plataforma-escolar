// app/admin/usuarios/editar/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getCicloByGrado } from '@/lib/utils'
import BotonVolver from '@/components/BotonVolver'

const MATERIAS_DISPONIBLES = [
  { slug: 'frances', label: 'Francés' },
  { slug: 'ingles', label: 'Inglés' },
  { slug: 'lengua-espanola', label: 'Lengua Española' },
  { slug: 'matematica', label: 'Matemática' },
  { slug: 'ciencias-sociales', label: 'Ciencias Sociales' },
  { slug: 'ciencias-naturales', label: 'Ciencias Naturales' },
  { slug: 'educacion-fisica', label: 'Educación Física' },
  { slug: 'artistica', label: 'Artística' },
]

const MATERIAS_POR_CATEGORIA: Record<string, string[]> = {
  idiomas: ['frances', 'ingles'],
  'materias-basicas': ['lengua-espanola', 'matematica', 'ciencias-sociales', 'ciencias-naturales'],
  'otras-materias': ['educacion-fisica', 'artistica'],
}

const GRADOS_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria']
const GRADOS_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria']

const GRADOS_PRIMER_CICLO_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria']
const GRADOS_SEGUNDO_CICLO_PRIMARIA = ['4to-primaria', '5to-primaria', '6to-primaria']
const GRADOS_PRIMER_CICLO_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria']
const GRADOS_SEGUNDO_CICLO_SECUNDARIA = ['4to-secundaria', '5to-secundaria', '6to-secundaria']

function getGradosPorCiclo(nivel: string, ciclo: string): string[] {
  if (nivel === 'nivel-primario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_PRIMARIA : GRADOS_SEGUNDO_CICLO_PRIMARIA
  }
  if (nivel === 'nivel-secundario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_SECUNDARIA : GRADOS_SEGUNDO_CICLO_SECUNDARIA
  }
  return []
}

export default function EditarUsuarioPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nombre: '', email: '', password: '', rol: '', genero: '',
    nivel: '', ciclo: '', grado: '', rne: '',
    categoriaDocente: '',
    niveles: [] as string[],
    ciclos: [] as string[],
    materias: [] as string[],
    grados: [] as string[],
  })

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(`/api/usuarios?id=${params.id}`)
        if (!res.ok) throw new Error('No encontrado')
        const data = await res.json()
        setForm({
          nombre: data.nombre || '', email: data.email || '', password: '', rol: data.rol || '', genero: data.genero || '',
          nivel: data.nivel || '', ciclo: data.ciclo || '', grado: data.grado || '', rne: data.rne || '',
          categoriaDocente: data.categoriaDocente || '',
          niveles: data.niveles || [],
          ciclos: data.ciclos || [],
          materias: data.materias || [],
          grados: data.grados || [],
        })
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al cargar')
      }
      setLoading(false)
    }
    cargar()
  }, [params.id])

  const toggleArray = (campo: 'niveles' | 'ciclos' | 'materias' | 'grados', valor: string) => {
    setForm((prev) => ({
      ...prev,
      [campo]: prev[campo].includes(valor)
        ? prev[campo].filter((v) => v !== valor)
        : [...prev[campo], valor],
    }))
  }

  const gradosDisponibles = form.niveles.flatMap((n) =>
    n === 'nivel-primario' ? GRADOS_PRIMARIA : GRADOS_SECUNDARIA
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const body: any = {
      id: params.id,
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
      genero: form.genero
    }
    if (form.password) body.password = form.password

    if (form.rol === 'estudiante') {
      body.nivel = form.nivel
      body.ciclo = form.ciclo
      body.grado = form.grado
      body.rne = form.rne
    }

    if (form.rol === 'docente') {
      body.niveles = form.niveles
      body.ciclos = form.ciclos
      body.grados = form.grados
      body.categoriaDocente = form.categoriaDocente
      body.materias = form.materias
    }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Error') }
      router.push('/admin/usuarios')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
      setSaving(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  if (loading) return <div className="text-gray-500 dark:text-gray-400">Cargando...</div>

  return (
    <div>
      <BotonVolver label="Volver a planificaciones" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className={cardClass}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Nombre</label><input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={inputClass} required /></div>
            <div><label className={labelClass}>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} required /></div>
            <div>
              <label className={labelClass}>Género</label>
              <select value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })} className={inputClass}>
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div><label className={labelClass}>Contraseña (dejar vacío)</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} placeholder="••••••••" /></div>
            <div>
              <label className={labelClass}>Rol</label>
              <select value={form.rol} onChange={(e) => {
                const nuevoRol = e.target.value
                setForm({
                  ...form, rol: nuevoRol,
                  ...(nuevoRol === 'estudiante' ? { categoriaDocente: '', materias: [], niveles: [], ciclos: [], grados: [] } : {}),
                  ...(nuevoRol === 'docente' ? { nivel: '', ciclo: '', grado: '', rne: '' } : {}),
                  ...(nuevoRol === 'admin' || nuevoRol === 'admin_centro' ? { nivel: '', ciclo: '', grado: '', rne: '', categoriaDocente: '', materias: [], niveles: [], ciclos: [], grados: [] } : {}),
                })
              }} className={inputClass} required>
                <option value="estudiante">Estudiante</option>
                <option value="docente">Docente</option>
                <option value="admin_centro">Admin Centro</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Campos de ESTUDIANTE */}
            {form.rol === 'estudiante' && (
              <>
                <div>
                  <label className={labelClass}>Nivel</label>
                  <select value={form.nivel} onChange={(e) => setForm({ ...form, nivel: e.target.value, ciclo: '', grado: '' })} className={inputClass} required>
                    <option value="">Seleccionar...</option>
                    <option value="nivel-primario">Nivel Primario</option>
                    <option value="nivel-secundario">Nivel Secundario</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Ciclo</label>
                  <select value={form.ciclo} onChange={(e) => setForm({ ...form, ciclo: e.target.value })} className={inputClass} required disabled={!form.nivel}>
                    <option value="">Seleccionar...</option>
                    <option value="primer-ciclo">Primer Ciclo</option>
                    <option value="segundo-ciclo">Segundo Ciclo</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Grado</label>
                  <select value={form.grado} onChange={(e) => setForm({ ...form, grado: e.target.value })} className={inputClass} required disabled={!form.nivel || !form.ciclo}>
                  <option value="">Seleccionar...</option>
                  {getGradosPorCiclo(form.nivel, form.ciclo).map((g) => (
                    <option key={g} value={g}>{g.replace('-', ' ')}</option>
                  ))}
                </select>
                </div>
                <div><label className={labelClass}>RNE</label><input type="text" value={form.rne} onChange={(e) => setForm({ ...form, rne: e.target.value })} className={inputClass} /></div>
              </>
            )}

            {/* Campos de DOCENTE */}
            {form.rol === 'docente' && (
              <>
                <div>
                  <label className={labelClass}>Categoría</label>
                  <select value={form.categoriaDocente} onChange={(e) => setForm({ ...form, categoriaDocente: e.target.value })} className={inputClass} required>
                    <option value="">Seleccionar...</option>
                    <option value="idiomas">Idiomas</option>
                    <option value="materias-basicas">Materias Básicas</option>
                    <option value="otras-materias">Otras Materias</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Niveles</label>
                  <div className="flex gap-2">
                    {['nivel-primario', 'nivel-secundario'].map((n) => (
                      <label key={n} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                        form.niveles.includes(n) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-600'
                      }`}>
                        <input type="checkbox" checked={form.niveles.includes(n)} onChange={() => toggleArray('niveles', n)} className="sr-only" />
                        {n === 'nivel-primario' ? 'Primario' : 'Secundario'}
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Materias (docente) */}
          {form.rol === 'docente' && form.categoriaDocente && (
            <div className="mt-4">
              <label className={labelClass}>Materias que imparte</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

                {
                  MATERIAS_DISPONIBLES.filter((m) => MATERIAS_POR_CATEGORIA[form.categoriaDocente]?.includes(m.slug)).map((m) => (
                    <label key={m.slug} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                    form.materias.includes(m.slug) ? 'bg-green-50 dark:bg-green-900/20 border-green-300 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <input type="checkbox" checked={form.materias.includes(m.slug)} onChange={() => toggleArray('materias', m.slug)} className="sr-only" />
                    {m.label}
                  </label>
                  ))
                }
                {/* {MATERIAS_DISPONIBLES.map((m) => (
                  <label key={m.slug} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                    form.materias.includes(m.slug) ? 'bg-green-50 dark:bg-green-900/20 border-green-300 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <input type="checkbox" checked={form.materias.includes(m.slug)} onChange={() => toggleArray('materias', m.slug)} className="sr-only" />
                    {m.label}
                  </label>
                ))} */}
              </div>
            </div>
          )}

          {/* Grados (docente) */}
          {/* Ciclo y Grados por nivel */}
          {form.niveles.length > 0 && (
            <div className="mt-4 space-y-4">
              <label className={labelClass}>Grados que imparte</label>
              {form.niveles.map((nivel) => (
                <div key={nivel} className="p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {nivel === 'nivel-primario' ? 'Primaria' : 'Secundaria'}
                    </p>
                    <select
                      value={form.ciclos[nivel] || ''}
                      onChange={(e) => setForm({
                        ...form,
                        ciclos: { ...form.ciclos, [nivel]: e.target.value },
                        grados: [] // limpiar grados al cambiar ciclo
                      })}
                      className="text-xs px-2 py-1.5 border rounded-lg dark:bg-slate-600 dark:text-white"
                    >
                      <option value="">Seleccionar ciclo...</option>
                      <option value="primer-ciclo">Primer Ciclo</option>
                      <option value="segundo-ciclo">Segundo Ciclo</option>
                    </select>
                  </div>

                  {form.ciclos[nivel] && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {getGradosPorCiclo(nivel, form.ciclos[nivel]).map((g) => (
                        <label key={g} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                          form.grados.includes(g) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                        }`}>
                          <input type="checkbox" checked={form.grados.includes(g)} onChange={() => toggleArray('grados', g)} className="sr-only" />
                          {g.replace('-', ' ')}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}