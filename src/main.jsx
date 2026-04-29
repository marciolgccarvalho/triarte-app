import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

/* service worker */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

let deferredPrompt = null;

function appInstalado() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

function removerTela() {
  const tela = document.getElementById("tela-instalar");
  if (tela) tela.remove();
}

function criarTela() {
  if (appInstalado()) return;
  if (document.getElementById("tela-instalar")) return;

  const tela = document.createElement("div");
  tela.id = "tela-instalar";

  tela.style.position = "fixed";
  tela.style.inset = "0";
  tela.style.background = "#ffffff";
  tela.style.zIndex = "99999";
  tela.style.display = "flex";
  tela.style.alignItems = "center";
  tela.style.justifyContent = "center";
  tela.style.padding = "20px";

  tela.innerHTML = `
    <div style="max-width:390px;width:100%;text-align:center;">
      <img src="/images/logo/logo.png"
        style="width:100px;height:100px;border-radius:50%;margin-bottom:18px;" />

      <h1 style="font-size:30px;color:#222;margin-bottom:10px;">
        Real Triarte
      </h1>

      <p style="color:#555;font-size:17px;line-height:1.6;margin-bottom:20px;">
        Instale grátis o aplicativo no seu celular.
      </p>

      <button id="btn-instalar"
        style="
          width:100%;
          padding:16px;
          border:none;
          border-radius:16px;
          background:#FFD400;
          color:#222;
          font-size:20px;
          font-weight:800;
        ">
        📱 Instalar App
      </button>

      <button id="btn-entrar"
        style="
          width:100%;
          padding:14px;
          margin-top:10px;
          border:none;
          background:transparent;
          color:#666;
          font-size:16px;
        ">
        Entrar sem instalar
      </button>
    </div>
  `;

  document.body.appendChild(tela);

  document.getElementById("btn-instalar").onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const escolha = await deferredPrompt.userChoice;

      if (escolha.outcome === "accepted") {
        return;
      }
    }

    removerTela();
  };

  document.getElementById("btn-entrar").onclick = () => {
    removerTela();
  };
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

window.addEventListener("appinstalled", () => {
  removerTela();
});

window.addEventListener("load", () => {
  setTimeout(() => {
    criarTela();
  }, 700);
});