// app/(public)/page.tsx
import { redirect } from 'next/navigation'
import { getEstructuraCompleta } from '@/lib/wordpress'

export default async function Home() {
  const estructura = await getEstructuraCompleta()
  
  const primerNivel = estructura[0]
  if (primerNivel) {
    const primerCiclo = primerNivel.ciclos[0]
    if (primerCiclo) {
      const primerGrado = primerCiclo.grados[0]
      if (primerGrado) {
        const primerMateria = primerGrado.materias[0]
        if (primerMateria && primerMateria.temas[0]) {
          redirect(
            `/${primerNivel.slug}/${primerGrado.slug}/${primerMateria.temas[0].slug}`
          )
        }
      }
    }
  }

  return <p className="p-8 text-gray-500">No hay planificaciones disponibles.</p>
}