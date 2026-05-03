import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/components.css";

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
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      console.log("✅ Service Worker registrado");

      // 🔥 FORÇA ATUALIZAÇÃO AUTOMÁTICA
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      // 🔥 ESCUTA NOVA VERSÃO
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;

        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed") {
            console.log("🔄 Nova versão disponível");
          }
        });
      });

    } catch (err) {
      console.error("❌ Erro ao registrar SW:", err);
    }
  });
}