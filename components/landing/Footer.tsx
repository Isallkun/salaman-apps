import { Shield, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">SALAMAN</span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Solusi Aman Layanan Antar Mitra Atas Niaga. Aplikasi rekening bersama pintar dengan AI untuk UMKM Indonesia.
            </p>
            <div className="flex gap-4">
              <a href="mailto:support@salaman.id" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+6281234567890" className="bg-gray-800 hover:bg-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2">
              <li><a href="#beranda" className="hover:text-emerald-400 transition-colors">Beranda</a></li>
              <li><a href="#fitur" className="hover:text-emerald-400 transition-colors">Fitur</a></li>
              <li><a href="#cara-kerja" className="hover:text-emerald-400 transition-colors">Cara Kerja</a></li>
              <li><Link href="/marketplace" className="hover:text-emerald-400 transition-colors">Marketplace</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span className="text-sm">support@salaman.id</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span className="text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2025 SALAMAN Apps. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
