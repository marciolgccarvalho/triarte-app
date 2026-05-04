import React from "react";
import { IMAGES } from "../assets/images";

export default function Abreviacoes({ irPara }) {

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

    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  };

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="abreviacoes-header">

        <button
          className="btn-icon"
          onClick={() => irPara("mais")}
        >
          <img src={IMAGES.icons.anterior.active} />
        </button>

        <div>
          <h2>Abreviações</h2>
          <p>
            Guia rápido para entender receitas de crochê e amigurumi.
          </p>
        </div>

      </div>

      {/* LISTA */}
      <div className="abreviacoes-lista">

        {lista.map((item, index) => (
          <div key={index} className="abreviacao-item">

            <span className="abreviacao-chave">
              {item.abrev}
            </span>

            <span className="abreviacao-valor">
              {item.nome}
            </span>

          </div>
        ))}

      </div>

      {/* BOTÃO */}
      <button
        className="btn-primary abreviacoes-btn"
        onClick={copiar}
      >
        {copiado ? "Copiado!" : "Copiar abreviações"}
      </button>

    </div>
  );
}