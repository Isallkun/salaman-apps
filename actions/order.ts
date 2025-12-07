'use server'

import { supabase } from '@/lib/supabase'
import { createMidtransTransaction } from '@/lib/midtrans'
import { CartItem, Order, OrderStatus } from '@/types'

interface CreateOrderResult {
  success: boolean
  error?: string
  orderId?: string
  snapToken?: string
}

export async function createOrder(items: CartItem[]): Promise<CreateOrderResult> {
  try {
    if (items.length === 0) {
      return { success: false, error: 'Keranjang kosong' }
    }

    // Get current user (for now, use a demo buyer)
    const { data: { user: authUser } } = await supabase.auth.getUser()
    
    // For demo purposes, if no user logged in, create a guest order
    const buyerId = authUser?.id || '00000000-0000-0000-0000-000000000099'
    const buyerEmail = authUser?.email || 'guest@demo.com'
    const buyerName = 'Guest User'

    // Group items by supplier
    const itemsBySupplier = items.reduce((acc, item) => {
      if (!acc[item.supplierId]) {
        acc[item.supplierId] = []
      }
      acc[item.supplierId].push(item)
      return acc
    }, {} as Record<string, CartItem[]>)

    // For simplicity, we'll create one order per supplier
    // In this demo, we'll just use the first supplier
    const supplierId = Object.keys(itemsBySupplier)[0]
    const supplierItems = itemsBySupplier[supplierId]

    const totalAmount = supplierItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    )

    // Generate unique Midtrans order ID (for payment reference)
    const midtransOrderId = `SAL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order in database (let Supabase generate UUID)
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        buyer_id: buyerId,
        supplier_id: supplierId,
        status: 'PENDING' as OrderStatus,
        total_amount: totalAmount,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Create order error:', orderError)
      return { success: false, error: 'Gagal membuat pesanan' }
    }

    const orderId = orderData.id

    // Create order items
    const orderItems = supplierItems.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.productName,
      product_category: item.productCategory,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      subtotal: item.unitPrice * item.quantity,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Create order items error:', itemsError)
      // Rollback order
      await supabase.from('orders').delete().eq('id', orderId)
      return { success: false, error: 'Gagal menyimpan item pesanan' }
    }

    // Create transaction record
    const { error: txError } = await supabase
      .from('transactions')
      .insert({
        order_id: orderId,
        status: 'PENDING',
        amount: totalAmount,
        midtrans_order_id: midtransOrderId,
      })

    if (txError) {
      console.error('Create transaction error:', txError)
    }

    // Create Midtrans transaction
    const midtransResult = await createMidtransTransaction({
      orderId: midtransOrderId,
      amount: totalAmount,
      customerEmail: buyerEmail,
      customerName: buyerName,
      items: supplierItems.map((item) => ({
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
      })),
    })

    if (!midtransResult) {
      return { success: false, error: 'Gagal membuat transaksi pembayaran' }
    }

    return {
      success: true,
      orderId,
      snapToken: midtransResult.token,
    }
  } catch (error) {
    console.error('Create order error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        transactions (*)
      `)
      .eq('id', orderId)
      .single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      buyerId: data.buyer_id,
      supplierId: data.supplier_id,
      status: data.status as OrderStatus,
      totalAmount: Number(data.total_amount),
      trackingNumber: data.tracking_number,
      notes: data.notes,
      items: (data.order_items || []).map((item: Record<string, unknown>) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        productCategory: item.product_category,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price),
        subtotal: Number(item.subtotal),
      })),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    }
  } catch (error) {
    console.error('Get order error:', error)
    return null
  }
}

export async function getBuyerOrders(buyerId: string): Promise<Order[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('buyer_id', buyerId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get buyer orders error:', error)
      return []
    }

    return (data || []).map((order) => ({
      id: order.id,
      buyerId: order.buyer_id,
      supplierId: order.supplier_id,
      status: order.status as OrderStatus,
      totalAmount: Number(order.total_amount),
      trackingNumber: order.tracking_number,
      notes: order.notes,
      items: (order.order_items || []).map((item: Record<string, unknown>) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        productCategory: item.product_category,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price),
        subtotal: Number(item.subtotal),
      })),
      createdAt: new Date(order.created_at),
      updatedAt: new Date(order.updated_at),
    }))
  } catch (error) {
    console.error('Get buyer orders error:', error)
    return []
  }
}


// Demo function to simulate payment success (bypass webhook)
export async function simulatePaymentSuccess(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Update order status to PAID
    const { error: orderError } = await supabase
      .from('orders')
      .update({ status: 'PAID' })
      .eq('id', orderId)

    if (orderError) {
      console.error('Update order error:', orderError)
      return { success: false, error: 'Gagal update status order' }
    }

    // Update transaction status to HELD (escrow)
    const { error: txError } = await supabase
      .from('transactions')
      .update({ status: 'HELD', payment_status: 'settlement' })
      .eq('order_id', orderId)

    if (txError) {
      console.error('Update transaction error:', txError)
    }

    return { success: true }
  } catch (error) {
    console.error('Simulate payment error:', error)
    return { success: false, error: 'Terjadi kesalahan' }
  }
}

// Demo function to simulate shipping (supplier ships the order)
export async function simulateShipping(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ 
        status: 'SHIPPED',
        tracking_number: `JNE${Date.now().toString().slice(-10)}`
      })
      .eq('id', orderId)

    if (error) {
      console.error('Update shipping error:', error)
      return { success: false, error: 'Gagal update status pengiriman' }
    }

    return { success: true }
  } catch (error) {
    console.error('Simulate shipping error:', error)
    return { success: false, error: 'Terjadi kesalahan' }
  }
}
