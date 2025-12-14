import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type{ReactNode} from "react";
import api from "../api/api";
import toast from "react-hot-toast";



type Kullanici = {
  id: number;
  rol: "admin" | "musteri";
};

type AuthContextType = {
  kullanici: Kullanici | null;
  girisYap: (email: string, sifre: string) => Promise<void>;
  kayitOl: (
    ad: string,
    email: string,
    sifre: string,
    rolId: number
  ) => Promise<void>;
  cikisYap: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [kullanici, setKullanici] = useState<Kullanici | null>(null);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/profile")
        .then((res) => {
          setKullanici({
            id: res.data.id,
            rol: res.data.rol,
          });
        })
        .catch(() => {
          localStorage.removeItem("token");
          setKullanici(null);
        });
    }
  }, []);

 
 const girisYap = async (email: string, sifre: string) => {
    try {
      const res = await api.post("/auth/login", { email, sifre });

      const token = res.data.access_token || res.data.token;
      localStorage.setItem("token", token);

      const profil = await api.get("/auth/profile");

      setKullanici({
        id: profil.data.id,
        rol: profil.data.rol,
      });

      toast.success("Giriş başarılı 🎉");
    } catch (err: any) {
      toast.error("Email veya şifre hatalı ❌");
      throw err;
    }
  };

  
    const kayitOl = async (
    ad: string,
    email: string,
    sifre: string,
    rolId: number
  ) => {
    try {
      await api.post("/auth/register", {
        ad,
        email,
        sifre,
        rolId,
      });

      toast.success("Kayıt başarılı, giriş yapabilirsiniz ✅");
    } catch (err: any) {
      toast.error("Kayıt sırasında hata oluştu ❌");
      throw err;
    }
  };


const cikisYap = () => {
    localStorage.removeItem("token");
    setKullanici(null);
    toast("Çıkış yapıldı 👋");
  };

  return (
    <AuthContext.Provider
      value={{
        kullanici,
        girisYap,
        kayitOl,
        cikisYap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth AuthProvider içinde kullanılmalı");
  }
  return context;
}
