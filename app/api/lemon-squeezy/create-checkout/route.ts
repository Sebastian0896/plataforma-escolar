// app/api/lemon-squeezy/create-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getPlanBySlug } from '@/lib/planes'

export async function POST(req: NextRequest) {
  console.log('🔵 Endpoint llamado')
  
  const session = await auth()
  console.log('🔵 Session:', session?.user?.role, session?.user?.id)
  
  if (!session) {
    console.log('❌ No session')
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  // Temporal: permitir todos los roles para pruebas
  console.log('🔵 Rol:', session.user.role)
  
  // Aceptar cualquier rol por ahora para probar
  // if (session.user.role !== 'docente') {
  //   return NextResponse.json({ error: 'Solo docentes' }, { status: 401 })
  // }

  try {
    const { plan: planSlug, ciclo } = await req.json()
    console.log('🔵 Plan:', planSlug, 'Ciclo:', ciclo)

    const plan = getPlanBySlug(planSlug)
    if (!plan || plan.slug === 'gratis') {
      return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
    }

    const variantId = ciclo === 'mensual' ? plan.variantIds.mensual : plan.variantIds.anual
    
    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID no configurado' }, { status: 500 })
    }

    // Verificar API key de Lemon Squeezy
    if (!process.env.LEMON_SQUEEZY_API_KEY) {
      console.log('❌ Falta LEMON_SQUEEZY_API_KEY')
      return NextResponse.json({ error: 'Configuración de pago incompleta' }, { status: 500 })
    }

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              custom: {
                user_id: session.user.id,
                user_email: session.user.email,
                plan: planSlug,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: process.env.LEMON_SQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: variantId,
              },
            },
          },
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Lemon Squeezy error:', data)
      return NextResponse.json({ error: 'Error al crear el checkout' }, { status: 500 })
    }

    console.log('✅ Checkout creado:', data.data.attributes.url)
    return NextResponse.json({ url: data.data.attributes.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}