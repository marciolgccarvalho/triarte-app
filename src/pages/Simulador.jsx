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

  return (
    <>
      {/* TÍTULO */}
      <h2 className="mb-sm">Simulador de Preço</h2>

      <p className="small text-muted mb-md">
        Descubra quanto cobrar pelo seu amigurumi 🧶
      </p>

      {/* MATERIAIS */}
      <div className="card mb-sm">
        <strong>Materiais</strong>

        <div className="grid gap-sm mt-sm">
          <input className="input" placeholder="Linha (R$)" type="number" onChange={(e) => setLinha(Number(e.target.value))} />
          <input className="input" placeholder="Olhos / acessórios (R$)" type="number" onChange={(e) => setOlhos(Number(e.target.value))} />
          <input className="input" placeholder="Enchimento (R$)" type="number" onChange={(e) => setEnchimento(Number(e.target.value))} />
          <input className="input" placeholder="Outros custos (R$)" type="number" onChange={(e) => setOutros(Number(e.target.value))} />
        </div>
      </div>

      {/* MÃO DE OBRA */}
      <div className="card mb-sm">
        <strong>Mão de obra</strong>

        <div className="grid gap-sm mt-sm">
          <input className="input" placeholder="Horas de trabalho" type="number" onChange={(e) => setHoras(Number(e.target.value))} />
          <input className="input" placeholder="Valor por hora (R$)" type="number" onChange={(e) => setValorHora(Number(e.target.value))} />
        </div>
      </div>

      {/* LUCRO */}
      <div className="card mb-sm">
        <strong>Lucro</strong>

        <input
          className="input mt-sm"
          placeholder="Margem de lucro (%)"
          type="number"
          value={margem}
          onChange={(e) => setMargem(Number(e.target.value))}
        />
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => setMostrarResultado(true)}
        className="btn btn-primary mb-md"
        style={{ width: "100%" }}
      >
        Calcular preço
      </button>

      {/* RESULTADO */}
      {mostrarResultado && (
        <div className="card">
          <p className="small text-muted">
            Materiais: <strong>R$ {custoMaterial.toFixed(2)}</strong>
          </p>

          <p className="small text-muted">
            Mão de obra: <strong>R$ {custoMaoObra.toFixed(2)}</strong>
          </p>

          <p className="mt-sm">
            <strong>Custo total: R$ {custoTotal.toFixed(2)}</strong>
          </p>

          <div
            className="mt-md text-center"
            style={{
              padding: "12px",
              background: "var(--color-accent)",
              borderRadius: "var(--radius-md)"
            }}
          >
            <p className="small text-muted">
              Preço sugerido
            </p>

            <p className="title">
              R$ {precoFinal.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </>
  );
}