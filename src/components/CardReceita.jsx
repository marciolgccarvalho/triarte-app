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
      className="card card-receita"
      style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
    >
      {/* IMAGEM */}
      <img
        src={receita?.imagem || IMAGES.ui.logo}
        alt={receita?.nome || "Receita"}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover"
        }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))"
        }}
      />

      {/* FAVORITO */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorito && toggleFavorito(receita.id);
        }}
        className="flex-center"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          zIndex: 2
        }}
      >
        <img
          src={
            isFavorito
              ? IMAGES.icons.favoritos.active
              : IMAGES.icons.favoritos.inactive
          }
          alt="Favorito"
          style={{ width: "24px" }}
        />
      </div>

      {/* CONTEÚDO */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
          color: "#fff",
          zIndex: 2
        }}
      >
        <strong className="small">
          {receita?.nome || "Receita"}
        </strong>

        {/* PROGRESSO */}
        <div
          style={{
            width: "100%",
            height: "5px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: "5px",
            overflow: "hidden",
            marginTop: "4px"
          }}
        >
          <div
            style={{
              width: `${progresso}%`,
              height: "100%",
              background: "var(--color-accent)"
            }}
          />
        </div>

        <span className="small">
          {progresso}% concluído
        </span>
      </div>
    </div>
  );
}