import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      role?: string
      categoriaDocente?: string
      grado?: string
      grados?: string[]
      materias?: string[]
      centroId?: string
    } & DefaultSession["user"]
  }
  interface User {
    role?: string
    categoriaDocente?: string
    grado?: string
    grados?: string[]
    materias?: string[]
    centroId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    categoriaDocente?: string
    grado?: string
    grados?: string[]
    materias?: string[]
    centroId?: string
  }
}