// app/admin/materias/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Shadcn Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Loader2, Plus, Pencil, Trash2, Search, BookOpen, Filter } from "lucide-react"

// Tipo de materia
interface Materia {
  id: string
  nombre: string
  slug: string
  categoriaDocente: string
  activo: boolean
  createdAt: string
}

const CATEGORIAS = [
  { value: 'idiomas', label: '🌐 Idiomas', color: 'bg-blue-100 text-blue-800' },
  { value: 'materias-basicas', label: '📚 Materias Básicas', color: 'bg-green-100 text-green-800' },
  { value: 'otras-materias', label: '🎨 Otras Materias', color: 'bg-orange-100 text-orange-800' },
]

export default function MateriasPage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [materias, setMaterias] = useState<Materia[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('todas')
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [materiaToDelete, setMateriaToDelete] = useState<Materia | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    nombre: '',
    categoriaDocente: 'idiomas',
  })
  const [submitting, setSubmitting] = useState(false)

  // Cargar materias
  const cargarMaterias = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/materias')
      if (!res.ok) throw new Error('Error al cargar materias')
      const data = await res.json()
      setMaterias(Array.isArray(data) ? data : data.materias || [])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error al cargar las materias')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarMaterias()
  }, [])

  // Filtrar materias
  const materiasFiltradas = materias.filter(materia => {
    const matchesSearch = materia.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategoria = categoriaFilter === 'todas' || materia.categoriaDocente === categoriaFilter
    return matchesSearch && matchesCategoria
  })

  // Crear o actualizar materia
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre.trim()) {
      toast.error('El nombre de la materia es requerido')
      return
    }

    setSubmitting(true)
    try {
      const url = editingMateria ? `/api/materias/${editingMateria.id}` : '/api/materias'
      const method = editingMateria ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Error al guardar')
      }
      
      toast.success(editingMateria ? 'Materia actualizada' : 'Materia creada')
      setDialogOpen(false)
      resetForm()
      cargarMaterias()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar')
    } finally {
      setSubmitting(false)
    }
  }

  // Eliminar materia
  const handleDelete = async () => {
    if (!materiaToDelete) return
    
    setSubmitting(true)
    try {
      const res = await fetch(`/api/materias/${materiaToDelete.id}`, {
        method: 'DELETE',
      })
      
      if (!res.ok) throw new Error('Error al eliminar')
      
      toast.success('Materia eliminada')
      setDeleteDialogOpen(false)
      setMateriaToDelete(null)
      cargarMaterias()
    } catch (error) {
      toast.error('Error al eliminar la materia')
    } finally {
      setSubmitting(false)
    }
  }

  // Resetear formulario
  const resetForm = () => {
    setFormData({ nombre: '', categoriaDocente: 'idiomas' })
    setEditingMateria(null)
  }

  // Abrir diálogo de edición
  const openEditDialog = (materia: Materia) => {
    setEditingMateria(materia)
    setFormData({
      nombre: materia.nombre,
      categoriaDocente: materia.categoriaDocente,
    })
    setDialogOpen(true)
  }

  // Abrir diálogo de creación
  const openCreateDialog = () => {
    resetForm()
    setDialogOpen(true)
  }

  const getCategoriaBadge = (categoria: string) => {
    const cat = CATEGORIAS.find(c => c.value === categoria)
    if (!cat) return <Badge variant="outline">{categoria}</Badge>
    return <Badge className={cat.color}>{cat.label}</Badge>
  }

   // Verificar permisos DESPUÉS de que la sesión cargó
  const userRole = session?.user?.role
  const canManage = ['admin', 'superadmin', 'admin_centro'].includes(userRole || '')

   if (!canManage) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-8 text-center">
          <p className="text-red-600">No tienes permisos para gestionar materias</p>
          <p className="text-sm text-gray-500 mt-2">Rol detectado: {userRole || 'ninguno'}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Gestión de Materias
          </h1>
          <p className="text-muted-foreground mt-1">
            Administra las materias del sistema por categoría
          </p>
        </div>
        <Button onClick={openCreateDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Materia
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar materia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {CATEGORIAS.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de materias */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Materias</CardTitle>
          <CardDescription>
            Total: {materiasFiltradas.length} materias
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : materiasFiltradas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No hay materias registradas
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materiasFiltradas.map((materia) => (
                    <TableRow key={materia.id}>
                      <TableCell className="font-medium">{materia.nombre}</TableCell>
                      <TableCell>{getCategoriaBadge(materia.categoriaDocente)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {materia.slug}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(materia)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setMateriaToDelete(materia)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de creación/edición */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingMateria ? 'Editar Materia' : 'Nueva Materia'}
            </DialogTitle>
            <DialogDescription>
              {editingMateria
                ? 'Modifica los datos de la materia existente'
                : 'Completa los campos para crear una nueva materia'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la materia *</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Matemáticas, Inglés, Ciencias..."
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={formData.categoriaDocente}
                  onValueChange={(value) => setFormData({ ...formData, categoriaDocente: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingMateria ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmación de eliminación */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar materia?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente
              la materia "{materiaToDelete?.nombre}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}