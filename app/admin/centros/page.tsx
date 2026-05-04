'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CentrosPage() {
  const [centros, setCentros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    setLoading(true)
    const res = await fetch('/api/centros')
    const data = await res.json()
    setCentros(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const toggleEstado = async (id: string, activar: boolean) => {
    await fetch(`/api/centros?id=${id}&accion=${activar ? 'activar' : 'desactivar'}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Centros Educativos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{centros.length} centros</p>
        </div>
        <Link href="/admin/centros/nuevo" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nuevo Centro</Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {centros.map((c: any) => (
              <div key={c._id} className={`px-5 py-4 flex items-center justify-between ${!c.activo ? 'opacity-50' : ''}`}>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{c.nombre}</p>
                  <p className="text-xs text-gray-500">Código: {c.codigo}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${c.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.activo ? 'Activo' : 'Inactivo'}
                  </span>
                  {
                    c.activo && (
                        <Link href={`/admin/centros/${c._id}/planificaciones`} className="text-xs text-blue-600 hover:underline">
                        Ver planificaciones
                        </Link>
                    )}
                  {c.activo && (
                    <Link href={`/admin/centros/editar/${c._id}`} className="text-xs text-blue-600 hover:underline">Editar</Link>
                  )}
                  <button onClick={() => toggleEstado(c._id, !c.activo)} className={`text-xs ${c.activo ? 'text-red-500' : 'text-green-500'}`}>
                    {c.activo ? 'Desactivar' : 'Activar'}
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