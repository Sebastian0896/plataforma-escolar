// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/wordpress'
import Sidebar from './Sidebar'

export default async function SidebarWrapper() {
  // Sin filtro = muestra todo. Con filtro = pasar categoriaDocenteSlug
  const estructura = await getEstructuraCompleta()
  return <Sidebar estructura={estructura} />
}