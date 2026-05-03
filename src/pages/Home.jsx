import React from "react";
import CardReceita from "../components/CardReceita";
import { IMAGES } from "../assets/images";

export default function Home({
  mensagemAtual,
  ultimaReceita,
  receitas = [],
  receitasRandom = [],
  abrirReceita = () => {},
  percentual = () => 0,
  toggleFavorito = () => {},
  favoritos = []
}) {
  const [indexCarrossel, setIndexCarrossel] = React.useState(0);

  const hoje = React.useMemo(() => new Date(), []);

  const receitasDestaque = React.useMemo(() => {
    return receitas.filter((r) => {
      if (!r?.destaqueInicio || !r?.destaqueFim) return false;

      const inicio = new Date(r.destaqueInicio);
      const fim = new Date(r.destaqueFim);

      return hoje >= inicio && hoje <= fim;
    });
  }, [receitas, hoje]);

  const receitaAtual = receitasDestaque[indexCarrossel] || null;

  const proximo = (e) => {
    e.stopPropagation();
    setIndexCarrossel((i) =>
      i === receitasDestaque.length - 1 ? 0 : i + 1
    );
  };

  const anterior = (e) => {
    e.stopPropagation();
    setIndexCarrossel((i) =>
      i === 0 ? receitasDestaque.length - 1 : i - 1
    );
  };

  return (
    <div className="page-container">

      {/* =========================
         TOPO (MENSAGEM)
      ========================= */}
      <div className="home-top">
        <strong className="title">
          💛 {mensagemAtual?.titulo || "Hora de criar algo incrível ✨"}
        </strong>

        <p className="small text-muted">
          {mensagemAtual?.subtitulo || "Seu próximo amigurumi está te esperando!"}
        </p>
      </div>

      {/* =========================
         CONTINUAR
      ========================= */}
      {ultimaReceita && (
        <div className="card home-continue">
          <img
            src={ultimaReceita.imagem}
            className="home-continue-img"
          />

          <div className="home-continue-info">
            <strong>{ultimaReceita.nome}</strong>

            <span className="small text-muted">
              Continue de onde parou
            </span>

            <div className="progress-bar mt-xs">
              <div
                className="progress-fill"
                style={{ "--progress": `${percentual(ultimaReceita)}%` }}
              />
            </div>

            <span className="small">
              {percentual(ultimaReceita)}% concluído
            </span>
          </div>

          <button
            onClick={() => abrirReceita(ultimaReceita)}
            className="btn btn-primary home-continue-btn"
          >
            ▶ Continuar
          </button>
        </div>
      )}

      {/* =========================
         CARROSSEL
      ========================= */}
      {receitaAtual && (
        <div className="home-carousel-wrapper">

          <div
            onClick={() => abrirReceita(receitaAtual)}
            className="home-carousel"
          >
            <img
              src={receitaAtual.imagem}
              className="home-carousel-img"
            />

            {/* PLAY CENTRAL */}
            <div className="carousel-play">
              ▶
            </div>

            {/* SETAS */}
            {receitasDestaque.length > 1 && (
              <>
                <div className="carousel-arrow left" onClick={anterior}>←</div>
                <div className="carousel-arrow right" onClick={proximo}>→</div>
              </>
            )}

            <div className="carousel-overlay" />

            <div className="carousel-content">
              <strong>{receitaAtual.nome}</strong>

              <p className="small">
                Veja como ficará seu amigurumi
              </p>
            </div>
          </div>

        </div>
      )}

      {/* =========================
         LISTA
      ========================= */}
      <div className="home-section">
        <h3>Receitas para você hoje</h3>

        <p className="small text-muted">
          Baseado no seu progresso
        </p>
      </div>

      <div className="grid gap-sm">
        {receitasRandom.slice(0, 4).map((r) => (
          <CardReceita
            key={r.id}
            receita={r}
            abrirReceita={abrirReceita}
            toggleFavorito={toggleFavorito}
            favoritos={favoritos}
            percentual={percentual}
          />
        ))}
      </div>

    </div>
  );
}