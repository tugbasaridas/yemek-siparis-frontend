import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export default function AdminRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { kullanici } = useAuth();

  if (!kullanici) return <Navigate to="/giris" />;

  if (kullanici.rol !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
