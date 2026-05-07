'use client'

import { useState, useEffect } from 'react'

interface Props {
  slug: string
  onClose: () => void
}

export default function InstrumentoModal({ slug, onClose }: Props) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/instrumentos/generar?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [slug])

  const exportarPDF = async () => {
    const res = await fetch(`/api/instrumentos/pdf?slug=${slug}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url)
  }

  if (loading) return <div className="text-center py-8 text-gray-500">Generando instrumento...</div>

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">📋 Instrumento de Evaluación</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <div className="space-y-6">
          {/* Datos */}
          <div className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Tipo sugerido</p>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">{data?.tipo}</p>
          </div>

          {/* Criterios */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Criterios de Evaluación</h3>
            <div className="space-y-2">
              {data?.criterios?.map((c: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                  <span className="text-blue-600 font-bold">{i + 1}.</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recomendaciones</h3>
            <div className="space-y-2">
              {data?.recomendaciones?.map((r: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <span className="text-amber-600">💡</span>
                  <p className="text-sm text-amber-800 dark:text-amber-300">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700">
            📄 Exportar PDF
          </button>
          <button onClick={onClose} className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-lg text-sm">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}