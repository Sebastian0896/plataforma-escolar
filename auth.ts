/* // auth.ts (raíz del proyecto) com mongodb usando mongoose
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import Usuario from "@/lib/models/Usuario"
import Centro from "./lib/models/Centro"
import { rateLimit } from "./lib/rate-limit"
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
        //console.log("Credenciales:", credentials)
        //const centro = await Centro.findById(usuario.centroId).lean()
        if (!credentials?.email || !credentials?.password) {
          console.log("Faltan credenciales")
          return null
        }
        //console.log('⏱️ Rate limit check para:', credentials.email)
        const permitido = rateLimit(`login-${credentials?.email}`, 5, 60000)
        //console.log('⏱️ Permitido:', permitido)
        if (!permitido) {
          return null
        }

    
        try {
          await connectDB()

          const usuario = await Usuario.findOne({ email: credentials.email, activo: true })
          //console.log("Usuario:", usuario)
          //const centro = await Centro.findById(usuario.centroId).lean()

          if (!usuario) {
            console.log("Usuario no encontrado")
            return null
          }

          const ok = await bcrypt.compare(credentials.password, usuario.password)
          console.log("Password válida:", ok)

          if (!ok) return null

          let centroNombre
          if (usuario.centroId) {
            const centro = await Centro.findById(usuario.centroId).lean()
            centroNombre = centro?.nombre || ''
            console.log("Imprimiendo centro nombre: ", centroNombre)
          }

          console.log('👤 usuario.centroId:', usuario.centroId)

          let centroTipo = ''
          if (usuario.centroId) {
            const centro = await Centro.findById(usuario.centroId).lean()
            centroNombre = centro?.nombre || ''
            centroTipo = centro?.tipo || '' // ← guardar el tipo
          }

          console.log('🏫 centroNombre obtenido:', centroNombre)
          return {
            id: usuario._id.toString(),
            name: usuario.nombre,
            email: usuario.email,
            role: usuario.rol,
            categoriaDocente: usuario.categoriaDocente || "",
            niveles: JSON.stringify(usuario.niveles || []),
            ciclos: JSON.stringify(usuario.ciclos || []),
            grado: usuario.grado || "",
            grados: JSON.stringify(usuario.grados || []),
            materias: JSON.stringify(usuario.materias || []),
            centroId: usuario.centroId?.toString() || "",
            centroNombre,
            centroTipo,
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
        token.id = user.id
        token.role = user.role
        token.categoriaDocente = user.categoriaDocente
        token.niveles = user.niveles
        token.ciclos = user.ciclos
        token.grado = user.grado
        token.grados = user.grados
        token.materias = user.materias
        token.centroId = user.centroId
        token.centroNombre = user.centroNombre
        token.centroTipo = user.centroTipo
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string ||  token.sub as string
        session.user.role = token.role as string
        session.user.categoriaDocente = token.categoriaDocente as string
        session.user.niveles = token.niveles ? JSON.parse(token.niveles as string) : []
        session.user.ciclos = token.ciclos ? JSON.parse(token.niveles as string) : []
        session.user.grado = token.grado as string
        session.user.grados = token.grados ? JSON.parse(token.grados as string) : []
        session.user.materias = token.materias ? JSON.parse(token.materias as string) : []
        session.user.centroId = token.centroId as string
        session.user.centroNombre = token.centroNombre as string
        session.user.centroTipo = token.centroTipo as string
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
    maxAge: 4 * 60 * 60 // 4 horas 
  },
}) */

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
    /* async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/` || url === `${baseUrl}/dashboard`) {
        return `${baseUrl}/dashboard`
      }
      return url
    }, */
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
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Después de login exitoso, siempre ir a /dashboard
      // Luego el proxy se encargará de redirigir según rol
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