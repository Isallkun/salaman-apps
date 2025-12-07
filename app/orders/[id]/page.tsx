'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Truck, 
  Camera, 
  Loader2,
  Package,
  ShieldCheck
} from 'lucide-react'

import { Order } from '@/types'
import { getOrderById, simulatePaymentSuccess, simulateShipping } from '@/actions/order'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DeliveryProofUpload from '@/components/order/DeliveryProofUpload'

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  PAID: { label: 'Dibayar', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  SHIPPED: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800', icon: Truck },
  DELIVERED: { label: 'Sampai', color: 'bg-emerald-100 text-emerald-800', icon: Package },
  COMPLETED: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: ShieldCheck },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: Clock },
}

export default function OrderDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSimulating, setIsSimulating] = useState(false)

  const paymentStatus = searchParams.get('status')

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    if (!params.id) return
    setIsLoading(true)
    const data = await getOrderById(params.id as string)
    setOrder(data)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Pesanan tidak ditemukan</p>
        <Link href="/marketplace">
          <Button>Kembali ke Marketplace</Button>
        </Link>
      </div>
    )
  }

  const status = statusConfig[order.status] || statusConfig.PENDING
  const StatusIcon = status.icon

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* Success Message */}
        {paymentStatus === 'success' && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800">Pembayaran Berhasil!</h3>
                <p className="text-sm text-emerald-700">
                  Dana Anda sudah aman di rekening escrow SALAMAN. Supplier akan segera memproses pesanan.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Order Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Detail Pesanan</h1>
            <p className="text-gray-500">#{order.id}</p>
          </div>
          <Badge className={status.color}>
            <StatusIcon className="w-4 h-4 mr-1" />
            {status.label}
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Item Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-emerald-600">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Pesanan</span>
                <span className="font-medium">{formatDateTime(order.createdAt)}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Resi</span>
                  <span className="font-medium">{order.trackingNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Proof Upload - Show when order is SHIPPED or DELIVERED */}
          {(order.status === 'SHIPPED' || order.status === 'DELIVERED') && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Upload Bukti Penerimaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryProofUpload orderId={order.id} onSuccess={loadOrder} />
              </CardContent>
            </Card>
          )}

          {/* Escrow Status */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 p-3 rounded-full">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-1">
                    Status Escrow
                  </h3>
                  <p className="text-sm text-emerald-700">
                    {order.status === 'PENDING' && 'Menunggu pembayaran dari pembeli.'}
                    {order.status === 'PAID' && 'Dana sudah diterima dan ditahan di escrow. Menunggu pengiriman dari supplier.'}
                    {order.status === 'SHIPPED' && 'Barang sedang dalam pengiriman. Upload foto saat barang sampai untuk verifikasi.'}
                    {order.status === 'DELIVERED' && 'Barang sudah sampai. Silakan upload foto untuk verifikasi AI.'}
                    {order.status === 'COMPLETED' && 'Transaksi selesai. Dana sudah dicairkan ke supplier.'}
                    {order.status === 'CANCELLED' && 'Pesanan dibatalkan.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Simulation Buttons */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800 text-sm">🎯 Demo Simulasi (Untuk Presentasi)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.status === 'PENDING' && (
                <Button
                  onClick={async () => {
                    setIsSimulating(true)
                    await simulatePaymentSuccess(order.id)
                    await loadOrder()
                    setIsSimulating(false)
                  }}
                  disabled={isSimulating}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Simulasi: Pembayaran Berhasil
                </Button>
              )}
              {order.status === 'PAID' && (
                <Button
                  onClick={async () => {
                    setIsSimulating(true)
                    await simulateShipping(order.id)
                    await loadOrder()
                    setIsSimulating(false)
                  }}
                  disabled={isSimulating}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Truck className="w-4 h-4 mr-2" />}
                  Simulasi: Supplier Kirim Barang
                </Button>
              )}
              {(order.status === 'SHIPPED' || order.status === 'DELIVERED') && (
                <p className="text-sm text-orange-700">
                  ✅ Sekarang upload foto bukti penerimaan di atas untuk verifikasi AI
                </p>
              )}
              {order.status === 'COMPLETED' && (
                <p className="text-sm text-green-700">
                  🎉 Demo selesai! Transaksi berhasil diverifikasi.
                </p>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  )
}
