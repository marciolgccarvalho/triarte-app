import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

/* =========================
   RENDER APP
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* =========================
   SERVICE WORKER (produção)
========================= */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("✅ Service Worker registrado");
      })
      .catch((err) => {
        console.error("❌ Erro ao registrar SW:", err);
      });
  });
}