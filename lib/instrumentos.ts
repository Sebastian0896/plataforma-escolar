interface Actividad {
  titulo: string
  descripcion: string
}

interface PlanificacionData {
  tema: string
  materia: string
  grado: string
  competencia: string
  indicadorLogro: string
  momentos: {
    tipo: string
    actividades: Actividad[]
  }[]
}

export function sugerirTipoInstrumento(plan: PlanificacionData): string {
  const texto = plan.indicadorLogro + ' ' + plan.competencia
  const textoL = texto.toLowerCase()

  if (textoL.includes('nombra') || textoL.includes('identifica') || textoL.includes('reconoce')) {
    return 'Lista de Cotejo'
  }
  if (textoL.includes('describe') || textoL.includes('explica') || textoL.includes('analiza')) {
    return 'Escala de Estimación'
  }
  if (textoL.includes('crea') || textoL.includes('elabora') || textoL.includes('diseña') || textoL.includes('produce')) {
    return 'Rúbrica'
  }
  if (textoL.includes('resuelve') || textoL.includes('calcula') || textoL.includes('completa')) {
    return 'Prueba Escrita'
  }
  return 'Lista de Cotejo'
}

export function generarCriterios(plan: PlanificacionData): string[] {
  const criterios: string[] = []
  const indicador = plan.indicadorLogro

  // Del indicador de logro
  const partes = indicador.split(/[,;.]/).filter(p => p.trim().length > 5)
  partes.forEach(p => {
    criterios.push(p.trim().charAt(0).toUpperCase() + p.trim().slice(1))
  })

  // De las actividades
  plan.momentos.forEach(m => {
    m.actividades.forEach(a => {
      if (a.descripcion && a.descripcion.length > 10) {
        const resumen = a.descripcion.length > 80
          ? a.descripcion.substring(0, 80) + '...'
          : a.descripcion
        criterios.push(resumen.charAt(0).toUpperCase() + resumen.slice(1))
      }
    })
  })

  return [...new Set(criterios)].slice(0, 8) // Máximo 8 criterios
}

export function generarRecomendaciones(plan: PlanificacionData): string[] {
  const recomendaciones: string[] = []

  if (plan.competencia.toLowerCase().includes('oral')) {
    recomendaciones.push('Evaluar pronunciación y fluidez al hablar')
  }
  if (plan.competencia.toLowerCase().includes('escrita')) {
    recomendaciones.push('Revisar ortografía y gramática en la producción escrita')
  }
  if (plan.grado?.includes('1ro') || plan.grado?.includes('2do')) {
    recomendaciones.push('Usar imágenes de apoyo durante la evaluación')
  }
  recomendaciones.push('Registrar observaciones individuales para retroalimentación')
  recomendaciones.push('Adecuar el tiempo según el ritmo de cada estudiante')

  return recomendaciones
}