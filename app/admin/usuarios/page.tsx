'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [mostrarInactivos, setMostrarInactivos] = useState(false)
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    setLoading(true)
    const res = await fetch(`/api/usuarios?inactivos=${mostrarInactivos}`)
    const data = await res.json()
    setUsuarios(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [mostrarInactivos])

  const toggleEstado = async (id: string, activar: boolean) => {
    await fetch(`/api/usuarios?id=${id}&accion=${activar ? 'activar' : 'desactivar'}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{usuarios.length} usuarios</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMostrarInactivos(!mostrarInactivos)}
            className="text-xs px-3 py-2 rounded-lg border dark:border-slate-600"
          >
            {mostrarInactivos ? 'Ver activos' : 'Ver inactivos'}
          </button>
          <Link href="/admin/usuarios/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nuevo Usuario</Link>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {usuarios.map((u: any) => (
              <div key={u._id} className={`px-5 py-3 flex items-center justify-between ${!u.activo ? 'opacity-50' : ''} hover:bg-gray-50 dark:hover:bg-slate-700`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300">
                    {u.nombre?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{u.nombre}</p>
                    <p className="text-xs text-gray-400">{u.email} · {u.rol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  {u.grado && <span className="text-gray-500 dark:text-gray-400">{u.grado?.replace('-', ' ')}</span>}
                  {u.categoriaDocente && <span className="text-gray-500 dark:text-gray-400 capitalize">{u.categoriaDocente?.replace('-', ' ')}</span>}
                  {u.activo && (
                    <Link href={`/admin/usuarios/editar/${u._id}`} className="text-blue-600 hover:underline">Editar</Link>
                  )}
                  <button
                    onClick={() => toggleEstado(u._id, !u.activo)}
                    className={u.activo ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'}
                  >
                    {u.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}