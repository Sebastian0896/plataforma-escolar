'use client'

import { Actividad } from './formTypes'
import FormRecurso from './FormRecurso'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Trash2, 
  Plus, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Settings2 
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Props {
  actividad: Actividad
  index: number
  onChange: (actividad: Actividad) => void
  onDelete: () => void
}

export default function FormActividad({ actividad, index, onChange, onDelete }: Props) {
  
  const addRecurso = () => {
    onChange({
      ...actividad,
      recursos: [
        ...actividad.recursos, 
        { tipo: 'audio', url: '', texto: '', traduccion: '', descripcion: '' }
      ]
    })
    
  }

  return (
    <div className="group relative p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-all">
      
      {/* Cabecera de la Actividad */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
            {index + 1}
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">
            Detalles de Actividad
          </h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDelete}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Quitar actividad
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Título y Duración */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 space-y-2">
            <Label className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-2">
              <Settings2 className="h-3 w-3" /> Título de la actividad
            </Label>
            <Input 
              placeholder="Ej: Introducción al vocabulario..." 
              value={actividad.titulo}
              onChange={(e) => onChange({ ...actividad, titulo: e.target.value })}
              className="bg-slate-50/50 focus:bg-white transition-all"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-2">
              <Clock className="h-3 w-3" /> Duración
            </Label>
            <Input 
              placeholder="15 min" 
              value={actividad.duracion}
              onChange={(e) => onChange({ ...actividad, duracion: e.target.value })}
              className="bg-slate-50/50"
            />
          </div>
        </div>

        {/* Áreas de Texto con Diferenciación Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-3 rounded-lg bg-amber-50/30 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
            <Label className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2">
              <BookOpen className="h-3 w-3" /> Guía para el Docente
            </Label>
            <Textarea 
              placeholder="Instrucciones pedagógicas y objetivos..." 
              value={actividad.descripcion}
              onChange={(e) => onChange({ ...actividad, descripcion: e.target.value })}
              className="min-h-[100px] bg-white dark:bg-slate-950 border-amber-200/50"
              rows={3} 
            />
          </div>

          <div className="space-y-2 p-3 rounded-lg bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
            <Label className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-500 flex items-center gap-2">
              <GraduationCap className="h-3 w-3" /> Contenido para Estudiante
            </Label>
            <Textarea 
              placeholder="Texto o instrucciones que verá el alumno..." 
              value={actividad.contenidoEstudiante}
              onChange={(e) => onChange({ ...actividad, contenidoEstudiante: e.target.value })}
              className="min-h-[100px] bg-white dark:bg-slate-950 border-blue-200/50"
              rows={3} 
            />
          </div>
        </div>

        {/* Sección de Recursos */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300">Recursos Multimedia</Label>
              <Badge variant="secondary" className="text-[10px]">{actividad.recursos.length}</Badge>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addRecurso}
              className="h-8 text-xs border-dashed border-slate-300 hover:border-green-500 hover:text-green-600 dark:border-slate-700"
            >
              <Plus className="h-3 w-3 mr-1" />
              Añadir Recurso
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {actividad.recursos.map((recurso, rIdx) => (
              <FormRecurso
                key={rIdx}
                recurso={recurso}
                onChange={(nuevo) => {
                  const nuevos = [...actividad.recursos]
                  nuevos[rIdx] = nuevo
                  onChange({ ...actividad, recursos: nuevos })
                }}
                onDelete={() => {
                  const nuevos = actividad.recursos.filter((_, i) => i !== rIdx)
                  onChange({ ...actividad, recursos: nuevos })
                }}
              />
            ))}
            {actividad.recursos.length === 0 && (
              <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                <p className="text-xs text-slate-400">No hay recursos añadidos aún</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}