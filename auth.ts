import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Usuario from "@/lib/models/Usuario"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        try {
          await connectDB()

          const usuario = await Usuario.findOne({
            email: credentials.email,
            activo: true,
          })

          if (!usuario) return null

          const passwordValida = await bcrypt.compare(
            credentials.password,
            usuario.password
          )

          if (!passwordValida) return null

          return {
          id: usuario._id.toString(),
          name: usuario.nombre,
          email: usuario.email,
          role: usuario.rol,
          categoriaDocente: usuario.categoriaDocente || "",
          grado: usuario.grado || "",
          grados: JSON.stringify(usuario.grados || []), // ← String
          centroId: usuario.centroId.toString(),
          materias: JSON.stringify(usuario.materias || []),
        }
      
      } catch (error) {
          console.error("Error:", error)
          return null
        }
      },
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
        token.grados = user.grados // string
        token.centroId = user.centroId
        token.materias = user.materias
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.categoriaDocente = token.categoriaDocente as string
        session.user.grado = token.grado as string
        session.user.grados = token.grados ? JSON.parse(token.grados as string) : [] // ← Parsear de vuelta
        session.user.centroId = token.centroId as string
        session.user.materias = token.materias ? JSON.parse(token.materias as string) : []
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