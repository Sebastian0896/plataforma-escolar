'use client'

interface Props {
  variantId: string | null
  esActual: boolean
  planNombre: string
}

export default function PlanButtonClient({ variantId, esActual, planNombre }: Props) {
  if (esActual) {
    return (
      <button disabled className="w-full py-2 rounded-lg text-sm font-medium bg-gray-300 dark:bg-slate-600 text-gray-500 cursor-not-allowed">
        Plan actual
      </button>
    )
  }

  if (!variantId) {
    return (
      <button disabled className="w-full py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed">
        Próximamente
      </button>
    )
  }

  return (
    <button
      onClick={async () => {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variantId }),
        })
        const data = await res.json()
        if (data.url) window.location.href = data.url
      }}
      className="w-full py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
    >
      Seleccionar
    </button>
  )
}