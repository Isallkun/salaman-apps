'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, ShoppingCart } from 'lucide-react'

import { Product } from '@/types'
import { getProducts, searchProducts, getCategories } from '@/actions/product'
import { ProductGrid, SearchBar } from '@/components/marketplace'
import { Button } from '@/components/ui/button'

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setIsLoading(true)
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories(),
    ])
    setProducts(productsData)
    setCategories(categoriesData)
    setIsLoading(false)
  }

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    if (query.trim()) {
      const results = await searchProducts(query)
      setProducts(results)
    } else {
      const results = await getProducts(
        selectedCategory ? { category: selectedCategory } : undefined
      )
      setProducts(results)
    }
    setIsLoading(false)
  }

  const handleCategoryChange = async (category: string | null) => {
    setSelectedCategory(category)
    setIsLoading(true)
    const results = await getProducts(category ? { category } : undefined)
    setProducts(results)
    setIsLoading(false)
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

            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="outline" size="sm" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Keranjang</span>
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                  Masuk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Katalog Produk
          </h1>
          <p className="text-gray-600">
            Temukan berbagai kebutuhan warung Anda dari supplier terpercaya
          </p>
        </div>

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            selectedCategory={selectedCategory}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  )
}
