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

  const [abvCopiado, setAbvCopiado] = React.useState(false);

  const copiar = async () => {

    const texto = lista
      .map((item) => `${item.abrev} - ${item.nome}`)
      .join("\n");

    await navigator.clipboard.writeText(texto);

    setAbvCopiado(true);

    setTimeout(() => {
      setAbvCopiado(false);
    }, 1500);

  };

  return (

    <div className="page-container abv-page">

      {/* HEADER */}

      <div className="abv-header">

        <div className="abv-header-icon">

          <img
            src={IMAGES.ui.abreviacoes}
            alt="Abreviações"
            className="abv-header-image"
          />

        </div>

        <div className="abv-header-content">

          <h2 className="abv-title">
            Abreviações
          </h2>

          <p className="abv-subtitle">
            Guia rápido para receitas de crochê e amigurumi
          </p>

        </div>

      </div>

      {/* LISTA */}

      <div className="abv-card">

        {lista.map((item, index) => (

          <div
            key={index}
            className="abv-row"
          >

            <div className="abv-tag">
              {item.abrev}
            </div>

            <div className="abv-desc">
              {item.nome}
            </div>

          </div>

        ))}

      </div>

      {/* BOTÃO */}

      <button
        className={`
          btn
          btn-primary
          btn-full
          abv-copy-btn
          ${abvCopiado ? "abv-copy-success" : ""}
        `}
        onClick={copiar}
      >

        {abvCopiado
          ? "✔ Copiado!"
          : "Copiar abreviações"}

      </button>

    </div>

  );

}