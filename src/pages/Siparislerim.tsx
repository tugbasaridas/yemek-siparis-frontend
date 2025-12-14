import { useEffect, useState } from "react";
import api from "../api/api";
import type { Siparis } from "../types/types";

export default function Siparislerim() {
  const [siparisler, setSiparisler] = useState<Siparis[]>([]);

  useEffect(() => {
    api.get("/siparisler/musteri").then((r) => setSiparisler(r.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Siparişlerim</h1>

      {siparisler.length === 0 && (
        <p className="text-gray-500">
          Henüz siparişiniz yok.
        </p>
      )}

      {siparisler.map((s) => (
        <div
          key={s.id}
          className="bg-white p-6 rounded-xl shadow space-y-3"
        >
          {/* ÜST BİLGİ */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              Sipariş #{s.id}
            </span>

            <span
              className={`text-sm px-3 py-1 rounded
                ${
                  s.durum === "teslim edildi"
                    ? "bg-green-100 text-green-700"
                    : s.durum === "yolda"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
            >
              {s.durum}
            </span>
          </div>

          {/* ÜRÜNLER */}
          <div className="space-y-2">
            {s.urunler.map((u) => (
              <div
                key={u.id}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {u.urun.ad} × {u.adet}
                </span>
                <span>
                  {Number(u.birim_fiyat) * u.adet} ₺
                </span>
              </div>
            ))}
          </div>

          {/* TOPLAM */}
          <div className="text-right font-bold pt-2 border-t">
            Toplam: {s.toplam_fiyat} ₺
          </div>
        </div>
      ))}
    </div>
  );
}
