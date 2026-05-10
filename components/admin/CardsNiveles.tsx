'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { NivelInfo } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronRight, Plus } from 'lucide-react'

interface Props {
  estructura: NivelInfo[]
}

export default function CardsNiveles({ estructura }: Props) {
  const [vista, setVista] = useState<'niveles' | 'ciclos' | 'grados' | 'materias' | 'temas'>('niveles')
  const [nivelSel, setNivelSel] = useState<NivelInfo | null>(null)
  const [cicloSel, setCicloSel] = useState<any>(null)
  const [gradoSel, setGradoSel] = useState<any>(null)
  const [materiaSel, setMateriaSel] = useState<any>(null)

  const totalTemas = (item: any): number => {
    if (item.temas) return item.temas.length
    if (item.materias) return item.materias.reduce((acc: number, m: any) => acc + totalTemas(m), 0)
    if (item.grados) return item.grados.reduce((acc: number, g: any) => acc + totalTemas(g), 0)
    if (item.ciclos) return item.ciclos.reduce((acc: number, c: any) => acc + totalTemas(c), 0)
    return 0
  }

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <button onClick={() => { setVista('niveles'); setNivelSel(null) }} className="hover:text-primary">📚 Planificaciones</button>
          {nivelSel && <><ChevronRight className="w-4 h-4" /><button onClick={() => { setVista('ciclos'); setCicloSel(null) }} className="hover:text-primary">{nivelSel.nombre}</button></>}
          {cicloSel && <><ChevronRight className="w-4 h-4" /><button onClick={() => { setVista('grados'); setGradoSel(null) }} className="hover:text-primary">{cicloSel.nombre}</button></>}
          {gradoSel && <><ChevronRight className="w-4 h-4" /><button onClick={() => { setVista('materias'); setMateriaSel(null) }} className="hover:text-primary">{gradoSel.nombre}</button></>}
          {materiaSel && <><ChevronRight className="w-4 h-4" /><span className="text-foreground">{materiaSel.nombre}</span></>}
        </div>
        <Link href="/admin/planificaciones/nueva">
          <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nueva</Button>
        </Link>
      </div>

      {/* Niveles */}
      {vista === 'niveles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {estructura.map(nivel => (
            <Card key={nivel.slug} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setNivelSel(nivel); setVista('ciclos') }}>
              <CardContent className="p-5">
                <div className="text-3xl mb-2">🏫</div>
                <h3 className="font-semibold">{nivel.nombre}</h3>
                <p className="text-sm text-muted-foreground">{totalTemas(nivel)} planificaciones</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ciclos */}
      {vista === 'ciclos' && nivelSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nivelSel.ciclos.map(ciclo => (
            <Card key={ciclo.slug} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setCicloSel(ciclo); setVista('grados') }}>
              <CardContent className="p-5">
                <div className="text-3xl mb-2">📘</div>
                <h3 className="font-semibold">{ciclo.nombre}</h3>
                <p className="text-sm text-muted-foreground">{totalTemas(ciclo)} planificaciones</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Grados */}
      {vista === 'grados' && cicloSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cicloSel.grados.map(grado => (
            <Card key={grado.slug} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setGradoSel(grado); setVista('materias') }}>
              <CardContent className="p-5">
                <div className="text-3xl mb-2">👨‍🎓</div>
                <h3 className="font-semibold">{grado.nombre}</h3>
                <p className="text-sm text-muted-foreground">{totalTemas(grado)} planificaciones</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Materias */}
      {vista === 'materias' && gradoSel && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gradoSel.materias.map(materia => (
            <Card key={materia.slug} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setMateriaSel(materia); setVista('temas') }}>
              <CardContent className="p-5">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="font-semibold">{materia.nombre}</h3>
                <p className="text-sm text-muted-foreground">{materia.temas.length} planificaciones</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Temas */}
      {vista === 'temas' && materiaSel && (
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{materiaSel.nombre}</h2>
          {materiaSel.temas.map((tema: any) => (
            <Card key={tema.slug} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{tema.tema}</p>
                <p className="text-xs text-muted-foreground">/{gradoSel?.slug}/{materiaSel.slug}/{tema.slug}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/planificaciones/editar/${materiaSel.slug}/${tema.slug}`}>
                  <Button variant="outline" size="sm">✏️ Editar</Button>
                </Link>
                <Link href={`/admin/planificaciones/clonar/${tema.slug}`}>
                  <Button variant="outline" size="sm">📋 Clonar</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(tema.id)}>🗑️</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}