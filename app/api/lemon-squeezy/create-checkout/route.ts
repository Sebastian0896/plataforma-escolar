import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getPlanBySlug } from '@/lib/planes'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { plan: planSlug, ciclo } = await req.json()
    const plan = getPlanBySlug(planSlug)

    if (!plan || plan.slug === 'gratis') {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const variantId = ciclo === 'mensual' ? plan.variantIds.mensual : plan.variantIds.anual

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              custom: {
                usuarioId: session.user.id, // ID exacto de la sesión
                plan: planSlug,
                email: session.user.email,
              },
            },
          },
          relationships: {
            store: { data: { type: 'stores', id: String(process.env.LEMON_SQUEEZY_STORE_ID) } },
            variant: { data: { type: 'variants', id: String(variantId) } },
          },
        },
      }),
    })

    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: 'Error en Lemon Squeezy', details: data }, { status: 500 })

    return NextResponse.json({ url: data.data.attributes.url })
  } catch (error: any) {
    console.error('❌ Checkout Error:', error.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}