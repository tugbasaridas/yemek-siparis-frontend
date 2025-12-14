import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Urun } from "../types/types";
import toast from "react-hot-toast";


type SepetKalemi = {
  urun: Urun;
  adet: number;
};

type SepetContextType = {
  kalemler: SepetKalemi[];

  sepeteEkle: (urun: Urun) => void;
  sepeteEkleAdetli: (urun: Urun, adet: number) => void;

  adetDegistir: (urunId: number, adet: number) => void;
  kaldir: (urunId: number) => void;
  temizle: () => void;

  toplamTutar: number;
};


const SepetContext = createContext<SepetContextType | null>(null);

export function SepetProvider({ children }: { children: ReactNode }) {
  const [kalemler, setKalemler] = useState<SepetKalemi[]>([]);

 
  useEffect(() => {
    const kayitli = localStorage.getItem("sepet");
    if (kayitli) {
      setKalemler(JSON.parse(kayitli));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("sepet", JSON.stringify(kalemler));
  }, [kalemler]);

  
  const sepeteEkle = (urun: Urun) => {
    sepeteEkleAdetli(urun, 1);
  };

  
  const sepeteEkleAdetli = (urun: Urun, adet: number) => {
    if (adet <= 0) return;

    const varMi = kalemler.find((k) => k.urun.id === urun.id);

    if (varMi) {
      setKalemler(
        kalemler.map((k) =>
          k.urun.id === urun.id
            ? { ...k, adet: k.adet + adet }
            : k
        )
      );
     
    } else {
      setKalemler([...kalemler, { urun, adet }]);
      toast.success(`${urun.ad} sepete eklendi 🛒`);
    }
  };

 
  const adetDegistir = (urunId: number, adet: number) => {
    if (adet <= 0) {
      kaldir(urunId);
      return;
    }

    setKalemler(
      kalemler.map((k) =>
        k.urun.id === urunId ? { ...k, adet } : k
      )
    );
  };


  const kaldir = (urunId: number) => {
    setKalemler(kalemler.filter((k) => k.urun.id !== urunId));
    toast.success(`Ürün sepetten kaldırıldı 🛒`);
  };

  
  const temizle = () => {
    setKalemler([]);
    localStorage.removeItem("sepet");
  };

  
  const toplamTutar = kalemler.reduce(
    (toplam, k) => toplam + Number(k.urun.fiyat) * k.adet,
    0
  );

  return (
    <SepetContext.Provider
      value={{
        kalemler,
        sepeteEkle,
        sepeteEkleAdetli,
        adetDegistir,
        kaldir,
        temizle,
        toplamTutar,
      }}
    >
      {children}
    </SepetContext.Provider>
  );
}


export function useSepet() {
  const context = useContext(SepetContext);
  if (!context) {
    throw new Error("useSepet SepetProvider içinde kullanılmalı");
  }
  return context;
}
