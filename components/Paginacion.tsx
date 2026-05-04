'use client'

interface Props {
  paginaActual: number
  totalPaginas: number
  onPaginaChange: (pagina: number) => void
}

export default function Paginacion({ paginaActual, totalPaginas, onPaginaChange }: Props) {
  if (totalPaginas <= 1) return null

  const paginas: (number | '...')[] = []
  const delta = 2

  for (let i = 1; i <= totalPaginas; i++) {
    if (i === 1 || i === totalPaginas || (i >= paginaActual - delta && i <= paginaActual + delta)) {
      paginas.push(i)
    } else if (paginas[paginas.length - 1] !== '...') {
      paginas.push('...')
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPaginaChange(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        ←
      </button>

      {paginas.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-400">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPaginaChange(p as number)}
            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
              p === paginaActual
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPaginaChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-600 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        →
      </button>
    </div>
  )
}