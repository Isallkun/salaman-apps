import { AlertTriangle, Frown, Banknote } from 'lucide-react'

export default function Problem() {
  const problems = [
    {
      icon: AlertTriangle,
      text: "Takut transfer duluan tapi barang tidak dikirim?",
      color: "text-red-500",
      bgColor: "bg-red-50"
    },
    {
      icon: Frown,
      text: "Barang yang datang busuk atau tidak sesuai pesanan?",
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: Banknote,
      text: "Supplier takut barang dikirim tapi tidak dibayar?",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    }
  ]

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
          Sering Mengalami Masalah Ini?
        </h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Ribuan pemilik warung dan supplier mengalami kerugian karena transaksi yang tidak aman.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`${problem.bgColor} w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${problem.color}`} />
                </div>
                <p className="text-sm sm:text-lg font-semibold text-gray-800 leading-relaxed">
                  {problem.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
