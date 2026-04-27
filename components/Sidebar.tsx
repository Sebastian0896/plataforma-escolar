// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Materia } from '@/lib/types';
import { useState } from 'react';

export default function Sidebar({ materias }: { materias: Materia[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMaterias, setExpandedMaterias] = useState<string[]>(() => {
    // Inicialmente expandir la materia que contiene la ruta activa
    return materias
      .filter((m) => 
        m.temas.some((t) => pathname.includes(`/${m.slug}/${t.slug}`))
      )
      .map((m) => m.slug);
  });

  const toggleMateria = (slug: string) => {
    setExpandedMaterias((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug]
    );
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">📚 Planificaciones</h1>
          <p className="text-xs text-gray-500 mt-0.5">Lengua Extranjera</p>
        </div>

        <nav className="p-3">
          {materias.map((materia) => {
            const isExpanded = expandedMaterias.includes(materia.slug);
            const hasActiveChild = materia.temas.some(
              (t) => pathname === `/${materia.slug}/${t.slug}`
            );

            return (
              <div key={materia.slug} className="mb-1">
                {/* Botón del acordeón */}
                <button
                  onClick={() => toggleMateria(materia.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    hasActiveChild
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* Icono de carpeta/chevron animado */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    >
                      <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                    {materia.nombre}
                  </span>
                  {/* Badge con cantidad de temas */}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    hasActiveChild
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {materia.temas.length}
                  </span>
                </button>

                {/* Submenú colapsable */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="ml-6 mt-1 space-y-0.5 border-l border-gray-200 pl-3">
                    {materia.temas.map((tema) => {
                      const href = `/${materia.slug}/${tema.slug}`;
                      const isActive = pathname === href;

                      return (
                        <li key={tema.slug}>
                          <Link
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {tema.tema}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Centro Educativo Salemé Ureña
          </p>
        </div>
      </aside>
    </>
  );
}