import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Giris() {
  const { girisYap } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");

  const submit = async () => {
    try {
      await girisYap(email, sifre);
      navigate("/");
    } catch {}
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold text-center">Giriş Yap</h2>

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
        Giriş Yap
      </button>
    </div>
  );
}
