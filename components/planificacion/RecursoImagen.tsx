'use client'

interface Props {
  url: string
  descripcion?: string
}

export default function RecursoImagen({ url, descripcion }: Props) {
  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
      <img src={url} alt={descripcion || 'Imagen'} className="w-full h-auto max-h-96 object-contain" />
      {descripcion && <p className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-white dark:bg-slate-800">{descripcion}</p>}
    </div>
  )
}