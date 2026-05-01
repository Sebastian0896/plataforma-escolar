'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface Props {
  onClick?: () => void
}

export default function NavLinks({ onClick }: Props) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  // ⏳ Mientras carga sesión, no renderizamos nada
  if (status === 'loading') return null

  const rol = session?.user?.role
  const grado = session?.user?.grado

  return (
    <>
      {rol !== 'estudiante' && (
        <Link
          href="/dashboard"
          onClick={onClick}
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/estudiante')
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          📖 Planificaciones
        </Link>
      )}

      {(rol === 'admin' || rol === 'docente') && (
        <Link
          href="/admin"
          onClick={onClick}
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname.startsWith('/admin')
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          ⚙️ Administrar
        </Link>
      )}

      {(rol === 'admin' || rol === 'admin_centro') && (
        <Link
          href="/admin/usuarios"
          onClick={onClick}
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname.startsWith('/admin/usuarios')
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          👥 Usuarios
        </Link>
      )}

      {rol === 'estudiante' && grado && (
        <Link
          href={`/estudiante/${grado}`}
          onClick={onClick}
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            pathname.startsWith('/estudiante')
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          🎒 Mis Clases
        </Link>
      )}
    </>
  )
}