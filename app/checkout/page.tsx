'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Shield, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react'

import { CartItem } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createOrder } from '@/actions/order'

interface CartItemWithImage extends CartItem {
  imageUrl?: string
  unit?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItemWithImage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [snapReady, setSnapReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed.length === 0) {
          router.push('/cart')
          return
        }
        setItems(parsed)
      } catch {
        router.push('/cart')
      }
    } else {
      router.push('/cart')
    }
    setIsLoaded(true)
  }, [router])

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  )

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)

    // Check if Snap is loaded
    // @ts-expect-error - Midtrans snap is loaded via script
    if (!window.snap) {
      setError('Payment gateway belum siap. Tunggu sebentar dan coba lagi.')
      setIsProcessing(false)
      return
    }

    try {
      // Create order and get Midtrans token
      const result = await createOrder(items)

      if (!result.success || !result.snapToken) {
        setError(result.error || 'Gagal membuat pesanan')
        setIsProcessing(false)
        return
      }

      // Open Midtrans Snap popup
      // @ts-expect-error - Midtrans snap is loaded via script
      window.snap.pay(result.snapToken, {
        onSuccess: function() {
          // Clear cart and redirect to success page
          localStorage.removeItem('cart')
          router.push(`/orders/${result.orderId}?status=success`)
        },
        onPending: function() {
          router.push(`/orders/${result.orderId}?status=pending`)
        },
        onError: function() {
          setError('Pembayaran gagal. Silakan coba lagi.')
          setIsProcessing(false)
        },
        onClose: function() {
          setIsProcessing(false)
        }
      })
    } catch (err) {
      console.error('Payment error:', err)
      setError('Terjadi kesalahan. Silakan coba lagi.')
      setIsProcessing(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Midtrans Snap Script */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
        onLoad={() => setSnapReady(true)}
      />

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SALAMAN</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Escrow Info */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 p-3 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-1">
                    Pembayaran Aman dengan Escrow
                  </h3>
                  <p className="text-sm text-emerald-700">
                    Uang Anda akan ditahan di rekening bersama SALAMAN sampai barang 
                    diterima dan diverifikasi. Supplier baru menerima pembayaran setelah 
                    Anda konfirmasi barang sesuai.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {formatCurrency(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Biaya Layanan Escrow</span>
                  <span className="text-emerald-600">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total Pembayaran</span>
                  <span className="text-emerald-600">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-emerald-500 hover:bg-emerald-600 h-14 text-lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 mr-2" />
                Bayar Sekarang - {formatCurrency(totalAmount)}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan SALAMAN
          </p>
        </div>
      </main>
    </div>
  )
}
