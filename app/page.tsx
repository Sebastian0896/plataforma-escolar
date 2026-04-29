import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="text-center pt-16 pb-8 px-4">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl">📚</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Plataforma Educativa
        </h1>
        <p className="text-lg text-gray-600">
          Centro Educativo Salomé Ureña
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Sistema de Planificaciones Docentes
        </p>
      </header>

      {/* Opciones de ingreso */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Estudiantes */}
          <Link
            href="/acceso"
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all text-center"
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
              <span className="text-2xl">🎒</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Estudiantes</h2>
            <p className="text-sm text-gray-500">
              Accedé con el código de tu centro para ver tus clases
            </p>
          </Link>

          {/* Docentes y Personal */}
          <Link
            href="/login"
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-lg transition-all text-center"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
              <span className="text-2xl">👩‍🏫</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Personal Docente</h2>
            <p className="text-sm text-gray-500">
              Profesores, coordinadores y personal administrativo
            </p>
          </Link>

          {/* Registro */}
          <Link
            href="/registro"
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all text-center sm:col-span-2"
          >
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">¿Eres nuevo?</h2>
            <p className="text-sm text-gray-500">
              Registrate como estudiante con el código de tu centro educativo
            </p>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-8">
          © 2025 Centro Educativo Salomé Ureña — Todos los derechos reservados
        </p>
      </div>
    </div>
  )
}