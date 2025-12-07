'use server'

import { supabase } from '@/lib/supabase'
import { Product, ProductFilters } from '@/types'

function mapProductFromDB(data: Record<string, unknown>): Product {
  return {
    id: data.id as string,
    supplierId: data.supplier_id as string,
    name: data.name as string,
    description: data.description as string | undefined,
    category: data.category as string,
    price: Number(data.price),
    unit: data.unit as string,
    imageUrls: (data.image_urls as string[]) || [],
    isActive: data.is_active as boolean,
    createdAt: new Date(data.created_at as string),
    updatedAt: new Date(data.updated_at as string),
  }
}

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice)
    }

    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    if (filters?.supplierId) {
      query = query.eq('supplier_id', filters.supplierId)
    }

    if (filters?.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Get products error:', error)
      return []
    }

    return (data || []).map(mapProductFromDB)
  } catch (error) {
    console.error('Get products error:', error)
    return []
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Search products error:', error)
      return []
    }

    return (data || []).map(mapProductFromDB)
  } catch (error) {
    console.error('Search products error:', error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        supplier:users!supplier_id (
          id,
          business_name,
          phone
        )
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      console.error('Get product by id error:', error)
      return null
    }

    return {
      ...mapProductFromDB(data),
      supplierName: (data as { supplier?: { business_name?: string } }).supplier?.business_name,
      supplierPhone: (data as { supplier?: { phone?: string } }).supplier?.phone,
    }
  } catch (error) {
    console.error('Get product by id error:', error)
    return null
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('is_active', true)

    if (error) {
      console.error('Get categories error:', error)
      return []
    }

    // Get unique categories
    const categories = [...new Set((data || []).map(p => p.category))]
    return categories.sort()
  } catch (error) {
    console.error('Get categories error:', error)
    return []
  }
}
