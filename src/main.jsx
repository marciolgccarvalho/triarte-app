import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* SERVICE WORKER */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

/* INSTALAÇÃO APP */
let deferredPrompt = null;

function appEstaInstalado() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function removerTelaInstalacao() {
  const tela = document.getElementById("tela-instalar-app");
  if (tela) tela.remove();
}

function criarTelaInstalacao() {
  if (document.getElementById("tela-instalar-app")) return;
  if (appEstaInstalado()) return;
  if (!deferredPrompt) return;

  const tela = document.createElement("div");
  tela.id = "tela-instalar-app";

  tela.style.position = "fixed";
  tela.style.inset = "0";
  tela.style.background = "#ffffff";
  tela.style.zIndex = "99999";
  tela.style.display = "flex";
  tela.style.alignItems = "center";
  tela.style.justifyContent = "center";
  tela.style.padding = "20px";

  tela.innerHTML = `
    <div style="
      width:100%;
      max-width:390px;
      background:#ffffff;
      border-radius:24px;
      padding:28px;
      text-align:center;
      box-shadow:0 8px 24px rgba(0,0,0,0.14);
    ">

      <img
        src="/images/logo/logo.png"
        style="
          width:95px;
          height:95px;
          border-radius:50%;
          margin-bottom:18px;
        "
      />

      <h1 style="
        margin:0 0 12px;
        font-size:28px;
        color:#222;
      ">
        Instalar App
      </h1>

      <p style="
        margin:0 0 22px;
        color:#555;
        font-size:16px;
        line-height:1.6;
      ">
        Instale grátis o Real Triarte e tenha acesso rápido às receitas, vídeos e novidades.
      </p>

      <button
        id="btn-instalar-app"
        style="
          width:100%;
          padding:16px;
          border:none;
          border-radius:16px;
          background:#FFD400;
          color:#222;
          font-size:18px;
          font-weight:800;
          cursor:pointer;
        "
      >
        📱 Quero Instalar
      </button>

      <button
        id="btn-fechar-instalar"
        style="
          width:100%;
          margin-top:10px;
          padding:14px;
          border:none;
          background:transparent;
          color:#777;
          font-size:15px;
          cursor:pointer;
        "
      >
        Agora não
      </button>

    </div>
  `;

  document.body.appendChild(tela);

  document
    .getElementById("btn-instalar-app")
    .addEventListener("click", async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      await deferredPrompt.userChoice;

      deferredPrompt = null;
      removerTelaInstalacao();
    });

  document
    .getElementById("btn-fechar-instalar")
    .addEventListener("click", () => {
      removerTelaInstalacao();
    });
}

/* quando navegador permitir instalar */
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (!appEstaInstalado()) {
    criarTelaInstalacao();
  }
});

/* quando instalar */
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  removerTelaInstalacao();
});

/* quando voltar ao navegador após desinstalar */
window.addEventListener("focus", () => {
  setTimeout(() => {
    if (!appEstaInstalado() && deferredPrompt) {
      criarTelaInstalacao();
    }
  }, 500);
});