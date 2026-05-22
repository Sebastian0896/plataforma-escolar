


export default function obtenerPeriodoActual() {
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