import React from "react";

import "../styles/components/projetos.css";

import ranking from "../data/ranking.json";
import percentual from "../data/percentual.json";

import { IMAGES } from "../assets/images";

function Projetos() {
  const [copiado, setCopiado] = React.useState(false);

  const dadosPercentual = percentual[0] || {};

  const percentualDesenvolvimento =
    dadosPercentual.Percentual || "0%";

  const dataAtualizacao =
    dadosPercentual.Data || "";

  const rankingOrdenado = [...ranking].sort(
    (a, b) => Number(b.Votos) - Number(a.Votos)
  );

  const totalVotos = rankingOrdenado.reduce(
    (total, item) => total + Number(item.Votos),
    0
  );

  let ultimaPosicao = 0;
  let ultimoVoto = null;

  const rankingComPosicao = rankingOrdenado.map((item, index) => {
    const votosAtual = Number(item.Votos);

    if (votosAtual !== ultimoVoto) {
      ultimaPosicao = index + 1;
      ultimoVoto = votosAtual;
    }

    return {
      ...item,
      posicao: ultimaPosicao,
    };
  });

  const principais = rankingComPosicao.slice(0, 9);
  const outros = rankingComPosicao.slice(9);

  const votosOutros = outros.reduce(
    (total, item) => total + Number(item.Votos),
    0
  );

  function calcularPercentual(votos) {
    if (!totalVotos) return "0,00%";

    return `${((Number(votos) / totalVotos) * 100)
      .toFixed(2)
      .replace(".", ",")}%`;
  }

  function gerarTextoRanking() {
    const listaPrincipal = rankingComPosicao
      .map(
        (item) =>
          `${item.posicao}º ${item.Personagem} - ${calcularPercentual(
            item.Votos
          )}`
      )
      .join("\n");

    return `Próximos Projetos - Real Triarte\n\nEm desenvolvimento:\nPrincesa Peach - ${percentualDesenvolvimento}\n\nEm votação:\n${listaPrincipal}\n\nÚltima atualização: ${dataAtualizacao}`;
  }

  async function copiarRanking() {
    try {
      await navigator.clipboard.writeText(gerarTextoRanking());

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 1800);
    } catch (error) {
      alert("Erro ao copiar ranking.");
    }
  }

  async function compartilharRanking() {
    const texto = gerarTextoRanking();

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Próximos Projetos - Real Triarte",
          text: texto,
        });
      } else {
        await navigator.clipboard.writeText(texto);
        alert("Seu dispositivo não suporta compartilhamento. O ranking foi copiado.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="projetos-page">
      <section className="projetos-hero">
        <h1 className="projetos-titulo">Próximos Projetos</h1>

        <p className="projetos-subtitulo">
          Acompanhe o que está em desenvolvimento
          <br />
          e vote nos próximos projetos! 💛
        </p>
      </section>

      <section className="projetos-card projetos-card-desenvolvimento">
        <span className="projetos-badge projetos-badge-amarelo">
          EM DESENVOLVIMENTO
        </span>

        <div className="projetos-desenvolvimento">
          <img
            src={IMAGES.ui.rankingimagem}
            alt="Princesa Peach"
            className="projetos-imagem"
          />

          <div className="projetos-info">
            <h2>Princesa Peach</h2>

            <div className="projetos-progresso">
              <div className="projetos-barra">
                <div
                  className="projetos-barra-fill"
                  style={{ width: percentualDesenvolvimento }}
                />
              </div>

              <strong>{percentualDesenvolvimento}</strong>
            </div>

            <p>Desenvolvimento em andamento</p>
          </div>
        </div>
      </section>

      <section className="projetos-card projetos-card-votacao">
        <span className="projetos-badge projetos-badge-verde">
          EM VOTAÇÃO
        </span>

        <div className="projetos-ranking">
          {principais.map((item) => (
            <div
              className={`projetos-item projetos-pos-${item.posicao}`}
              key={item.Personagem}
            >
              <div className="projetos-item-left">
                <span className="projetos-posicao">
                  {item.posicao}º
                </span>

                <strong className="projetos-nome">
                  {item.Personagem}
                </strong>
              </div>

              <strong className="projetos-percentual">
                {calcularPercentual(item.Votos)}
              </strong>
            </div>
          ))}

          {outros.length > 0 && (
            <div className="projetos-item projetos-outros">
              <div className="projetos-item-left">
                <span className="projetos-posicao">
                  {rankingComPosicao[9]?.posicao || 10}º
                </span>

                <strong className="projetos-nome">Outros</strong>
              </div>

              <strong className="projetos-percentual">
                {calcularPercentual(votosOutros)}
              </strong>
            </div>
          )}
        </div>
      </section>

      <div className="projetos-footer">
        {dataAtualizacao && (
          <p className="projetos-data">
            Última atualização: {dataAtualizacao}
          </p>
        )}

        <div className="projetos-acoes">
          <button
            type="button"
            className={`projetos-icon-btn ${
              copiado ? "projetos-icon-btn-success" : ""
            }`}
            onClick={copiarRanking}
            aria-label="Copiar ranking"
          >
            <img
              src={IMAGES.icons.salvar.active}
              alt=""
              className="projetos-icon-img"
            />
          </button>

          <button
            type="button"
            className="projetos-icon-btn"
            onClick={compartilharRanking}
            aria-label="Compartilhar ranking"
          >
            <img
              src={IMAGES.icons.compartilhar.active}
              alt=""
              className="projetos-icon-img"
            />
          </button>
        </div>
      </div>

      <div className="projetos-info-votacao">

        <p className="projetos-info-votacao-texto">
          Os votos estão sendo contabilizados
          através das enquetes
          oficiais do YouTube 💛
        </p>

        <a
          href="https://www.youtube.com/@RealTriarte/posts"
          target="_blank"
          rel="noopener noreferrer"
          className="projetos-btn-enquete"
        >
          Votar nas Enquetes
        </a>

      </div>

    </main>
  );
}

export default Projetos;