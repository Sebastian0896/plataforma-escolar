// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/wordpress'
import Sidebar from './Sidebar'

export default async function SidebarWrapper() {
  const estructura = await getEstructuraCompleta() // Sin filtro, todo visible
  return <Sidebar estructura={estructura} />
}