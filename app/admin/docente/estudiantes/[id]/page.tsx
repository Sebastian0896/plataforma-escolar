'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'


export default function EstudianteFichaPage() {
  const { data: session } = useSession()
  const params = useParams()
  const [estudiante, setEstudiante] = useState<any>(null)
  const [evaluaciones, setEvaluaciones] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (params.id) {
      // Cargar datos del estudiante
      fetch(`/api/usuarios?id=${params.id}`)
        .then(r => r.json())
        .then(data => {
          setEstudiante(data)
          // Cargar evaluaciones de todas las materias y períodos
          return fetch(`/api/evaluaciones/estudiante/${params.id}`)
        })
        .then(r => r.json())
        .then(data => {
          setEvaluaciones(data.evaluaciones || [])
          setCargando(false)
        })
    }
  }, [params.id])

  const getColorNota = (nota: number) => {
    if (nota === undefined || nota === null) return 'text-gray-400'
    if (nota >= 80) return 'text-green-600 dark:text-green-400 font-bold'
    if (nota >= 65) return 'text-amber-600 dark:text-amber-400 font-bold'
    return 'text-red-600 dark:text-red-400 font-bold'
  }

  // Agrupar por materia
  const porMateria: Record<string, any> = {}
  evaluaciones.forEach((e: any) => {
    const mat = e.materia || 'Sin materia'
    if (!porMateria[mat]) porMateria[mat] = { P1: null, P2: null, P3: null, P4: null }
    const periodo = e.periodo || 'P1'
    // Calcular promedio de las notas del período
    const notas = e.notas ? Object.values(e.notas) : []
    const promedio = notas.length > 0
      ? Math.round((notas as number[]).reduce((a: number, b: number) => a + b, 0) / notas.length)
      : null
    porMateria[mat][periodo] = promedio
  })

  if (cargando) return <p className="text-gray-500">Cargando...</p>
  if (!estudiante) return <p className="text-gray-500">Estudiante no encontrado</p>

  return (
    <div>
      <Link href="/admin/docente/estudiantes" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Volver a estudiantes
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-2xl font-bold text-purple-700">
            {estudiante.nombre?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{estudiante.nombre}</h1>
            <p className="text-gray-500 dark:text-gray-400">{estudiante.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {estudiante.grado?.replace('-', ' ')} · {estudiante.genero || 'Sin género'}
              {estudiante.rne && ` · RNE: ${estudiante.rne}`}
            </p>
          </div>
        </div>
      </div>
        
      <div className="bg-white dark:bg-slate-800 rounded-xl mb-4 border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📊 Notas por Período</h2>
        </div>

        {Object.keys(porMateria).length === 0 ? (
          <p className="p-4 text-gray-500 text-sm">No hay evaluaciones registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Materia</th>
                  <th className="px-4 py-3 text-center font-medium">P1</th>
                  <th className="px-4 py-3 text-center font-medium">P2</th>
                  <th className="px-4 py-3 text-center font-medium">P3</th>
                  <th className="px-4 py-3 text-center font-medium">P4</th>
                  <th className="px-4 py-3 text-center font-medium">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {Object.entries(porMateria).map(([materia, periodos]: any) => {
                  const valores = [periodos.P1, periodos.P2, periodos.P3, periodos.P4].filter((v: any) => v !== null)
                  const promedio = valores.length > 0
                    ? Math.round(valores.reduce((a: number, b: number) => a + b, 0) / valores.length)
                    : null

                  return (
                    <tr key={materia}>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white capitalize">{materia}</td>
                      {['P1', 'P2', 'P3', 'P4'].map(p => (
                        <td key={p} className={`px-4 py-3 text-center font-medium ${
                            periodos[p] >= 80 ? 'text-green-600 dark:text-green-400' :
                            periodos[p] >= 65 ? 'text-amber-600 dark:text-amber-400' :
                            periodos[p] !== null ? 'text-red-600 dark:text-red-400' : 'text-gray-400'
                        }`}>
                            {periodos[p] ?? '-'}
                        </td>
                        ))}
                      <td className={`px-4 py-3 text-center font-bold ${
                        promedio >= 80 ? 'text-green-600 dark:text-green-400' :
                        promedio >= 65 ? 'text-amber-600 dark:text-amber-400' :
                        promedio !== null ? 'text-red-600 dark:text-red-400' : 'text-gray-400'
                        }`}>
                        {promedio ?? '-'}
                        </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
        <a
        href={`/api/comprobante/${estudiante._id}?periodo=P1`}
        target="_blank"
        className="bg-blue-600 text-white px-4 py-2 my-8 rounded-lg text-sm hover:bg-blue-700"
        >
        📄 Comprobante P1
        </a>
    </div>
  )
}