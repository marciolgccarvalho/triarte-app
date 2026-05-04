import React from "react";
import CardReceita from "../components/CardReceita";
import { IMAGES } from "../assets/images";

export default function Receitas({
  receitas,
  receitasFiltradas,
  buscaNome,
  setBuscaNome,
  buscaCategoria,
  setBuscaCategoria,
  categorias,
  receitasPaginadas,
  modoExibicao,
  setModoExibicao,
  limite,
  setLimite,
  paginaAtual,
  setPaginaAtual,
  totalPaginas,
  abrirReceita,
  toggleFavorito,
  favoritos,
  percentual
}) {
  React.useEffect(() => {
    if (paginaAtual > totalPaginas && totalPaginas > 0) {
      setPaginaAtual(1);
    }
  }, [paginaAtual, totalPaginas, setPaginaAtual]);

  return (
    <div className="page-container">
      <div className="receitas-header">
        <h2>Todas as receitas</h2>
        <span className="receitas-total">
          {receitasFiltradas.length} receitas encontradas
        </span>
      </div>

      <div className="receitas-busca">
        <input
          placeholder="Buscar receita..."
          value={buscaNome}
          onChange={(e) => {
            setBuscaNome(e.target.value);
            setPaginaAtual(1);
          }}
        />
      </div>

      <div className="receitas-filtros">
        <select
          value={buscaCategoria}
          onChange={(e) => {
            setBuscaCategoria(e.target.value);
            setPaginaAtual(1);
          }}
        >
          <option value="">Todas as categorias</option>
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={limite}
          onChange={(e) => {
            setLimite(Number(e.target.value));
            setPaginaAtual(1);
          }}
        >
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={30}>30 por página</option>
        </select>
      </div>

      <div className="receitas-controles">
        <div className="receitas-view">
          <button
            onClick={() => setModoExibicao("grid")}
            className={`btn-icon ${modoExibicao === "grid" ? "ativo" : ""}`}
          >
            <img src={IMAGES.icons.grid.active} className="icon-md" alt="" />
            <span>Grid</span>
          </button>

          <button
            onClick={() => setModoExibicao("lista")}
            className={`btn-icon ${modoExibicao === "lista" ? "ativo" : ""}`}
          >
            <img src={IMAGES.icons.lista.active} className="icon-md" alt="" />
            <span>Lista</span>
          </button>
        </div>
      </div>

      {modoExibicao === "grid" && (
        <div className="home-grid">
          {receitasPaginadas.map((r) => (
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
      )}

      {modoExibicao === "lista" && (
        <div className="receitas-lista">
          {receitasPaginadas.map((r) => {
            const pct = percentual(r);
            const favoritoAtivo = favoritos?.includes(r.id);

            return (
              <div
                key={r.id}
                onClick={() => abrirReceita(r)}
                className="receita-list-card"
              >
                <img
                  src={r.imagem}
                  alt={r.nome}
                  className="receita-list-thumb"
                />

                <div className="receita-list-info">
                  <strong className="receita-list-title">{r.nome}</strong>
                  <span className="receita-list-category">{r.categoria}</span>

                  <div className="receita-list-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span>{pct}% concluído</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(r.id);
                  }}
                  className={`receita-list-fav ${favoritoAtivo ? "ativo" : ""}`}
                >
                  <img
                    src={IMAGES.icons.favoritos.active}
                    alt="Favoritar"
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {totalPaginas > 0 && (
        <div className="receitas-paginacao">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((p) => p - 1)}
            className="btn-icon"
          >
            <img src={IMAGES.icons.anterior.active} className="icon-md" alt="" />
          </button>

          <span>{paginaAtual} / {totalPaginas}</span>

          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual((p) => p + 1)}
            className="btn-icon"
          >
            <img src={IMAGES.icons.proxima.active} className="icon-md" alt="" />
          </button>
        </div>
      )}
    </div>
  );
}