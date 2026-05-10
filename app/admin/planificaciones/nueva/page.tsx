'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, ArrowLeft, AlertCircle, PlusCircle } from "lucide-react"

// Componentes del Proyecto
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_INICIALES: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

const DATOS_INICIALES: DatosGenerales = {
  materia: 'frances', 
  nivel: 'nivel-secundario', 
  ciclo: 'primer-ciclo',
  grado: '1ro-secundaria', 
  categoriaDocente: '',
  tema: '', 
  competencia: '', 
  indicadorLogro: '', 
  estudianteGeneral: '',
  maestro: '', 
  coordinadora: 'Susana',
  centroEducativo: 'Salomé Ureña', 
  anoEscolar: '2025-2026',
  fechaProgramada: '',
}

export default function NuevaPlanificacionPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosGenerales>(DATOS_INICIALES)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_INICIALES)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const res = await fetch('/api/planificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: datos.tema,
          materia: datos.materia,
          nivel: datos.nivel,
          ciclo: datos.ciclo,
          grado: datos.grado,
          categoriaDocente: datos.categoriaDocente,
          acf: {
            ...datos,
            maestro: session?.user?.name?.toUpperCase() || datos.maestro,
            m1_descripcion: momentos[0].descripcion,
            m1_estudiante: momentos[0].estudiante,
            m1_actividades: JSON.stringify(momentos[0].actividades),
            m2_descripcion: momentos[1].descripcion,
            m2_estudiante: momentos[1].estudiante,
            m2_actividades: JSON.stringify(momentos[1].actividades),
            m3_descripcion: momentos[2].descripcion,
            m3_estudiante: momentos[2].estudiante,
            m3_actividades: JSON.stringify(momentos[2].actividades),
          },
          fechaProgramada: datos.fechaProgramada,
        }),
      })

      if (!res.ok) { 
        const data = await res.json()
        throw new Error(data.error || 'No se pudo crear la planificación') 
      }
      
      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado')
      setSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header con acciones */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="mb-2 -ml-2 text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <PlusCircle className="h-8 w-8 text-primary" />
            Nueva Planificación
          </h1>
          <p className="text-muted-foreground text-sm">
            Complete los campos para generar una nueva planificación pedagógica.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="shadow-lg">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? 'Guardando...' : 'Crear Planificación'}
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <Alert variant="destructive" className="animate-in slide-in-from-top-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al guardar</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Card de Datos Generales */}
        <Card className="border-t-4 border-t-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Datos Generales</CardTitle>
            <CardDescription>Información del centro, materia y grado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormDatosGenerales datos={datos} onChange={setDatos} />
          </CardContent>
        </Card>

        {/* Sección de Momentos Pedagógicos */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-xl font-bold tracking-tight">Momentos del Proceso Educativo</h2>
          </div>
          
          <div className="grid gap-6">
            {momentos.map((momento, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary/50 shadow-sm transition-all hover:shadow-md">
                <CardContent className="pt-6">
                  <FormMomento
                    momento={momento}
                    index={idx}
                    onChange={(nuevo) => {
                      const nuevos = [...momentos]
                      nuevos[idx] = nuevo
                      setMomentos(nuevos)
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Bar Final */}
        <div className="flex justify-end gap-4 pt-4 pb-12">
          <Button 
            type="submit" 
            size="lg" 
            disabled={saving} 
            className="w-full sm:w-64 font-bold"
          >
            {saving ? 'Procesando...' : 'Finalizar y Guardar'}
          </Button>
        </div>
      </form>
    </div>
  )
}