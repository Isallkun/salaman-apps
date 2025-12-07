'use server'

import { supabase } from '@/lib/supabase'
import { RegisterInput, User, UserRole } from '@/types'

export interface AuthResult {
  success: boolean
  error?: string
  user?: User
}

export async function registerUser(input: RegisterInput): Promise<AuthResult> {
  try {
    // 1. Create auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        return { success: false, error: 'Email sudah terdaftar' }
      }
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: 'Gagal membuat akun' }
    }

    // 2. Create user profile in users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: input.email,
        role: input.role,
        business_name: input.businessName,
        phone: input.phone || null,
        address: input.address || null,
      })
      .select()
      .single()

    if (userError) {
      // Rollback: delete auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: 'Gagal menyimpan data profil' }
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      role: userData.role as UserRole,
      businessName: userData.business_name,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at),
    }

    return { success: true, user }
  } catch (error) {
    console.error('Register error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        return { success: false, error: 'Email atau password salah' }
      }
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: 'Gagal login' }
    }

    // Get user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError || !userData) {
      return { success: false, error: 'Profil pengguna tidak ditemukan' }
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      role: userData.role as UserRole,
      businessName: userData.business_name,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at),
    }

    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user: authUser } } = await supabase.auth.getUser()

    if (!authUser) {
      return null
    }

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single()

    if (error || !userData) {
      return null
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role as UserRole,
      businessName: userData.business_name,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at),
    }
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Get demo user from client-side (for demo purposes)
export async function getDemoUser(): Promise<User | null> {
  // This is called from client, localStorage check happens there
  return null
}

export async function logoutUser(): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: 'Terjadi kesalahan sistem' }
  }
}

// Demo login - returns demo buyer user from seed data
export async function demoLogin(): Promise<AuthResult> {
  try {
    // Get demo buyer from seed data
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'buyer')
      .limit(1)
      .single()

    if (error || !userData) {
      // Fallback: return a mock demo user
      return {
        success: true,
        user: {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'buyer@demo.com',
          role: 'buyer' as UserRole,
          businessName: 'Demo Buyer',
          phone: undefined,
          address: undefined,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    }

    const user: User = {
      id: userData.id,
      email: userData.email,
      role: userData.role as UserRole,
      businessName: userData.business_name,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at),
    }

    return { success: true, user }
  } catch (error) {
    console.error('Demo login error:', error)
    // Return mock user on error
    return {
      success: true,
      user: {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'buyer@demo.com',
        role: 'buyer' as UserRole,
        businessName: 'Demo Buyer',
        phone: undefined,
        address: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  }
}
