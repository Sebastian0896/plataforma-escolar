// proxy.ts
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const proxy = auth(async function proxy(req: NextRequest) {
  const session = await auth()
  const path = req.nextUrl.pathname
  
  // ✅ Rutas públicas (no requieren autenticación)
  const publicPaths = ['/login', '/auth/login', '/api/auth']
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }
  
  // ✅ Verificar autenticación para rutas protegidas
  const isProtectedRoute = path.startsWith('/admin') || path.startsWith('/dashboard')
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  const userRole = session?.user?.role
  const userCentroId = session?.user?.centroId

  // ========== REGLAS PARA ADMIN_CENTRO ==========

  
  // Redirigir /admin/centro a /admin/centro/[centroId]
  if (path === '/admin/centro') {
    const userRole = session?.user?.role
    const centroId = session?.user?.centroId
    
    if (userRole === 'admin_centro' && centroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${centroId}`, req.url))
    }
    
    if (userRole === 'superadmin' || userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin/centros', req.url))
    }
    
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  
  // 1. Bloquear acceso a cualquier ruta que contenga "centros" (plural) - solo superadmin
  if (path.includes('/centros') && userRole !== 'superadmin') {
    if (userRole === 'admin_centro' && userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}`, req.url))
    }
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // 2. Bloquear acceso a /admin/usuarios/centros
  if (path.startsWith('/admin/usuarios/centros') && userRole !== 'superadmin') {
    if (userRole === 'admin_centro' && userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}/usuarios`, req.url))
    }
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // 3. Proteger rutas de /admin/centro/[cualquierId] - solo admin_centro con su propio ID
  const centroRouteMatch = path.match(/^\/admin\/centro\/([^\/]+)/)
  if (centroRouteMatch) {
    const centroIdFromUrl = centroRouteMatch[1]
    
    // Solo admin_centro puede acceder
    if (userRole !== 'admin_centro') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // Debe acceder SOLO a su propio centroId
    if (centroIdFromUrl !== userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}`, req.url))
    }
  }

  // 4. Redirigir cualquier intento de admin_centro a rutas de /admin/usuarios o /admin/docente
  //    hacia su ruta de centro correspondiente
  if (userRole === 'admin_centro' && userCentroId) {
    // Si intenta acceder a /admin/usuarios
    if (path === '/admin/usuarios' || path.startsWith('/admin/usuarios/')) {
      // Extraer el resto de la ruta después de /admin/usuarios
      const subPath = path.replace('/admin/usuarios', '')
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}/usuarios${subPath}`, req.url))
    }
    
    // Si intenta acceder a /admin/docente
    if (path === '/admin/docente' || path.startsWith('/admin/docente/')) {
      const subPath = path.replace('/admin/docente', '')
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}/docente${subPath}`, req.url))
    }
  }

  // ========== REDIRECCIONES DE RAÍZ Y DASHBOARD ==========
  
  // Redirigir /dashboard según el rol
  if (path === '/dashboard') {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://mieducacion.edu.do' 
      : 'http://localhost:3000'

    if (userRole === 'estudiante') {
      const grado = session?.user?.grado
      return NextResponse.redirect(new URL(`/estudiante/${grado}`, baseUrl))
    }
    
    if (userRole === 'admin_centro' && userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}`, baseUrl))
    }
    
    if (userRole === 'superadmin' || userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', baseUrl))
    }
    
    return NextResponse.next()
  }
  
  // Redirigir la raíz según el rol
  if (path === '/') {
    if (userRole === 'estudiante') {
      const grado = session?.user?.grado
      return NextResponse.redirect(new URL(`/estudiante/${grado}`, req.url))
    }
    
    if (userRole === 'admin_centro' && userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}`, req.url))
    }
    
    if (userRole === 'superadmin' || userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    
    if (userRole === 'coordinador' && userCentroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${userCentroId}/coordinador`, req.url))
    }
    
    if (userRole === 'docente') {
      return NextResponse.redirect(new URL('/admin/docente', req.url))
    }
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ['/', '/dashboard', '/admin/:path*', '/api/:path*'],
}