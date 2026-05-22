// app/admin/docente/evaluaciones/page.tsx (o tu ruta actual)
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, GraduationCap, Loader2, Save } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import { Competencia, Estudiante, NotasEstado } from '@/components/docente/evaluaciones/types';
import { FiltrosEvaluacion } from '@/components/docente/evaluaciones/FiltrosEvaluacion';
import { ToolbarCompetencias } from '@/components/docente/evaluaciones/ToolbarCompetencias';
import { FilaEstudiante } from '@/components/docente/evaluaciones/FilaEstudiante';

function obtenerPeriodoActual() {
  const hoy = new Date()

  const year = hoy.getMonth() >= 7
    ? hoy.getFullYear()
    : hoy.getFullYear() - 1

  // Inicio estimado del año escolar:
  // 25 de agosto
  const inicioEscolar = new Date(year, 7, 25)

  // Diferencia en días
  const diffMs = hoy.getTime() - inicioEscolar.getTime()
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // Cada período ≈ 70 días (~2 meses y medio)
  if (diffDias < 70) return 'P1'
  if (diffDias < 140) return 'P2'
  if (diffDias < 210) return 'P3'

  return 'P4'
}

export default function EvaluacionesPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  //const [periodo, setPeriodo] = useState('P1');
  const [periodo, setPeriodo] = useState(
      obtenerPeriodoActual()
    )
  const [grado, setGrado] = useState('');
  const [materia, setMateria] = useState('');
  const [competenciaActiva, setCompetenciaActiva] = useState('');
  const [notas, setNotas] = useState<NotasEstado>({});
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resumen, setResumen] = useState<Record<string, any>>({});

  const gradosDocente = session?.user?.grados || (session?.user?.grado ? [session.user.grado] : []);
  const materiasDocente = session?.user?.materias || [];

  // Inicializar materia por defecto
  useEffect(() => {
    if (materiasDocente.length) {
      setMateria(materiasDocente[0]);
    }
  }, [session]);

  // Cargar Competencias
  useEffect(() => {
    fetch('/api/competencias')
      .then((r) => r.json())
      .then((data: Competencia[]) => {
        setCompetencias(data);
        if (data?.length > 0) setCompetenciaActiva(data[0].id);
      });
  }, []);

  // Cargar Estudiantes basados en el grado escogido
  useEffect(() => {
    if (grado) {
      setCargando(true);
      fetch(`/api/docente/estudiantes?grado=${grado}`)
        .then((r) => r.json())
        .then((d) => {
          const lista = Array.isArray(d) ? d : d.estudiantes || [];
          setEstudiantes(lista);
          setCargando(false);
        });
    }
  }, [grado]);

  // Cargar Notas de evaluación existentes
  useEffect(() => {
    if (grado && periodo && materia) {
      fetch(`/api/evaluaciones?grado=${grado}&periodo=${periodo}&materia=${materia}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.notas) {
            setNotas(d.notas);
          } else {
            setNotas({});
          }
        });
    }
  }, [grado, periodo, materia]);

  // Cargar Resumen de asistencias/tareas diarias
  useEffect(() => {
    if (grado && materia && periodo) {
      fetch(`/api/diario/resumen?grado=${grado}&materia=${materia}&periodo=${periodo}`)
        .then((r) => r.json())
        .then(setResumen);
    }
  }, [grado, materia, periodo]);

  const handleNotaChange = (estudianteId: string, competenciaId: string, valor: number) => {
    setNotas((prev) => ({
      ...prev,
      [estudianteId]: {
        ...prev[estudianteId],
        [competenciaId]: valor,
      },
    }));
  };

  const guardar = async () => {
    setMensaje('');
    const res = await fetch('/api/evaluaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grado,
        periodo,
        materia: materia || materiasDocente[0] || '',
        notas,
      }),
    });

    if (res.ok) {
      setMensaje('✅ Evaluaciones guardadas');
      setTimeout(() => {
        setMensaje('');
        router.push('/admin/docente/estudiantes');
      }, 1500);
    } else {
      setMensaje('❌ Error al guardar');
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Evaluaciones Académicas</h1>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                Gestiona competencias y calificaciones de los estudiantes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {mensaje && (
            <Badge variant="secondary" className="rounded-xl px-4 py-2 text-xs">
              {mensaje}
            </Badge>
          )}

          <a href={`/api/evaluaciones/pdf?grado=${grado}&materia=${materia}`} target="_blank" rel="noreferrer">
            <Button variant="outline" className="h-11 rounded-xl px-5">
              <Download className="mr-2 h-4 w-4" /> Exportar PDF
            </Button>
          </a>
        </div>
      </div>

      <Separator />

      {/* Filtros */}
      <FiltrosEvaluacion
        grado={grado}
        setGrado={setGrado}
        materia={materia}
        setMateria={setMateria}
        periodo={periodo}
        setPeriodo={setPeriodo}
        gradosDocente={gradosDocente}
        materiasDocente={materiasDocente}
        totalEstudiantes={estudiantes.length}
        totalCompetencias={competencias.length}
        obtenerPeriodoActual={obtenerPeriodoActual}
      />

      {/* Zona de Contenido Principal Dinámico */}
      {!grado || !materia ? (
        <Card className="border-dashed">
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">Selecciona grado y materia para comenzar.</p>
          </CardContent>
        </Card>
      ) : cargando ? (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Cargando estudiantes...
            </div>
          </CardContent>
        </Card>
      ) : estudiantes.length === 0 ? (
        <Card>
          <CardContent className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">No hay estudiantes registrados.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden border shadow-sm">
            <ToolbarCompetencias
              competencias={competencias}
              competenciaActiva={competenciaActiva}
              setCompetenciaActiva={setCompetenciaActiva}
            />

            <div className="divide-y">
              {estudiantes.map((e) => (
                <FilaEstudiante
                  key={e.id}
                  estudiante={e}
                  resumen={resumen[e.id]}
                  nota={notas[e.id]?.[competenciaActiva]}
                  onNotaChange={(valor) => handleNotaChange(e.id, competenciaActiva, valor)}
                />
              ))}
            </div>
          </Card>

          {/* Footer Flotante de Persistencia */}
          <div className="sticky bottom-4 z-30 flex justify-end">
            <Button onClick={guardar} size="lg" className="h-12 rounded-2xl px-8 shadow-2xl">
              <Save className="mr-2 h-4 w-4" /> Guardar Evaluaciones
            </Button>
          </div>
        </>
      )}
    </div>
  );
}