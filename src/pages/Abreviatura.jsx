import React from "react";
import { IMAGES } from "../assets/images";

export default function Abreviatura({ voltar }) {

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

  const textoParaCopiar = () => {
    return (
      "🧶 Abreviações Crochê / Amigurumi\n\n" +
      lista.map(([a, d]) => `${a} - ${d}`).join("\n") +
      "\n\nReal Triarte 💛"
    );
  };

  return (
    <div>

      {/* VOLTAR */}
      <div className="mb-sm">
        <button onClick={voltar}>
          <img src={IMAGES.icons.anterior.active} style={{ width: "25px" }} />
        </button>
      </div>

      {/* TÍTULO */}
      <h2 className="mb-sm">Abreviações</h2>

      {/* TEXTO */}
      <p className="small text-muted mb-sm" style={{ lineHeight: "1.5", textAlign: "justify" }}>
        As abreviações ajudam a deixar as receitas de crochê, amigurumi e tricô mais rápidas e organizadas. Elas podem variar um pouco, mas seguem um padrão que você aprende com a prática. Use este guia como apoio 💛
      </p>

      {/* LISTA */}
      <div className="grid gap-sm">
        {lista.map(([abrev, desc], i) => (
          <div key={i} className="card flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div className="title">
              {abrev}
            </div>

            <div className="small text-muted">
              {desc}
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO COPIAR */}
      <div className="mt-md">
        <button
          onClick={() => {
            navigator.clipboard.writeText(textoParaCopiar());
            alert("Lista copiada! Agora é só colar no WhatsApp 💛");
          }}
          className="btn btn-secondary"
          style={{ width: "100%" }}
        >
          Copiar abreviações
        </button>
      </div>

    </div>
  );
}