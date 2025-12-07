import { ShieldCheck, Sparkles, BadgeDollarSign } from 'lucide-react'

export default function Solution() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Rekening Bersama Otomatis",
      description: "Uang pembeli ditahan aman di rekening bersama SALAMAN sampai barang diterima dengan baik. Supplier dan pembeli sama-sama aman.",
      gradient: "from-emerald-400 to-emerald-600"
    },
    {
      icon: Sparkles,
      title: "AI Quality Check",
      description: "Cukup foto barang saat sampai. AI kami akan mengecek kualitasnya dalam hitungan detik. Teknologi dari Colossal AI Indonesia.",
      gradient: "from-blue-400 to-blue-600",
      badge: "Powered by AI"
    },
    {
      icon: BadgeDollarSign,
      title: "Tanpa Biaya Tersembunyi",
      description: "Biaya jasa transparan dan terjangkau untuk UMKM. Tidak ada biaya tersembunyi. Yang Anda lihat adalah yang Anda bayar.",
      gradient: "from-amber-400 to-amber-600"
    }
  ]

  return (
    <section id="fitur" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Kenapa Harus Pakai <span className="text-emerald-500">SALAMAN</span>?
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk transaksi B2B yang aman, cepat, dan terpercaya dengan teknologi terkini.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border-2 border-gray-100 hover:border-emerald-300 transition-all hover:shadow-xl"
              >
                {feature.badge && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                    {feature.badge}
                  </div>
                )}
                <div className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
