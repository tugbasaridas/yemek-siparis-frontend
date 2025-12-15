import { useEffect, useState } from "react";
import api from "../api/api";
import type { Urun } from "../types/types";
import UrunKarti from "../components/UrunKarti";
import { useSepet } from "../sepet/SepetContext";
import { useAuth } from "../auth/AuthContext";
import Modal from "../components/Modal";
import KategoriFiltre from "../components/KategoriFiltre";
import toast from "react-hot-toast";

export default function Urunler() {
  const [urunler, setUrunler] = useState<Urun[]>([]);
  const [kategoriler, setKategoriler] = useState<string[]>([]);
  const [seciliKategori, setSeciliKategori] = useState("Hepsi");

  const { sepeteEkleAdetli } = useSepet();
  const { kullanici } = useAuth();

  const [modalAcik, setModalAcik] = useState(false);
  const [seciliUrun, setSeciliUrun] = useState<Urun | null>(null);

  const [form, setForm] = useState<any>({
    ad: "",
    aciklama: "",
    fiyat: "",
    resim: "",
    kategoriId: "",
  });

  const urunleriGetir = async () => {
    const res = await api.get("/urunler");
    setUrunler(res.data);
  };

  const kategorileriGetir = async () => {
    const res = await api.get("/kategoriler");
    setKategoriler(res.data.map((k: any) => k.ad));
  };

  useEffect(() => {
    urunleriGetir();
    kategorileriGetir();
  }, []);

  const filtrelenmisUrunler =
    seciliKategori === "Hepsi"
      ? urunler
      : urunler.filter(
          (u) => u.kategori?.ad === seciliKategori
        );

  const modalAc = (urun?: Urun) => {
    if (urun) {
      setSeciliUrun(urun);
      setForm({
        ad: urun.ad,
        aciklama: urun.aciklama,
        fiyat: urun.fiyat,
        resim: urun.resim,
        kategoriId: urun.kategori?.id,
      });
    } else {
      setSeciliUrun(null);
      setForm({
        ad: "",
        aciklama: "",
        fiyat: "",
        resim: "",
        kategoriId: "",
      });
    }
    setModalAcik(true);
  };

  const kaydet = async () => {
    try {
      if (seciliUrun) {
        await api.put(`/urunler/${seciliUrun.id}`, form);
        toast.success("Ürün güncellendi ✏️");
      } else {
        await api.post("/urunler", form);
        toast.success("Ürün eklendi ✅");
      }

      setModalAcik(false);
      urunleriGetir();
    } catch {
      toast.error("İşlem başarısız ❌");
    }
  };

  const sil = async (id: number) => {
    if (!confirm("Ürün silinsin mi?")) return;

    try {
      await api.delete(`/urunler/${id}`);
      toast.success("Ürün silindi 🗑️");
      urunleriGetir();
    } catch {
      toast.error("Silme işlemi başarısız ❌");
    }
  };

  return (
    <div>
      {kullanici?.rol === "admin" && (
        <button
          onClick={() => modalAc()}
          className="mb-6 bg-emerald-600 text-white px-6 py-3 rounded"
        >
          ➕ Yeni Ürün Ekle
        </button>
      )}

      {/* KATEGORİ FİLTRESİ */}
      <KategoriFiltre
        kategoriler={kategoriler}
        secili={seciliKategori}
        setSecili={setSeciliKategori}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtrelenmisUrunler.map((u) => (
          <UrunKarti
            key={u.id}
            urun={u}
            onSepeteEkle={
              kullanici?.rol === "musteri"
                ? (urun, adet) =>
                    sepeteEkleAdetli(urun, adet)
                : undefined
            }
          >
            {kullanici?.rol === "admin" && (
              <div className="flex gap-2">
                <button
                  onClick={() => modalAc(u)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded"
                >
                  Güncelle
                </button>
                <button
                  onClick={() => sil(u.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Sil
                </button>
              </div>
            )}
          </UrunKarti>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        acik={modalAcik}
        kapat={() => setModalAcik(false)}
        baslik={seciliUrun ? "Ürün Güncelle" : "Yeni Ürün"}
      >
        <div className="space-y-3">
          {["ad", "aciklama", "resim", "kategoriId", "fiyat"].map((alan) => (
            <input
              key={alan}
              placeholder={alan}
              className="w-full border p-2 rounded"
              value={form[alan]}
              onChange={(e) =>
                setForm({ ...form, [alan]: e.target.value })
              }
            />
          ))}

          <button
            onClick={kaydet}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            Kaydet
          </button>
        </div>
      </Modal>
    </div>
  );
}

