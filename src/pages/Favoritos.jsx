import React from "react";
import CardReceita from "@/components/ui/CardReceita";
import { IMAGES } from "@/assets/images";

export default function Favoritos({
  receitasFiltradas = [],
  receitasPaginadas = [],
  totalPaginas = 1,

  buscaNome,
  setBuscaNome,
  buscaCategoria,
  setBuscaCategoria,

  categorias = [],

  modoExibicao,
  setModoExibicao,

  limite,
  setLimite,

  paginaAtual,
  setPaginaAtual,

  abrirReceita,
  toggleFavorito,
  favoritos = [],
  percentual,
  irPara
}) {

  /* =========================
     EMPTY STATE
  ========================= */
  if (receitasFiltradas.length === 0) {
    return (
      <div className="page-container">

        <h2 className="mb-sm">
          Minhas receitas favoritas
        </h2>

        <div className="favoritos-empty">

          <img
            src={IMAGES.ui.emptyFavoritos}
            alt="Sem favoritos"
            className="favoritos-empty-icon"
          />

          <h3>Nada por aqui ainda 💛</h3>

          <p>
            Toque no coração das receitas que você gosta
            e monte sua lista favorita.
          </p>

          <button
            className="btn-primary"
            onClick={() => irPara("receitas")}
          >
            Ver receitas
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="receitas-header">
        <h2>Minhas receitas favoritas</h2>

        <span className="receitas-total">
          {receitasFiltradas.length} receitas encontradas
        </span>
      </div>

      {/* BUSCA */}
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

      {/* FILTROS */}
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

      {/* CONTROLES */}
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

      {/* GRID */}
      {modoExibicao === "grid" && (
        <div className="home-grid">
          {receitasPaginadas.map((r) => (
            <CardReceita
              key={r.id}
              receita={r}
              abrirReceita={(rec) => abrirReceita(rec, "favoritos")} // 🔥 CORRIGIDO
              toggleFavorito={toggleFavorito}
              favoritos={favoritos}
              percentual={percentual}
            />
          ))}
        </div>
      )}

      {/* LISTA */}
      {modoExibicao === "lista" && (
        <div className="receitas-lista">
          {receitasPaginadas.map((r) => {

            const pct = percentual(r);
            const favoritoAtivo = favoritos?.includes(r.id);

            return (
              <div
                key={r.id}
                onClick={() => abrirReceita(r, "favoritos")} // 🔥 CORRIGIDO
                className="receita-list-card"
              >

                <img
                  src={r.imagem}
                  alt={r.nome}
                  className="receita-list-thumb"
                />

                <div className="receita-list-info">

                  <strong className="receita-list-title">
                    {r.nome}
                  </strong>

                  <span className="receita-list-category">
                    {r.categoria}
                  </span>

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

      {/* PAGINAÇÃO */}
      {totalPaginas > 0 && (
        <div className="receitas-paginacao">

          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((p) => p - 1)}
            className="btn-icon"
          >
            <img src={IMAGES.icons.anterior.active} className="icon-md" alt="" />
          </button>

          <span>
            {paginaAtual} / {totalPaginas}
          </span>

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