import React from "react";

import { IMAGES } from "../assets/images";

export default function Contato() {

  const [copiado, setCopiado] =
    React.useState(false);

  // ========================================
  // TEXTO SHARE
  // ========================================

  const textoCompartilhar = `
🌟 Real Triarte

Site:
https://triarte.com.br

YouTube:
https://www.youtube.com/@RealTriarte

Instagram:
https://instagram.com/realtriarte

Facebook:
https://www.facebook.com/realtriarteartesanato

TikTok:
https://www.tiktok.com/@triarteamigurumi

Email:
contato@triarte.com.br
`.trim();

  // ========================================
  // ITENS
  // ========================================

  const itens = [

    {
      icon:
        IMAGES.icons.site.active,

      label:
        "Site Oficial",

      action: () =>
        window.open(
          "https://triarte.com.br",
          "_blank"
        )
    },

    {
      icon:
        IMAGES.icons.youtube.active,

      label:
        "YouTube",

      action: () =>
        window.open(
          "https://www.youtube.com/@RealTriarte",
          "_blank"
        )
    },

    {
      icon:
        IMAGES.icons.instagram.active,

      label:
        "Instagram",

      action: () =>
        window.open(
          "https://instagram.com/realtriarte",
          "_blank"
        )
    },

    {
      icon:
        IMAGES.icons.facebook.active,

      label:
        "Facebook",

      action: () =>
        window.open(
          "https://www.facebook.com/realtriarteartesanato",
          "_blank"
        )
    },

    {
      icon:
        IMAGES.icons.tiktok.active,

      label:
        "TikTok",

      action: () =>
        window.open(
          "https://www.tiktok.com/@triarteamigurumi",
          "_blank"
        )
    }
  ];

  // ========================================
  // COPIAR
  // ========================================

  const copiar = async () => {

    try {

      await navigator.clipboard.writeText(
        textoCompartilhar
      );

      setCopiado(true);

      setTimeout(() => {

        setCopiado(false);

      }, 1800);

    } catch (error) {

      alert(
        "Erro ao copiar contatos."
      );
    }
  };

  // ========================================
  // SHARE
  // ========================================

  const compartilhar = async () => {

    try {

      if (navigator.share) {

        await navigator.share({

          title:
            "Real Triarte",

          text:
            textoCompartilhar
        });

      } else {

        await navigator.clipboard.writeText(
          textoCompartilhar
        );

        alert(
          "Seu dispositivo não suporta compartilhamento. Os contatos foram copiados."
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="page ct-page">

      {/* TOPO */}

      <div className="ct-top">

        <div>

          <h2 className="page-title">
            Contato
          </h2>

          <p className="text-muted mb-md">
            Fale conosco ou acompanhe nossos conteúdos:
          </p>

        </div>

        {/* AÇÕES */}

        <div className="ct-top-actions">

          {/* COPIAR */}

          <button
            className={`
              ct-icon-btn
              ${
                copiado
                  ? "ct-icon-btn-success"
                  : ""
              }
            `}
            onClick={copiar}
          >

            <img
              src={
                IMAGES.icons.salvar.active
              }
              alt="Copiar"
              className="ct-top-icon"
            />

          </button>

          {/* SHARE */}

          <button
            className="ct-icon-btn"
            onClick={compartilhar}
          >

            <img
              src={
                IMAGES.icons.compartilhar.active
              }
              alt="Compartilhar"
              className="ct-top-icon"
            />

          </button>

        </div>

      </div>

      {/* EMAIL */}

      <div
        className="ct-destaque"
        onClick={() =>
          window.location.href =
            "mailto:contato@triarte.com.br"
        }
        role="button"
        aria-label="Enviar email"
      >

        <img
          src={
            IMAGES.icons.email.active
          }
          alt="Email"
          className="ct-icon"
        />

        <div className="ct-destaque-text">

          <strong>
            Enviar email
          </strong>

          <p>
            contato@triarte.com.br
          </p>

        </div>

      </div>

      {/* REDES */}

      <div className="ct-list">

        {itens.map(
          (item, index) => (

            <button
              key={index}
              onClick={item.action}
              className="ct-item"
              aria-label={
                item.label
              }
            >

              <img
                src={item.icon}
                alt={item.label}
                className="ct-icon"
              />

              <span className="ct-label">
                {item.label}
              </span>

              <span className="ct-arrow">
                ›
              </span>

            </button>
          )
        )}

      </div>

    </div>
  );
}