'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function NuevoDocentePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    genero: '',
    niveles: [] as string[],
    ciclos: [] as string[],
    categoriaDocente: '',
    materias: [] as string[],
    grados: [] as string[],
  })

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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.niveles.length === 0) { setError('Seleccioná al menos un nivel'); setLoading(false); return }
    if (form.materias.length === 0) { setError('Seleccioná al menos una materia'); setLoading(false); return }
    if (form.grados.length === 0) { setError('Seleccioná al menos un grado'); setLoading(false); return }

    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rol: 'docente' }),
      })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error) }
      router.push('/admin/usuarios')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Nuevo Docente</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            <div><label className={labelClass}>Contraseña</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} required minLength={6} /></div>
            <div>
              <label className={labelClass}>Categoría</label>
              <select value={form.categoriaDocente} onChange={(e) => setForm({ ...form, categoriaDocente: e.target.value })} className={inputClass} required>
                <option value="">Seleccionar...</option>
                <option value="idiomas">Idiomas</option>
                <option value="materias-basicas">Materias Básicas</option>
                <option value="otras-materias">Otras Materias</option>
              </select>
            </div>

            {/* Niveles */}
            <div>
              <label className={labelClass}>Niveles</label>
              <div className="flex gap-2">
                {['nivel-primario', 'nivel-secundario'].map((n) => (
                  <label key={n} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                    form.niveles.includes(n) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <input type="checkbox" checked={form.niveles.includes(n)} onChange={() => toggleArray('niveles', n)} className="sr-only" />
                    {n === 'nivel-primario' ? 'Primario' : 'Secundario'}
                  </label>
                ))}
              </div>
            </div>

            {/* Ciclos */}
            <div>
              <label className={labelClass}>Ciclos</label>
              <div className="flex gap-2">
                {['primer-ciclo', 'segundo-ciclo'].map((c) => (
                  <label key={c} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                    form.ciclos.includes(c) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <input type="checkbox" checked={form.ciclos.includes(c)} onChange={() => toggleArray('ciclos', c)} className="sr-only" />
                    {c === 'primer-ciclo' ? 'Primer Ciclo' : 'Segundo Ciclo'}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Materias */}
          {/* Materias — solo se muestran si hay categoría seleccionada */}
            {form.categoriaDocente && (
              <div className="mt-4">
                <label className={labelClass}>Materias que imparte</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {MATERIAS_DISPONIBLES
                    .filter((m) => MATERIAS_POR_CATEGORIA[form.categoriaDocente]?.includes(m.slug))
                    .map((m) => (
                      <label key={m.slug} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                        form.materias.includes(m.slug) ? 'bg-green-50 dark:bg-green-900/20 border-green-300 text-green-700 dark:text-green-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                      }`}>
                        <input type="checkbox" checked={form.materias.includes(m.slug)} onChange={() => toggleArray('materias', m.slug)} className="sr-only" />
                        {m.label}
                      </label>
                    ))}
                </div>
              </div>
            )}

          {/* Grados */}
          {form.niveles.length > 0 && (
            <div className="mt-4">
              <label className={labelClass}>Grados que imparte</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {gradosDisponibles.map((g) => (
                  <label key={g} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer ${
                    form.grados.includes(g) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 text-blue-700 dark:text-blue-400' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-400'
                  }`}>
                    <input type="checkbox" checked={form.grados.includes(g)} onChange={() => toggleArray('grados', g)} className="sr-only" />
                    {g.replace('-', ' ')}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">{error}</div>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
            {loading ? 'Creando...' : 'Crear Docente'}
          </button>
          <button type="button" onClick={() => router.back()} className="text-sm text-gray-500 dark:text-gray-400">Cancelar</button>
        </div>
      </form>
    </div>
  )
}