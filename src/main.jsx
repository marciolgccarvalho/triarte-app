import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// BASE
import "./styles/base/variables.css";
import "./styles/base/global.css";

// UTILS
import "./styles/utils/spacing.css";
import "./styles/utils/layout.css";
import "./styles/utils/helpers.css";

// COMPONENTS
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/sidebar.css";
import "./styles/components/modal.css";
import "./styles/components/parabens.css";
import "./styles/components/conquista.css";
import "./styles/components/contato.css";
import "./styles/components/favoritos.css";
import "./styles/components/home.css";
import "./styles/components/materiais.css";
import "./styles/components/receita.css";
import "./styles/components/receitas.css";
import "./styles/components/simulador.css";
import "./styles/components/sobre.css";

/* =========================
   RENDER APP
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* =========================
   SERVICE WORKER
========================= */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      console.log("✅ Service Worker registrado");

      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

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