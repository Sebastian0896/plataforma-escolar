'use client'

import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Planificacion, Rol } from '@/lib/types'
import MomentoSection from './MomentoSection'
import BotonPDF from './BotonPDF'
import InstrumentoModal from './InstrumentoModal'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const getLang = (materia: string): string => {
  const langMap: Record<string, string> = {
    'Francés': 'fr-FR', 'Frances': 'fr-FR', 'francés': 'fr-FR', 'frances': 'fr-FR',
    'Inglés': 'en-US', 'Ingles': 'en-US', 'inglés': 'en-US', 'ingles': 'en-US',
  }
  return langMap[materia] || 'fr-FR'
}

interface PlanificacionViewProps {
  planificacion: Planificacion
  soloEstudiante?: boolean
}

export default function PlanificacionView({ planificacion, soloEstudiante = false }: PlanificacionViewProps) {
  const { data: session } = useSession()
  const [showInstrumento, setShowInstrumento] = useState(false)
  const [centroNombre, setCentroNombre] = useState('')
  const lang = getLang(planificacion.materia)

  const rol: Rol = soloEstudiante ? 'estudiante' : session ? 'profesor' : 'estudiante'

  useEffect(() => {
    if (planificacion.centroId) {
      fetch(`/api/centros?id=${planificacion.centroId}`)
        .then(r => r.json())
        .then(c => { if (c.nombre) setCentroNombre(c.nombre) })
        .catch(() => {})
    }
  }, [planificacion.centroId])



  useEffect(() => {
    getSession().then(session => {
      console.log('👤 Session:', session?.user)
      if (session?.user?.centroNombre) {
        setCentroNombre(session.user.centroNombre)
      }
    })
  }, [])
  return (
    <article className="animate-in pb-8">
      <header className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{planificacion.materia}</span>
            <span>/</span>
            <span>{planificacion.tema}</span>
          </div>

          {!soloEstudiante && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowInstrumento(true)}>
                📋 Instrumento
              </Button>
              <BotonPDF slug={planificacion.slug} grado={planificacion.grado} />
            </div>
          )}
        </div>

        {/* Cabecera institucional */}
        <Card className="overflow-hidden ">
          <div className=" px-5 py-4 flex items-center gap-4">
            <div className="text-foreground">
              <h2 className="text-lg font-bold leading-tight">{centroNombre}</h2>
              <p className="text-muted-foreground text-xs">Formando el futuro con excelencia</p>
            </div>
          </div>
          <CardContent className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-5">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div>
                <h3 className="text-sm font-semibold">Maestro</h3>
                <p className="text-sm">{planificacion.maestro || 'Sin Docente'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div>
                <h3 className="text-sm font-semibold">Coordinadora</h3>
                <p className="text-sm">{planificacion.coordinadora || 'Sin Coordinador(a)'}</p>
              </div>
            </div>
            <div className="col-span-2 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div><span className="text-muted-foreground block">Año escolar</span><span className="font-medium">{planificacion.anoEscolar || '2025-2026'}</span></div>
              <div><span className="text-muted-foreground block">Asignatura</span><span className="font-medium">{planificacion.materia}</span></div>
              <div><span className="text-muted-foreground block">Tema</span><span className="font-medium">{planificacion.tema}</span></div>
              <div><span className="text-muted-foreground block">Idioma</span><span className="font-medium">{lang === 'fr-FR' ? 'Francés' : 'Inglés'}</span></div>
            </div>
          </CardContent>
        </Card>

        <h1 className="text-2xl lg:text-3xl font-bold mb-3">{planificacion.tema}</h1>

        <Card>
          <CardContent className="grid gap-2 p-4">
            <div>
              <span className="text-xs font-semibold uppercase text-muted-foreground">Competencia</span>
              <p className="text-sm mt-0.5">{planificacion.competencia}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase text-muted-foreground">Indicador de Logro</span>
              <p className="text-sm mt-0.5">{planificacion.indicadorLogro}</p>
            </div>
            {planificacion.contenidoEstudianteGeneral && (
              <div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">📖 Para los estudiantes</span>
                <p className="text-sm mt-0.5">{planificacion.contenidoEstudianteGeneral}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </header>

      <div className="space-y-4">
        {planificacion.momentos.map((momento, idx) => (
          <MomentoSection key={idx} momento={momento} rol={rol} lang={lang} />
        ))}
      </div>

      {showInstrumento && <InstrumentoModal slug={planificacion.slug} onClose={() => setShowInstrumento(false)} />}
    </article>
  )
}