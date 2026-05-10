'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, User, Lock, CheckCircle2, AlertCircle } from "lucide-react"

export default function MiCuentaPage() {
  const { data: session } = useSession()
  const [nombre, setNombre] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')
  const [passwordActual, setPasswordActual] = useState('')
  const [passwordNueva, setPasswordNueva] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent, type: 'perfil' | 'seguridad') => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMensaje('')

    try {
      const res = await fetch('/api/cuenta', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: type === 'perfil' ? nombre : undefined,
          email: type === 'perfil' ? email : undefined,
          passwordActual: type === 'seguridad' ? passwordActual : undefined,
          passwordNueva: type === 'seguridad' ? passwordNueva : undefined,
        }),
      })

      const data = await res.json()
      
      if (res.ok) {
        setMensaje('Cambios guardados correctamente')
        setPasswordActual('')
        setPasswordNueva('')
        // Opcional: recargar página si cambia el nombre para actualizar la sesión
        // if (type === 'perfil') window.location.reload()
      } else {
        setError(data.error || 'Error al guardar los cambios')
      }
    } catch (err) {
      setError('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Banner de Perfil */}
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-blue-600 to-indigo-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-white">
            <Avatar className="w-24 h-24 border-4 border-white/20 shadow-xl">
              <AvatarFallback className="bg-white text-blue-700 text-3xl font-bold">
                {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-bold">{session?.user?.name}</h1>
              <p className="opacity-90 font-medium">{session?.user?.email}</p>
              <Badge variant="secondary" className="mt-2 bg-white/20 hover:bg-white/30 border-none text-white capitalize">
                {session?.user?.role?.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="perfil" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="perfil" className="gap-2">
            <User className="h-4 w-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="seguridad" className="gap-2">
            <Lock className="h-4 w-4" /> Seguridad
          </TabsTrigger>
        </TabsList>

        {/* Feedback Messages */}
        <div className="mb-6">
          {mensaje && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 dark:text-green-400">{mensaje}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu nombre y dirección de correo electrónico.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'perfil')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input 
                    id="nombre" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Guardar Perfil
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Cambia tu contraseña para mantener tu cuenta protegida.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, 'seguridad')} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passActual">Contraseña actual</Label>
                  <Input 
                    id="passActual" 
                    type="password" 
                    value={passwordActual} 
                    onChange={(e) => setPasswordActual(e.target.value)} 
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passNueva">Nueva contraseña</Label>
                  <Input 
                    id="passNueva" 
                    type="password" 
                    value={passwordNueva} 
                    onChange={(e) => setPasswordNueva(e.target.value)} 
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full md:w-auto" variant="default">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                  Actualizar Contraseña
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}