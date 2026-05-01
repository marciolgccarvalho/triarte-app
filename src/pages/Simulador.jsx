// src/pages/Simulador.jsx

import React, { useState } from "react";

export default function Simulador() {
  const [linha, setLinha] = useState(0);
  const [olhos, setOlhos] = useState(0);
  const [enchimento, setEnchimento] = useState(0);
  const [outros, setOutros] = useState(0);

  const [horas, setHoras] = useState(0);
  const [valorHora, setValorHora] = useState(0);

  const [margem, setMargem] = useState(100);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const custoMaterial = linha + olhos + enchimento + outros;
  const custoMaoObra = horas * valorHora;
  const custoTotal = custoMaterial + custoMaoObra;
  const precoFinal = custoTotal * (1 + margem / 100);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px"
  };

  const bloco = {
    background: "#fff",
    padding: "14px",
    borderRadius: "14px",
    marginBottom: "12px"
  };

  return (
    <>
      {/* TÍTULO */}
      <h2 style={{ marginBottom: "5px" }}>
        Simulador de Preço
      </h2>

      <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
        Descubra quanto cobrar pelo seu amigurumi 🧶
      </p>

      {/* MATERIAIS */}
      <div style={bloco}>
        <strong>Materiais</strong>

        <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
          <input placeholder="Linha (R$)" type="number" style={inputStyle} onChange={(e) => setLinha(Number(e.target.value))} />
          <input placeholder="Olhos / acessórios (R$)" type="number" style={inputStyle} onChange={(e) => setOlhos(Number(e.target.value))} />
          <input placeholder="Enchimento (R$)" type="number" style={inputStyle} onChange={(e) => setEnchimento(Number(e.target.value))} />
          <input placeholder="Outros custos (R$)" type="number" style={inputStyle} onChange={(e) => setOutros(Number(e.target.value))} />
        </div>
      </div>

      {/* MÃO DE OBRA */}
      <div style={bloco}>
        <strong>Mão de obra</strong>

        <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
          <input placeholder="Horas de trabalho" type="number" style={inputStyle} onChange={(e) => setHoras(Number(e.target.value))} />
          <input placeholder="Valor por hora (R$)" type="number" style={inputStyle} onChange={(e) => setValorHora(Number(e.target.value))} />
        </div>
      </div>

      {/* LUCRO */}
      <div style={bloco}>
        <strong>Lucro</strong>

        <input
          placeholder="Margem de lucro (%)"
          type="number"
          style={{ ...inputStyle, marginTop: "10px" }}
          value={margem}
          onChange={(e) => setMargem(Number(e.target.value))}
        />
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => setMostrarResultado(true)}
        style={{
          width: "100%",
          padding: "14px",
          background: "#ffd400",
          border: "none",
          borderRadius: "12px",
          fontWeight: "800",
          fontSize: "16px"
        }}
      >
        Calcular preço
      </button>

      {/* RESULTADO */}
      {mostrarResultado && (
        <div
          style={{
            marginTop: "15px",
            background: "#fff",
            padding: "16px",
            borderRadius: "14px"
          }}
        >
          <p style={{ fontSize: "14px", color: "#666" }}>
            Materiais: <strong>R$ {custoMaterial.toFixed(2)}</strong>
          </p>

          <p style={{ fontSize: "14px", color: "#666" }}>
            Mão de obra: <strong>R$ {custoMaoObra.toFixed(2)}</strong>
          </p>

          <p style={{ fontSize: "15px", marginTop: "5px" }}>
            <strong>Custo total: R$ {custoTotal.toFixed(2)}</strong>
          </p>

          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "#fff8cc",
              borderRadius: "10px",
              textAlign: "center"
            }}
          >
            <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
              Preço sugerido
            </p>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: "24px",
                fontWeight: "800",
                color: "#222"
              }}
            >
              R$ {precoFinal.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}