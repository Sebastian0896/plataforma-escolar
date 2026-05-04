'use client'

import { useState, useMemo } from 'react'

export function usePaginacion<T>(items: T[], defaultPageSize: number = 9) {
  const [paginaActual, setPaginaActual] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const totalPaginas = Math.ceil(items.length / pageSize)
  const itemsPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * pageSize
    return items.slice(inicio, inicio + pageSize)
  }, [items, paginaActual, pageSize])

  return {
    paginaActual,
    totalPaginas,
    pageSize,
    itemsPaginados,
    setPaginaActual,
    setPageSize,
  }
}