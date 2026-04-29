'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegistroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [tipoRegistro, setTipoRegistro] = useState<'estudiante' | 'docente'>('estudiante')

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    codigo: '',
    grado: '',
    rne: '',
    categoriaDocente: '',
    grados: [] as string[],
    materias: [] as string[],
  })

  const handleGradoToggle = (grado: string) => {
    setForm((prev) => ({
      ...prev,
      grados: prev.grados.includes(grado)
        ? prev.grados.filter((g) => g !== grado)
        : [...prev.grados, grado],
    }))
  }

  const handleMateriaToggle = (materia: string) => {
  setForm((prev) => ({
    ...prev,
    materias: prev.materias.includes(materia)
      ? prev.materias.filter((m) => m !== materia)
      : [...prev.materias, materia],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const body = {
        ...form,
        rol: tipoRegistro,
        // Si es docente, no enviar RNE
        rne: tipoRegistro === 'estudiante' ? form.rne : undefined,
      }

      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al registrar')

      setSuccess('¡Registro exitoso! Redirigiendo...')
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Registro</h1>
          <p className="text-sm text-gray-500 mt-1">
            Creá tu cuenta con el código de tu centro
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">{success}</div>}

          <div className="space-y-4">
            {/* Tipo de registro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de cuenta</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTipoRegistro('estudiante')}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-colors ${
                    tipoRegistro === 'estudiante'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  🎒 Estudiante
                </button>
                <button
                  type="button"
                  onClick={() => setTipoRegistro('docente')}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium border transition-colors ${
                    tipoRegistro === 'docente'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  👩‍🏫 Docente
                </button>
              </div>
            </div>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" required minLength={6} />
            </div>

            {/* Código centro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Código del Centro</label>
              <input type="text" value={form.codigo} onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: SALE2025" required />
            </div>

            {/* Campos de ESTUDIANTE */}
            {tipoRegistro === 'estudiante' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grado</label>
                  <select value={form.grado} onChange={(e) => setForm({ ...form, grado: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Seleccionar grado...</option>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">RNE (Código de estudiante)</label>
                  <input type="text" value={form.rne} onChange={(e) => setForm({ ...form, rne: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: RNE-2025-001" required />
                </div>
              </>
            )}

            {/* Campos de DOCENTE */}
            {tipoRegistro === 'docente' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select value={form.categoriaDocente} onChange={(e) => setForm({ ...form, categoriaDocente: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Seleccionar...</option>
                    <option value="idiomas">Idiomas</option>
                    <option value="materias-basicas">Materias Básicas</option>
                    <option value="otras-materias">Otras Materias</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materias que imparte
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { slug: 'frances', label: 'Francés' },
                      { slug: 'ingles', label: 'Inglés' },
                      { slug: 'lengua-espanola', label: 'Lengua Española' },
                      { slug: 'matematica', label: 'Matemática' },
                      { slug: 'ciencias-sociales', label: 'Ciencias Sociales' },
                      { slug: 'ciencias-naturales', label: 'Ciencias Naturales' },
                      { slug: 'educacion-fisica', label: 'Educación Física' },
                      { slug: 'artistica', label: 'Artística' },
                    ].map((m) => (
                      <label
                        key={m.slug}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer transition-colors ${
                          form.materias.includes(m.slug)
                            ? 'bg-green-50 border-green-300 text-green-700'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.materias.includes(m.slug)}
                          onChange={() => handleMateriaToggle(m.slug)}
                          className="sr-only"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                  {form.materias.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">Seleccioná al menos una materia</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grados que imparte (seleccioná varios)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 text-xs text-gray-500 font-medium mt-1">Primaria</div>
                    {['1ro-primaria', '2do-primaria', '3ro-primaria', '4to-primaria', '5to-primaria', '6to-primaria'].map((g) => (
                      <label key={g} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer transition-colors ${
                        form.grados.includes(g) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}>
                        <input type="checkbox" checked={form.grados.includes(g)} onChange={() => handleGradoToggle(g)} className="sr-only" />
                        {g.replace('-', ' ')}
                      </label>
                    ))}
                    <div className="col-span-2 text-xs text-gray-500 font-medium mt-2">Secundaria</div>
                    {['1ro-secundaria', '2do-secundaria', '3ro-secundaria', '4to-secundaria', '5to-secundaria', '6to-secundaria'].map((g) => (
                      <label key={g} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs border cursor-pointer transition-colors ${
                        form.grados.includes(g) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}>
                        <input type="checkbox" checked={form.grados.includes(g)} onChange={() => handleGradoToggle(g)} className="sr-only" />
                        {g.replace('-', ' ')}
                      </label>
                    ))}
                  </div>
                  {form.grados.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">Seleccioná al menos un grado</p>
                  )}
                </div>
              </>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
              {loading ? 'Registrando...' : `Crear cuenta de ${tipoRegistro}`}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          ¿Ya tenés cuenta?{' '}<Link href="/login" className="text-blue-600 hover:underline">Ingresar</Link>
        </p>
      </div>
    </div>
  )
}