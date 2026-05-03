import React from "react";
import { IMAGES } from "../assets/images";

export default function Materiais({
  receita,
  voltar,
  listaMateriaisTexto
}) {
  if (!receita) {
    return (
      <div className="p-md">
        <h2>Nenhuma receita selecionada</h2>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* VOLTAR */}
      <div className="mb-sm">
        <button onClick={voltar} className="btn-icon">
          <img
            src={IMAGES.icons.anterior.active}
            alt="Voltar"
            className="icon-sm"
          />
        </button>
      </div>

      {/* TÍTULO */}
      <h2 className="mb-sm">Materiais</h2>

      <p className="small text-muted mb-sm">
        Compre os materiais pelo nosso link e ajude o Real Triarte 💛
      </p>

      {/* BOTÃO MERCADO LIVRE */}
      <button
        onClick={() =>
          window.open("https://mercadolivre.com/sec/1AW2X78", "_blank")
        }
        className="btn btn-primary mb-md btn-full"
      >
        Comprar no Mercado Livre
      </button>

      {/* LINHAS */}
      <h3 className="mb-sm">Linhas</h3>

      <div className="grid gap-sm mb-md">
        {(receita.materiais?.linhas || []).map((item, index) => (
          <div
            key={index}
            className="card material-highlight"
          >
            🧶 {item}
          </div>
        ))}
      </div>

      {/* OUTROS */}
      <h3 className="mb-sm">Outros materiais</h3>

      <div className="grid gap-sm">
        {(receita.materiais?.itens || []).map((item, index) => (
          <div key={index} className="card">
            ✔ {item}
          </div>
        ))}
      </div>

      {/* BOTÃO COPIAR */}
      <div className="mt-md">
        <button
          onClick={() => {
            navigator.clipboard.writeText(listaMateriaisTexto());
            alert("Lista copiada!");
          }}
          className="btn btn-secondary btn-full"
        >
          Copiar lista de materiais
        </button>
      </div>

    </div>
  );
}