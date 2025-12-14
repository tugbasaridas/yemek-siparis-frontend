import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext";
import { SepetProvider } from "./sepet/SepetContext";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <BrowserRouter>
    <AuthProvider>
      <SepetProvider>
        <App />
        <Toaster position="top-right" />
      </SepetProvider>
    </AuthProvider>
  </BrowserRouter>
);
