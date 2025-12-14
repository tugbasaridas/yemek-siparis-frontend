import { useState } from "react";
import type { ReactNode } from "react";
import type { Urun } from "../types/types";

type Props = {
  urun: Urun;
  onSepeteEkle?: (urun: Urun, adet: number) => void;
  children?: ReactNode;
};

export default function UrunKarti({
  urun,
  onSepeteEkle,
  children,
}: Props) {
  const [adet, setAdet] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={`http://localhost:3000/uploads/${urun.resim}`}
        alt={urun.ad}
        className="w-full h-56 object-contain bg-gray-100 rounded mb-4"
      />

      <h3 className="font-semibold text-lg">{urun.ad}</h3>
      <p className="text-sm text-gray-600">{urun.aciklama}</p>
      <p className="mt-2 font-bold text-indigo-600">{urun.fiyat} ₺</p>

      {/* MÜŞTERİ → ADET + SEPET */}
      {onSepeteEkle && (
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setAdet(Math.max(1, adet - 1))}
            className="w-8 h-8 bg-gray-200 rounded"
          >
            −
          </button>

          <span className="w-6 text-center font-semibold">
            {adet}
          </span>

          <button
            onClick={() => setAdet(adet + 1)}
            className="w-8 h-8 bg-gray-200 rounded"
          >
            +
          </button>

          <button
            onClick={() => {
              onSepeteEkle(urun, adet);
              setAdet(1);
            }}
            className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Sepete Ekle
          </button>
        </div>
      )}

      {/* ADMİN BUTONLARI */}
      <div className="mt-4">{children}</div>
    </div>
  );
}
