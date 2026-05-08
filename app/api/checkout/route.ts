import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createCheckout } from '@/lib/lemonsqueezy'

export async function POST(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { variantId } = await request.json()

  try{
    
      const checkout = await createCheckout(
        variantId,
        session.user?.email || '',
        session.user?.id || ''
      )
      const checkoutUrl = checkout?.data?.attributes?.url
    
      if (!checkoutUrl) {
         
         return NextResponse.json({ error: 'Error al crear checkout' }, { status: 500 })
      }
    
      return NextResponse.json({ url: checkoutUrl })
  }catch(error){
    console.error('❌ Error checkout:', error)
  }
}

  
