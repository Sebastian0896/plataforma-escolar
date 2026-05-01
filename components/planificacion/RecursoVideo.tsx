'use client'

interface Props {
  url: string
  descripcion?: string
}

export default function RecursoVideo({ url, descripcion }: Props) {
  return (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
      <video src={url} controls className="w-full">
        Tu navegador no soporta video.
      </video>
      {descripcion && <p className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-white dark:bg-slate-800">{descripcion}</p>}
    </div>
  )
}