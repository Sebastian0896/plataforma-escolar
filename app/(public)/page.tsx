// app/page.tsx
import { redirect } from 'next/navigation';
import { getMaterias } from '@/lib/wordpress';

export default async function Home() {
  const materias = await getMaterias();
  
  if (materias.length > 0 && materias[0].temas.length > 0) {
    redirect(`/${materias[0].slug}/${materias[0].temas[0].slug}`);
  }
  
  return <p>Cargando planificaciones...</p>;
}