'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Shadcn UI & Icons
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Loader2, Copy, ArrowLeft, Save, AlertCircle } from 'lucide-react'

// Componentes del Dominio
import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'
import type { DatosGenerales, Momento } from '@/components/planificacion/formTypes'

const MOMENTOS_VACIOS: Momento[] = [
  { tipo: 'inicio', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'desarrollo', descripcion: '', estudiante: '', actividades: [] },
  { tipo: 'cierre', descripcion: '', estudiante: '', actividades: [] },
]

export default function ClonarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [datos, setDatos] = useState<DatosGenerales>({} as DatosGenerales)
  const [momentos, setMomentos] = useState<Momento[]>(MOMENTOS_VACIOS)

  useEffect(() => {
    const cargarOriginal = async () => {
      try {
        const res = await fetch(`/api/planificaciones?tema=${params.slug}`)
        if (!res.ok) throw new Error('La planificación original no fue encontrada.')
        
        const data = await res.json()

        // Mapeo selectivo: Clonamos la estructura pero limpiamos los datos de instancia
        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: '', // Forzamos al docente a elegir el nuevo grado
          categoriaDocente: session?.user?.categoriaDocente || data.categoriaDocente || '',
          tema: '', // El docente debe definir un nuevo tema o título
          competencia: data.competencia || data.acf?.competencia || '',
          indicadorLogro: data.indicadorLogro || data.acf?.indicador_logro || '',
          estudianteGeneral: data.contenidoEstudiante || data.acf?.contenido_estudiante_general || '',
          maestro: (session?.user?.name || data.maestro || '').toUpperCase(),
          coordinadora: data.coordinadora || data.acf?.coordinadora || '',
          centroEducativo: data.centroEducativo || data.acf?.centro_educativo || '',
          anoEscolar: data.anoEscolar || data.acf?.ano_escolar || '',
          fechaProgramada: '', // Forzamos nueva fecha
        })

        // Mapeo de momentos asegurando estructura de actividades
        const clonarMomentos = data.momentos?.map((m: any) => ({
          tipo: m.tipo,
          descripcion: m.descripcion || '',
          estudiante: m.contenidoEstudiante || m.estudiante || '',
          actividades: m.actividades?.map((a: any) => ({
            titulo: a.titulo || '',
            descripcion: a.descripcion || '',
            estudiante: a.estudiante || a.contenidoEstudiante || '',
            duracion: a.duracion || '',
            recursos: a.recursos || [],
          })) || [],
        }))

        setMomentos(clonarMomentos || MOMENTOS_VACIOS)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al precargar los datos para clonar')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) cargarOriginal()
  }, [params.slug, session])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!datos.tema || !datos.grado) {
      setError("Por favor, completa el nuevo tema y grado antes de guardar.")
      return
    }

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
          fechaProgramada: datos.fechaProgramada || null,
          acf: {
            ...datos,
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
        }),
      })

      if (!res.ok) throw new Error('Error al crear la nueva copia de la planificación')

      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado')
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Preparando copia de la planificación...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header con Badge de Acción */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="-ml-2 text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver atrás
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight">Clonar Planificación</h1>
            <Badge variant="secondary" className="h-6 gap-1 px-2">
              <Copy className="h-3 w-3" /> Modo Copia
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Hemos copiado los momentos y competencias. <span className="text-foreground font-medium underline decoration-primary/30">Asigna un nuevo tema y grado</span> para finalizar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>
            Descartar
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="bg-primary shadow-md">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? 'Clonando...' : 'Guardar como Nueva'}
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <Alert variant="destructive" className="border-2 shadow-sm animate-in zoom-in-95 duration-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atención</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* Sección Datos Generales - Card con énfasis */}
        <Card className="border-t-4 border-t-primary shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-xl flex items-center gap-2">
              Información de la Nueva Versión
            </CardTitle>
            <CardDescription>
              Ajusta los campos que varían en esta nueva implementación (Ej: Grado B, nueva fecha).
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <FormDatosGenerales datos={datos} onChange={setDatos} />
          </CardContent>
        </Card>

        {/* Sección Momentos - Iteración con Cards dinámicas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight px-1">Estructura Pedagógica Copiada</h2>
          <div className="grid gap-6">
            {momentos.map((momento, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-400 hover:border-l-primary transition-all shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2 capitalize">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      {idx + 1}
                    </span>
                    Momento de {momento.tipo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
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

        {/* Action Bar Flotante (UI de guardado rápido al final) */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-primary">¿Listo para crear la copia?</p>
              <p className="text-sm text-muted-foreground">Se generará un nuevo registro independiente en la base de datos.</p>
            </div>
            <Button size="lg" onClick={handleSubmit} disabled={saving} className="w-full sm:w-auto min-w-[200px]">
              {saving ? 'Procesando...' : 'Confirmar y Guardar'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}