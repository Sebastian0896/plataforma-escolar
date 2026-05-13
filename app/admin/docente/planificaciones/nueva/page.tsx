'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  Loader2, 
  Save, 
  ArrowLeft, 
  AlertCircle, 
  PlusCircle, 
  Eye, 
  Printer,
  School
} from "lucide-react"

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
  const [previewOpen, setPreviewOpen] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
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
      
      router.push('/admin/docente/planificaciones')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado')
      setSaving(false)
    }
  }

  const nombreMaestro = session?.user?.name?.toUpperCase() || datos.maestro || 'No asignado'
  const fechaVistaPrevia = datos.fechaProgramada 
    ? new Date(datos.fechaProgramada).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'No programada'

  const handlePrint = () => {
    const ventana = window.open('', '_blank')
    if (ventana) {
      ventana.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Planificación Pedagógica - ${datos.tema || 'Nueva Planificación'}</title>
            <meta charset="UTF-8">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Times New Roman', Georgia, serif; background: white; padding: 40px; }
              .document { max-width: 1100px; margin: 0 auto; background: white; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #1e3a5f 0%, #2c5f8a 100%); color: white; padding: 40px; text-align: center; border-bottom: 4px solid #f39c12; }
              .header h1 { font-size: 32px; margin-bottom: 10px; }
              .section { margin: 30px 40px; }
              .section-title { color: #1e3a5f; font-size: 22px; font-weight: bold; border-left: 5px solid #f39c12; padding-left: 15px; margin-bottom: 20px; }
              .info-grid { background: #f8f9fa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
              .momento { margin-bottom: 30px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
              .momento-header.inicio { background: #e3f2fd; color: #1565c0; padding: 15px 20px; font-size: 18px; font-weight: bold; }
              .momento-header.desarrollo { background: #e8f5e9; color: #2e7d32; padding: 15px 20px; font-size: 18px; font-weight: bold; }
              .momento-header.cierre { background: #fff3e0; color: #e65100; padding: 15px 20px; font-size: 18px; font-weight: bold; }
              .momento-content { padding: 20px; }
              .activities-list { margin-left: 30px; margin-top: 10px; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 11px; }
              @media print { body { padding: 0; } .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div class="document">
              <div class="header">
                <h1>PLANIFICACIÓN PEDAGÓGICA</h1>
                <div>${datos.centroEducativo}</div>
                <div>Año Escolar ${datos.anoEscolar}</div>
              </div>
              <div class="section">
                <div class="section-title">DATOS GENERALES</div>
                <div class="info-grid">
                  <div><strong>Tema:</strong> ${datos.tema || 'No especificado'}</div>
                  <div><strong>Materia:</strong> ${datos.materia}</div>
                  <div><strong>Grado:</strong> ${datos.grado}</div>
                  <div><strong>Nivel:</strong> ${datos.nivel}</div>
                  <div><strong>Ciclo:</strong> ${datos.ciclo}</div>
                  <div><strong>Competencia:</strong> ${datos.competencia || 'No especificada'}</div>
                  <div><strong>Indicador:</strong> ${datos.indicadorLogro || 'No especificado'}</div>
                  <div><strong>Docente:</strong> ${nombreMaestro}</div>
                  <div><strong>Coordinadora:</strong> ${datos.coordinadora}</div>
                  <div><strong>Fecha:</strong> ${fechaVistaPrevia}</div>
                </div>
              </div>
              <div class="section">
                <div class="section-title">MOMENTOS DEL PROCESO EDUCATIVO</div>
                ${momentos.map((momento, idx) => {
                  const titulos = ['INICIO', 'DESARROLLO', 'CIERRE']
                  const clases = ['inicio', 'desarrollo', 'cierre']
                  return `
                    <div class="momento">
                      <div class="momento-header ${clases[idx]}">${titulos[idx]}</div>
                      <div class="momento-content">
                        <p><strong>Descripción:</strong> ${momento.descripcion || 'No especificada'}</p>
                        <p><strong>Rol del estudiante:</strong> ${momento.estudiante || 'No especificado'}</p>
                        ${momento.actividades.length > 0 ? `<div><strong>Actividades:</strong><ul class="activities-list">${momento.actividades.map(act => `<li>${act}</li>`).join('')}</ul></div>` : '<p><em>No hay actividades</em></p>'}
                      </div>
                    </div>
                  `
                }).join('')}
              </div>
              <div class="footer">Documento generado desde Plataforma Educativa - ${new Date().toLocaleDateString('es-ES')}</div>
            </div>
            <div class="no-print" style="text-align: center; margin-top: 20px;">
              <button onclick="window.print();" style="padding: 12px 24px; background: #2c5f8a; color: white; border: none; border-radius: 6px; cursor: pointer;">🖨️ Imprimir / Guardar PDF</button>
              <button onclick="window.close();" style="padding: 12px 24px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; margin-left: 10px;">✖️ Cerrar</button>
            </div>
          </body>
        </html>
      `)
      ventana.document.close()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <PlusCircle className="h-8 w-8 text-primary" />
            Nueva Planificación
          </h1>
          <p className="text-muted-foreground text-sm">Complete los campos para generar una nueva planificación pedagógica.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()} disabled={saving}>Cancelar</Button>
          <Button variant="secondary" onClick={() => setPreviewOpen(true)} disabled={saving} className="gap-2">
            <Eye className="h-4 w-4" /> Vista Previa
          </Button>
          <Button onClick={handleSubmit} disabled={saving} className="shadow-lg gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Guardando...' : 'Crear Planificación'}
          </Button>
        </div>
      </div>

      <Separator />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al guardar</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="border-t-4 border-t-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Datos Generales</CardTitle>
            <CardDescription>Información del centro, materia y grado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormDatosGenerales datos={datos} onChange={setDatos} />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-bold">Momentos del Proceso Educativo</h2>
          <div className="grid gap-6">
            {momentos.map((momento, idx) => (
              <Card key={idx} className="border-l-4 border-l-primary/50">
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

        <div className="md:flex md:items-center md:justify-end pt-4 pb-12">
          <Button variant="secondary" onClick={() => setPreviewOpen(true)} disabled={saving} className="w-full sm:w-64 gap-2 my-2 md:mx-2">
            <Eye className="h-4 w-4" /> Vista Previa
          </Button>
          <Button type="submit" size="lg" disabled={saving} className="w-full sm:w-64 font-bold">
            {saving ? 'Procesando...' : 'Finalizar y Guardar'}
          </Button>
        </div>
      </form>

      {/* Modal corregido - más grande y con scroll */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="!max-w-[80vw] !w-[90vw] !h-[85vh] !p-0 !flex !flex-col !overflow-hidden absolute z-90">
          <DialogHeader className="px-6 pt-6 pb-4 border-b flex-shrink-0">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <School className="h-6 w-6 text-primary" />
              Vista Previa de la Planificación
            </DialogTitle>
            <DialogDescription>
              Revisa cómo quedará el documento antes de guardarlo. Puedes imprimirlo o guardarlo como PDF.
            </DialogDescription>
          </DialogHeader>
          
          {/* Scroll area separada */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border">
              <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5f8a] text-white p-8 text-center">
                <div className="text-5xl mb-3">📚</div>
                <h1 className="text-3xl font-bold mb-2">PLANIFICACIÓN PEDAGÓGICA</h1>
                <p className="text-lg opacity-95">{datos.centroEducativo}</p>
                <p className="text-sm opacity-80 mt-2">Año Escolar {datos.anoEscolar}</p>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#1e3a5f] border-l-4 border-[#f39c12] pl-4 mb-5">
                    📋 DATOS GENERALES
                  </h2>
                  <div className="bg-gray-50 border rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-semibold">Tema:</span> {datos.tema || 'No especificado'}</div>
                    <div><span className="font-semibold">Materia:</span> {datos.materia}</div>
                    <div><span className="font-semibold">Grado:</span> {datos.grado}</div>
                    <div><span className="font-semibold">Nivel:</span> {datos.nivel}</div>
                    <div><span className="font-semibold">Ciclo:</span> {datos.ciclo}</div>
                    <div><span className="font-semibold">Competencia:</span> {datos.competencia || 'No especificada'}</div>
                    <div className="md:col-span-2"><span className="font-semibold">Indicador de Logro:</span> {datos.indicadorLogro || 'No especificado'}</div>
                    <div><span className="font-semibold">Docente:</span> {nombreMaestro}</div>
                    <div><span className="font-semibold">Coordinadora:</span> {datos.coordinadora}</div>
                    <div><span className="font-semibold">Fecha Programada:</span> {fechaVistaPrevia}</div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#1e3a5f] border-l-4 border-[#f39c12] pl-4 mb-5">
                    🎯 MOMENTOS DEL PROCESO EDUCATIVO
                  </h2>
                  
                  {momentos.map((momento, idx) => {
                    const titulos = ['INICIO', 'DESARROLLO', 'CIERRE']
                    const colores = ['bg-blue-50 border-blue-200', 'bg-green-50 border-green-200', 'bg-orange-50 border-orange-200']
                    const textos = ['text-blue-700', 'text-green-700', 'text-orange-700']
                    
                    return (
                      <div key={idx} className={`${colores[idx]} border rounded-lg mb-5 overflow-hidden`}>
                        <div className={`${textos[idx]} px-5 py-3 font-bold text-lg border-b ${colores[idx]}`}>
                          {titulos[idx]}
                        </div>
                        <div className="p-5">
                          <p className="mb-3"><span className="font-semibold">Descripción:</span> {momento.descripcion || 'No especificada'}</p>
                          <p className="mb-3"><span className="font-semibold">Rol del estudiante:</span> {momento.estudiante || 'No especificado'}</p>
                          {momento.actividades.length > 0 && (
                            <div>
                              <span className="font-semibold">Actividades:</span>
                              <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                {momento.actividades.map((act, i) => (
                                  <li key={i}>{act}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {momento.actividades.length === 0 && (
                            <p className="text-gray-400 italic">No hay actividades registradas</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
                <p>Documento generado desde Plataforma Educativa</p>
                <p>{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="px-6 py-4 border-t flex-shrink-0 flex justify-between items-center">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Cerrar</Button>
            <Button onClick={handlePrint} className="gap-2"><Printer className="h-4 w-4" /> Imprimir / Guardar PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}