'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { NivelInfo } from '@/lib/types'

interface Props {
  estructura: NivelInfo[]
}

export default function CardsNiveles({ estructura }: Props) {
  const [vista, setVista] = useState<'niveles' | 'ciclos' | 'grados' | 'materias' | 'temas'>('niveles')
  const [nivelSel, setNivelSel] = useState<NivelInfo | null>(null)
  const [cicloSel, setCicloSel] = useState<any>(null)
  const [gradoSel, setGradoSel] = useState<any>(null)
  const [materiaSel, setMateriaSel] = useState<any>(null)

  const volver = () => {
    if (vista === 'temas') setVista('materias')
    else if (vista === 'materias') setVista('grados')
    else if (vista === 'grados') setVista('ciclos')
    else if (vista === 'ciclos') setVista('niveles')
  }

  const totalTemas = (item: any) => {
    if (item.temas) return item.temas.length
    if (item.materias) return item.materias.reduce((acc: number, m: any) => acc + totalTemas(m), 0)
    if (item.grados) return item.grados.reduce((acc: number, g: any) => acc + totalTemas(g), 0)
    if (item.ciclos) return item.ciclos.reduce((acc: number, c: any) => acc + totalTemas(c), 0)
    return 0
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <button onClick={() => { setVista('niveles'); setNivelSel(null) }} className="hover:text-blue-600">📚 Planificaciones</button>
        {nivelSel && (
          <>
            <span>›</span>
            <button onClick={() => { setVista('ciclos'); setCicloSel(null) }} className="hover:text-blue-600">{nivelSel.nombre}</button>
          </>
        )}
        {cicloSel && (
          <>
            <span>›</span>
            <button onClick={() => { setVista('grados'); setGradoSel(null) }} className="hover:text-blue-600">{cicloSel.nombre}</button>
          </>
        )}
        {gradoSel && (
          <>
            <span>›</span>
            <button onClick={() => { setVista('materias'); setMateriaSel(null) }} className="hover:text-blue-600">{gradoSel.nombre}</button>
          </>
        )}
        {materiaSel && (
          <>
            <span>›</span>
            <span className="text-gray-900 dark:text-white">{materiaSel.nombre}</span>
          </>
        )}
      </div>

      {/* Niveles */}
      {vista === 'niveles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {estructura.map(nivel => (
            <button
              key={nivel.slug}
              onClick={() => { setNivelSel(nivel); setVista('ciclos') }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">🏫</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{nivel.nombre}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{totalTemas(nivel)} planificaciones</p>
            </button>
          ))}
        </div>
      )}

      {/* Ciclos */}
      {vista === 'ciclos' && nivelSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nivelSel.ciclos.map(ciclo => (
            <button
              key={ciclo.slug}
              onClick={() => { setCicloSel(ciclo); setVista('grados') }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📘</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{ciclo.nombre}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{totalTemas(ciclo)} planificaciones</p>
            </button>
          ))}
        </div>
      )}

      {/* Grados */}
      {vista === 'grados' && cicloSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cicloSel.grados.map(grado => (
            <button
              key={grado.slug}
              onClick={() => { setGradoSel(grado); setVista('materias') }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">👨‍🎓</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{grado.nombre}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{totalTemas(grado)} planificaciones</p>
            </button>
          ))}
        </div>
      )}

      {/* Materias */}
      {vista === 'materias' && gradoSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradoSel.materias.map(materia => (
            <button
              key={materia.slug}
              onClick={() => { setMateriaSel(materia); setVista('temas') }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-5 text-left hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">📖</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{materia.nombre}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{materia.temas.length} planificaciones</p>
            </button>
          ))}
        </div>
      )}

      {/* Temas (lista final con acciones) */}
      {vista === 'temas' && materiaSel && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{materiaSel.nombre}</h2>
            <Link href="/admin/planificaciones/nueva" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">+ Nueva</Link>
          </div>
          {materiaSel.temas.map((tema: any) => (
            <div key={tema.slug} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 px-5 py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{tema.tema}</p>
                <p className="text-xs text-gray-500">/{gradoSel?.slug}/{materiaSel.slug}/{tema.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/admin/planificaciones/editar/${materiaSel.slug}/${tema.slug}`} className="text-sm text-blue-600 hover:underline">Editar</Link>
                <button className="text-sm text-red-500 hover:text-red-700">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}