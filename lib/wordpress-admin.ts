// lib/wordpress-admin.ts
//import { auth } from '@/auth'

const WP_API = process.env.WORDPRESS_API_URL || 'http://localhost/plataforma-escolar/wp-json'

// Obtener credenciales para autenticar
async function getAuthHeaders() {
  // Como esto se ejecuta en el servidor, no tenemos la sesión del cliente
  // Usamos Application Password desde variables de entorno
  const wpUser = process.env.WP_ADMIN_USER || ''
  const wpPass = process.env.WP_ADMIN_PASS || ''
  
  const token = Buffer.from(`${wpUser}:${wpPass}`).toString('base64')
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`,
  }
}

// Crear planificación
export async function crearPlanificacion(data: any) {
  const headers = await getAuthHeaders()
  
  const res = await fetch(`${WP_API}/wp/v2/planificaciones`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al crear')
  }

  return res.json()
}

// Actualizar planificación
export async function actualizarPlanificacion(id: number, data: any) {
  const headers = await getAuthHeaders()
  
  const res = await fetch(`${WP_API}/wp/v2/planificaciones/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al actualizar')
  }

  return res.json()
}

// Eliminar planificación
export async function eliminarPlanificacion(id: number) {
  const headers = await getAuthHeaders()
  
  const res = await fetch(`${WP_API}/wp/v2/planificaciones/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Error al eliminar')
  }

  return res.json()
}

// Obtener una planificación por ID
export async function getPlanificacionPorId(id: number) {
  const res = await fetch(`${WP_API}/wp/v2/planificaciones/${id}`, {
    next: { revalidate: 0 },
  })
  
  if (!res.ok) return null
  
  return res.json()
}