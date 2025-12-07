'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchBarProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string | null) => void
  categories: string[]
  selectedCategory: string | null
}

export default function SearchBar({
  onSearch,
  onCategoryChange,
  categories,
  selectedCategory,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const categoryLabels: Record<string, string> = {
    sembako: 'Sembako',
    minuman: 'Minuman',
    makanan: 'Makanan',
    bumbu: 'Bumbu',
    segar: 'Produk Segar',
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 sm:pl-10 text-sm sm:text-base"
          />
        </div>
        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 px-3 sm:px-4">
          <Search className="w-4 h-4 sm:hidden" />
          <span className="hidden sm:inline">Cari</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 ${showFilters ? 'bg-emerald-50 border-emerald-500' : ''}`}
        >
          <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </form>

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Kategori</p>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className={`cursor-pointer ${
                selectedCategory === null
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => onCategoryChange(null)}
            >
              Semua
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-emerald-500 hover:bg-emerald-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {categoryLabels[category] || category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(selectedCategory || searchQuery) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter aktif:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              {categoryLabels[selectedCategory] || selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onCategoryChange(null)}
              />
            </Badge>
          )}
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              &quot;{searchQuery}&quot;
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => {
                  setSearchQuery('')
                  onSearch('')
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
