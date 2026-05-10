'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import FormDatosGenerales from '@/components/planificacion/FormDatosGenerales'
import FormMomento from '@/components/planificacion/FormMomento'

import type {
  DatosGenerales,
  Momento,
} from '@/components/planificacion/formTypes'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'

import {
  Loader2,
  Copy,
  ArrowLeft,
  Save,
} from 'lucide-react'

const MOMENTOS_VACIOS: Momento[] = [
  {
    tipo: 'inicio',
    descripcion: '',
    estudiante: '',
    actividades: [],
  },
  {
    tipo: 'desarrollo',
    descripcion: '',
    estudiante: '',
    actividades: [],
  },
  {
    tipo: 'cierre',
    descripcion: '',
    estudiante: '',
    actividades: [],
  },
]

export default function ClonarPlanificacionPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [datos, setDatos] = useState<DatosGenerales>(
    {} as DatosGenerales
  )

  const [momentos, setMomentos] =
    useState<Momento[]>(MOMENTOS_VACIOS)

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(
          `/api/planificaciones?tema=${params.slug}`
        )

        if (!res.ok) {
          throw new Error('No encontrada')
        }

        const data = await res.json()

        setDatos({
          materia: data.materia || '',
          nivel: data.nivel || '',
          ciclo: data.ciclo || '',
          grado: '',
          categoriaDocente:
            session?.user?.categoriaDocente ||
            data.categoriaDocente ||
            '',
          tema: '',
          competencia: data.competencia || '',
          indicadorLogro: data.indicadorLogro || '',
          estudianteGeneral:
            data.contenidoEstudiante || '',
          maestro: (
            session?.user?.name ||
            data.maestro ||
            ''
          ).toUpperCase(),
          coordinadora: data.coordinadora || '',
          centroEducativo:
            data.centroEducativo || '',
          anoEscolar: data.anoEscolar || '',
          fechaProgramada: '',
        })

        setMomentos(
          data.momentos?.map((m: any) => ({
            tipo: m.tipo,
            descripcion: m.descripcion || '',
            estudiante:
              m.contenidoEstudiante || '',
            actividades:
              m.actividades?.map((a: any) => ({
                titulo: a.titulo || '',
                descripcion:
                  a.descripcion || '',
                estudiante:
                  a.contenidoEstudiante || '',
                duracion: a.duracion || '',
                recursos: a.recursos || [],
              })) || [],
          })) || MOMENTOS_VACIOS
        )
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : 'Error al cargar'
        )
      } finally {
        setLoading(false)
      }
    }

    cargar()
  }, [params.slug, session])

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setSaving(true)
    setError('')

    try {
      const res = await fetch(
        '/api/planificaciones',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: datos.tema,
            materia: datos.materia,
            nivel: datos.nivel,
            ciclo: datos.ciclo,
            grado: datos.grado,
            categoriaDocente:
              datos.categoriaDocente,
            fechaProgramada:
              datos.fechaProgramada || null,

            acf: {
              competencia: datos.competencia,
              indicador_logro:
                datos.indicadorLogro,
              contenido_estudiante_general:
                datos.estudianteGeneral,
              maestro: datos.maestro,
              coordinadora:
                datos.coordinadora,
              centro_educativo:
                datos.centroEducativo,
              ano_escolar: datos.anoEscolar,

              m1_descripcion:
                momentos[0].descripcion,
              m1_estudiante:
                momentos[0].estudiante,
              m1_actividades: JSON.stringify(
                momentos[0].actividades
              ),

              m2_descripcion:
                momentos[1].descripcion,
              m2_estudiante:
                momentos[1].estudiante,
              m2_actividades: JSON.stringify(
                momentos[1].actividades
              ),

              m3_descripcion:
                momentos[2].descripcion,
              m3_estudiante:
                momentos[2].estudiante,
              m3_actividades: JSON.stringify(
                momentos[2].actividades
              ),
            },
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json()

        throw new Error(
          data.error || 'Error'
        )
      }

      router.push('/admin/planificaciones')
      router.refresh()
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error'
      )

      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Cargando planificación...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Copy className="h-3.5 w-3.5" />
            Duplicar planificación
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Clonar Planificación
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Los contenidos fueron copiados correctamente.
              Actualizá el tema, grado y fecha antes de
              guardar la nueva planificación.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Datos Generales */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl">
              Datos Generales
            </CardTitle>

            <CardDescription>
              Configurá la información principal de
              esta nueva planificación.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormDatosGenerales
              datos={datos}
              onChange={setDatos}
            />
          </CardContent>
        </Card>

        {/* Momentos */}
        <div className="space-y-6">
          {momentos.map((momento, idx) => (
            <Card
              key={idx}
              className="border-border/60 shadow-sm"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-lg capitalize">
                  Momento:{' '}
                  <span className="text-primary">
                    {momento.tipo}
                  </span>
                </CardTitle>

                <CardDescription>
                  Editá las actividades y contenidos
                  correspondientes a este momento.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
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

        {/* Actions */}
        <div className="sticky bottom-0 z-20 border-t bg-background/95 px-1 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar como Nueva
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}