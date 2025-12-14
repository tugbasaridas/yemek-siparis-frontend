import { Link } from "react-router-dom";

export default function Anasayfa() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-linear-to-br from-indigo-100 via-white to-indigo-50 flex items-center relative overflow-hidden">

      {/* ARKA PLAN DEKOR */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* SOL TARAF */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
            🍕 Online Yemek Siparişi
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Yemek Sipariş <br />
            <span className="text-indigo-600">Sistemi</span>
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-md">
            En sevdiğin yemekler, güvenli ve hızlı bir şekilde birkaç tıkla kapında.
          </p>

          <div className="flex gap-4">
            <Link
              to="/urunler"
              className="px-7 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 hover:scale-105 transition transform shadow-lg"
            >
              🍽️ Ürünleri Gör
            </Link>

            <Link
              to="/giris"
              className="px-7 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 hover:scale-105 transition transform"
            >
              🔐 Giriş Yap
            </Link>
          </div>
        </div>

        {/* SAĞ TARAF – KARTLAR */}
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🚀 Hızlı Teslimat
            </h3>
            <p className="text-gray-600 text-sm">
              Siparişin dakikalar içinde sıcak şekilde kapında.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🔐 Güvenli Sistem
            </h3>
            <p className="text-gray-600 text-sm">
              JWT tabanlı güvenli giriş ve yetkilendirme altyapısı.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🍽️ Geniş Menü
            </h3>
            <p className="text-gray-600 text-sm">
              Birbirinden farklı restoran ve lezzet seçenekleri.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
