import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Anasayfa from "./pages/Anasayfa";
import Urunler from "./pages/Urunler";
import Giris from "./pages/Giris";
import Kayit from "./pages/Kayit";
import Sepet from "./pages/Sepet";
import Siparislerim from "./pages/Siparislerim";
import AdminSiparisler from "./pages/AdminSiparisler";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/urunler" element={<Urunler />} />
        <Route path="/giris" element={<Giris />} />
        <Route path="/kayit" element={<Kayit />} />
        <Route path="/sepet" element={<Sepet />} />
        <Route path="/siparislerim" element={<Siparislerim />} />
        <Route path="/admin/siparisler" element={<AdminSiparisler />} />
      </Routes>
    </div>
  );
}
