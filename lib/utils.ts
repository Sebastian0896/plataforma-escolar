export function getCicloByGrado(grado: string): string {
  if (!grado) return ''
  const primeros = ['1ro', '2do', '3ro']
  const esPrimerCiclo = primeros.some(g => grado.startsWith(g))
  return esPrimerCiclo ? 'primer-ciclo' : 'segundo-ciclo'
}