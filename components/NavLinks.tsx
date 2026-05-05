// components/NavLinks.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  rol?: string
  grado?: string
  onClick?: () => void
}

export default function NavLinks({ rol, grado, onClick }: Props) {
  const pathname = usePathname()

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm transition-colors ${
      pathname.startsWith(path)
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
    }`

  return (
    <>
      {rol !== 'estudiante' && rol !== 'superadmin' && (
        <Link href="/dashboard" onClick={onClick} className={linkClass('/dashboard')}>
          📖 Planificaciones
        </Link>
      )}

      {rol === 'docente' && (
        <Link href="/admin/docente" onClick={onClick} className={linkClass('/admin/docente')}>
          🏠 Mi Oficina
        </Link>
      )}

      {(rol === 'admin' || rol === 'admin_centro') && (
        <Link href="/admin" onClick={onClick} className={linkClass('/admin')}>
          ⚙️ Administrar
        </Link>
      )}

      {(rol === 'admin' || rol === 'admin_centro' || rol === 'superadmin') && (
        <Link href="/admin/usuarios/centros" onClick={onClick} className={linkClass('/admin/usuarios')}>
          👥 Usuarios
        </Link>
      )}

      {rol === 'superadmin' && (
        <Link href="/admin/centros" onClick={onClick} className={linkClass('/admin/centros')}>
          🏫 Centros
        </Link>
      )}

      {rol === 'estudiante' && (
        <Link href={`/estudiante/${grado}`} onClick={onClick} className={linkClass('/estudiante')}>
          🎒 Mis Clases
        </Link>
      )}
    </>
  )
}