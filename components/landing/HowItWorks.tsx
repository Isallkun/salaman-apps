import { ShoppingCart, Truck, Camera, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      icon: ShoppingCart,
      number: "01",
      title: "Pesan Barang & Bayar ke Rekber SALAMAN",
      description: "Pilih produk dari supplier, lakukan pembayaran langsung ke rekening bersama SALAMAN yang aman."
    },
    {
      icon: Truck,
      number: "02",
      title: "Supplier Kirim Barang",
      description: "Supplier melihat pembayaran masuk dan langsung mengirim barang pesanan Anda dengan aman."
    },
    {
      icon: Camera,
      number: "03",
      title: "Foto Barang & Verifikasi AI",
      description: "Saat barang tiba, foto kondisi barang. AI kami akan verifikasi kualitas secara otomatis dalam hitungan detik."
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Uang Cair Otomatis ke Supplier",
      description: "Jika barang sesuai, uang langsung dicairkan ke supplier. Semua otomatis dan aman untuk kedua belah pihak."
    }
  ]

  return (
    <section id="cara-kerja" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Cara Kerja Sangat Mudah
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk transaksi yang aman dan terpercaya.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl h-full">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <span className="text-2xl sm:text-4xl font-bold text-emerald-100">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Link 
            href="/auth/register"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:scale-105"
          >
            Mulai Transaksi Aman Sekarang
          </Link>
        </div>
      </div>
    </section>
  )
}
