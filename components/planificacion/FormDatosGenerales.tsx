'use client'

import { DatosGenerales } from './formTypes'

interface Props {
  datos: DatosGenerales
  onChange: (datos: DatosGenerales) => void
}

export default function FormDatosGenerales({ datos, onChange }: Props) {
  const inputClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const textareaClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const selectClass = "w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
  const cardClass = "bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5"

  const set = (field: keyof DatosGenerales, value: string) => {
    onChange({ ...datos, [field]: value })
  }

  return (
    <div className={cardClass}>
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Datos Generales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelClass}>Materia</label><select value={datos.materia} onChange={(e) => set('materia', e.target.value)} className={selectClass}><option value="frances">Francés</option><option value="ingles">Inglés</option></select></div>
        <div><label className={labelClass}>Nivel</label><select value={datos.nivel} onChange={(e) => set('nivel', e.target.value)} className={selectClass}><option value="nivel-primario">Nivel Primario</option><option value="nivel-secundario">Nivel Secundario</option></select></div>
        <div><label className={labelClass}>Ciclo</label><select value={datos.ciclo} onChange={(e) => set('ciclo', e.target.value)} className={selectClass}><option value="primer-ciclo">Primer Ciclo</option><option value="segundo-ciclo">Segundo Ciclo</option></select></div>
        <div><label className={labelClass}>Grado</label><select value={datos.grado} onChange={(e) => set('grado', e.target.value)} className={selectClass}><optgroup label="Primaria"><option value="1ro-primaria">1ro Primaria</option><option value="2do-primaria">2do Primaria</option><option value="3ro-primaria">3ro Primaria</option><option value="4to-primaria">4to Primaria</option><option value="5to-primaria">5to Primaria</option><option value="6to-primaria">6to Primaria</option></optgroup><optgroup label="Secundaria"><option value="1ro-secundaria">1ro Secundaria</option><option value="2do-secundaria">2do Secundaria</option><option value="3ro-secundaria">3ro Secundaria</option><option value="4to-secundaria">4to Secundaria</option><option value="5to-secundaria">5to Secundaria</option><option value="6to-secundaria">6to Secundaria</option></optgroup></select></div>
        <div><label className={labelClass}>Categoría</label><select value={datos.categoriaDocente} onChange={(e) => set('categoriaDocente', e.target.value)} className={selectClass}><option value="idiomas">Idiomas</option><option value="materias-basicas">Materias Básicas</option><option value="otras-materias">Otras Materias</option></select></div>
        <div><label className={labelClass}>Tema</label><input type="text" value={datos.tema} onChange={(e) => set('tema', e.target.value)} className={inputClass} placeholder="Ej: Información Personal" required /></div>
        <div><label className={labelClass}>Maestro</label><input type="text" value={datos.maestro} onChange={(e) => set('maestro', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Coordinadora</label><input type="text" value={datos.coordinadora} onChange={(e) => set('coordinadora', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Centro Educativo</label><input type="text" value={datos.centroEducativo} onChange={(e) => set('centroEducativo', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Año Escolar</label><input type="text" value={datos.anoEscolar} onChange={(e) => set('anoEscolar', e.target.value)} className={inputClass} /></div>
        <div className="md:col-span-2"><label className={labelClass}>Competencia</label><textarea value={datos.competencia} onChange={(e) => set('competencia', e.target.value)} className={textareaClass} rows={2} required /></div>
        <div className="md:col-span-2"><label className={labelClass}>Indicador de Logro</label><textarea value={datos.indicadorLogro} onChange={(e) => set('indicadorLogro', e.target.value)} className={textareaClass} rows={2} required /></div>
        <div className="md:col-span-2"><label className={labelClass}>Contenido visible para estudiantes</label><textarea value={datos.estudianteGeneral} onChange={(e) => set('estudianteGeneral', e.target.value)} className={textareaClass} rows={2} /></div>
      </div>
    </div>
  )
}