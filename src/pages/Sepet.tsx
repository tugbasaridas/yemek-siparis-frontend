import { useSepet } from "../sepet/SepetContext";
import api from "../api/api";
import toast from "react-hot-toast";


export default function Sepet() {
  const {
    kalemler,
    toplamTutar,
    adetDegistir,
    kaldir,
    temizle,
  } = useSepet();

  const siparisVer = async () => {
    if (kalemler.length === 0) {
    toast.error("Sepet boş, sipariş veremezsiniz ❌");
    return;
  }

  try {
    await api.post("/siparisler", {
      urunler: kalemler.map((k) => ({
        urunId: k.urun.id,
        adet: k.adet,
      })),
    });

    temizle();
    toast.success("Siparişiniz alındı 🎉");
  } catch {
    toast.error("Sipariş sırasında hata oluştu ❌");
  }
  };

  return (
    <div className="space-y-6">
      {kalemler.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          🛒 Sepetiniz boş
        </div>
      )}

      {kalemler.map((k) => (
        <div
          key={k.urun.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          {/* ÜRÜN BİLGİSİ */}
          <div>
            <h3 className="font-semibold">{k.urun.ad}</h3>
            <p className="text-sm text-gray-600">
              {Number(k.urun.fiyat)} ₺
            </p>
          </div>

          {/* ADET KONTROL */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                adetDegistir(k.urun.id, k.adet - 1)
              }
              className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
            >
              −
            </button>

            <span className="font-semibold w-6 text-center">
              {k.adet}
            </span>

            <button
              onClick={() =>
                adetDegistir(k.urun.id, k.adet + 1)
              }
              className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* SİL */}
          <button
            onClick={() => kaldir(k.urun.id)}
            className="text-red-600 hover:underline"
          >
            Sil
          </button>
        </div>
      ))}

      {/* ALT TOPLAM */}
      <div className="bg-white p-6 rounded shadow text-right">
        <p className="text-xl font-bold mb-4">
          Toplam: {toplamTutar} ₺
        </p>

        <button
          onClick={siparisVer}
          disabled={kalemler.length === 0}
          className={`px-6 py-3 rounded text-white
            ${
              kalemler.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
          Sipariş Ver
        </button>
      </div>
    </div>
  );
}
