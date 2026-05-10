'use client'

import { Recurso } from './formTypes'
import FileUpload from '@/components/FileUpload'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  recurso: Recurso
  onChange: (recurso: Recurso) => void
  onDelete: () => void
}

export default function FormRecurso({
  recurso,
  onChange,
  onDelete,
}: Props) {
  const isArchivo =
    recurso.tipo === 'imagen' ||
    recurso.tipo === 'pdf' ||
    recurso.tipo === 'video' ||
    recurso.tipo === 'enlace'

  return (
    <Card className="border-border/60 bg-muted/30 shadow-sm">
      <CardContent className="space-y-4 p-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-52">
            <Select
              value={recurso.tipo}
              onValueChange={(value) =>
                onChange({
                  ...recurso,
                  tipo: value,
                  url: '',
                  texto: '',
                  traduccion: '',
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de recurso" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="audio">🎵 Audio</SelectItem>
                <SelectItem value="imagen">🖼️ Imagen</SelectItem>
                <SelectItem value="pdf">📄 PDF</SelectItem>
                <SelectItem value="video">🎬 Video</SelectItem>
                <SelectItem value="enlace">🔗 Enlace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="w-full sm:w-auto"
          >
            Eliminar
          </Button>
        </div>

        {/* Audio */}
        {recurso.tipo === 'audio' && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Texto para audio
              </label>

              <Textarea
                placeholder="Escribí el contenido del audio..."
                value={recurso.texto}
                onChange={(e) =>
                  onChange({
                    ...recurso,
                    texto: e.target.value,
                  })
                }
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Traducción
              </label>

              <Textarea
                placeholder="Escribí la traducción..."
                value={recurso.traduccion}
                onChange={(e) =>
                  onChange({
                    ...recurso,
                    traduccion: e.target.value,
                  })
                }
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
        )}

        {/* Archivos / enlaces */}
        {isArchivo && (
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                URL
              </label>

              <Input
                type="text"
                placeholder="https://..."
                value={recurso.url}
                onChange={(e) =>
                  onChange({
                    ...recurso,
                    url: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">
                Descripción
              </label>

              <Input
                type="text"
                placeholder="Descripción del recurso"
                value={recurso.descripcion}
                onChange={(e) =>
                  onChange({
                    ...recurso,
                    descripcion: e.target.value,
                  })
                }
              />
            </div>

            <div className="rounded-xl border border-dashed border-border bg-background/70 p-4">
              <FileUpload
                onUpload={(url) => onChange({ ...recurso, url })}
                accept={
                  recurso.tipo === 'imagen'
                    ? 'image/*'
                    : recurso.tipo === 'pdf'
                    ? '.pdf,.doc,.docx'
                    : recurso.tipo === 'video'
                    ? 'video/*'
                    : '*/*'
                }
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}