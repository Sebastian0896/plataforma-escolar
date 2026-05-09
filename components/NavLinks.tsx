// components/NavLinks.tsx
'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  rol?: string
  grado?: string
  onClick?: () => void
}

export default function NavLinks({ rol, grado, onClick }: Props) {
  const pathname = usePathname()

  const { data: session } = useSession()

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm transition-colors ${
      pathname.startsWith(path)
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
    }`

  return (
    <>
      {rol !== 'estudiante' && rol !== 'superadmin' && rol !== 'admin_centro' && rol !== 'registro' && (
        <Link href="/dashboard">📖 Planificaciones</Link>
      )}

      {rol === 'admin_centro' && (
        <>
          <Link href="/admin" onClick={onClick} className={linkClass('/admin')}>
            ⚙️ Panel
          </Link>
          <Link href="/admin/usuarios/centros" onClick={onClick} className={linkClass('/admin/usuarios')}>
            👥 Usuarios
          </Link>
          <Link href="/admin/centros/plan" onClick={onClick} className={linkClass('/admin/centros/plan')}>
            💎 Planes
          </Link>
        </>
      )}

      {rol === 'registro' && (
        <Link href="/admin/registro/comprobantes" className={linkClass('/admin/registro')}>
          📄 Comprobantes
        </Link>
      )}
      
      {(rol === 'docente' || (rol === 'admin_centro' && session?.user?.categoriaDocente)) && (
        <Link href="/admin/docente" onClick={onClick} className={linkClass('/admin/docente')}>
          🏠 Mi Oficina
        </Link>
      )}

      {(rol === 'admin') && (
        <Link href="/admin" onClick={onClick} className={linkClass('/admin')}>
          ⚙️ Administrar
        </Link>
      )}

      {(rol === 'admin' || rol === 'superadmin') && (
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