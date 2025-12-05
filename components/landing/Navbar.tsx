"use client"

import { Shield } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">SALAMAN</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#beranda" className="text-gray-700 hover:text-emerald-600 transition-colors">Beranda</a>
            <a href="#fitur" className="text-gray-700 hover:text-emerald-600 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="text-gray-700 hover:text-emerald-600 transition-colors">Cara Kerja</a>
            <Link 
              href="/auth/login"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Masuk / Daftar
            </Link>
          </div>

          <Link 
            href="/auth/login"
            className="md:hidden bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  )
}
