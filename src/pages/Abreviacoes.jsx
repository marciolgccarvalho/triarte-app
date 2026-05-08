import React from "react";
import { IMAGES } from "@/assets/images";

export default function abreviacoes() {

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

  const [abvCopiado, setAbvCopiado] =
    React.useState(false);

  // ========================================
  // COPIAR
  // ========================================

  const copiar = async () => {

    const texto = lista
      .map(
        (item) =>
          `${item.abrev} - ${item.nome}`
      )
      .join("\n");

    try {

      await navigator.clipboard.writeText(
        texto
      );

      setAbvCopiado(true);

      setTimeout(() => {

        setAbvCopiado(false);

      }, 1500);

    } catch (error) {

      alert(
        "Erro ao copiar abreviações."
      );
    }
  };

  // ========================================
  // SHARE
  // ========================================

  const compartilhar = async () => {

    const texto = lista
      .map(
        (item) =>
          `${item.abrev} - ${item.nome}`
      )
      .join("\n");

    try {

      if (navigator.share) {

        await navigator.share({

          title: "Abreviações",

          text: texto
        });

      } else {

        await navigator.clipboard.writeText(
          texto
        );

        alert(
          "Seu dispositivo não suporta compartilhamento. A lista foi copiada."
        );
      }

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="page-container abv-page">

      {/* HEADER */}

      <div className="abv-header">

        {/* ÍCONE */}

        <div className="abv-header-icon">

          <img
            src={IMAGES.ui.abreviacoes}
            alt="Abreviações"
            className="abv-header-image"
          />

        </div>

        {/* TEXTOS */}

        <div className="abv-header-content">

          <h2 className="abv-title">
            Abreviações
          </h2>

          <p className="abv-subtitle">
            Guia rápido para receitas de crochê e amigurumi
          </p>

        </div>

        {/* AÇÕES */}

        <div className="abv-top-actions">

          {/* COPIAR */}

          <button
            className={`
              abv-icon-btn
              ${
                abvCopiado
                  ? "abv-icon-btn-success"
                  : ""
              }
            `}
            onClick={copiar}
          >

            <img
              src={
                IMAGES.icons.salvar.active
              }
              alt="Copiar"
              className="abv-icon-img"
            />

          </button>

          {/* SHARE */}

          <button
            className="abv-icon-btn"
            onClick={compartilhar}
          >

            <img
              src={
                IMAGES.icons.compartilhar.active
              }
              alt="Compartilhar"
              className="abv-icon-img"
            />

          </button>

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

    </div>
  );
}