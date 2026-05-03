import React from "react";
import { IMAGES } from "../assets/images";

export default function CardReceita({
  receita,
  abrirReceita,
  toggleFavorito,
  favoritos = [],
  percentual
}) {
  if (!receita) return null;

  const isFavorito = Array.isArray(favoritos)
    ? favoritos.includes(receita.id)
    : false;

  const progresso =
    typeof percentual === "function" ? percentual(receita) : 0;

  return (
    <div
      onClick={() => abrirReceita && abrirReceita(receita)}
      className="card-receita"
    >
      {/* IMAGEM */}
      <img
        src={receita?.imagem || IMAGES.ui.logo}
        alt={receita?.nome || "Receita"}
        loading="lazy"
        decoding="async"
        className="card-receita-img"
      />

      {/* OVERLAY */}
      <div className="card-receita-overlay" />

      {/* FAVORITO */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorito && toggleFavorito(receita.id);
        }}
        className="card-favorito"
      >
        <img
          src={
            isFavorito
              ? IMAGES.icons.favoritos.active
              : IMAGES.icons.favoritos.inactive
          }
          alt="Favorito"
          className="card-favorito-icon"
        />
      </button>

      {/* CONTEÚDO */}
      <div className="card-receita-content">
        <strong className="card-receita-title">
          {receita?.nome || "Receita"}
        </strong>

        {/* PROGRESSO */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progresso}%` }}
          />
        </div>

        <span className="card-receita-progress">
          {progresso}% concluído
        </span>
      </div>
    </div>
  );
}