'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageSquare, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface SugerenciaForm {
  titulo: string
  descripcion: string
  tipo: string
}

export function SugerenciaButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<SugerenciaForm>({ 
    titulo: '', 
    descripcion: '', 
    tipo: 'mejora' 
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.titulo.trim() || !form.descripcion.trim()) {
      toast.error('Completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/sugerencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success('¡Gracias por tu sugerencia!', {
          description: 'La revisaremos para mejorar la plataforma.'
        })
        setOpen(false)
        setForm({ titulo: '', descripcion: '', tipo: 'mejora' })
      } else {
        const data = await res.json()
        toast.error(data.error || 'Error al enviar sugerencia')
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const tipos = [
    { value: 'bug', label: '🐛 Reportar error', color: 'text-red-500' },
    { value: 'mejora', label: '💡 Sugerir mejora', color: 'text-blue-500' },
    { value: 'nueva', label: '✨ Nueva funcionalidad', color: 'text-green-500' },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
        PASO CLAVE: Conservamos el 'asChild' pero se lo inyectamos directamente al botón final, 
        trasladando las clases de posición fija ("fixed bottom-6 right-6 z-40") al propio Button.
        De esta manera se inyecta un único elemento <button> en el HTML real.
      */}
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg gap-2" size="lg">
          <MessageSquare className="h-5 w-5" />
          <span className="hidden sm:inline">Sugerencias</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Enviar sugerencia
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de sugerencia</Label>
            <Select 
              value={form.tipo} 
              onValueChange={(v) => setForm({ ...form, tipo: v })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tipos.map(t => (
                  <SelectItem key={t.value} value={t.value}>
                    <span className={t.color}>{t.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ej: Mejorar el diario del docente"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              maxLength={100}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.titulo.length}/100
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe tu sugerencia con detalle..."
              rows={4}
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.descripcion.length}/500
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar sugerencia
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Tus sugerencias nos ayudan a mejorar la plataforma
        </p>
      </DialogContent>
    </Dialog>
  )
}