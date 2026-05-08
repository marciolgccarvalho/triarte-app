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
import "./styles/utils/progress.css";

/* =========================
   COMPONENTS (ordem importa)
========================= */
import "./styles/components/app-layout.css";
import "./styles/components/button.css";
import "./styles/components/card.css";
import "./styles/components/modal.css";
import "./styles/components/sidebar.css";
import "./styles/components/parabens.css";

// Pages
import "./styles/pages/home.css";
import "./styles/pages/sobre.css";
import "./styles/pages/contato.css";
import "./styles/pages/favoritos.css";
import "./styles/pages/receitas.css";
import "./styles/pages/receita-detalhe.css";
import "./styles/pages/materiais.css";
import "./styles/pages/linhas.css";
import "./styles/pages/simulador.css";
import "./styles/pages/projetos.css";
import "./styles/pages/configuracoes.css";
import "./styles/pages/conquistas.css";
import "./styles/pages/abreviacoes.css";


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