import { describe, it, expect } from 'vitest'
import { formatCurrency, formatDate, validateImageFile } from './utils'

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format Indonesian Rupiah correctly', () => {
      expect(formatCurrency(10000)).toBe('Rp10.000')
      expect(formatCurrency(1000000)).toBe('Rp1.000.000')
    })
  })

  describe('formatDate', () => {
    it('should format date in Indonesian locale', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('Januari')
    })
  })

  describe('validateImageFile', () => {
    it('should accept valid JPEG files under 5MB', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }) // 1MB
      const result = validateImageFile(file)
      expect(result.valid).toBe(true)
    })

    it('should reject files over 5MB', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
      Object.defineProperty(file, 'size', { value: 6 * 1024 * 1024 }) // 6MB
      const result = validateImageFile(file)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Ukuran file terlalu besar')
    })

    it('should reject unsupported file formats', () => {
      const file = new File(['test'], 'test.gif', { type: 'image/gif' })
      const result = validateImageFile(file)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Format file tidak didukung')
    })
  })
})
