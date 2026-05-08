import React, { useEffect } from "react";
import html2canvas from "html2canvas";
import { IMAGES } from "@/assets/images";
import { playConquistaSound } from "@/utils/playConquistaSound";
import "@/styles/components/parabens.css";

export default function ParabensModal({
  aberto,
  fechar = () => {},
  receita
}) {

  // =========================================
  // SOM AO ABRIR
  // =========================================

  useEffect(() => {

    if (aberto) {

      playConquistaSound();
    }

  }, [aberto]);

  // =========================================
  // FECHADO
  // =========================================

  if (!aberto) return null;

  const dataHoje =
    new Date().toLocaleDateString("pt-BR");

  // =========================================
  // SALVAR IMAGEM
  // =========================================

  const salvarImagem = async () => {

    try {

      const elemento =
        document.getElementById("print-area");

      if (!elemento) return;

      const canvas = await html2canvas(
        elemento,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff"
        }
      );

      const link =
        document.createElement("a");

      link.download =
        "real-triarte-conquista.png";

      link.href =
        canvas.toDataURL("image/png");

      link.click();

    } catch (error) {

      console.error(
        "Erro ao salvar imagem:",
        error
      );
    }
  };

  // =========================================
  // COMPARTILHAR
  // =========================================

  const compartilharImagem = async () => {

    try {

      const elemento =
        document.getElementById("print-area");

      if (!elemento) return;

      const canvas = await html2canvas(
        elemento,
        {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff"
        }
      );

      const blob = await new Promise(
        (resolve) =>
          canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return;

      const file = new File(
        [blob],
        "real-triarte-conquista.png",
        {
          type: "image/png"
        }
      );

      // =========================================
      // SHARE NATIVO
      // =========================================

      if (
        navigator.canShare &&
        navigator.canShare({
          files: [file]
        })
      ) {

        await navigator.share({

          title: "Real Triarte",

          text:
            `Concluí o projeto ${receita?.nome}! 🧶✨`,

          files: [file]
        });

      } else {

        // fallback
        salvarImagem();
      }

    } catch (error) {

      console.error(
        "Erro ao compartilhar imagem:",
        error
      );
    }
  };

  return (

    <div className="modal-overlay">

      <div
        id="print-area"
        className="modal modal-parabens"
      >

        {/* HEADER */}

        <div className="modal-header">

          <button
            onClick={fechar}
            className="btn-close"
          >
            ✕
          </button>

        </div>

        {/* IMAGEM */}

        <div className="parabens-image-container">

          <img
            src={
              receita?.imagem ||
              IMAGES.ui.logo
            }
            alt=""
            className="parabens-image"
          />

        </div>

        {/* LOGO */}

        <div className="parabens-logo-wrapper">

          <img
            src={IMAGES.ui.logo}
            alt="logo"
            className="parabens-logo"
          />

        </div>

        {/* CONTEÚDO */}

        <div className="parabens-content">

          <div className="emoji">
            🎉
          </div>

          <h2>
            Parabéns!
          </h2>

          <p className="text-muted">
            Você concluiu o projeto
          </p>

          <strong>
            {receita?.nome}
          </strong>

          <div className="data">
            {dataHoje}
          </div>

          {/* AÇÕES */}

          <div className="parabens-actions">

            {/* SALVAR */}

            <button
              onClick={salvarImagem}
              className="btn-action"
            >

              <img
                src={
                  IMAGES.icons.salvar.active
                }
                alt="Salvar"
                className="btn-action-icon"
              />

              <span>
                Salvar
              </span>

            </button>

            {/* COMPARTILHAR */}

            <button
              onClick={compartilharImagem}
              className="btn-action"
            >

              <img
                src={
                  IMAGES.icons.compartilhar.active
                }
                alt="Compartilhar"
                className="btn-action-icon"
              />

              <span>
                Compartilhar
              </span>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}