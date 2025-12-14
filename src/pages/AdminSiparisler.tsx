import { useEffect, useState } from "react";
import api from "../api/api";
import type { Siparis } from "../types/types";
import toast from "react-hot-toast";


const durumRenk: Record<string, string> = {
  "hazırlanıyor": "bg-yellow-100 text-yellow-800",
  "yolda": "bg-blue-100 text-blue-800",
  "teslim edildi": "bg-green-100 text-green-800",
};

type AdminSiparis = Siparis & {
  musteri: {
    id: number;
    ad: string;
    email: string;
  };
};

export default function AdminSiparisler() {
  const [siparisler, setSiparisler] = useState<AdminSiparis[]>([]);

  const getir = () =>
    api.get("/siparisler").then((r) => setSiparisler(r.data));

  useEffect(() => {
    getir();
  }, []);

  const durumDegistir = async (id: number, durum: string) => {
    try {
    await api.post(`/siparisler/${id}/durum`, { durum });
    toast.success(`Sipariş durumu "${durum}" olarak güncellendi`);
    getir();
  } catch (err) {
    toast.error("Sipariş durumu güncellenemedi");
  }
  };

  return (
    <div className="space-y-6">
      {siparisler.map((s) => (
        <div key={s.id} className="bg-white p-6 rounded-xl shadow">

          {/* 🧾 BAŞLIK */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Sipariş #{s.id}</h3>
            <span
              className={`px-3 py-1 rounded text-sm ${durumRenk[s.durum]}`}
            >
              {s.durum}
            </span>
          </div>

          {/* 👤 MÜŞTERİ */}
          <p className="text-sm text-gray-700 mb-2">
            <b>Müşteri:</b> {s.musteri.ad} – {s.musteri.email}
          </p>

          {/* 📦 ÜRÜNLER */}
          <div className="mb-3">
            <b>Ürünler:</b>
            <ul className="list-disc ml-6 mt-1">
              {s.urunler.map((u) => (
                <li key={u.id}>
                  {u.urun.ad} × {u.adet}  
                  <span className="text-gray-500">
                    {" "}({u.birim_fiyat} ₺)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 💰 TOPLAM */}
          <p className="mb-3 font-medium">
            Toplam: {s.toplam_fiyat} ₺
          </p>

          {/* 🔁 DURUM */}
          <div className="flex gap-2">
            {["hazırlanıyor", "yolda", "teslim edildi"].map((d) => (
              <button
                key={d}
                onClick={() => durumDegistir(s.id, d)}
                className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
