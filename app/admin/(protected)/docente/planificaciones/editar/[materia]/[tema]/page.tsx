// app/admin/planificaciones/editar/[tema]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, ArrowLeft, AlertCircle } from "lucide-react"
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_VACIOS: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

export default function EditarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const tema = params.tema as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [planificacionId, setPlanificacionId] = useState<string | null>(null)

  const [datos, setDatos] = useState<DatosGenerales>({
    materia: '',
    nivel: '',
    ciclo: '',
    grado: '',
    categoriaDocente: '',
    tema: '',
    competencia: '',
    indicadorLogro: '',
    estudianteGeneral: '',
    contenidoEstudiante: '',
    maestro: '',
    coordinadora: '',
    centroEducativo: '',
    anoEscolar: '',
    fechaProgramada: '',
  })
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_VACIOS)


  useEffect(() => {
    const cargarPlanificacion = async () => {
      if (!tema) return
      
      setLoading(true)
      try {
        const res = await fetch(`/api/planificaciones?tema=${tema}`)
        if (!res.ok) throw new Error('Planificación no encontrada')
        
        const data = await res.json()
        console.log('📦 Datos recibidos:', data)
        
        setPlanificacionId(data._id || data.id)
        
        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: data.grado || '',
          categoriaDocente: data.categoriaDocente || '',
          tema: data.tema || '',
          competencia: data.competencia || '',
          indicadorLogro: data.indicadorLogro || '',
          contenidoEstudiante: data.contenidoEstudiante || '',
          maestro: data.maestro || '',
          coordinadora: data.coordinadora || '',
          centroEducativo: data.centroEducativo || '',
          anoEscolar: data.anoEscolar || '',
          fechaProgramada: data.fechaProgramada || '',
        })
        
        // ✅ Cargar momentos con actividades incluyendo contenidoEstudiante
        if (data.momentos && data.momentos.length === 3) {
          setMomentos(data.momentos.map((m: any) => ({
            tipo: m.tipo,
            descripcion: m.descripcion || '',
            estudiante: m.contenidoEstudiante || '',
            actividades: (m.actividades || []).map((act: any) => ({
              titulo: act.titulo || '',
              descripcion: act.descripcion || '',
              contenidoEstudiante: act.contenidoEstudiante || '',  // ← CLAVE: cargar contenidoEstudiante de la actividad
              recursos: act.recursos || [],
              duracion: act.duracion || '',
            })),
          })))
        }
        
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'Error de conexión')
      } finally {
        setLoading(false)
      }
    }
    
    cargarPlanificacion()
  }, [tema])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    if (!planificacionId && !tema) {
      setError('Error: No se pudo identificar la planificación')
      setSaving(false)
      return
    }

    const payload = {
      id: planificacionId,
      slug: tema,  // ← enviar también el slug por si acaso
      tema: datos.tema,
      materia: datos.materia,
      nivel: datos.nivel,
      ciclo: datos.ciclo,
      grado: datos.grado,
      categoriaDocente: datos.categoriaDocente,
      competencia: datos.competencia,
      indicadorLogro: datos.indicadorLogro,
      estudianteGeneral: datos.estudianteGeneral,
      maestro: datos.maestro,
      coordinadora: datos.coordinadora,
      centroEducativo: datos.centroEducativo,
      anoEscolar: datos.anoEscolar,
      fechaProgramada: datos.fechaProgramada,
      momentos: momentos,
    }

    console.log('📤 Enviando payload:', payload)

    try {
      const res = await fetch('/api/planificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })


      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Error al guardar')
      }

      router.push('/admin/docente/planificaciones')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button variant="ghost" onClick={() => router.back()} className="mb-2 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Editar Planificación</h1>
          <p className="text-muted-foreground italic">{datos.tema}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-md border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Datos Generales</CardTitle>
            <CardDescription>Información institucional y administrativa</CardDescription>
          </CardHeader>
          <CardContent>
            <FormDatosGenerales datos={datos} onChange={setDatos} />
          </CardContent>
        </Card>

        <div className="grid gap-8">
          <h2 className="text-xl font-bold">Momentos Pedagógicos</h2>
          {momentos.map((momento, idx) => (
            <Card key={idx} className="overflow-hidden border-l-4 border-l-blue-500">
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

        <div className="flex justify-end gap-4 pb-10">
          <Button size="lg" onClick={handleSubmit} disabled={saving} className="w-full sm:w-auto px-10">
            {saving ? 'Procesando...' : 'Actualizar planificación'}
          </Button>
        </div>
      </form>
    </div>
  )
}