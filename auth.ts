// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
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
        if (!credentials?.email || !credentials?.password) return null

        try {
          const usuario = await prisma.usuario.findUnique({
            where: { email: credentials.email, activo: true },
          })

          if (!usuario) return null

          const ok = await bcrypt.compare(credentials.password, usuario.password)
          if (!ok) return null

          // Obtener nombre del centro si tiene
          let centroNombre = ''
          if (usuario.centroId) {
            const centro = await prisma.centro.findUnique({ where: { id: usuario.centroId } })
            centroNombre = centro?.nombre || ''
          }

          return {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
            role: usuario.rol,
            categoriaDocente: usuario.categoriaDocente || "",
            grado: usuario.grado || "",
            grados: usuario.grados || [],
            materias: usuario.materias || [],
            niveles: usuario.niveles || [],
            ciclos: usuario.ciclos || [],
            centroId: usuario.centroId || "",
            centroNombre,
          }
        } catch (error) {
          console.error("Error login:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.categoriaDocente = user.categoriaDocente
        token.grado = user.grado
        token.grados = user.grados
        token.materias = user.materias
        token.niveles = user.niveles
        token.ciclos = user.ciclos
        token.centroId = user.centroId
        token.centroNombre = user.centroNombre
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.categoriaDocente = token.categoriaDocente as string
        session.user.grado = token.grado as string
        session.user.grados = token.grados as string[]
        session.user.materias = token.materias as string[]
        session.user.niveles = token.niveles as string[]
        session.user.ciclos = token.ciclos as string[]
        session.user.centroId = token.centroId as string
        session.user.centroNombre = token.centroNombre as string
        
        // 🔥 CONSULTAR PLAN ACTUAL EN TIEMPO REAL
        const suscripcion =
          await prisma.suscripcion.findFirst({
            where: {
              usuarioId: token.id as string,
              estado: 'active',
              OR: [
                { fechaFin: null },
                {
                  fechaFin: {
                    gt: new Date(),
                  },
                },
              ],
            },
            orderBy: {
              fechaInicio: 'desc',
            },
          })

        session.user.plan =
          suscripcion?.plan || 'gratis'
      }
      
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/dashboard`
      }
      return url
    },

  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60,
  },
})