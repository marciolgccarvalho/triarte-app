import React from "react";

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
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer"
      }}
    >
      {/* IMAGEM */}
      <img
        src={receita?.imagem || "/images/logo/logo.webp"}
        alt={receita?.nome || "Receita"}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover"
        }}
      />

      {/* OVERLAY ESCURO */}
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
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2
        }}
      >
        <img
          src={
            isFavorito
              ? "/images/icons/favoritos.png"
              : "/images/icons/favoritos2.png"
          }
          alt="Favorito"
          style={{ width: "24px" }}
        />
      </div>

      {/* CONTEÚDO SOBRE A IMAGEM */}
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
        <strong
          style={{
            display: "block",
            fontSize: "14px",
            marginBottom: "4px"
          }}
        >
          {receita?.nome || "Receita"}
        </strong>

        {/* BARRA DE PROGRESSO */}
        <div
          style={{
            width: "100%",
            height: "5px",
            background: "rgba(255,255,255,0.3)",
            borderRadius: "5px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progresso}%`,
              height: "100%",
              background: "#ffd400"
            }}
          />
        </div>

        <span style={{ fontSize: "11px" }}>
          {progresso}% concluído
        </span>
      </div>
    </div>
  );
}