// types/next-auth.d.ts
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: string
      categoriaDocente?: string
      niveles?: string[]
      ciclos?: string[]
      grado?: string
      grados?: string[]
      materias?: string[]
      centroId?: string
      centroNombre?: string
      centroTipo?: string  // ← AGREGAR (o tipo)
    } & DefaultSession["user"]
  }
  interface User {
    id?: string
    role?: string
    categoriaDocente?: string
    niveles?: string[]
    ciclos?: string[]
    grado?: string
    grados?: string[]
    materias?: string[]
    centroId?: string
    centroNombre?: string
    centroTipo?: string  // ← AGREGAR
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    categoriaDocente?: string
    niveles?: string[]
    ciclos?: string[]
    grado?: string
    grados?: string[]
    materias?: string[]
    centroId?: string
    centroNombre?: string
    centroTipo?: string  // ← AGREGAR
  }
}