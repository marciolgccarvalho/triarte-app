import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const botao = document.createElement("button");

  botao.innerText = "📱 Instalar App";
  botao.id = "botao-instalar";

  botao.style.position = "fixed";
  botao.style.bottom = "95px";
  botao.style.left = "50%";
  botao.style.transform = "translateX(-50%)";
  botao.style.zIndex = "9999";
  botao.style.padding = "14px 20px";
  botao.style.border = "none";
  botao.style.borderRadius = "14px";
  botao.style.background = "#FFD400";
  botao.style.color = "#222";
  botao.style.fontSize = "16px";
  botao.style.fontWeight = "800";
  botao.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

  botao.onclick = async () => {
    botao.remove();

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt = null;
  };

  if (!document.getElementById("botao-instalar")) {
    document.body.appendChild(botao);
  }
});