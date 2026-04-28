import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Usuario from "@/lib/models/Usuario"

export const { handlers, signIn, signOut, auth } = NextAuth({
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

          if (!usuario) {
            console.log('❌ Usuario no encontrado:', credentials.email)
            return null
          }

          const passwordValida = await bcrypt.compare(
            credentials.password,
            usuario.password
          )

          if (!passwordValida) {
            console.log('❌ Contraseña inválida')
            return null
          }

          console.log('✅ Login exitoso:', usuario.nombre)

          return {
            id: usuario._id.toString(),
            name: usuario.nombre,
            email: usuario.email,
            role: usuario.rol,
            categoriaDocente: usuario.categoriaDocente || "",
            grado: usuario.grado || "",
            centroId: usuario.centroId.toString(),
          }
        } catch (error) {
          console.error("❌ Error autenticando:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.categoriaDocente = user.categoriaDocente
        token.grado = user.grado
        token.centroId = user.centroId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.categoriaDocente = token.categoriaDocente as string
        session.user.grado = token.grado as string
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