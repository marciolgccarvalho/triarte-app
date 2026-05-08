import React, {
  useEffect
} from "react";

import { IMAGES } from "@/assets/images";

import "@/styles/components/conquista-modal.css";

export default function ConquistaModal({
  conquista,
  onClose = () => {}
}) {

  
  /* ========================================
     SOM
  ======================================== */

  useEffect(() => {

    try {

      const audio =
        new Audio("/audio/conquista.mp3");

      audio.volume = 0.7;

      audio.play();

    } catch (erro) {

      console.log(erro);

    }

  }, []);

  /* ========================================
     SHARE
  ======================================== */

  const compartilhar =
    async () => {

      try {

        if (navigator.share) {

          await navigator.share({

            title:
              "Nova conquista desbloqueada!",

            text:
              `Conquista desbloqueada no Real Triarte: ${conquista.nome}`,

            url:
              window.location.href

          });

        }

      } catch (erro) {

        console.log(erro);

      }

    };

  /* ========================================
     SAVE
  ======================================== */

  const salvarImagem = () => {

    alert(
      "Função salvar será implementada."
    );

  };

  if (!conquista) {
    return null;
  }

  return (

    <div
      className="cm-overlay"
      onClick={onClose}
    >

      <div
        className="cm-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* ========================================
            FECHAR
        ======================================== */}

        <button
          onClick={onClose}
          className="cm-close"
        >

          ×

        </button>

        {/* ========================================
            HERO
        ======================================== */}

        <img
          src={
            conquista.imagem ||
            conquista.icon ||
            conquista.icone
          }
          alt={
            conquista.nome
          }
          className="cm-banner"
        />

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="cm-content">

          <span className="cm-emoji">
            🎉
          </span>

          <h2 className="cm-title">
            Nova conquista!
          </h2>

          <p className="cm-subtitle">
            Você desbloqueou uma
            nova conquista.
          </p>

          <strong className="cm-name">
            {conquista.nome}
          </strong>

          <span className="cm-description">
            {conquista.descricao}
          </span>

          <div className="cm-rarity">
            {
              conquista.raridade ||
              "Especial"
            }
          </div>

        </div>

        {/* ========================================
            ACTIONS
        ======================================== */}

        <div className="cm-actions">

          <button
            onClick={salvarImagem}
            className="cm-btn"
          >

            <img
              src={
                IMAGES.icons.salvar.active
              }
              alt="Salvar"
              className="cm-btn-icon"
            />

            <span>
              Salvar
            </span>

          </button>

          <button
            onClick={compartilhar}
            className="cm-btn"
          >

            <img
              src={
                IMAGES.icons.compartilhar.active
              }
              alt="Compartilhar"
              className="cm-btn-icon"
            />

            <span>
              Compartilhar
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}