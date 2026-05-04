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
      className="card-receita card-clickable"
    >
      {/* IMAGEM */}
      <div className="card-receita-img-wrapper">
        <img
          src={receita?.imagem || IMAGES.ui.logo}
          alt={receita?.nome || "Receita"}
          loading="lazy"
          decoding="async"
          className="card-receita-img"
        />

        {/* FAVORITO */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorito && toggleFavorito(receita.id);
          }}
          className={`card-favorito ${isFavorito ? "ativo" : ""}`}
          aria-label="Favoritar receita"
        >
          <img
            src={IMAGES.icons.favoritos.active}
            alt="Favorito"
            className="card-favorito-icon"
          />
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="card-body">
        <strong className="card-title">
          {receita?.nome || "Receita"}
        </strong>

        {/* PROGRESSO */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progresso}%` }}
          />
        </div>

        <span className="card-progress">
          {progresso}% concluído
        </span>
      </div>
    </div>
  );
}