import React from "react";

export default function Materiais({
  receita,
  voltar,
  listaMateriaisTexto
}) {
  if (!receita) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Nenhuma receita selecionada</h2>
      </div>
    );
  }

  return (
    <div>

      {/* BOTÃO VOLTAR */}
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
          <img
            src="/images/icons/anterior.png"
            style={{ width: "25px" }}
          />
        </button>
      </div>

      {/* TÍTULO */}
      <h2 style={{ marginBottom: "5px" }}>Materiais</h2>

      <p style={{ color: "#666", fontSize: "14px", marginBottom: "10px" }}>
        Compre os materiais pelo nosso link e ajude o Real Triarte 💛
      </p>

      {/* 🔥 BOTÃO MERCADO LIVRE (MOVIDO PARA CIMA) */}
      <button
        onClick={() =>
          window.open("https://mercadolivre.com/sec/1AW2X78", "_blank")
        }
        style={{
          marginBottom: "15px",
          width: "100%",
          padding: "14px",
          background: "#ffd400",
          border: "none",
          borderRadius: "12px",
          fontWeight: "800",
          cursor: "pointer"
        }}
      >
        Comprar no Mercado Livre
      </button>

      {/* LINHAS */}
      <h3 style={{ marginBottom: "8px" }}>Linhas</h3>

      <div style={{ display: "grid", gap: "8px", marginBottom: "12px" }}>
        {(receita.materiais?.linhas || []).map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff3b0",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "600"
            }}
          >
            🧶 {item}
          </div>
        ))}
      </div>

      {/* OUTROS */}
      <h3 style={{ marginBottom: "8px" }}>Outros materiais</h3>

      <div style={{ display: "grid", gap: "8px" }}>
        {(receita.materiais?.itens || []).map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          >
            ✔ {item}
          </div>
        ))}
      </div>

      {/* BOTÃO COPIAR */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(listaMateriaisTexto());
            alert("Lista copiada!");
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
          Copiar lista de materiais
        </button>
      </div>

    </div>
  );
}