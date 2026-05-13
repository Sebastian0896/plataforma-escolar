'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MisPlanificacionesRapidas() {
  const { data: session } = useSession()
  const [planificaciones, setPlanificaciones] = useState<any[]>([])

  useEffect(() => {
  fetch('/api/docente/planificaciones')
    .then(r => r.json())
    .then(data => setPlanificaciones(Array.isArray(data) ? data : []))
}, [])

  const porGrado: Record<string, any[]> = {}
  const porMateria: Record<string, any[]> = {}
  planificaciones.forEach(p => {
    const g = p.grado || 'sin-grado'
    const m = p.materia || 'sin-materia'
    if (!porGrado[g]) porGrado[g] = []
    if (!porMateria[m]) porMateria[m] = []
    porGrado[g].push(p)
    porMateria[m].push(p)
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mis Planificaciones</h1>
      <Tabs defaultValue="recientes">
        <TabsList>
          <TabsTrigger value="recientes">Recientes</TabsTrigger>
          <TabsTrigger value="grados">Por Grado</TabsTrigger>
          <TabsTrigger value="materias">Por Materia</TabsTrigger>
        </TabsList>
        <TabsContent value="recientes">
          <div className="space-y-2 mt-4">
            {planificaciones.slice(0, 10).map(p => (
              <PlanificacionCard key={p._id} plan={p} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="grados">
          {Object.entries(porGrado).map(([grado, plans]) => (
            <div key={grado} className="mb-6">
              <h2 className="font-semibold mb-2">{grado?.replace('-', ' ')} ({plans.length})</h2>
              <div className="space-y-2">{plans.map(p => <PlanificacionCard key={p._id} plan={p} />)}</div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="materias">
          {Object.entries(porMateria).map(([materia, plans]) => (
            <div key={materia} className="mb-6">
              <h2 className="font-semibold mb-2 capitalize">{materia} ({plans.length})</h2>
              <div className="space-y-2">{plans.map(p => <PlanificacionCard key={p._id} plan={p} />)}</div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PlanificacionCard({ plan }: { plan: any }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="min-w-0">
          <p className="font-medium truncate">{plan.tema}</p>
          <p className="text-xs text-muted-foreground">{plan.materia} · {plan.grado?.replace('-', ' ')}</p>
        </div>
        <div className="flex gap-1">
          <Link href={`/dashboard/${plan.nivel || 'nivel-secundario'}/${plan.grado}/${plan.slug}`}><Button variant="ghost" size="sm">👁️</Button></Link>
          <Link href={`/admin/docente/planificaciones/editar/${plan.materia}/${plan.slug}`}><Button variant="ghost" size="sm">✏️</Button></Link>
          <Link href={`/admin/docente/planificaciones/clonar/${plan.slug}`}><Button variant="ghost" size="sm">📋</Button></Link>
        </div>
      </CardContent>
    </Card>
  )
}