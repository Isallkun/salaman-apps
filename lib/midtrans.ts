import crypto from 'crypto'

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!
const MIDTRANS_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1'

interface MidtransTransactionParams {
  orderId: string
  amount: number
  customerEmail: string
  customerName: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
}

export async function createMidtransTransaction(
  params: MidtransTransactionParams
): Promise<{ token: string; redirectUrl: string } | null> {
  try {
    const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')

    const response = await fetch(`${MIDTRANS_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: params.orderId,
          gross_amount: params.amount,
        },
        customer_details: {
          email: params.customerEmail,
          first_name: params.customerName,
        },
        item_details: params.items.map(item => ({
          id: item.id,
          name: item.name.substring(0, 50), // Midtrans limit
          price: item.price,
          quantity: item.quantity,
        })),
        callbacks: {
          finish: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/orders`,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Midtrans error:', error)
      return null
    }

    const data = await response.json()
    return {
      token: data.token,
      redirectUrl: data.redirect_url,
    }
  } catch (error) {
    console.error('Create Midtrans transaction error:', error)
    return null
  }
}

export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const payload = orderId + statusCode + grossAmount + MIDTRANS_SERVER_KEY
  const expectedSignature = crypto
    .createHash('sha512')
    .update(payload)
    .digest('hex')
  
  return signatureKey === expectedSignature
}

export async function getMidtransTransactionStatus(orderId: string) {
  try {
    const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')

    const response = await fetch(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
        },
      }
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error('Get Midtrans status error:', error)
    return null
  }
}
