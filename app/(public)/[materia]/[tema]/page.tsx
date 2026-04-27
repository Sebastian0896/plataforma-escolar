// app/[materia]/[tema]/page.tsx
import { notFound } from 'next/navigation';
import { getPlanificacion } from '@/lib/wordpress';
import PlanificacionView from '@/components/PlanificacionView';

type Params = Promise<{ materia: string; tema: string }>;

export default async function PlanificacionPage({ params }: { params: Params }) {
  const { materia, tema } = await params;

  const planificacion = await getPlanificacion(materia, tema);

  if (!planificacion) {
    notFound();
  }

  return <PlanificacionView planificacion={planificacion} />;
}