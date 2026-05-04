'use client'

interface Props {
  pageSize: number
  onPageSizeChange: (size: number) => void
  options?: number[]
}

export default function PageSizeSelector({ pageSize, onPageSizeChange, options = [9, 18, 36, 72] }: Props) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Mostrar</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="px-2 py-1 border rounded dark:bg-slate-700 dark:text-white text-sm"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span>por página</span>
    </div>
  )
}