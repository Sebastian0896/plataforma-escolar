'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function MisEstudiantesPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (session?.user) {
      fetch('/api/docente/estudiantes')
        .then(r => r.json())
        .then(d => setData(d))
    }
  }, [session])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mis Estudiantes</h1>
          <p className="text-muted-foreground">{data?.total || 0} estudiantes</p>
        </div>
        {session?.user?.categoriaDocente && session?.user?.role === 'admin_centro' && (
          <Link href="/admin/docente/estudiantes/nuevo">
            <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Nuevo Estudiante</Button>
          </Link>
        )}
      </div>

      {data?.porGrado && Object.entries(data.porGrado).map(([grado, estudiantes]: [string, any]) => (
        <div key={grado} className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            {grado?.replace('-', ' ')}
            <span className="text-sm text-muted-foreground font-normal">({estudiantes.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {estudiantes.map((e: any) => (
              <Card key={e._id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                      {e.nombre?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{e.nombre}</p>
                      <p className="text-xs text-muted-foreground truncate">{e.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-xs text-muted-foreground capitalize">{e.genero || 'Sin especificar'}</span>
                    <Link href={`/admin/docente/estudiantes/${e._id}`}>
                      <Button variant="link" size="sm">Ver expediente →</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}