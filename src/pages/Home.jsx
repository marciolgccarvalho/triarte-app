import React from "react";
import CardReceita from "../components/CardReceita";

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

  React.useEffect(() => {
    if (indexCarrossel > receitasDestaque.length - 1) {
      setIndexCarrossel(0);
    }
  }, [indexCarrossel, receitasDestaque.length]);

  React.useEffect(() => {
    if (receitasDestaque.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndexCarrossel((i) =>
        i === receitasDestaque.length - 1 ? 0 : i + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, [receitasDestaque.length]);

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
      {/* TOPO */}
      <div className="home-top">
        <strong className="title">
          💛 {mensagemAtual?.titulo || "Hora de criar algo incrível ✨"}
        </strong>

        <p className="small text-muted">
          {mensagemAtual?.subtitulo || "Seu próximo amigurumi está te esperando!"}
        </p>
      </div>

      {/* CONTINUAR */}
      {ultimaReceita && (
        <div className="home-continue-card">
          <img
            src={ultimaReceita.imagem}
            alt={ultimaReceita.nome}
            className="home-continue-img"
          />

          <div className="home-continue-info">
            <strong>{ultimaReceita.nome}</strong>

            <span className="small text-muted">
              Continue de onde parou
            </span>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentual(ultimaReceita)}%` }}
              />
            </div>

            <span className="small">
              {percentual(ultimaReceita)}% concluído
            </span>
          </div>

          <button
            onClick={() => abrirReceita(ultimaReceita)}
            className="btn-continue"
          >
            ▶ Continuar
          </button>
        </div>
      )}

      {/* CARROSSEL */}
      {receitaAtual && (
        <div className="home-carousel-wrapper">
          <div
            className="home-carousel"
            onClick={() => abrirReceita(receitaAtual)}
          >
            <img
              key={receitaAtual.id}
              src={receitaAtual.imagem}
              alt={receitaAtual.nome}
              className="home-carousel-img carousel-fade"
            />

            {receitasDestaque.length > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-arrow left"
                  onClick={anterior}
                  aria-label="Imagem anterior"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="carousel-arrow right"
                  onClick={proximo}
                  aria-label="Próxima imagem"
                >
                  ›
                </button>
              </>
            )}

            <div className="carousel-overlay" />

            <div className="carousel-content">
              <strong>{receitaAtual.nome}</strong>
              <p className="small">
                Veja como ficará seu amigurumi
              </p>
            </div>

            {receitasDestaque.length > 1 && (
              <div className="carousel-dots">
                {receitasDestaque.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === indexCarrossel ? "active" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEÇÃO */}
      <div className="home-section">
        <h3>Receitas para você hoje</h3>

        <p className="small text-muted">
          Baseado no seu progresso
        </p>
      </div>

      {/* GRID */}
      <div className="home-grid">
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