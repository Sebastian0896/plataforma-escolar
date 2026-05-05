'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import Link from 'next/link'
import 'react-calendar/dist/Calendar.css'

export default function CalendarioPage() {
  const { data: session } = useSession()
  const [planificaciones, setPlanificaciones] = useState<any[]>([])
  const [fecha, setFecha] = useState(new Date())
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/stats')
        .then(r => r.json())
        .then(data => {
          setPlanificaciones(data.recientes || [])
          setCargando(false)
        })
    }
  }, [session])

  // Agrupar planificaciones por fecha
  const porFecha: Record<string, any[]> = {}
  planificaciones.forEach(p => {
    const key = new Date(p.createdAt).toDateString()
    if (!porFecha[key]) porFecha[key] = []
    porFecha[key].push(p)
  })

  const fechaStr = fecha.toDateString()
  const delDia = porFecha[fechaStr] || []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Calendario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendario */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <Calendar
            onChange={(value) => setFecha(value as Date)}
            value={fecha}
            className="!border-0 !w-full"
            tileClassName={({ date }) => {
              const key = date.toDateString()
              return porFecha[key] ? 'bg-blue-100 dark:bg-blue-900/30 rounded-lg font-bold' : ''
            }}
          />
        </div>

        {/* Planificaciones del día */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {fecha.toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h2>

          {cargando ? (
            <p className="text-gray-500">Cargando...</p>
          ) : delDia.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">Sin planificaciones este día</p>
          ) : (
            <div className="space-y-3">
              {delDia.map((p, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white">{p.tema}</h3>
                  <p className="text-xs text-gray-500">{p.materia} · {p.grado?.replace('-', ' ')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}