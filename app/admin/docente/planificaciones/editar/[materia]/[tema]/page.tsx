'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Loader2, Save, ArrowLeft, AlertCircle } from "lucide-react"

// Componentes Propios
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
//import BotonVolver from '@/components/BotonVolver'

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

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [postId, setPostId] = useState<string | null>(null)

  const [datos, setDatos] = useState<DatosGenerales>({} as DatosGenerales)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_VACIOS)

  useEffect(() => {
    const cargarPlanificacion = async () => {
      try {
        const res = await fetch(`/api/planificaciones?tema=${params.tema}`)
        if (!res.ok) throw new Error('La planificación no fue encontrada o no tienes permisos.')
        
        const data = await res.json()
        setPostId(data._id || data.id)

        // Mapeo limpio de datos
        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: data.grado || '',
          categoriaDocente: data.categoriaDocente || '',
          tema: data.tema || data.title?.rendered || '',
          competencia: data.competencia || data.acf?.competencia || '',
          indicadorLogro: data.indicadorLogro || data.acf?.indicador_logro || '',
          estudianteGeneral: data.contenidoEstudiante || data.acf?.contenido_estudiante_general || '',
          maestro: data.maestro || data.acf?.maestro || '',
          coordinadora: data.coordinadora || data.acf?.coordinadora || '',
          centroEducativo: data.centroEducativo || data.acf?.centro_educativo || '',
          anoEscolar: data.anoEscolar || data.acf?.ano_escolar || '',
          fechaProgramada: data.fechaProgramada || '',
        })

        const parseActividades = (jsonStr: string) => {
          try {
            if (!jsonStr || jsonStr === '[]') return []
            return JSON.parse(jsonStr)
          } catch { return [] }
        }

        setMomentos([
          {
            tipo: 'inicio',
            descripcion: data.momentos?.[0]?.descripcion || data.acf?.m1_descripcion || '',
            estudiante: data.momentos?.[0]?.contenidoEstudiante || data.acf?.m1_estudiante || '',
            actividades: data.momentos?.[0]?.actividades || parseActividades(data.acf?.m1_actividades),
          },
          {
            tipo: 'desarrollo',
            descripcion: data.momentos?.[1]?.descripcion || data.acf?.m2_descripcion || '',
            estudiante: data.momentos?.[1]?.contenidoEstudiante || data.acf?.m2_estudiante || '',
            actividades: data.momentos?.[1]?.actividades || parseActividades(data.acf?.m2_actividades),
          },
          {
            tipo: 'cierre',
            descripcion: data.momentos?.[2]?.descripcion || data.acf?.m3_descripcion || '',
            estudiante: data.momentos?.[2]?.contenidoEstudiante || data.acf?.m3_estudiante || '',
            actividades: data.momentos?.[2]?.actividades || parseActividades(data.acf?.m3_actividades),
          },
        ])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error de conexión')
      } finally {
        setLoading(false)
      }
    }
    cargarPlanificacion()
  }, [params.tema])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        id: postId,
        title: datos.tema,
        materia: datos.materia,
        nivel: datos.nivel,
        ciclo: datos.ciclo,
        grado: datos.grado,
        categoriaDocente: datos.categoriaDocente,
        fechaProgramada: datos.fechaProgramada || null,
        acf: {
          competencia: datos.competencia,
          indicador_logro: datos.indicadorLogro,
          contenido_estudiante_general: datos.estudianteGeneral,
          maestro: datos.maestro,
          coordinadora: datos.coordinadora,
          centro_educativo: datos.centroEducativo,
          ano_escolar: datos.anoEscolar,
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
      }

      const res = await fetch('/api/planificaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Error al guardar los cambios')

      router.push('/admin/docente/planificaciones')
      router.refresh()
        } catch (err: unknown) {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button variant="ghost" onClick={() => router.back()} className="mb-2 -ml-2 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Editar Planificación</h1>
          <p className="text-muted-foreground italic">{datos.tema}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-primary">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección Datos Generales */}
        <Card className="shadow-md border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Datos Generales</CardTitle>
            <CardDescription>Información institucional y administrativa de la unidad.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormDatosGenerales datos={datos} onChange={setDatos} />
          </CardContent>
        </Card>

        {/* Sección Momentos */}
        <div className="grid gap-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Momentos Pedagógicos
          </h2>
          {momentos.map((momento, idx) => (
            <Card key={idx} className="overflow-hidden border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
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

        {/* Floating Action Bar para móviles o final de página */}
        <div className="flex justify-end gap-4 pb-10">
          <Button size="lg" onClick={handleSubmit} disabled={saving} className="w-full sm:w-auto px-10">
            {saving ? 'Procesando...' : 'Actualizar planificación'}
          </Button>
        </div>
      </form>
    </div>
  )
}