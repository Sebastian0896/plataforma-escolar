// components/admin/BotonEliminar.tsx
'use client'

import { useRouter } from 'next/navigation'

interface BotonEliminarProps {
  id: string
}

export default function BotonEliminar({ id }: BotonEliminarProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta planificación?')) return

    try {
        await fetch(`/api/planificaciones?id=${id}`, { method: 'DELETE' })
        console.log("Eliminando la planificacion: ", id)
        router.refresh()
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

