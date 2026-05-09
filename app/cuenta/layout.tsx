import Link from "next/link";

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-3 flex items-center gap-3">
        <Link href="/admin/docente" className="text-gray-500 hover:text-blue-600 text-sm">← Volver</Link>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Mi Cuenta</h1>
      </header>
      <main className="p-2">{children}</main>
    </div>
  )
}