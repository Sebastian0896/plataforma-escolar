// app/api/planificaciones/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

const WP_API = process.env.WORDPRESS_API_URL || 'http://localhost/plataforma-escolar/wp-json'
const WP_USER = process.env.WP_ADMIN_USER || ''
const WP_PASS = process.env.WP_ADMIN_PASS || ''

function getAuthHeaders() {
  const token = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`,
  }
}

// GET: Obtener una planificación
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const materia = searchParams.get('materia')
  const tema = searchParams.get('tema')

  if (!materia || !tema) {
    return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  // Buscar materia
  const termRes = await fetch(`${WP_API}/wp/v2/materias?slug=${materia}`)
  const terms = await termRes.json()
  if (terms.length === 0) {
    return NextResponse.json({ error: 'Materia no encontrada' }, { status: 404 })
  }

  const materiaId = terms[0].id

  // Buscar planificación
  const res = await fetch(
    `${WP_API}/wp/v2/planificaciones?materias=${materiaId}&slug=${tema}`
  )
  const posts = await res.json()

  if (posts.length === 0) {
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  }

  return NextResponse.json(posts[0])
}

// POST: Crear
export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()
    
    const materiaRes = await fetch(`${WP_API}/wp/v2/materias?slug=${data.materia}`)
    const materias = await materiaRes.json()
    if (materias.length === 0) {
      return NextResponse.json({ error: 'Materia no encontrada' }, { status: 400 })
    }
    const materiaId = materias[0].id

    const slug = data.title
      .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const res = await fetch(`${WP_API}/wp/v2/planificaciones`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        slug,
        status: 'publish',
        acf: data.acf,
      }),
    })

    const post = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: post.message }, { status: res.status })
    }

    // Asignar materia
    await fetch(`${WP_API}/wp/v2/planificaciones/${post.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ materias: [materiaId] }),
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT: Actualizar
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()
    
    // Actualizar post
    const res = await fetch(`${WP_API}/wp/v2/planificaciones/${data.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        acf: data.acf,
      }),
    })

    const post = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: post.message }, { status: res.status })
    }

    // Si cambió la materia
    if (data.materia) {
      const materiaRes = await fetch(`${WP_API}/wp/v2/materias?slug=${data.materia}`)
      const materias = await materiaRes.json()
      if (materias.length > 0) {
        await fetch(`${WP_API}/wp/v2/planificaciones/${data.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ materias: [materias[0].id] }),
        })
      }
    }

    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE: Eliminar
export async function DELETE(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

  try {
    const res = await fetch(`${WP_API}/wp/v2/planificaciones/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message }, { status: res.status })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}