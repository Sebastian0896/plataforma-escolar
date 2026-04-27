// components/SidebarWrapper.tsx
import { getMaterias } from '@/lib/wordpress';
import Sidebar from './Sidebar';

export default async function SidebarWrapper() {
  const materias = await getMaterias();
  return <Sidebar materias={materias} />;
}