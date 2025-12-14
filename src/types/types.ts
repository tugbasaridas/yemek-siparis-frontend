
export type Urun = {
  id: number;
  ad: string;
  aciklama: string;
  fiyat: number;
  resim: string;
  kategori?: {
    id: number;
    ad: string;
  };
};


export type SiparisUrunu = {
  id: number;
  adet: number;
  birim_fiyat: number;
  urun: Urun;
};


export type Siparis = {
  id: number;
  toplam_fiyat: number;
  durum: string;
  olusturulma_tarihi: string;
  urunler: SiparisUrunu[];
  
};
