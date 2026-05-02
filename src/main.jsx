import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

/* =========================
   RENDER APP
========================= */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* =========================
   SERVICE WORKER (somente produção)
========================= */
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

/* =========================
   INSTALAÇÃO PWA (overlay)
========================= */

let deferredPrompt = null;

/* Detecta se já está instalado */
function appInstalado() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

/* Remove tela */
function removerTela() {
  const tela = document.getElementById("tela-instalar");
  if (tela) tela.remove();
}

/* Cria tela de instalação */
function criarTela() {
  if (appInstalado()) return;
  if (localStorage.getItem("fechou_instalacao")) return;
  if (document.getElementById("tela-instalar")) return;

  const tela = document.createElement("div");
  tela.id = "tela-instalar";

  /* OVERLAY */
  tela.style.position = "fixed";
  tela.style.top = "0";
  tela.style.left = "0";
  tela.style.width = "100%";
  tela.style.height = "100%";
  tela.style.background = "rgba(0,0,0,0.6)";
  tela.style.zIndex = "9999";
  tela.style.display = "flex";
  tela.style.alignItems = "center";
  tela.style.justifyContent = "center";
  tela.style.padding = "20px";

  /* CONTEÚDO */
  tela.innerHTML =
    '<div style="max-width:390px;width:100%;text-align:center;background:#ffffff;border-radius:20px;padding:24px;box-shadow:0 10px 40px rgba(0,0,0,0.3);font-family:Arial, sans-serif;">' +
      '<img src="/images/logo/logo.png" style="width:100px;height:100px;border-radius:50%;margin-bottom:18px;" />' +
      '<h1 style="font-size:26px;color:#222;margin-bottom:10px;">Real Triarte</h1>' +
      '<p style="color:#555;font-size:16px;line-height:1.5;margin-bottom:20px;">Instale grátis o aplicativo no seu celular para acesso rápido e offline.</p>' +
      '<button id="btn-instalar" style="width:100%;padding:16px;border:none;border-radius:16px;background:#FFD400;color:#222;font-size:18px;font-weight:800;cursor:pointer;">📱 Instalar App</button>' +
      '<button id="btn-fechar" style="margin-top:12px;width:100%;padding:12px;border:none;border-radius:12px;background:#ddd;color:#333;font-size:15px;cursor:pointer;">❌ Fechar</button>' +
    "</div>";

  document.body.appendChild(tela);

  /* BOTÃO INSTALAR */
  const btnInstalar = document.getElementById("btn-instalar");
  if (btnInstalar) {
    btnInstalar.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const escolha = await deferredPrompt.userChoice;
        if (escolha.outcome === "accepted") {
          removerTela();
        }
      } else {
        alert("Use o menu do navegador e toque em 'Adicionar à tela inicial'");
      }
    };
  }

  /* BOTÃO FECHAR */
  const btnFechar = document.getElementById("btn-fechar");
  if (btnFechar) {
    btnFechar.onclick = () => {
      localStorage.setItem("fechou_instalacao", "true");
      removerTela();
    };
  }
}

/* Eventos PWA */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener("appinstalled", () => {
  removerTela();
});

/* Exibir tela (somente em dev, já que SW está desativado no dev) */
window.addEventListener("load", () => {
  setTimeout(() => {
    criarTela();
  }, 1500);
});