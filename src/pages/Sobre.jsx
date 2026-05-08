import React from "react";

import { IMAGES } from "@/assets/images";

import "@/styles/pages/sobre.css";

export default function Sobre() {

  return (
    <div className="page sb-page">

      {/* HERO */}
      <section className="sb-hero">

        <div className="sb-brand">

          <div className="sb-logo-wrapper">

            <img
              src={IMAGES.ui.logo}
              alt="Real Triarte"
              className="sb-logo"
            />

          </div>

          <div className="sb-brand-text">

            <span className="sb-badge">
              Aplicativo Oficial
            </span>

            <h1 className="page-title sb-title">
              Real Triarte
            </h1>

            <p className="sb-subtitle">
              Organização, praticidade e inspiração
              para apaixonados por amigurumi.
            </p>

          </div>

        </div>

      </section>

      {/* STATUS */}
      <section className="sb-status-row">

        <div className="sb-status-card">
          <strong>Receitas</strong>

          <span>
            Conteúdos organizados para facilitar seu dia.
          </span>
        </div>

        <div className="sb-status-card">
          <strong>Progresso</strong>

          <span>
            Continue exatamente de onde parou.
          </span>
        </div>

        <div className="sb-status-card">
          <strong>Experiência</strong>

          <span>
            Navegação simples, leve e confortável.
          </span>
        </div>

      </section>

      {/* SOBRE */}
      <section className="sb-card">

        <div className="sb-card-header">

          <img
            src={IMAGES.icons.sobre.active}
            alt="Sobre"
            className="sb-card-icon"
          />

          <h2>
            Sobre o aplicativo
          </h2>

        </div>

        <div className="sb-card-content">

          <p>
            O Real Triarte foi desenvolvido para tornar
            a experiência com receitas de amigurumi mais
            prática, organizada e agradável.
          </p>

          <p>
            O aplicativo reúne conteúdos, materiais,
            progresso de vídeos, favoritos e recursos
            inteligentes para ajudar artesãos em todas
            as etapas do processo criativo.
          </p>

          <p>
            Cada detalhe visual e funcional foi pensado
            para oferecer conforto, simplicidade e uma
            navegação intuitiva tanto para iniciantes
            quanto para usuários mais experientes.
          </p>

        </div>

      </section>

      {/* RECURSOS */}
      <section className="sb-card">

        <div className="sb-card-header">

          <img
            src={IMAGES.icons.projeto.active}
            alt="Recursos"
            className="sb-card-icon"
          />

          <h2>
            O que você encontra aqui
          </h2>

        </div>

        <ul className="sb-list">

          <li>
            Receitas organizadas de forma prática.
          </li>

          <li>
            Sistema de favoritos para acesso rápido.
          </li>

          <li>
            Controle de progresso dos vídeos.
          </li>

          <li>
            Organização de materiais e linhas.
          </li>

          <li>
            Simulador de apoio para planejamento.
          </li>

          <li>
            Conquistas e acompanhamento de evolução.
          </li>

        </ul>

      </section>

      {/* DIFERENCIAL */}
      <section className="sb-card sb-highlight">

        <div className="sb-card-header">

          <img
            src={IMAGES.icons.conquistas.active}
            alt="Diferencial"
            className="sb-card-icon"
          />

          <h2>
            Nosso diferencial
          </h2>

        </div>

        <div className="sb-card-content">

          <p>
            O Real Triarte foi criado priorizando uma
            experiência visual confortável, intuitiva
            e acolhedora, evitando excesso de elementos
            e mantendo foco total na praticidade.
          </p>

          <p>
            O aplicativo evolui continuamente com novos
            conteúdos, melhorias e refinamentos pensados
            para a comunidade de artesanato.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <section className="sb-footer">

        <strong>
          Real Triarte
        </strong>

        <small>
          Desenvolvido com carinho para a comunidade
          apaixonada por amigurumi e artesanato.
        </small>

      </section>

    </div>
  );
}