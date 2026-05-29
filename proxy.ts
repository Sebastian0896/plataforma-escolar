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


  // ✅ Proteger rutas de centros (solo superadmin)
  if (path.startsWith('/admin/centros')) {
    const userRole = session?.user?.role
    if (userRole !== 'superadmin') {
      return NextResponse.redirect(new URL('/admin/usuarios', req.url))
    }
  }

  // ✅ Proteger rutas de admin/centro/[id] (solo admin_centro con su propio centro)
  if (path.match(/^\/admin\/centro\/[^\/]+/)) {
    const userRole = session?.user?.role
    const centroIdFromUrl = path.split('/')[3] // /admin/centro/[centroId]/...
    const userCentroId = session?.user?.centroId
    
    // Solo admin_centro puede acceder a su propio centro
    if (userRole !== 'admin_centro' || centroIdFromUrl !== userCentroId) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  
  // ✅ No redirigir si ya está en /dashboard
  if (path === '/dashboard') {
    const rol = session?.user?.role
    //const grado = session?.user?.grado
    
    const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://mieducacion.edu.do' 
  : 'http://localhost:3000'

if (rol === 'estudiante') {
  const grado = session?.user?.grado
  return NextResponse.redirect(new URL(`/estudiante/${grado}`, baseUrl))
}
    
    return NextResponse.next()
  }
  
  // ✅ Solo redirigir en la raíz
  if (path === '/') {
    const rol = session?.user?.role
    const centroId = session?.user?.centroId
    
    
    if (rol === 'coordinador' && centroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${centroId}/coordinador`, req.url))
    }
    if (rol === 'docente') {
      return NextResponse.redirect(new URL('/admin/docente', req.url))
    }
    if (rol === 'admin_centro' && centroId) {
      return NextResponse.redirect(new URL(`/admin/centro/${centroId}`, req.url))
    }
    if (rol === 'admin' || rol === 'superadmin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ['/', '/dashboard', '/admin/:path*', '/api/:path*'],
}