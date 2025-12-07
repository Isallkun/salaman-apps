import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { verifyMidtransSignature } from '@/lib/midtrans'

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()

    console.log('Midtrans notification received:', notification)

    const {
      order_id: orderId,
      transaction_status: transactionStatus,
      fraud_status: fraudStatus,
      status_code: statusCode,
      gross_amount: grossAmount,
      signature_key: signatureKey,
      transaction_id: transactionId,
      payment_type: paymentType,
    } = notification

    // Verify signature
    const isValid = verifyMidtransSignature(
      orderId,
      statusCode,
      grossAmount,
      signatureKey
    )

    if (!isValid) {
      console.error('Invalid Midtrans signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Determine transaction status
    let newStatus: string
    let orderStatus: string

    if (transactionStatus === 'capture' || transactionStatus === 'settlement') {
      if (fraudStatus === 'accept' || !fraudStatus) {
        newStatus = 'HELD' // Payment successful, funds held in escrow
        orderStatus = 'PAID'
      } else {
        newStatus = 'PENDING'
        orderStatus = 'PENDING'
      }
    } else if (transactionStatus === 'pending') {
      newStatus = 'PENDING'
      orderStatus = 'PENDING'
    } else if (
      transactionStatus === 'deny' ||
      transactionStatus === 'cancel' ||
      transactionStatus === 'expire'
    ) {
      newStatus = 'PENDING' // Keep as pending, payment failed
      orderStatus = 'CANCELLED'
    } else if (transactionStatus === 'refund') {
      newStatus = 'REFUNDED'
      orderStatus = 'CANCELLED'
    } else {
      newStatus = 'PENDING'
      orderStatus = 'PENDING'
    }

    // Update transaction record
    const { error: txError } = await supabase
      .from('transactions')
      .update({
        status: newStatus,
        midtrans_transaction_id: transactionId,
        payment_type: paymentType,
        payment_status: transactionStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('midtrans_order_id', orderId)

    if (txError) {
      console.error('Update transaction error:', txError)
    }

    // Update order status
    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: orderStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    if (orderError) {
      console.error('Update order error:', orderError)
    }

    console.log(`Order ${orderId} updated: transaction=${newStatus}, order=${orderStatus}`)

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
