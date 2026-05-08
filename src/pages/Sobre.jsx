import React from "react";
import { IMAGES } from "@/assets/images";
import "@/styles/pages/sobre.css";

export default function Sobre() {
  return (
    <div className="page sb-page">

      {/* HERO */}
      <div className="sb-hero">
        <div className="sb-brand">
          <img
            src={IMAGES.ui.logo}
            alt="Real Triarte"
            className="sb-logo"
          />

          <div className="sb-brand-text">
            <h1 className="sb-title">Real Triarte</h1>

            <p className="sb-subtitle">
              Aprenda amigurumi de forma simples e no seu tempo
            </p>
          </div>
        </div>
      </div>

      {/* QUEM SOMOS */}
      <div className="sb-card">
        <h3>Quem somos</h3>

        <p>
          O Real Triarte foi criado para ajudar você a aprender amigurumi
          de forma clara e sem complicação.
        </p>

        <p className="mt-sm">
          Aqui você encontra receitas organizadas e um caminho fácil
          de seguir, mesmo que esteja começando agora.
        </p>
      </div>

      {/* O QUE VOCÊ ENCONTRA */}
      <div className="sb-card">
        <h3>O que você encontra aqui</h3>

        <ul className="sb-list">
          <li>Receitas passo a passo</li>
          <li>Vídeos fáceis de acompanhar</li>
          <li>Controle do seu progresso</li>
          <li>Lista de materiais</li>
          <li>Receitas favoritas</li>
          <li>Simulador de preço</li>
        </ul>
      </div>

      {/* DIFERENCIAL */}
      <div className="sb-card">
        <h3>Por que usar o Real Triarte?</h3>

        <p>
          Tudo foi pensado para facilitar sua vida. Você não precisa
          ficar procurando informações em vários lugares.
        </p>

        <p className="mt-sm">
          Aqui você encontra tudo organizado, em um só lugar,
          de forma simples e prática.
        </p>
      </div>

      {/* DESTAQUE */}
      <div className="sb-card sb-highlight">
        <strong>Você consegue aprender no seu ritmo 💛</strong>

        <p className="mt-sm">
          Sem pressa, sem dificuldade, do seu jeito.
        </p>
      </div>

      {/* FOOTER */}
      <div className="sb-footer">
        <p>Real Triarte v1.0.0</p>
        <p>Desenvolvido no Brasil</p>
      </div>

    </div>
  );
}