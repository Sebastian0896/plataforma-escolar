// app/admin/docente/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DocenteDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<any>(null)

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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
    </div>
  )
}