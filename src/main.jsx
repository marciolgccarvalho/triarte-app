import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

/* =========================
   BASE (sempre primeiro)
========================= */
import "./styles/base/variables.css";
import "./styles/base/global.css";

/* =========================
   UTILS
========================= */
import "./styles/utils/spacing.css";
import "./styles/utils/layout.css";
import "./styles/utils/helpers.css";

/* =========================
   COMPONENTS (ordem importa)
========================= */
import "./styles/components/app-layout.css";

// UI
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/modal.css";

// estrutura
import "./styles/components/sidebar.css";

// telas
import "./styles/components/home.css";
import "./styles/components/sobre.css";
import "./styles/components/contato.css";

// features
import "./styles/components/favoritos.css";
import "./styles/components/materiais.css";
import "./styles/components/simulador.css";
import "./styles/components/abreviacoes.css"; // ✅ EXISTE na tua pasta

// receitas
import "./styles/components/receitas.css";
import "./styles/components/receita-detalhe.css";

// conquistas
import "./styles/components/conquista.css";
import "./styles/components/parabens.css";

/* =========================
   RENDER APP
========================= */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ Elemento #root não encontrado");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* =========================
   SERVICE WORKER (PWA)
========================= */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      console.log("✅ Service Worker registrado");

      // força atualização imediata
      if (registration.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;

        if (!newWorker) return;

        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed") {
            console.log("🔄 Nova versão disponível");
          }
        });
      });

    } catch (error) {
      console.error("❌ Erro ao registrar Service Worker:", error);
    }
  });
}