'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, ShoppingCart, Minus, Plus, ArrowLeft, Store, Loader2, Package } from 'lucide-react'

import { Product } from '@/types'
import { getProductById } from '@/actions/product'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ProductWithSupplier extends Product {
  supplierName?: string
  supplierPhone?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductWithSupplier | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    if (!params.id) return
    setIsLoading(true)
    const data = await getProductById(params.id as string)
    setProduct(data as ProductWithSupplier)
    setIsLoading(false)
  }

  const handleAddToCart = () => {
    if (!product) return
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already in cart
    const existingIndex = existingCart.findIndex(
      (item: { productId: string }) => item.productId === product.id
    )
    
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity
    } else {
      existingCart.push({
        productId: product.id,
        productName: product.name,
        productCategory: product.category,
        quantity,
        unitPrice: product.price,
        supplierId: product.supplierId,
        imageUrl: product.imageUrls[0],
        unit: product.unit,
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Show success feedback
    alert('Produk ditambahkan ke keranjang!')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg mb-4">Produk tidak ditemukan</p>
        <Button onClick={() => router.push('/marketplace')}>
          Kembali ke Marketplace
        </Button>
      </div>
    )
  }

  const imageUrl = product.imageUrls[selectedImage] || '/placeholder-product.png'

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

            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="outline" size="sm" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Keranjang</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <Package className="w-24 h-24 text-gray-400" />
                </div>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="flex gap-2">
                {product.imageUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-emerald-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge className="bg-emerald-500 mb-2 sm:mb-3">{product.category}</Badge>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">{product.description}</p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 sm:p-6">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Harga per {product.unit}</p>
              <p className="text-2xl sm:text-4xl font-bold text-emerald-600">
                {formatCurrency(product.price)}
              </p>
            </div>

            {/* Supplier Info */}
            {product.supplierName && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Store className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {product.supplierName}
                      </p>
                      <p className="text-sm text-gray-500">Supplier Terpercaya</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="text-sm sm:text-base text-gray-700 font-medium">Jumlah:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                  <span className="w-10 sm:w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">{product.unit}</span>
              </div>

              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 sm:p-4">
                <span className="text-sm sm:text-base text-gray-600">Subtotal:</span>
                <span className="text-lg sm:text-2xl font-bold text-gray-900">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-emerald-500 hover:bg-emerald-600 h-12 sm:h-14 text-base sm:text-lg"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Tambah ke Keranjang
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
