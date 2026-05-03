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
    <div className="modal-overlay">

      <div
        id="print-area"
        className="modal"
        style={{
          maxWidth: "360px",
          borderRadius: "22px",
          overflow: "hidden",
          textAlign: "center"
        }}
      >
        {/* HEADER */}
        <div className="flex" style={{ justifyContent: "flex-start" }}>
          <button onClick={fechar}>
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
        <div className="p-md" style={{ position: "relative" }}>
          
          {/* LOGO */}
          <img
            src={IMAGES.ui.logo}
            style={{
              position: "absolute",
              top: "-32px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "65px",
              borderRadius: "50%",
              border: "4px solid var(--color-bg-light)",
              background: "var(--color-bg-light)"
            }}
          />

          <div className="mt-md">
            <div className="title">🎉</div>

            <h2>Parabéns!</h2>

            <p className="small text-muted">
              Você concluiu o projeto
            </p>

            <strong>{receita?.nome || "Receita"}</strong>

            <div className="small text-muted">
              {dataHoje}
            </div>
          </div>

          <button
            onClick={salvarImagem}
            className="btn btn-primary mt-md"
            style={{ width: "100%", borderRadius: "30px" }}
          >
            📸 Salve este momento
          </button>
        </div>
      </div>

    </div>
  );
}