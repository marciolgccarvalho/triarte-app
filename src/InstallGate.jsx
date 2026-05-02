import React from "react";

export default function InstallGate({ instalarApp }) {
  return (
    <div style={estilo}>
      <div>
        <h2>Instale o aplicativo</h2>

        <p style={{ marginTop: "10px" }}>
          Para uma melhor experiência, instale o app no seu dispositivo
        </p>

        <button onClick={instalarApp} style={botao}>
          📱 Instalar App
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Caso o botão não funcione, use o menu do navegador (⋮) e toque em
          "Instalar aplicativo"
        </p>
      </div>
    </div>
  );
}

const estilo = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  background: "#fff",
  padding: "20px"
};

const botao = {
  marginTop: "20px",
  padding: "14px",
  background: "#FFD400",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer"
};