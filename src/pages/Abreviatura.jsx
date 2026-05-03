import React from "react";
import { IMAGES } from "../assets/images";

export default function Abreviatura({ voltar }) {

  // 🔥 TEXTO PARA COPIAR
  const textoParaCopiar = () => {
    const lista = [
      ["pb.", "Ponto Baixo"],
      ["pa.", "Ponto Alto"],
      ["mpa.", "Meio Ponto Alto"],
      ["pbx.", "Ponto Baixíssimo"],
      ["corr.", "Correntinha"],
      ["aum.", "Aumento"],
      ["dim.", "Diminuição"],
      ["AM", "Anel Mágico"],
      ["carr.", "Carreira"],
      ["rep.", "Repetir"],
      ["nov.", "Novelo"],
      ["ag.", "Agulha"]
    ];

    return (
      "🧶 Abreviações Crochê / Amigurumi\n\n" +
      lista.map(([a, d]) => `${a} - ${d}`).join("\n") +
      "\n\nReal Triarte 💛"
    );
  };

  return (
    <div>

      {/* VOLTAR */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={voltar}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer"
          }}
        >
          <img src={IMAGES.icons.anterior.active} style={{ width: "25px" }} />
        </button>
      </div>

      {/* TÍTULO */}
      <h2 style={{ marginBottom: "5px" }}>Abreviações</h2>

      {/* TEXTO */}
      <p
        style={{
          fontSize: "14px",
          color: "#444",
          lineHeight: "1.5",
          marginBottom: "10px",
          textAlign: "justify"
        }}
      >
        As abreviações ajudam a deixar as receitas de crochê, amigurumi e tricô mais rápidas e organizadas. Elas podem variar um pouco, mas seguem um padrão que você aprende com a prática. Use este guia como apoio 💛
      </p>

      {/* LISTA */}
      <div style={{ display: "grid", gap: "5px" }}>
        {[
          ["pb.", "Ponto Baixo"],
          ["pa.", "Ponto Alto"],
          ["mpa.", "Meio Ponto Alto"],
          ["pbx.", "Ponto Baixíssimo"],
          ["corr.", "Correntinha"],
          ["aum.", "Aumento"],
          ["dim.", "Diminuição"],
          ["AM", "Anel Mágico"],
          ["carr.", "Carreira"],
          ["rep.", "Repetir"],
          ["nov.", "Novelo"],
          ["ag.", "Agulha"]
        ].map(([abrev, desc], i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              background: "#fff",
              border: "1px solid #eee",
              borderRadius: "10px",

              padding: "10px"
            }}
          >
            <div
              style={{
                fontWeight: "800",
                fontSize: "14px",
                color: "#222"
              }}
            >
              {abrev}
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#666"
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO COPIAR */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(textoParaCopiar());
            alert("Lista copiada! Agora é só colar no WhatsApp 💛");
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "800",
            cursor: "pointer"
          }}
        >
          Copiar abreviações
        </button>
      </div>

    </div>
  );
}