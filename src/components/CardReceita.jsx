import React from "react";

export default function CardReceita({
  receita,
  abrirReceita,
  toggleFavorito,
  favoritos = [],
  percentual
}) {
  // proteção total
  if (!receita) return null;

  const isFavorito = Array.isArray(favoritos)
    ? favoritos.includes(receita.id)
    : false;

  const progresso =
    typeof percentual === "function"
      ? percentual(receita)
      : 0;

  return (
    <div
      onClick={() => abrirReceita && abrirReceita(receita)}
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        cursor: "pointer"
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={receita.imagem}
          alt={receita.nome}
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover"
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
            justifyContent: "center"
          }}
        >
          <img
            src={
              isFavorito
                ? "/images/icons/favoritos.png"
                : "/images/icons/favoritos2.png"
            }
            style={{ width: "24px" }}
          />
        </div>
      </div>

      <div style={{ padding: "12px" }}>
        <strong>{receita.nome}</strong>

        <p style={{ fontSize: "13px", color: "#666" }}>
          {receita.categoria}
        </p>

        <div
          style={{
            height: "6px",
            background: "#ddd",
            borderRadius: "6px",
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

        <p style={{ fontSize: "12px", marginTop: "4px" }}>
          {progresso}%
        </p>
      </div>
    </div>
  );
}