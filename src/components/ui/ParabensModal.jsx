import React from "react";
import html2canvas from "html2canvas";
import { IMAGES } from "@/assets/images";
import "@/styles/components/parabens.css";

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
      if (!elemento) return;

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
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div id="print-area" className="modal modal-parabens">

        <div className="modal-header">
          <button onClick={fechar} className="btn-close">✕</button>
        </div>

        {/* IMAGEM */}
        <div className="parabens-image-container">
          <img
            src={receita?.imagem || IMAGES.ui.logo}
            alt=""
            className="parabens-image"
          />
        </div>

        {/* LOGO (FORA DA IMAGEM) */}
        <div className="parabens-logo-wrapper">
          <img
            src={IMAGES.ui.logo}
            alt="logo"
            className="parabens-logo"
          />
        </div>

        {/* CONTEÚDO */}
        <div className="parabens-content">
          <div className="emoji">🎉</div>

          <h2>Parabéns!</h2>

          <p className="text-muted">
            Você concluiu o projeto
          </p>

          <strong>{receita?.nome}</strong>

          <div className="data">{dataHoje}</div>

          <button
            onClick={salvarImagem}
            className="btn btn-primary btn-full"
          >
            📸 Salve este momento
          </button>
        </div>

      </div>
    </div>
  );
}