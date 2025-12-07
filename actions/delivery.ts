'use server'

import { supabase, uploadImage, STORAGE_BUCKETS } from '@/lib/supabase'
import { verifyProductMock } from '@/lib/colossal'

interface UploadResult {
  success: boolean
  error?: string
  imageUrl?: string
}

interface VerificationResult {
  success: boolean
  error?: string
  isValid?: boolean
  confidence?: number
  detectedObjects?: Array<{ label: string; confidence: number }>
}

export async function uploadDeliveryProof(
  orderId: string,
  formData: FormData
): Promise<UploadResult> {
  try {
    const file = formData.get('file') as File

    if (!file) {
      return { success: false, error: 'File tidak ditemukan' }
    }

    // Validate file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.' }
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { success: false, error: 'Ukuran file terlalu besar. Maksimal 5MB.' }
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()
    const filename = `${orderId}/${Date.now()}.${ext}`

    // Upload to Supabase Storage
    const { url, error } = await uploadImage(
      STORAGE_BUCKETS.DELIVERY_PROOFS,
      filename,
      file
    )

    if (error || !url) {
      return { success: false, error: error || 'Gagal mengupload file' }
    }

    // Update transaction with delivery proof URL
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        delivery_proof_url: url,
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId)

    if (updateError) {
      console.error('Update transaction error:', updateError)
    }

    return { success: true, imageUrl: url }
  } catch (error) {
    console.error('Upload delivery proof error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}

export async function verifyDelivery(
  orderId: string,
  imageUrl: string
): Promise<VerificationResult> {
  try {
    // Get order to find expected category
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (product_category)
      `)
      .eq('id', orderId)
      .single()

    if (orderError || !orderData) {
      return { success: false, error: 'Pesanan tidak ditemukan' }
    }

    // Get the primary category from order items
    const categories = orderData.order_items?.map((item: { product_category: string }) => item.product_category) || []
    const expectedCategory = categories[0] || 'general'

    // Call AI verification (using mock for demo)
    const result = await verifyProductMock(imageUrl, expectedCategory)

    // Update transaction with AI result
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        ai_verification_result: result,
        ai_verification_status: result.isValid ? 'VALID' : 'INVALID',
        status: result.isValid ? 'RELEASED' : 'DISPUTED',
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId)

    if (updateError) {
      console.error('Update transaction error:', updateError)
    }

    // Update order status
    const newOrderStatus = result.isValid ? 'COMPLETED' : 'DELIVERED'
    await supabase
      .from('orders')
      .update({
        status: newOrderStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    // If invalid, create dispute
    if (!result.isValid) {
      const { data: txData } = await supabase
        .from('transactions')
        .select('id')
        .eq('order_id', orderId)
        .single()

      if (txData) {
        await supabase.from('disputes').insert({
          transaction_id: txData.id,
          reason: 'AI verification failed - product does not match expected category',
          status: 'OPEN',
        })
      }
    }

    return {
      success: true,
      isValid: result.isValid,
      confidence: result.confidence,
      detectedObjects: result.detectedObjects,
    }
  } catch (error) {
    console.error('Verify delivery error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}
