// components/planificacion/FormDatosGenerales.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { DatosGenerales } from './formTypes'

const MATERIAS_POR_CATEGORIA: Record<string, string[]> = {
  idiomas: ['frances', 'ingles'],
  'materias-basicas': ['lengua-espanola', 'matematica', 'ciencias-sociales', 'ciencias-naturales'],
  'otras-materias': ['educacion-fisica', 'artistica'],
}

const GRADOS_PRIMER_CICLO_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria']
const GRADOS_SEGUNDO_CICLO_PRIMARIA = ['4to-primaria', '5to-primaria', '6to-primaria']
const GRADOS_PRIMER_CICLO_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria']
const GRADOS_SEGUNDO_CICLO_SECUNDARIA = ['4to-secundaria', '5to-secundaria', '6to-secundaria']

function getGradosPorCiclo(nivel: string, ciclo: string): string[] {
  if (!nivel || !ciclo) return []
  if (nivel === 'nivel-primario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_PRIMARIA : GRADOS_SEGUNDO_CICLO_PRIMARIA
  }
  if (nivel === 'nivel-secundario') {
    return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_SECUNDARIA : GRADOS_SEGUNDO_CICLO_SECUNDARIA
  }
  return []
}

interface Props {
  datos: DatosGenerales
  onChange: (datos: DatosGenerales) => void
}

export default function FormDatosGenerales({ datos, onChange }: Props) {
  const { data: session } = useSession()
  const [materias, setMaterias] = useState<any[]>([])
  const [centroNombre, setCentroNombre] = useState('')

  const esDocente = session?.user?.role === 'docente'

  useEffect(() => {
    fetch('/api/materias')
      .then(res => res.json())
      .then(data => setMaterias(data))
  }, [])

  useEffect(() => {
    if (session?.user?.centroId) {
      fetch(`/api/centros?id=${session.user.centroId}`)
        .then(r => r.json())
        .then(c => { if (c.nombre) setCentroNombre(c.nombre) })
        .catch(() => {})
    }
  }, [session?.user?.centroId])

  useEffect(() => {
    if (esDocente && session?.user?.categoriaDocente && !datos.categoriaDocente) {
      onChange({ ...datos, categoriaDocente: session.user.categoriaDocente })
    }
    if (esDocente && session?.user?.name && !datos.maestro) {
      onChange({ ...datos, maestro: (session.user.name || '').toUpperCase() })
    }
  }, [session])

  const materiasFiltradas = datos.categoriaDocente
    ? materias.filter((m) => MATERIAS_POR_CATEGORIA[datos.categoriaDocente]?.includes(m.slug))
    : materias

  const set = (field: keyof DatosGenerales, value: string) => {
    const updates: any = { [field]: value }
    if (field === 'categoriaDocente') {
      updates.materia = ''
    }
    if (field === 'nivel') {
      updates.ciclo = ''
      updates.grado = ''
    }
    if (field === 'ciclo') {
      updates.grado = ''
    }
    onChange({ ...datos, ...updates })
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const selectClass = inputClass
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"
  const readonlyClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-gray-100 dark:bg-slate-600 text-gray-900 dark:text-white cursor-not-allowed"

  return (
    <div className={cardClass}>
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Datos Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Categoría */}
        <div>
          <label className={labelClass}>Categoría</label>
          {esDocente ? (
            <input type="text" value={datos.categoriaDocente?.replace('-', ' ') || ''} className={readonlyClass} readOnly disabled />
          ) : (
            <select value={datos.categoriaDocente} onChange={(e) => set('categoriaDocente', e.target.value)} className={selectClass}>
              <option value="">Seleccionar...</option>
              <option value="idiomas">Idiomas</option>
              <option value="materias-basicas">Materias Básicas</option>
              <option value="otras-materias">Otras Materias</option>
            </select>
          )}
        </div>

        {/* Materia */}
        <div>
          <label className={labelClass}>Materia</label>
          <select value={datos.materia} onChange={(e) => set('materia', e.target.value)} className={selectClass}>
            <option value="">Seleccionar...</option>
            {materiasFiltradas.map((m) => (
              <option key={m.slug} value={m.slug}>{m.nombre}</option>
            ))}
          </select>
        </div>

        {/* Nivel */}
        <div>
          <label className={labelClass}>Nivel</label>
          <select value={datos.nivel} onChange={(e) => set('nivel', e.target.value)} className={selectClass}>
            <option value="">Seleccionar...</option>
            <option value="nivel-primario">Nivel Primario</option>
            <option value="nivel-secundario">Nivel Secundario</option>
          </select>
        </div>

        {/* Ciclo */}
        <div>
          <label className={labelClass}>Ciclo</label>
          <select value={datos.ciclo} onChange={(e) => set('ciclo', e.target.value)} className={selectClass} disabled={!datos.nivel}>
            <option value="">Seleccionar...</option>
            <option value="primer-ciclo">Primer Ciclo</option>
            <option value="segundo-ciclo">Segundo Ciclo</option>
          </select>
        </div>

        {/* Grado */}
        <div>
          <label className={labelClass}>Grado</label>
          <select value={datos.grado} onChange={(e) => set('grado', e.target.value)} className={selectClass} disabled={!datos.ciclo}>
            <option value="">Seleccionar...</option>
            {getGradosPorCiclo(datos.nivel, datos.ciclo).map((g) => (
              <option key={g} value={g}>{g.replace('-', ' ')}</option>
            ))}
          </select>
        </div>

        {/* Tema */}
        <div>
          <label className={labelClass}>Tema</label>
          <input type="text" value={datos.tema} onChange={(e) => set('tema', e.target.value)} className={inputClass} placeholder="Ej: Información Personal" required />
        </div>

        {/* Maestro */}
        <div>
          <label className={labelClass}>Maestro</label>
          {esDocente ? (
            <input type="text" value={(session?.user?.name || '').toUpperCase()} className={readonlyClass} readOnly disabled />
          ) : (
            <input type="text" value={datos.maestro} onChange={(e) => set('maestro', e.target.value)} className={inputClass} />
          )}
        </div>

        {/* Coordinadora */}
        <div>
          <label className={labelClass}>Coordinadora</label>
          <input type="text" value={datos.coordinadora} onChange={(e) => set('coordinadora', e.target.value)} className={inputClass} />
        </div>

        {/* Centro Educativo */}
        <div>
          <label className={labelClass}>Centro Educativo</label>
          <input type="text" value={centroNombre || datos.centroEducativo} className={readonlyClass} readOnly disabled />
        </div>

        {/* Año Escolar */}
        <div>
          <label className={labelClass}>Año Escolar</label>
          <input type="text" value={datos.anoEscolar} onChange={(e) => set('anoEscolar', e.target.value)} className={inputClass} />
        </div>

        {/* Competencia */}
        <div className="md:col-span-2">
          <label className={labelClass}>Competencia</label>
          <textarea value={datos.competencia} onChange={(e) => set('competencia', e.target.value)} className={inputClass} rows={2} required />
        </div>

        {/* Indicador de Logro */}
        <div className="md:col-span-2">
          <label className={labelClass}>Indicador de Logro</label>
          <textarea value={datos.indicadorLogro} onChange={(e) => set('indicadorLogro', e.target.value)} className={inputClass} rows={2} required />
        </div>

        {/* Contenido para estudiantes */}
        <div className="md:col-span-2">
          <label className={labelClass}>Contenido visible para estudiantes</label>
          <textarea value={datos.estudianteGeneral} onChange={(e) => set('estudianteGeneral', e.target.value)} className={inputClass} rows={2} />
        </div>
      </div>
    </div>
  )
}