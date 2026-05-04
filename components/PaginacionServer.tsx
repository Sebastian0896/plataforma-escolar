'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  totalPaginas: number
  paginaActual: number
}

export default function PaginacionServer({ totalPaginas, paginaActual }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const irAPagina = (pagina: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(pagina))
    router.push(`?${params.toString()}`)
  }

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
      <button onClick={() => irAPagina(paginaActual - 1)} disabled={paginaActual === 1}
        className="px-3 py-2 text-sm rounded-lg border disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700">
        ←
      </button>
      {paginas.map((p, i) => p === '...' ? (
        <span key={`d-${i}`} className="px-2 text-gray-400">...</span>
      ) : (
        <button key={p} onClick={() => irAPagina(p as number)}
          className={`px-3 py-2 text-sm rounded-lg border ${p === paginaActual ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50 dark:hover:bg-slate-700'}`}>
          {p}
        </button>
      ))}
      <button onClick={() => irAPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}
        className="px-3 py-2 text-sm rounded-lg border disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700">
        →
      </button>
    </div>
  )
}