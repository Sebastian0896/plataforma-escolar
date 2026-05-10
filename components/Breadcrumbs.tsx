'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChevronRight, Home, Folder } from 'lucide-react'

function formatear(texto: string): string {
  if (!texto) return ''
  // Elimina IDs de MongoDB o strings muy largos de la ruta para mantener la limpieza
  if (texto.length > 20 && !texto.includes('-')) return 'Detalles'
  
  return texto
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  // Filtramos segmentos vacíos y el segmento 'admin' si queremos una ruta más corta
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  const rol = session?.user?.role
  
  // Definimos la ruta de inicio lógica según el rol
  const inicioHref = 
      rol === 'docente' ? '/admin/docente' 
    : rol === 'estudiante' ? `/estudiante/${session?.user?.grado}`
    : '/dashboard'

  return (
    <nav 
      aria-label="Breadcrumb"
      className="flex items-center text-sm mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide"
    >
      <ol className="flex items-center gap-2">
        {/* Nodo de Inicio */}
        <li>
          <Link 
            href={inicioHref}
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Inicio</span>
          </Link>
        </li>

        {segments.map((seg, idx) => {
          // No mostramos el primer segmento si es redundante (opcional)
          // if (seg === 'admin' || seg === 'estudiante') return null;

          const href = '/' + segments.slice(0, idx + 1).join('/')
          const isLast = idx === segments.length - 1
          const label = formatear(seg)

          return (
            <li key={href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-slate-300 dark:text-slate-600 shrink-0" />
              
              {isLast ? (
                <span 
                  className="font-semibold text-slate-900 dark:text-white px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <Link 
                  href={href}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors capitalize"
                >
                  {/* Icono de carpeta opcional para niveles intermedios */}
                  {segments.length > 2 && idx < segments.length - 1 && (
                    <Folder className="h-3.5 w-3.5 opacity-50" />
                  )}
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}