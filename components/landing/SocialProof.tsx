import { Users, Star, TrendingUp } from 'lucide-react'

export default function SocialProof() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Dipercaya Ribuan UMKM Indonesia
            </h2>
            <p className="text-emerald-50 text-sm sm:text-lg max-w-2xl mx-auto">
              Bergabunglah dengan komunitas warung dan supplier yang sudah merasakan keamanan bertransaksi dengan SALAMAN.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20">
                <Users className="w-6 h-6 sm:w-12 sm:h-12 text-white mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">1000+</div>
                <div className="text-emerald-50 font-semibold text-[10px] sm:text-base">UMKM Terdaftar</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20">
                <Star className="w-6 h-6 sm:w-12 sm:h-12 text-white mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">4.9/5</div>
                <div className="text-emerald-50 font-semibold text-[10px] sm:text-base">Rating Pengguna</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-white/20">
                <TrendingUp className="w-6 h-6 sm:w-12 sm:h-12 text-white mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">100%</div>
                <div className="text-emerald-50 font-semibold text-[10px] sm:text-base">Transaksi Aman</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20">
            <p className="text-center text-white font-semibold mb-4 sm:mb-6 text-sm sm:text-lg">
              Didukung teknologi terkini dari:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12">
              <div className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-4 shadow-lg">
                <div className="text-base sm:text-2xl font-bold text-gray-800">Midtrans</div>
                <div className="text-[10px] sm:text-xs text-gray-500 text-center">Payment Gateway</div>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-8 py-2 sm:py-4 shadow-lg">
                <div className="text-base sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Colossal AI
                </div>
                <div className="text-[10px] sm:text-xs text-gray-500 text-center">AI Verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
