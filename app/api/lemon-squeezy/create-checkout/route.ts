// app/api/lemon-squeezy/create-checkout/route.ts

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

    if (!variantId) {
      console.error('❌ [Checkout] No se encontró variantId para el plan:', planSlug)
      return NextResponse.json({ error: 'Variant ID no configurado' }, { status: 400 })
    }

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID
    if (!storeId) {
      console.error('❌ [Checkout] Falta la variable LEMON_SQUEEZY_STORE_ID')
      return NextResponse.json({ error: 'Configuración del servidor incompleta' }, { status: 500 })
    }

    // Estructura oficial y estricta para la API de Lemon Squeezy v1 Checkouts
    const payloadLemon = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: session.user.email || '',
            // IMPORTANTE: En la API de creación se envía dentro de "custom"
            // Lemon Squeezy lo transforma y te lo devuelve como "custom_data" en el webhook.
            custom: {
              usuarioId: String(session.user.id),
              plan: String(planSlug),
              email: String(session.user.email || ''),
            },
          },
        },
        relationships: {
          store: {
            data: { type: 'stores', id: String(storeId) },
          },
          variant: {
            data: { type: 'variants', id: String(variantId) },
          },
        },
      },
    }

    console.log('🔄 [Checkout] Enviando datos a Lemon Squeezy...')

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify(payloadLemon),
    })

    const data = await response.json()

    if (!response.ok) {
      // Este log te dirá exactamente qué atributo o relación falló según Lemon Squeezy
      console.error('❌ [Lemon Squeezy API Error]:', JSON.stringify(data, null, 2))
      return NextResponse.json({ error: 'Error devuelto por Lemon Squeezy', details: data }, { status: response.status })
    }

    console.log('✅ [Checkout] URL generada con éxito')
    return NextResponse.json({ url: data.data.attributes.url })
  } catch (error: any) {
    console.error('❌ [Checkout Error Crítico]:', error.message)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}