'use client'

interface Props {
  open: boolean
  children: React.ReactNode
  onClose: () => void
}

export default function MobileMenu({ open, children, onClose }: Props) {
  if (!open) return null

  return (
    <div className="md:hidden border-t border-gray-100 dark:border-slate-700 py-2 space-y-1">
      {children}
    </div>
  )
}