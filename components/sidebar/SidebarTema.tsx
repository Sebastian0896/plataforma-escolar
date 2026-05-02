'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  href: string
  tema: string
  onClose: () => void
}

export default function SidebarTema({ href, tema, onClose }: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClose}
      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
      }`}
    >
      {tema}
    </Link>
  )
}