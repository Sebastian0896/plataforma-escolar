// auth.ts (raíz del proyecto)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Usuario from "@/lib/models/Usuario"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciales:", credentials)

        if (!credentials?.email || !credentials?.password) {
          console.log("Faltan credenciales")
          return null
        }

        try {
          await connectDB()

          const usuario = await Usuario.findOne({ email: credentials.email, activo: true })
          console.log("Usuario:", usuario)

          if (!usuario) {
            console.log("Usuario no encontrado")
            return null
          }

          const ok = await bcrypt.compare(credentials.password, usuario.password)
          console.log("Password válida:", ok)

          if (!ok) return null

          return {
            id: usuario._id.toString(),
            name: usuario.nombre,
            email: usuario.email,
            role: usuario.rol,
            categoriaDocente: usuario.categoriaDocente || "",
            grado: usuario.grado || "",
            grados: JSON.stringify(usuario.grados || []),
            materias: JSON.stringify(usuario.materias || []),
            centroId: usuario.centroId?.toString() || "",
          }
        } catch (error) {
          console.error("ERROR REAL:", error)
          throw new Error("Error en login")
        }
      }
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/` || url === `${baseUrl}/dashboard`) {
        return `${baseUrl}/dashboard`
      }
      return url
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.categoriaDocente = user.categoriaDocente
        token.grado = user.grado
        token.grados = user.grados
        token.materias = user.materias
        token.centroId = user.centroId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.categoriaDocente = token.categoriaDocente as string
        session.user.grado = token.grado as string
        session.user.grados = token.grados ? JSON.parse(token.grados as string) : []
        session.user.materias = token.materias ? JSON.parse(token.materias as string) : []
        session.user.centroId = token.centroId as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
})