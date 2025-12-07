'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Shield, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'

import { CartItem } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CartItemWithImage extends CartItem {
  imageUrl?: string
  unit?: string
}

export default function CartPage() {
  const router = useRouter()
  const [items, setItems] = useState<CartItemWithImage[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems([])
      }
    }
    setIsLoaded(true)
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }
    const updated = items.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    )
    setItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (productId: string) => {
    const updated = items.filter((item) => item.productId !== productId)
    setItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  )

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Memuat...</div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Keranjang Belanja</h1>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">Keranjang Anda kosong</p>
              <Button
                onClick={() => router.push('/marketplace')}
                className="bg-emerald-500 hover:bg-emerald-600"
              >
                Mulai Belanja
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.productId}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="relative w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                          {item.productName}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {formatCurrency(item.unitPrice)} / {item.unit || 'unit'}
                        </p>
                        <div className="flex items-center justify-between mt-2 sm:mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                            >
                              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                            <span className="w-6 sm:w-8 text-center font-medium text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                            >
                              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900 text-sm sm:text-base">
                              {formatCurrency(item.unitPrice * item.quantity)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} produk)</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Biaya Layanan</span>
                    <span className="text-emerald-600">Gratis</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 h-12"
                  >
                    Lanjut ke Pembayaran
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Pembayaran aman dengan sistem escrow SALAMAN
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
