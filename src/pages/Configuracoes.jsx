import React, { useState } from "react";

import { IMAGES } from "@/assets/images";

import "@/styles/pages/configuracoes.css";

export default function Configuracoes() {

  const [atualizando, setAtualizando] =
    useState(false);

  const atualizarAplicativo = () => {

    setAtualizando(true);

    setTimeout(() => {

      window.location.reload();

    }, 700);

  };

  return (
    <div className="page cfg-page">

      {/* HERO */}
      <section className="cfg-hero">

        <div className="cfg-hero-top">

          <div className="cfg-brand">

            <div className="cfg-logo-wrapper">

              <img
                src={IMAGES.ui.logo}
                alt="Real Triarte"
                className="cfg-logo"
              />

            </div>

            <div>

              <span className="cfg-badge">
                Configurações do App
              </span>

              <h1 className="page-title cfg-title">
                Configurações
              </h1>

              <p className="cfg-subtitle">
                Informações técnicas e atualização
                do aplicativo Real Triarte.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATUS */}
      <section className="cfg-status-row">

        <div className="cfg-status-card">
          <strong>Versão</strong>

          <span>
            Aplicativo atualizado e otimizado.
          </span>
        </div>

        <div className="cfg-status-card">
          <strong>PWA</strong>

          <span>
            Melhor experiência mobile possível.
          </span>
        </div>

        <div className="cfg-status-card">
          <strong>Atualizações</strong>

          <span>
            Melhorias contínuas no sistema.
          </span>
        </div>

      </section>

      {/* CARD PRINCIPAL */}
      <section className="cfg-card">

        <div className="cfg-card-header">

          <img
            src={IMAGES.icons.configuracoes.active}
            alt="Configurações"
            className="cfg-card-icon"
          />

          <h2>
            Aplicativo
          </h2>

        </div>

        <div className="cfg-card-content">

          <div className="cfg-version-box">

            <div>

              <strong className="cfg-version-label">
                Versão atual
              </strong>

              <span className="cfg-version-number">
                1.0.0
              </span>

            </div>

            <div className="cfg-version-status">
              Atualizado
            </div>

          </div>

          <button
            onClick={atualizarAplicativo}
            className={`cfg-update-btn ${
              atualizando
                ? "cfg-update-btn-loading"
                : ""
            }`}
          >

            <img
              src={IMAGES.icons.configuracoes.active}
              alt="Atualizar"
              className="cfg-update-icon"
            />

            <span>
              {
                atualizando
                  ? "Atualizando aplicativo..."
                  : "Atualizar aplicativo"
              }
            </span>

          </button>

          <p className="cfg-update-info">
            Utilize esta opção para atualizar o
            aplicativo e carregar a versão mais
            recente disponível no sistema.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <section className="cfg-footer">

        <strong>
          Real Triarte
        </strong>

        <small>
          Aplicativo em constante evolução para
          oferecer a melhor experiência possível.
        </small>

      </section>

    </div>
  );
}