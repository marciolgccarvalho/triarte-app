import React from "react";
import "../styles/components/abreviacoes.css";
import { IMAGES } from "../assets/images";

export default function Abreviatura() {

  const lista = [
    { abrev: "pb.", nome: "Ponto Baixo" },
    { abrev: "pa.", nome: "Ponto Alto" },
    { abrev: "mpa.", nome: "Meio Ponto Alto" },
    { abrev: "pbx.", nome: "Ponto Baixíssimo" },
    { abrev: "corr.", nome: "Correntinha" },
    { abrev: "aum.", nome: "Aumento" },
    { abrev: "dim.", nome: "Diminuição" },
    { abrev: "AM", nome: "Anel Mágico" },
    { abrev: "carr.", nome: "Carreira" },
    { abrev: "rep.", nome: "Repetir" },
    { abrev: "nov.", nome: "Novelo" },
    { abrev: "ag.", nome: "Agulha" }
  ];

  const [copiado, setCopiado] = React.useState(false);

  const copiar = async () => {
    const texto = lista
      .map((item) => `${item.abrev} - ${item.nome}`)
      .join("\n");

    await navigator.clipboard.writeText(texto);
    setCopiado(true);
  };

  return (
    <div className="page-container abreviacoes-page">

      {/* HEADER COM IMAGEM */}
      <div className="abreviacoes-header">

        <img
          src={IMAGES.ui.abreviacoes}
          alt="Abreviações"
          className="abreviacoes-header-img"
        />

        <div>
          <h2>Abreviações</h2>
          <p>Guia rápido para receitas de crochê e amigurumi</p>
        </div>

      </div>

      {/* LISTA */}
      <div className="abreviacoes-card">

        {lista.map((item, index) => (
          <div key={index} className="abreviacao-row">

            <span className="abreviacao-tag">
              {item.abrev}
            </span>

            <span className="abreviacao-desc">
              {item.nome}
            </span>

          </div>
        ))}

      </div>

      {/* BOTÃO */}
      <button
        className="btn-primary abreviacoes-copy"
        onClick={copiar}
      >
        {copiado ? "Copiado!" : "Copiar abreviações"}
      </button>

    </div>
  );
}