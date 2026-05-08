const API_KEY = process.env.LEMON_SQUEEZY_API_KEY
const STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID
const BASE_URL = 'https://api.lemonsqueezy.com/v1'

export async function createCheckout(variantId: string, email: string, userId: string) {
  const res = await fetch(`${BASE_URL}/checkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email,
            custom: { user_id: userId },
          },
          product_options: {
            redirect_url: `${process.env.NEXTAUTH_URL}/admin/centros/plan?success=true`,
          },
        },
        relationships: {
          store: { data: { type: 'stores', id: STORE_ID } },
          variant: { data: { type: 'variants', id: variantId } },
        },
      },
    }),
  })
  const data = await res.json()
console.log('🍋 Lemon Squeezy response:', JSON.stringify(data))
return data
}