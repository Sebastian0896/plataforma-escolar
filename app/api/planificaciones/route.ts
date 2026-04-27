// app/api/planificaciones/route.ts

import { NextResponse } from 'next/server'
import { auth } from '@/auth'

const WP_API = process.env.WORDPRESS_API_URL || 'http://localhost/wordpress/wp-json'
const WP_USER = process.env.WP_ADMIN_USER || ''
const WP_PASS = process.env.WP_ADMIN_PASS || ''

function getAuthHeaders() {
  const token = Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${token}`,
  }
}

async function getTermId(taxonomy: string, slug: string): Promise<number | null> {
  if (!slug) return null
  const res = await fetch(`${WP_API}/wp/v2/${taxonomy}?slug=${slug}`)
  const terms = await res.json()
  return Array.isArray(terms) && terms.length > 0 ? terms[0].id : null
}

async function asignarTaxonomias(postId: number, taxSlugs: Record<string, string>) {
  const taxIds: Record<string, number[]> = {}

  for (const [tax, slug] of Object.entries(taxSlugs)) {
    console.log(`🔍 Buscando ${tax} con slug "${slug}"`)
    const id = await getTermId(tax, slug)
    console.log(`   Resultado: ${id}`)
    if (id) {
      taxIds[tax] = [id]
    }
  }

  console.log('📦 taxIds a enviar:', JSON.stringify(taxIds))

  if (Object.keys(taxIds).length > 0) {
    const putBody = JSON.stringify(taxIds)
    console.log('📤 PUT body:', putBody)

    const putRes = await fetch(`${WP_API}/wp/v2/planificaciones/${postId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: putBody,
    })

    console.log('📥 PUT status:', putRes.status)
    const putData = await putRes.json()
    console.log('📥 PUT response:', JSON.stringify(putData).substring(0, 300))
  } else {
    console.log('⚠️ No hay taxIds para enviar')
  }
}

function generarSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tema = searchParams.get('tema')

  if (!tema) {
    return NextResponse.json({ error: 'Falta parámetro tema' }, { status: 400 })
  }

  const res = await fetch(
    `${WP_API}/wp/v2/planificaciones?slug=${tema}&_embed&per_page=50`
  )
  const posts = await res.json()

  if (!Array.isArray(posts) || posts.length === 0) {
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  }

  return NextResponse.json(posts[0])
}

// POST
export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()

    const res = await fetch(`${WP_API}/wp/v2/planificaciones`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        title: data.title,
        slug: generarSlug(data.title),
        status: 'publish',
        acf: data.acf,
      }),
    })

    const post = await res.json()

    if (!res.ok || !post.id) {
      return NextResponse.json(
        { error: post.message || 'Error al crear' },
        { status: 500 }
      )
    }

    await asignarTaxonomias(post.id, {
      materia: data.materia,
      niveles: data.nivel,
      ciclos: data.ciclo,
      grados: data.grado,
      'categorias-docentes': data.categoriaDocente,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error del servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT
export async function PUT(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  try {
    const data = await request.json()

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

    await asignarTaxonomias(data.id, {
      materia: data.materia,
      niveles: data.nivel,
      ciclos: data.ciclo,
      grados: data.grado,
      'categorias-docentes': data.categoriaDocente,
    })

    return NextResponse.json(post)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error del servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error del servidor'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}