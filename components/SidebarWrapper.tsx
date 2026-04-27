// components/SidebarWrapper.tsx
import { getEstructuraCompleta } from '@/lib/wordpress'
import { auth } from '@/auth'
import Sidebar from './Sidebar'

export default async function SidebarWrapper() {
  const session = await auth()
  
  console.log('🔐 Session completa:', JSON.stringify(session, null, 2))
  console.log('🔐 Categoría:', session?.user?.categoriaDocente)
  console.log('🔐 Role:', session?.user?.role)
  
  const categoria = session?.user?.categoriaDocente || ''
  
  const estructura = await getEstructuraCompleta(
    session?.user?.role === 'admin' ? undefined : categoria || undefined
  )
  
  console.log('📊 Estructura filtrada:', estructura.length, 'niveles')
  
  return <Sidebar estructura={estructura} />
}