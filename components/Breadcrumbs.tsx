'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function formatear(texto: string): string {
  if (!texto) return ''
  return texto.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav className="text-sm text-gray-500 dark:text-gray-400 mb-4">
      <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Inicio</Link>
      {segments.map((seg, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/')
        const isLast = idx === segments.length - 1
        return (
          <span key={href}>
            <span className="mx-2">›</span>
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium capitalize">
                {formatear(seg)}
              </span>
            ) : (
              <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400 capitalize">
                {formatear(seg)}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}