import React from "react";
import CardReceita from "../components/CardReceita";
import mensagensData from "../data/mensagens.json";

export default function Home({
  ultimaReceita,
  receitas = [],
  abrirReceita = () => {},
  percentual = () => 0,
  toggleFavorito = () => {},
  favoritos = []
}) {
  const [indexCarrossel, setIndexCarrossel] = React.useState(0);

  const hoje = React.useMemo(() => new Date(), []);

  /* =========================
     MENSAGEM RANDOM (JSON)
  ========================= */
  const mensagem = React.useMemo(() => {
    if (!mensagensData || mensagensData.length === 0) {
      return {
        titulo: "Bem-vindo ao Real Triarte",
        subtitulo: "Explore o app"
      };
    }

    const boasVindas = mensagensData.filter(m => m.tipo === "boasvindas");
    const lista = boasVindas.length > 0 ? boasVindas : mensagensData;

    const index = Math.floor(Math.random() * lista.length);
    return lista[index];
  }, []);

  /* =========================
     CARROSSEL (DESTAQUE)
  ========================= */
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

  /* =========================
     LISTA (8 RANDOM SEM DESTAQUE)
  ========================= */
  const receitasLista = React.useMemo(() => {
    const idsDestaque = new Set(receitasDestaque.map(r => r.id));
    const filtradas = receitas.filter(r => !idsDestaque.has(r.id));
    const embaralhadas = [...filtradas].sort(() => Math.random() - 0.5);
    return embaralhadas.slice(0, 8);
  }, [receitas, receitasDestaque]);

  return (
    <div className="page-container">

      {/* TOPO */}
      <div className="home-top">
        <strong className="home-title">
          💛 {mensagem.titulo}
        </strong>

        <p className="home-subtitle">
          {mensagem.subtitulo}
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

            <strong className="home-continue-title">
              {ultimaReceita.nome}
            </strong>

            <span className="home-continue-sub">
              Continue de onde parou
            </span>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentual(ultimaReceita)}%` }}
              />
            </div>

            <span className="home-continue-progress">
              {percentual(ultimaReceita)}% concluído
            </span>
          </div>

          <button
            className="home-continue-btn"
            onClick={() => abrirReceita(ultimaReceita)}
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
                <button className="carousel-arrow left" onClick={anterior}>‹</button>
                <button className="carousel-arrow right" onClick={proximo}>›</button>
              </>
            )}

            <div className="carousel-overlay" />

            <div className="carousel-content">
              <strong>{receitaAtual.nome}</strong>

              <p className="small">
                Veja como ficará seu amigurumi
              </p>

              {/* 🔥 PROGRESSO IGUAL AOS CARDS */}
              <div className="progress-bar carousel-progress">
                <div
                  className="progress-fill"
                  style={{ width: `${percentual(receitaAtual)}%` }}
                />
              </div>

              <span className="carousel-progress-text">
                {percentual(receitaAtual)}% concluído
              </span>
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
        <h3>💛 Receitas para você hoje</h3>
        
      </div>

      {/* GRID */}
      <div className="home-grid">
        {receitasLista.map((r) => (
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