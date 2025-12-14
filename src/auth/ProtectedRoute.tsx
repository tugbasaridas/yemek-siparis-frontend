import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
  rol,
}: {
  children: JSX.Element;
  rol?: "admin" | "musteri";
}) {
  const { kullanici } = useAuth();

  if (!kullanici) return <Navigate to="/giris" />;

  if (rol && kullanici.rol !== rol) {
    return <Navigate to="/" />;
  }

  return children;
}
