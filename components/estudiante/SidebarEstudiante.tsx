'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import type { NivelInfo } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  GraduationCap, 
  ChevronDown,
  ArrowLeft
} from 'lucide-react'

function formatear(texto: string): string {
  if (!texto) return ''
  return texto
    .split('-')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

interface Props {
  estructura: NivelInfo[]
  grado: string
}

export default function SidebarEstudiante({ estructura, grado }: Props) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandido, setExpandido] = useState<string | null>(null)

  const nombre = session?.user?.name || 'Estudiante'
  
  const materiasDelGrado = estructura
    .flatMap(n => n.ciclos.flatMap(c => c.grados.filter(g => g.slug === grado)))
    .flatMap(g => g.materias)
    .filter((m, i, arr) => arr.findIndex(x => x.slug === m.slug) === i)

  const toggleMateria = (key: string) => {
    setExpandido(expandido === key ? null : key)
  }

  return (
    <>
      {/* Mobile Trigger */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 lg:hidden shadow-lg border-blue-200 bg-white/80 backdrop-blur-md"
        >
          <Menu className="h-5 w-5 text-blue-600" />
        </Button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in" 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-[70] h-screen w-80 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800
        flex flex-col transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header Personalizado Estudiante */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <GraduationCap size={80} />
          </div>
          
          <div className="flex items-center justify-between lg:block">
            <div className="space-y-1 relative z-10">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mis Clases
              </h1>
              <p className="text-blue-100 text-sm font-medium">Hola, {nombre.split(' ')[0]}</p>
              <Badge className="bg-white/20 hover:bg-white/30 border-none text-white mt-2 capitalize font-normal">
                {formatear(grado)}
              </Badge>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="lg:hidden text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Listado de Materias y Temas */}
        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            {materiasDelGrado.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">
                  No hay contenido asignado para este grado.
                </p>
              </div>
            ) : (
              materiasDelGrado.map((materia) => (
                <div key={materia.slug} className="group">
                  <button
                    onClick={() => toggleMateria(materia.slug)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all
                      ${expandido === materia.slug 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }
                    `}
                  >
                    <span className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${expandido === materia.slug ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
                      {formatear(materia.nombre)}
                    </span>
                    {expandido === materia.slug ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>

                  {/* Lista de Temas (Submenú) */}
                  <div className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${expandido === materia.slug ? 'max-h-[500px] opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="ml-4 pl-4 border-l border-blue-100 dark:border-blue-900 space-y-1">
                      {materia.temas.map((tema) => {
                        const href = `/estudiante/${grado}/${tema.slug}`
                        const isActive = pathname === href

                        return (
                          <Link
                            key={tema.slug}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`
                              flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all
                              ${isActive
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-medium'
                                : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20'
                              }
                            `}
                          >
                            <ChevronRight className={`h-3 w-3 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            {tema.tema}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </nav>
        </ScrollArea>

        {/* Footer con retorno */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Button asChild variant="ghost" className="w-full justify-center gap-2 text-slate-500 hover:text-blue-600 transition-colors">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </aside>
    </>
  )
}