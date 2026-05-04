import React from "react";
import CardReceita from "../components/CardReceita";
import mensagensData from "../data/mensagens.json";
import { IMAGES } from "../assets/images";

export default function Home({
  ultimaReceita,
  receitas = [],
  abrirReceita = () => {},
  percentual = () => 0,
  toggleFavorito = () => {},
  favoritos = [],
  irPara = () => {}
}) {
  const [indexCarrossel, setIndexCarrossel] = React.useState(0);

  const hoje = React.useMemo(() => new Date(), []);

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

  const isFavorito = favoritos?.includes(receitaAtual?.id);

  const receitasLista = React.useMemo(() => {
    const idsDestaque = new Set(receitasDestaque.map(r => r.id));
    const filtradas = receitas.filter(r => !idsDestaque.has(r.id));
    const embaralhadas = [...filtradas].sort(() => Math.random() - 0.5);
    return embaralhadas.slice(0, 8);
  }, [receitas, receitasDestaque]);

  return (
    <div className="page-container">

      <div className="home-top">
        <strong className="home-title">
          💛 {mensagem.titulo}
        </strong>
        <p className="home-subtitle">
          {mensagem.subtitulo}
        </p>
      </div>

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
          <div className="home-carousel">

            {receitasDestaque.length > 1 && (
              <>
                <div className="carousel-nav left" onClick={anterior}>‹</div>
                <div className="carousel-nav right" onClick={proximo}>›</div>
              </>
            )}

            <img
              key={receitaAtual.id}
              src={receitaAtual.imagem}
              alt={receitaAtual.nome}
              className="home-carousel-img"
              onClick={() => abrirReceita(receitaAtual)}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorito(receitaAtual.id);
              }}
              className={`card-favorito ${isFavorito ? "ativo" : ""}`}
            >
              <img
                src={IMAGES.icons.favoritos.active}
                alt="Favorito"
                className="card-favorito-icon"
              />
            </button>

            <div className="carousel-overlay" />

            <div className="carousel-content">
              <strong>{receitaAtual.nome}</strong>
              <p>Veja como ficará seu amigurumi</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentual(receitaAtual)}%` }}
                />
              </div>

              <span>{percentual(receitaAtual)}% concluído</span>
            </div>
          </div>
        </div>
      )}

      <div className="home-section-header">
        <strong>✨ Outras receitas para você</strong>

        <button
          className="home-ver-todas-inline"
          onClick={() => irPara("receitas")}
        >
          Ver todas
        </button>
      </div>

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

      {/* CTA FINAL CORRIGIDO */}
      <div
        className="home-cta-card"
        onClick={() => irPara("receitas")}
      >
        <div className="home-cta-left">
          <img
            src={IMAGES.icons.lista.home} // 🔥 AQUI ESTÁ A CORREÇÃO
            alt="Receitas"
          />
        </div>

        <div className="home-cta-content">
          <div className="home-cta-text">
            <strong>Ver todas as receitas</strong>
            <span>Explore todas as receitas disponíveis</span>
          </div>
        </div>

        <div className="home-cta-arrow">›</div>
      </div>

    </div>
  );
}