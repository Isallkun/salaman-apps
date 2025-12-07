'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Clock, CheckCircle, Truck, Package, ShieldCheck, Loader2, ShoppingBag } from 'lucide-react'

import { Order } from '@/types'
import { getBuyerOrders } from '@/actions/order'
import { getCurrentUser } from '@/actions/auth'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PENDING: { label: 'Menunggu Pembayaran', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  PAID: { label: 'Dibayar', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  SHIPPED: { label: 'Dikirim', color: 'bg-purple-100 text-purple-800', icon: Truck },
  DELIVERED: { label: 'Sampai', color: 'bg-emerald-100 text-emerald-800', icon: Package },
  COMPLETED: { label: 'Selesai', color: 'bg-green-100 text-green-800', icon: ShieldCheck },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800', icon: Clock },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setIsLoading(true)
    const user = await getCurrentUser()
    if (user) {
      const data = await getBuyerOrders(user.id)
      setOrders(data)
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

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
            <Link href="/marketplace">
              <Button variant="outline">Marketplace</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Pesanan Saya</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-4">Belum ada pesanan</p>
              <Link href="/marketplace">
                <Button>Mulai Belanja</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.PENDING
              const StatusIcon = status.icon
              return (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">#{order.id}</p>
                          <p className="text-sm text-gray-400">{formatDateTime(order.createdAt)}</p>
                        </div>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.productName} x{item.quantity}</span>
                            <span className="text-gray-900">{formatCurrency(item.subtotal)}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-sm text-gray-400">+{order.items.length - 2} item lainnya</p>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <span className="font-medium text-gray-700">Total</span>
                        <span className="font-bold text-emerald-600">{formatCurrency(order.totalAmount)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
