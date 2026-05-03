import React from "react";
import html2canvas from "html2canvas";
import { IMAGES } from "../assets/images";

export default function ParabensModal({ aberto, fechar = () => {}, receita }) {
  if (!aberto) return null;

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const salvarImagem = async () => {
    try {
      const elemento = document.getElementById("print-area");
      if (!elemento || !html2canvas) return;

      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const link = document.createElement("a");
      link.download = "real-triarte-conquista.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        id="print-area"
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "#fff",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "10px",
            textAlign: "left",
            background: "#fff"
          }}
        >
          <button
            onClick={fechar}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ✕
          </button>
        </div>

        {/* IMAGEM */}
        <div
          style={{
            width: "100%",
            height: "220px",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <img
            src={receita?.imagem || IMAGES.ui.logo}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(18px) brightness(0.7)",
              transform: "scale(1.2)"
            }}
          />

          <img
            src={receita?.imagem || IMAGES.ui.logo}
            alt="receita"
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CONTEÚDO */}
        <div style={{ padding: "18px", position: "relative" }}>
          
          {/* 🔥 LOGO CORRIGIDO */}
          <img
            src={IMAGES.ui.logo}
            style={{
              position: "absolute",
              top: "-32px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "65px",
              borderRadius: "50%",
              border: "4px solid #fff",
              background: "#fff",
              zIndex: 10
            }}
          />

          <div style={{ marginTop: "20px" }}>
            <div style={{ fontSize: "26px" }}>🎉</div>

            <h2>Parabéns!</h2>

            <p style={{ color: "#666", fontSize: "14px" }}>
              Você concluiu o projeto
            </p>

            <strong>{receita?.nome || "Receita"}</strong>

            <div style={{ fontSize: "13px", color: "#888" }}>
              {dataHoje}
            </div>
          </div>

          <button
            onClick={salvarImagem}
            style={{
              marginTop: "18px",
              width: "100%",
              padding: "14px",
              background: "#ff5a5a",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "800",
              cursor: "pointer"
            }}
          >
            📸 Salve este momento
          </button>
        </div>
      </div>
    </div>
  );
}