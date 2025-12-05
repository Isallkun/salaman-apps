import { AlertTriangle, Frown, Banknote } from 'lucide-react';

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
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Sering Mengalami Masalah Ini?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Ribuan pemilik warung dan supplier mengalami kerugian karena transaksi yang tidak aman.
        </p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`${problem.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${problem.color}`} />
                </div>
                <p className="text-lg font-semibold text-gray-800 leading-relaxed">
                  {problem.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
