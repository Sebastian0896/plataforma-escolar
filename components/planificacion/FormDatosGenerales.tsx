'use client'

import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const MATERIAS_POR_CATEGORIA: Record<string, string[]> = {
  idiomas: ['frances', 'ingles'],
  'materias-basicas': ['lengua-espanola', 'matematica', 'ciencias-sociales', 'ciencias-naturales'],
  'otras-materias': ['educacion-fisica', 'artistica'],
}

const GRADOS_PRIMER_CICLO_PRIMARIA = ['1ro-primaria', '2do-primaria', '3ro-primaria']
const GRADOS_SEGUNDO_CICLO_PRIMARIA = ['4to-primaria', '5to-primaria', '6to-primaria']
const GRADOS_PRIMER_CICLO_SECUNDARIA = ['1ro-secundaria', '2do-secundaria', '3ro-secundaria']
const GRADOS_SEGUNDO_CICLO_SECUNDARIA = ['4to-secundaria', '5to-secundaria', '6to-secundaria']

function getGradosPorCiclo(nivel: string, ciclo: string): string[] {
  if (!nivel || !ciclo) return []
  if (nivel === 'nivel-primario') return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_PRIMARIA : GRADOS_SEGUNDO_CICLO_PRIMARIA
  if (nivel === 'nivel-secundario') return ciclo === 'primer-ciclo' ? GRADOS_PRIMER_CICLO_SECUNDARIA : GRADOS_SEGUNDO_CICLO_SECUNDARIA
  return []
}

import { DatosGenerales } from './formTypes'

interface Props {
  datos: DatosGenerales
  onChange: (datos: DatosGenerales) => void
}

export default function FormDatosGenerales({ datos, onChange }: Props) {
  const { data: session } = useSession()
  const [materias, setMaterias] = useState<any[]>([])
  const [centroNombre, setCentroNombre] = useState('')
  const esDocente = session?.user?.role === 'docente'


    const [categoriaLista, setCategoriaLista] = useState(false)

    useEffect(() => {
      if (esDocente && !categoriaLista) {
        getSession().then(session => {
          if (session?.user?.categoriaDocente) {
            onChange({ ...datos, categoriaDocente: session.user.categoriaDocente })
            setCategoriaLista(true)
          }
          if (session?.user?.name) {
            onChange(prev => ({ ...prev, maestro: (session.user?.name || '').toUpperCase() }))
          }
        })
      }
    }, [esDocente])

  useEffect(() => {
    fetch('/api/materias').then(r => r.json()).then(setMaterias)
    if (session?.user?.centroId) {
      fetch(`/api/centros?id=${session.user.centroId}`).then(r => r.json()).then(c => { if (c.nombre) setCentroNombre(c.nombre) })
    }
    if (esDocente) {
      if (session?.user?.categoriaDocente && !datos.categoriaDocente) onChange({ ...datos, categoriaDocente: session.user.categoriaDocente })
      if (session?.user?.name && !datos.maestro) onChange({ ...datos, maestro: (session.user.name || '').toUpperCase() })
    }
  }, [session])

  const materiasFiltradas = datos.categoriaDocente ? materias.filter(m => MATERIAS_POR_CATEGORIA[datos.categoriaDocente]?.includes(m.slug)) : materias

  const set = (field: keyof DatosGenerales, value: string) => {
    const updates: any = { [field]: value }
    if (field === 'categoriaDocente') updates.materia = ''
    if (field === 'nivel') { updates.ciclo = ''; updates.grado = '' }
    if (field === 'ciclo') updates.grado = ''
    onChange({ ...datos, ...updates })
  }

  return (
    <Card>
      <CardHeader><CardTitle>Datos Generales</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          {esDocente ? (
            <Input value={datos.categoriaDocente?.replace('-', ' ') || ''} readOnly disabled />
          ) : (
            <Select value={datos.categoriaDocente} onValueChange={(v) => set('categoriaDocente', v)}>
              <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="idiomas">Idiomas</SelectItem>
                <SelectItem value="materias-basicas">Materias Básicas</SelectItem>
                <SelectItem value="otras-materias">Otras Materias</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Materia</label>
          <Select value={datos.materia} onValueChange={(v) => set('materia', v)}>
            <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
            <SelectContent>
              {materiasFiltradas.map(m => <SelectItem key={m.slug} value={m.slug}>{m.nombre}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nivel</label>
          <Select value={datos.nivel} onValueChange={(v) => set('nivel', v)}>
            <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="nivel-primario">Nivel Primario</SelectItem>
              <SelectItem value="nivel-secundario">Nivel Secundario</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ciclo</label>
          <Select value={datos.ciclo} onValueChange={(v) => set('ciclo', v)} disabled={!datos.nivel}>
            <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="primer-ciclo">Primer Ciclo</SelectItem>
              <SelectItem value="segundo-ciclo">Segundo Ciclo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Grado</label>
          <Select value={datos.grado} onValueChange={(v) => set('grado', v)} disabled={!datos.ciclo}>
            <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
            <SelectContent>
              {getGradosPorCiclo(datos.nivel, datos.ciclo).map(g => <SelectItem key={g} value={g}>{g.replace('-', ' ')}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tema</label>
          <Input value={datos.tema} onChange={(e) => set('tema', e.target.value)} placeholder="Ej: Información Personal" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Maestro</label>
          {esDocente ? (
            <Input value={(session?.user?.name || '').toUpperCase()} readOnly disabled />
          ) : (
            <Input value={datos.maestro} onChange={(e) => set('maestro', e.target.value)} />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Coordinadora</label>
          <Input value={datos.coordinadora} onChange={(e) => set('coordinadora', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Centro Educativo</label>
          <Input value={centroNombre || datos.centroEducativo} readOnly disabled />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Año Escolar</label>
          <Input value={datos.anoEscolar} onChange={(e) => set('anoEscolar', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fecha programada</label>
          <Input type="date" value={datos.fechaProgramada?.split('T')[0] || ''} onChange={(e) => set('fechaProgramada', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Competencia</label>
          <Textarea value={datos.competencia} onChange={(e) => set('competencia', e.target.value)} rows={2} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Indicador de Logro</label>
          <Textarea value={datos.indicadorLogro} onChange={(e) => set('indicadorLogro', e.target.value)} rows={2} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Contenido visible para estudiantes</label>
          <Textarea value={datos.estudianteGeneral} onChange={(e) => set('estudianteGeneral', e.target.value)} rows={2} />
        </div>
      </CardContent>
    </Card>
  )
}