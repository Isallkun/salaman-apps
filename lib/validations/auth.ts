import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),
  confirmPassword: z
    .string()
    .min(1, 'Konfirmasi password wajib diisi'),
  role: z.enum(['buyer', 'supplier'], {
    message: 'Pilih jenis akun',
  }),
  businessName: z
    .string()
    .min(1, 'Nama usaha wajib diisi')
    .min(3, 'Nama usaha minimal 3 karakter'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+62|62|0)[0-9]{9,12}$/.test(val),
      'Format nomor telepon tidak valid'
    ),
  address: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
