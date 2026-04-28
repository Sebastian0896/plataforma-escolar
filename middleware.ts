// middleware.ts
// middleware.ts
import { auth } from "./auth"
import { NextResponse } from "next/server"
export const runtime = "nodejs"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl

  // Si no está logueado y no está en login, redirigir a login
  if (!isLoggedIn && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  // Si está logueado y está en login, redirigir a admin
  if (isLoggedIn && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"],
}