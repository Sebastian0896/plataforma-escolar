export const PLANES: Record<string, { docentes: number; estudiantes: number; centros: number; precio: string }> = {
  gratis: { docentes: 1, estudiantes: 20, centros: 1, precio: '$0' },
  docente_pro: { docentes: 1, estudiantes: 100, centros: 1, precio: '$5/mes' },
  centro: { docentes: 999, estudiantes: 999, centros: 1, precio: '$25/mes' },
  distrital: { docentes: 999, estudiantes: 999, centros: 50, precio: '$150/mes' },
  ministerial: { docentes: 9999, estudiantes: 9999, centros: 999, precio: 'Personalizado' },
}

export const ACTIVAR_PLANES = process.env.ACTIVAR_PLANES === 'true'