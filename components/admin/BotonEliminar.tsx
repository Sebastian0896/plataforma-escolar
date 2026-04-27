// components/admin/BotonEliminar.tsx
'use client'

import { useRouter } from 'next/navigation'

interface BotonEliminarProps {
  materiaSlug: string
  temaSlug: string
}

export default function BotonEliminar({ materiaSlug, temaSlug }: BotonEliminarProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta planificación?')) return

    try {
      const res = await fetch(`/api/planificaciones?tema=${temaSlug}`)
      if (!res.ok) throw new Error('No encontrada')

      const data: { id: number } = await res.json()
      const delRes = await fetch(`/api/planificaciones?id=${data.id}`, { method: 'DELETE' })

      if (delRes.ok) {
        router.refresh()
      } else {
        alert('Error al eliminar')
      }
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-500 hover:text-red-700 font-medium">
      Eliminar
    </button>
  )
}