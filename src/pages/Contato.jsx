import React, { useState } from "react";

import { IMAGES } from "@/assets/images";

import "@/styles/pages/contato.css";

export default function Contato() {

  const [copiado, setCopiado] = useState(false);

  const email = "contato@realtriarte.com.br";

  const copiarEmail = async () => {

    try {

      await navigator.clipboard.writeText(email);

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 1800);

    } catch (erro) {
      console.log(erro);
    }

  };

  const compartilhar = async () => {

    try {

      if (navigator.share) {

        await navigator.share({
          title: "Real Triarte",
          text:
            "Conheça o aplicativo Real Triarte.",
          url: window.location.href
        });

      }

    } catch (erro) {
      console.log(erro);
    }

  };

  return (
    <div className="page ct-page">

      {/* HERO */}
      <section className="ct-hero">

        <div className="ct-hero-top">

          <div className="ct-brand">

            <div className="ct-logo-wrapper">

              <img
                src={IMAGES.ui.logo}
                alt="Real Triarte"
                className="ct-logo"
              />

            </div>

            <div>

              <span className="ct-badge">
                Contato Oficial
              </span>

              <h1 className="page-title ct-title">
                Fale conosco
              </h1>

              <p className="ct-subtitle">
                Redes sociais, canais oficiais e suporte
                do aplicativo Real Triarte.
              </p>

            </div>

          </div>

          <div className="ct-top-actions">

            <button
              onClick={compartilhar}
              className="ct-icon-btn"
            >

              <img
                src={IMAGES.icons.compartilhar.active}
                alt="Compartilhar"
                className="ct-top-icon"
              />

            </button>

            <button
              onClick={copiarEmail}
              className={`ct-icon-btn ${
                copiado
                  ? "ct-icon-btn-success"
                  : ""
              }`}
            >

              <img
                src={IMAGES.icons.salvar.active}
                alt="Copiar email"
                className="ct-top-icon"
              />

            </button>

          </div>

        </div>

      </section>

      {/* STATUS */}
      <section className="ct-status-row">

        <div className="ct-status-card">
          <strong>Suporte</strong>

          <span>
            Atendimento e canais oficiais.
          </span>
        </div>

        <div className="ct-status-card">
          <strong>Comunidade</strong>

          <span>
            Conteúdos e novidades diariamente.
          </span>
        </div>

        <div className="ct-status-card">
          <strong>Atualizações</strong>

          <span>
            Melhorias contínuas no aplicativo.
          </span>
        </div>

      </section>

      {/* EMAIL */}
      <section
        className="ct-destaque"
        onClick={copiarEmail}
      >

        <div className="ct-destaque-icon-wrapper">

          <img
            src={IMAGES.icons.email.active}
            alt="Email"
            className="ct-icon"
          />

        </div>

        <div className="ct-destaque-text">

          <strong>
            {email}
          </strong>

          <p>
            Toque para copiar o email oficial.
          </p>

        </div>

      </section>

      {/* LISTA */}
      <section className="ct-list">

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-item"
        >

          <img
            src={IMAGES.icons.youtube.active}
            alt="YouTube"
            className="ct-icon"
          />

          <span className="ct-label">
            YouTube
          </span>

          <span className="ct-arrow">
            →
          </span>

        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-item"
        >

          <img
            src={IMAGES.icons.instagram.active}
            alt="Instagram"
            className="ct-icon"
          />

          <span className="ct-label">
            Instagram
          </span>

          <span className="ct-arrow">
            →
          </span>

        </a>

        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-item"
        >

          <img
            src={IMAGES.icons.tiktok.active}
            alt="TikTok"
            className="ct-icon"
          />

          <span className="ct-label">
            TikTok
          </span>

          <span className="ct-arrow">
            →
          </span>

        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-item"
        >

          <img
            src={IMAGES.icons.facebook.active}
            alt="Facebook"
            className="ct-icon"
          />

          <span className="ct-label">
            Facebook
          </span>

          <span className="ct-arrow">
            →
          </span>

        </a>

      </section>

      {/* FOOTER */}
      <section className="ct-footer">

        <strong>
          Real Triarte
        </strong>

        <small>
          Obrigado por fazer parte da nossa comunidade.
        </small>

      </section>

    </div>
  );
}