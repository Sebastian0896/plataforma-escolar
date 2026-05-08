// components/NotificacionesBell.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Props {
  up?: boolean
}

export default function NotificacionesBell({ up = false }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const [notificaciones, setNotificaciones] = useState<any[]>([])
  const [totalNoLeidas, setTotalNoLeidas] = useState(0)
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/notificaciones?noLeidas=true')
      .then(r => r.json())
      .then(d => setTotalNoLeidas(d.totalNoLeidas || 0))

    fetch('/api/notificaciones')
      .then(r => r.json())
      .then(d => setNotificaciones(d.notificaciones || []))
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const marcarLeida = async (id: string) => {
    await fetch('/api/notificaciones', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, leida: true }),
    })
    setNotificaciones(prev => prev.map(x => x._id === id ? { ...x, leida: true } : x))
    setTotalNoLeidas(prev => Math.max(0, prev - 1))
    setAbierto(false)
  }

  const marcarTodas = async () => {
    await fetch('/api/notificaciones', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ todas: true, leida: true }) })
    setTotalNoLeidas(0)
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
  }

  const iconos: Record<string, string> = {
    recordatorio: '⏰', pendiente: '📋', senal: '📌', nueva_plan: '🆕', actualizacion: '🔄', resumen: '📊',
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setAbierto(!abierto)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
      >
        🔔
        {totalNoLeidas > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {totalNoLeidas}
          </span>
        )}
      </button>

      {abierto && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setAbierto(false)} />
          
          {/* Panel desde abajo */}
          <div className="fixed bottom-16 left-0 right-0 z-50 bg-white dark:bg-slate-800 rounded-t-2xl border border-gray-200 dark:border-slate-700 shadow-xl max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notificaciones</h3>
              {totalNoLeidas > 0 && (
                <button onClick={marcarTodas} className="text-xs text-blue-600 hover:underline">Marcar todas leídas</button>
              )}
            </div>

            {notificaciones.length === 0 ? (
              <p className="p-4 text-sm text-gray-500 text-center">Sin notificaciones</p>
            ) : (
              notificaciones.map(n => (
                <div key={n._id} className={`p-3 border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 ${!n.leida ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{iconos[n.tipo] || '📢'}</span>
                    <div className="flex-1 min-w-0">
                      {n.planificacionId ? (
                        <span
                          onClick={async (e) => {
                            e.preventDefault()
                            await marcarLeida(n._id)
                            const nivel = n.grado?.includes('primaria') ? 'nivel-primario' : 'nivel-secundario'
                            router.push(`/estudiante/${n.grado}/${n.planificacionSlug || n.planificacionId}`)
                          }}
                          className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer"
                        >
                          {n.titulo}
                        </span>
                      ) : (
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{n.titulo}</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.mensaje}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{new Date(n.createdAt).toLocaleString('es-DO')}</p>
                        <button
                          onClick={async (e) => { e.stopPropagation(); await marcarLeida(n._id) }}
                          className="text-xs hover:underline"
                        >
                          {n.leida ? '👁️' : '✅'}
                        </button>
                      </div>
                    </div>
                    {!n.leida && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}