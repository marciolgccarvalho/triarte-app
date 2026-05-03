import React from "react";
import html2canvas from "html2canvas";
import { IMAGES } from "../assets/images";

export default function ParabensModal({
  aberto,
  fechar = () => {},
  receita
}) {
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
      <div id="print-area" className="modal modal-parabens">

        {/* HEADER */}
        <div className="flex modal-header">
          <button onClick={fechar} className="btn-close">
            ✕
          </button>
        </div>

        {/* IMAGEM */}
        <div className="parabens-image-container">
          <img
            src={receita?.imagem || IMAGES.ui.logo}
            className="parabens-image-bg"
            alt=""
          />

          <img
            src={receita?.imagem || IMAGES.ui.logo}
            alt="receita"
            className="parabens-image-main"
          />
        </div>

        {/* CONTEÚDO */}
        <div className="p-md parabens-content">
          
          {/* LOGO */}
          <img
            src={IMAGES.ui.logo}
            alt="logo"
            className="parabens-logo"
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
            className="btn btn-primary mt-md btn-full"
          >
            📸 Salve este momento
          </button>
        </div>
      </div>
    </div>
  );
}