// app/admin/docente/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'


/* export const metadata = { title: 'Oficina Virtual' } */

export default function DocenteDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<any>(null)

  if (!session || (session.user?.role !== 'docente' && session.user?.role !== 'admin_centro')) {
    redirect('/dashboard')
  }

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/stats')
        .then(r => r.json())
        .then(data => setStats(data))
        .catch(() => {})
    }
  }, [session])

  if (!session) return null

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Oficina Virtual</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Bienvenido, {session.user?.name}</p>


      {stats?.pendientes?.length > 0 && (
        <div className="mb-8 space-y-2">
          {stats.pendientes.map((p: any) => (
            <div key={p.grado} className={`p-4 rounded-xl border ${
              p.urgente
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold text-sm ${p.urgente ? 'text-red-800 dark:text-red-300' : 'text-amber-800 dark:text-amber-300'}`}>
                    📋 {p.urgente ? '¡Urgente!' : 'Pendiente'} — {p.grado?.replace('-', ' ')}
                  </p>
                  <p className={`text-xs mt-0.5 ${p.urgente ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    Sin planificación esta semana {p.urgente ? `(quedan ${p.diasRestantes} días)` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/planificaciones/nueva?grado=${p.grado}`}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700"
                  >
                    Crear
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      fetch('/api/docente/pendientes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ grado: p.grado }),
                      }).then(() => {
                        setStats((prev: any) => ({
                          ...prev,
                          pendientes: prev.pendientes.filter((x: any) => x.grado !== p.grado),
                        }))
                      })
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Ignorar
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="my-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-red-100 dark:hover:border-green-700 hover:shadow-md transition-all group">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📈 Reportes</h2>
            <div className="flex gap-3">
              <a
                href="/api/docente/reportes?formato=excel"
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 inline-flex items-center gap-2"
              >
                📥 Exportar Excel
              </a>
              <a
                href="/api/docente/reportes?formato=pdf"
                target="_blank"
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 inline-flex items-center gap-2"
              >
                📄 Exportar PDF
              </a>
            </div>
        </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/planificaciones/nueva" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
            <span className="text-xl">➕</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Nueva Planificación</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Crear contenido</p>
        </Link>

        <Link href="/admin/planificaciones" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-3 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
            <span className="text-xl">📖</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Mis Planificaciones</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ver y gestionar</p>
        </Link>

        <Link href="/admin/docente/recursos" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-3 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 transition-colors">
            <span className="text-xl">📂</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Mis Recursos</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Biblioteca de archivos</p>
        </Link>

        <Link href="/admin/docente/estudiantes" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-3 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
            <span className="text-xl">👩‍🎓</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Mis Estudiantes</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ver lista</p>
        </Link>

        <Link href="/admin/docente/evaluaciones" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-3 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/30 transition-colors">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Evaluaciones</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Calificar estudiantes</p>
        </Link>

        <Link href="/dashboard" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mb-3 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30 transition-colors">
            <span className="text-xl">👁️</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Vista Previa</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Como lo ven los estudiantes</p>
        </Link>

        <Link href="/admin/docente/calendario" className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-3 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
            <span className="text-xl">📅</span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Calendario</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ver programación</p>
        </Link>
      </div>
    
        <hr className="my-6 border-gray-200 dark:border-slate-700" />
    
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Planificaciones</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalPlanificaciones || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Materias</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.porMateria?.length || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Grados</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.porGrado?.length || 0}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estudiantes</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalEstudiantes || 0}</p>
        </div>
      </div>
    </div>
  )
}