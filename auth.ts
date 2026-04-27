// auth.ts (en la raíz del proyecto)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const WP_API = process.env.WORDPRESS_API_URL || 'http://localhost/wordpress/wp-json'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "WordPress",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        try {
          // Autenticar contra WordPress usando Basic Auth
          const token = Buffer.from(
            `${credentials.username}:${credentials.password}`
          ).toString("base64")

          const res = await fetch(`${WP_API}/wp/v2/users/me`, {
            headers: {
              Authorization: `Basic ${token}`,
            },
          })

          if (!res.ok) return null

          const user = await res.json()

          return {
            id: String(user.id),
            name: user.name,
            email: user.email || `${user.slug}@wordpress.local`,
            image: user.avatar_urls?.["96"] || null,
            role: user.roles?.includes("administrator") ? "admin" : "profesor",
          }
        } catch (error) {
          console.error("Error autenticando:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
})