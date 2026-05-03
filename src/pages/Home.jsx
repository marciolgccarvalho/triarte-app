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
    return (Array.isArray(receitas) ? receitas : []).filter((r) => {
      if (!r || !r.destaqueInicio || !r.destaqueFim) return false;

      const inicio = new Date(r.destaqueInicio);
      const fim = new Date(r.destaqueFim);

      if (isNaN(inicio) || isNaN(fim)) return false;

      return hoje >= inicio && hoje <= fim;
    });
  }, [receitas, hoje]);

  React.useEffect(() => {
    if (indexCarrossel >= receitasDestaque.length) {
      setIndexCarrossel(0);
    }
  }, [indexCarrossel, receitasDestaque.length]);

  React.useEffect(() => {
    if (receitasDestaque.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndexCarrossel((i) =>
        i === receitasDestaque.length - 1 ? 0 : i + 1
      );
    }, 6000);

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

      {/* MENSAGEM */}
      <div className="text-center mb-sm">
        <strong className="title">
          💛 {mensagemAtual?.titulo || "Seu próximo amigurumi começa agora"}
        </strong>
      </div>

      {/* CONTINUAR */}
      {ultimaReceita && (
        <div
          onClick={() => abrirReceita(ultimaReceita)}
          className="card flex home-continue"
        >
          <img
            src={ultimaReceita?.imagem || IMAGES.ui.logo}
            loading="lazy"
            decoding="async"
            className="home-continue-img"
          />

          <div className="ml-sm">
            <strong>{ultimaReceita?.nome || "Receita"}</strong>
            <div className="small">Continuar</div>
          </div>
        </div>
      )}

      {/* CARROSSEL */}
      {receitaAtual && (
        <div className="mb-lg">
          <div
            onClick={() => abrirReceita(receitaAtual)}
            className="card home-carousel"
          >
            <img
              src={receitaAtual?.imagem || IMAGES.ui.logo}
              className="home-carousel-img"
            />

            {receitasDestaque.length > 1 && (
              <img
                src={IMAGES.icons.anterior.active}
                onClick={anterior}
                className="carousel-arrow left"
              />
            )}

            {receitasDestaque.length > 1 && (
              <img
                src={IMAGES.icons.proxima.active}
                onClick={proximo}
                className="carousel-arrow right"
              />
            )}

            <div className="carousel-overlay" />

            <div className="carousel-content">
              <strong className="title">
                {receitaAtual?.nome}
              </strong>

              <p className="small">
                Toque para assistir a receita
              </p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ "--progress": `${percentual(receitaAtual)}%` }}
                />
              </div>

              <span className="small">
                {percentual(receitaAtual)}% concluído
              </span>
            </div>
          </div>
        </div>
      )}

      <h2 className="mb-sm">Receitas para você hoje</h2>

      <div className="grid gap-sm">
        {(Array.isArray(receitasRandom) ? receitasRandom : [])
          .slice(0, 8)
          .filter(Boolean)
          .map((r) => (
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