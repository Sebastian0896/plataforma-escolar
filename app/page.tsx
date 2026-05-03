import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <span className="text-5xl">📚</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Plataforma Educativa
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          Sistema de Planificaciones Docentes
        </p>

        <Link
          href="/login"
          className="inline-block w-full bg-blue-600 text-white py-3.5 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          Ingresar
        </Link>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} mieducacion
        </p>
      </div>
    </div>
  )
}