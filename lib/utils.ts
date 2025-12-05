import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image validation helpers
export const ALLOWED_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: 'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.'
    }
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: 'Ukuran file terlalu besar. Maksimal 5MB.'
    }
  }

  return { valid: true }
}

// Currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Date formatting
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}
