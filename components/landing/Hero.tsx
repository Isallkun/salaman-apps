import { ShieldCheck, Handshake } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="beranda" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
              Transaksi Aman, Hati Tenang.
              <span className="text-emerald-500"> Jual Beli Warung & Supplier</span> Tanpa Was-Was.
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Aplikasi Rekber Pintar dengan teknologi AI. Uang aman sampai barang diterima dan dicek kualitasnya secara otomatis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link 
                href="/auth/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:scale-105 text-center"
              >
                Coba Sekarang Gratis
              </Link>
              <a 
                href="#cara-kerja"
                className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg transition-all text-center"
              >
                Pelajari Cara Kerja
              </a>
            </div>
          </div>

          <div className="relative mt-6 lg:mt-0">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 relative">
                <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="bg-emerald-100 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                      <Handshake className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">Warung</p>
                  </div>
                  <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 p-2 sm:p-3 rounded-full shadow-lg animate-pulse">
                      <ShieldCheck className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="w-10 sm:w-16 h-1 bg-emerald-300"></div>
                  </div>
                  <div className="text-center">
                    <div className="bg-emerald-100 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 sm:mb-3 mx-auto">
                      <Handshake className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-600" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-700">Supplier</p>
                  </div>
                </div>
                <div className="text-center bg-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700">Transaksi Aman dengan Rekber Otomatis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
