'use client'

import { useRouter } from 'next/navigation'

export default function BotonEliminarUsuario({ userId }: { userId: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('¿Eliminar este usuario?')) return

    try {
      const res = await fetch(`/api/usuarios?id=${userId}`, { method: 'DELETE' })
      if (res.ok) {
        router.refresh()
      } else {
        alert('Error al eliminar')
      }
    } catch {
      alert('Error al eliminar')
    }
  }

  return (
    <button onClick={handleDelete} className="text-xs text-red-500 hover:text-red-700">
      Eliminar
    </button>
  )
}