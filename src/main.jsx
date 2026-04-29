import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

let deferredPrompt;

const appJaInstalado =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (appJaInstalado) return;
  if (localStorage.getItem("appInstaladoTriarte") === "sim") return;
  if (document.getElementById("tela-instalar-app")) return;

  const tela = document.createElement("div");
  tela.id = "tela-instalar-app";

  tela.innerHTML = `
    <div style="
      width:100%;
      min-height:100vh;
      background:#f2f2f2;
      display:flex;
      flex-direction:column;
    ">

      <!-- TOPO -->
      <div style="
        background:#ffffff;
        padding:18px 16px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        box-shadow:0 1px 6px rgba(0,0,0,0.08);
      ">
        <img
          src="/images/logo/logo.png"
          style="
            width:52px;
            height:52px;
            border-radius:50%;
            object-fit:cover;
          "
        />

        <div style="
          font-size:30px;
          font-weight:800;
          color:#222;
        ">
          Real Triarte
        </div>

        <img
          src="/images/icons/menu.png"
          style="
            width:42px;
            height:42px;
          "
        />
      </div>

      <!-- CENTRO -->
      <div style="
        flex:1;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:22px;
      ">
        <div style="
          width:100%;
          max-width:380px;
          background:#ffffff;
          border-radius:22px;
          padding:28px;
          text-align:center;
          box-shadow:0 8px 22px rgba(0,0,0,0.10);
        ">

          <img
            src="/images/logo/icon-192.png"
            style="
              width:100px;
              height:100px;
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
            font-size:16px;
            color:#555;
            line-height:1.6;
          ">
            Instale grátis o aplicativo Real Triarte e tenha acesso rápido às receitas, vídeos e novidades.
          </p>

          <button
            id="confirmar-instalar-app"
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

        </div>
      </div>

    </div>
  `;

  tela.style.position = "fixed";
  tela.style.inset = "0";
  tela.style.zIndex = "99999";

  document.body.appendChild(tela);

  document
    .getElementById("confirmar-instalar-app")
    .addEventListener("click", async () => {
      if (!deferredPrompt) return;

      deferredPrompt.prompt();

      const escolha = await deferredPrompt.userChoice;

      if (escolha.outcome === "accepted") {
        localStorage.setItem("appInstaladoTriarte", "sim");
      }

      deferredPrompt = null;
      tela.remove();
    });
});