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
  
  // ✅ No redirigir si ya está en /dashboard
  if (path === '/dashboard') {
    const rol = session?.user?.role
  
    if (rol === 'estudiante') {
      return NextResponse.redirect(new URL('/dashboard-estudiante', req.url))
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