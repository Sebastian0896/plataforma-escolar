'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import Link from 'next/link'
import 'react-calendar/dist/Calendar.css'

const coloresMateria: Record<string, { bg: string; dot: string }> = {
  ingles: { bg: 'bg-blue-100 dark:bg-blue-900/30', dot: 'bg-blue-500' },
  frances: { bg: 'bg-indigo-100 dark:bg-indigo-900/30', dot: 'bg-indigo-500' },
  'lengua-espanola': { bg: 'bg-red-100 dark:bg-red-900/30', dot: 'bg-red-500' },
  matematica: { bg: 'bg-green-100 dark:bg-green-900/30', dot: 'bg-green-500' },
  'ciencias-sociales': { bg: 'bg-amber-100 dark:bg-amber-900/30', dot: 'bg-amber-500' },
  'ciencias-naturales': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', dot: 'bg-emerald-500' },
  'educacion-fisica': { bg: 'bg-orange-100 dark:bg-orange-900/30', dot: 'bg-orange-500' },
  artistica: { bg: 'bg-pink-100 dark:bg-pink-900/30', dot: 'bg-pink-500' },
}

export default function CalendarioPage() {
  const { data: session } = useSession()
  const [planificaciones, setPlanificaciones] = useState<any[]>([])
  const [fecha, setFecha] = useState(new Date())
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/calendario')
        .then(r => r.json())
        .then(data => {
          setPlanificaciones(data || [])
          setCargando(false)
        })
    }
  }, [session])

  // Agrupar por fecha
  const porFecha: Record<string, any[]> = {}
  planificaciones.forEach(p => {
    if (p.fechaProgramada) {
      const key = new Date(p.fechaProgramada).toDateString()
      if (!porFecha[key]) porFecha[key] = []
      porFecha[key].push(p)
    }
  })

  const fechaStr = fecha.toDateString()
  const delDia = porFecha[fechaStr] || []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calendario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendario */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <style>{`
            .react-calendar { border: none !important; width: 100% !important; background: transparent !important; }
            .react-calendar__tile { padding: 1em 0.5em !important; position: relative; }
            .react-calendar__tile--active { background: #2563eb !important; color: white !important; border-radius: 8px; }
            .dark .react-calendar { color: white; }
            .dark .react-calendar__tile { color: #cbd5e1; }
            .dark .react-calendar__tile:disabled { color: #475569 !important; }
            .dark .react-calendar__navigation button { color: white; }
            .dark .react-calendar__month-view__weekdays { color: #94a3b8; }
          `}</style>
          <Calendar
            onChange={(value) => setFecha(value as Date)}
            value={fecha}
            tileClassName={({ date }) => {
              const key = date.toDateString()
              const plans = porFecha[key]
              if (!plans || plans.length === 0) return ''
              const color = coloresMateria[plans[0].materia] || coloresMateria['ingles']
              return `${color.bg} !important rounded-lg`
            }}
            tileContent={({ date }) => {
              const key = date.toDateString()
              const plans = porFecha[key]
              if (!plans || plans.length === 0) return null
              const color = coloresMateria[plans[0].materia] || coloresMateria['ingles']
              return (
                <div className="flex justify-center gap-0.5 mt-1">
                  {plans.map((_, i) => (
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                  ))}
                </div>
              )
            }}
          />
        </div>

        {/* Planificaciones del día */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
            {fecha.toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h2>

          {cargando ? (
            <p className="text-gray-500">Cargando...</p>
          ) : delDia.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 dark:text-gray-400">Sin planificaciones este día</p>
            </div>
          ) : (
            <div className="space-y-3">
              {delDia.map((p, i) => {
                const color = coloresMateria[p.materia] || coloresMateria['ingles']
                return (
                  <Link
                    key={i}
                    href={`/dashboard/${p.nivel || 'nivel-secundario'}/${p.grado}/${p.slug}`}
                    className={`block bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`w-3 h-3 rounded-full ${color.dot}`} />
                      <span className="text-xs font-medium capitalize text-gray-500">{p.materia}</span>
                      <span className="text-xs text-gray-400">· {p.grado?.replace('-', ' ')}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{p.tema}</h3>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}