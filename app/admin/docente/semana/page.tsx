'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SemanaPage() {
  const { data: session } = useSession()
  const [planificaciones, setPlanificaciones] = useState<any[]>([])
  const [semanaOffset, setSemanaOffset] = useState(0)

  // Calcular inicio de la semana (lunes)
  const hoy = new Date()
  const lunes = new Date(hoy)
  lunes.setDate(hoy.getDate() - hoy.getDay() + 1 + (semanaOffset * 7))
  lunes.setHours(0, 0, 0, 0)

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  const fechasSemana = dias.map((_, i) => {
    const fecha = new Date(lunes)
    fecha.setDate(lunes.getDate() + i)
    return fecha
  })

  useEffect(() => {
    if (session?.user) {
      fetch('/api/planificaciones?todas=true')
        .then(r => r.json())
        .then(d => setPlanificaciones(Array.isArray(d?.planificaciones) ? d.planificaciones : []))
    }
  }, [session])

  const plansPorDia = (fecha: Date) => {
    return planificaciones.filter(p => {
      if (!p.fechaProgramada) return false
      const fp = new Date(p.fechaProgramada)
      return fp.toDateString() === fecha.toDateString()
    })
  }

  const getMateriaColor = (materia: string) => {
    const map: Record<string, string> = {
      ingles: 'bg-blue-100 text-blue-700 border-blue-300',
      frances: 'bg-indigo-100 text-indigo-700 border-indigo-300',
      'lengua-espanola': 'bg-red-100 text-red-700 border-red-300',
      matematica: 'bg-green-100 text-green-700 border-green-300',
      'ciencias-sociales': 'bg-amber-100 text-amber-700 border-amber-300',
      'ciencias-naturales': 'bg-emerald-100 text-emerald-700 border-emerald-300',
      'educacion-fisica': 'bg-orange-100 text-orange-700 border-orange-300',
      artistica: 'bg-pink-100 text-pink-700 border-pink-300',
    }
    return map[materia] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📅 Planificación Semanal</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSemanaOffset(s => s - 1)}
            className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            ← Semana anterior
          </button>
          <span className="text-sm text-gray-500">
            {fechasSemana[0].toLocaleDateString('es-DO')} - {fechasSemana[4].toLocaleDateString('es-DO')}
          </span>
          <button
            onClick={() => setSemanaOffset(s => s + 1)}
            className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Semana siguiente →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {fechasSemana.map((fecha, i) => {
          const planes = plansPorDia(fecha)
          const esHoy = fecha.toDateString() === new Date().toDateString()

          return (
            <div key={i} className={`rounded-xl border p-3 min-h-[200px] ${esHoy ? 'border-blue-400 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-900/10' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
              <div className={`text-center mb-3 ${esHoy ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}>
                <p className="text-xs font-semibold uppercase">{dias[i]}</p>
                <p className={`text-lg font-bold ${esHoy ? '' : 'text-gray-900 dark:text-white'}`}>{fecha.getDate()}</p>
              </div>

              <div className="space-y-2">
                {planes.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">Sin planificaciones</p>
                ) : (
                  planes.map(p => (
                    <Link
                      key={p._id}
                      href={`/dashboard/${p.nivel || 'nivel-secundario'}/${p.grado}/${p.slug}`}
                      className={`block p-2 rounded-lg border text-xs transition-colors hover:shadow-sm ${getMateriaColor(p.materia)}`}
                    >
                      <p className="font-medium truncate">{p.tema}</p>
                      <p className="opacity-70">{p.grado?.replace('-', ' ')}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}