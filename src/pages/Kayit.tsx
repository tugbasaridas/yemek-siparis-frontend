import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Kayit() {
  const { kayitOl } = useAuth();
  const navigate = useNavigate();

  const [ad, setAd] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");

  const submit = async () => {
    if (sifre.length < 4) {
      toast.error("Şifre en az 4 harfli olmalı");
      return;
    }

    try {
      await kayitOl(ad, email, sifre, 2); 
      toast.success("Kayıt başarılı");
      navigate("/giris");
    } catch (err) {
     
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Kayıt Ol</h2>

      <input
        placeholder="Ad Soyad"
        className="w-full border p-2 rounded"
        value={ad}
        onChange={(e) => setAd(e.target.value)}
      />

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Şifre"
        className="w-full border p-2 rounded"
        value={sifre}
        onChange={(e) => setSifre(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Kayıt Ol
      </button>
    </div>
  );
}

