import { ShoppingCart, Truck, Camera, CheckCircle } from 'lucide-react';

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
  ];

  return (
    <section id="cara-kerja" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja Sangat Mudah
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hanya 4 langkah sederhana untuk transaksi yang aman dan terpercaya.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 w-14 h-14 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-4xl font-bold text-emerald-100">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:scale-105">
            Mulai Transaksi Aman Sekarang
          </button>
        </div>
      </div>
    </section>
  );
}
