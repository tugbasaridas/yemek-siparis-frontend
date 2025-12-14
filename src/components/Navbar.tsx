import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useSepet } from "../sepet/SepetContext";

export default function Navbar() {
  const { kullanici, cikisYap } = useAuth();
  const { kalemler } = useSepet();
  const navigate = useNavigate();

  const toplamAdet = kalemler.reduce((t, k) => t + k.adet, 0);

  const handleCikis = () => {
    cikisYap();
    navigate("/");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">

        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight hover:scale-105 transition-transform"
        >
          🍽️ YemekSipariş
        </NavLink>

        {/* MİSAFİR */}
        {!kullanici && (
          <>
            <NavLink to="/" className={linkClass}>Anasayfa</NavLink>
            <NavLink to="/urunler" className={linkClass}>Ürünler</NavLink>

            <div className="ml-auto flex gap-2">
              <NavLink to="/giris" className={linkClass}>Giriş</NavLink>
              <NavLink
                to="/kayit"
                className="px-4 py-2 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
              >
                Kayıt
              </NavLink>
            </div>
          </>
        )}

        {/* MÜŞTERİ */}
        {kullanici?.rol === "musteri" && (
          <>
            <NavLink to="/" className={linkClass}>Anasayfa</NavLink>
            <NavLink to="/urunler" className={linkClass}>Ürünler</NavLink>

            <NavLink to="/sepet" className={({ isActive }) =>
              `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`
            }>
              🛒 Sepet
              {toplamAdet > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {toplamAdet}
                </span>
              )}
            </NavLink>

            <NavLink to="/siparislerim" className={linkClass}>
              Siparişlerim
            </NavLink>

            <button
              onClick={handleCikis}
              className="ml-auto px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md"
            >
              Çıkış
            </button>
          </>
        )}

        {/* ADMIN */}
        {kullanici?.rol === "admin" && (
          <>
            <NavLink to="/" className={linkClass}>Anasayfa</NavLink>
            <NavLink to="/urunler" className={linkClass}>Ürünler</NavLink>
            <NavLink to="/admin/siparisler" className={linkClass}>
              Admin Siparişleri
            </NavLink>

            <button
              onClick={handleCikis}
              className="ml-auto px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md"
            >
              Çıkış
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
