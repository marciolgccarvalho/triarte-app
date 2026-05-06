import React from "react";
import { IMAGES } from "../assets/images";

export default function Simulador() {
  const [dados, setDados] = React.useState({
    linha: "",
    olhos: "",
    enchimento: "",
    outros: "",
    horas: "",
    valorHora: "",
    lucro: "100"
  });

  const [copiado, setCopiado] = React.useState(false);

  const moedaParaNumero = (valor) => {
    if (!valor) return 0;

    return Number(
      String(valor)
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .replace(/[^\d.]/g, "")
    ) || 0;
  };

  const atualizarCampo = (campo, valor) => {
    setDados((atual) => ({
      ...atual,
      [campo]: valor
    }));

    setCopiado(false);
  };

  const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  /* =========================
     CÁLCULO AUTOMÁTICO
  ========================= */

  const custoMateriais =
    moedaParaNumero(dados.linha) +
    moedaParaNumero(dados.olhos) +
    moedaParaNumero(dados.enchimento) +
    moedaParaNumero(dados.outros);

  const custoMaoObra =
    moedaParaNumero(dados.horas) * moedaParaNumero(dados.valorHora);

  const custoTotal = custoMateriais + custoMaoObra;

  const percentualLucro = moedaParaNumero(dados.lucro);

  const valorLucro = custoTotal * (percentualLucro / 100);

  const precoSugerido = custoTotal + valorLucro;

  /* =========================
     COPIAR
  ========================= */

  const copiarValor = async () => {
    const valor = formatarMoeda(precoSugerido);

    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="page-container simulador-page">

      {/* HEADER COM IMAGEM */}
      <div className="simulador-header">

        <img
          src={IMAGES.ui.simuladorPreco}
          alt="Simulador"
          className="simulador-header-img"
        />

        <div>
          <h2>Simulador de Preço</h2>
          <p>
            Preencha as informações e veja o valor sugerido mudar automaticamente.
          </p>
        </div>

      </div>

      {/* MATERIAIS */}
      <div className="simulador-card">
        <h3>Custos do produto</h3>

        <div className="simulador-grid">

          <label>
            Linha
            <input
              type="number"
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={dados.linha}
              onChange={(e) => atualizarCampo("linha", e.target.value)}
            />
          </label>

          <label>
            Olhos / acessórios
            <input
              type="number"
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={dados.olhos}
              onChange={(e) => atualizarCampo("olhos", e.target.value)}
            />
          </label>

          <label>
            Enchimento
            <input
              type="number"
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={dados.enchimento}
              onChange={(e) => atualizarCampo("enchimento", e.target.value)}
            />
          </label>

          <label>
            Outros custos
            <input
              type="number"
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={dados.outros}
              onChange={(e) => atualizarCampo("outros", e.target.value)}
            />
          </label>

        </div>
      </div>

      {/* MÃO DE OBRA */}
      <div className="simulador-card">
        <h3>Mão de obra</h3>

        <div className="simulador-grid">

          <label>
            Horas de trabalho
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 6"
              value={dados.horas}
              onChange={(e) => atualizarCampo("horas", e.target.value)}
            />
          </label>

          <label>
            Valor por hora
            <input
              type="number"
              inputMode="decimal"
              placeholder="R$ 0,00"
              value={dados.valorHora}
              onChange={(e) => atualizarCampo("valorHora", e.target.value)}
            />
          </label>

        </div>
      </div>

      {/* LUCRO */}
      <div className="simulador-card simulador-lucro">

        <label>
          Lucro desejado (%)
          <input
            type="number"
            inputMode="decimal"
            placeholder="Ex: 100"
            value={dados.lucro}
            onChange={(e) => atualizarCampo("lucro", e.target.value)}
          />
        </label>

        <p>
          Exemplo: 100% dobra o custo total para formar o preço de venda.
        </p>

      </div>

      {/* RESULTADO */}
      <div className="simulador-resultado">

        <span>Preço sugerido</span>

        <strong>
          {formatarMoeda(precoSugerido)}
        </strong>

        <button
          type="button"
          onClick={copiarValor}
          disabled={precoSugerido <= 0}
          className="sim-btn btn btn-primary"
        >
          {copiado ? "Valor copiado!" : "Copiar valor"}
        </button>

      </div>

    </div>
  );
}