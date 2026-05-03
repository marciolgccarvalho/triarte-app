import React from "react";
import CardReceita from "../components/CardReceita";
import { IMAGES } from "../assets/images";

export default function Receitas({
  receitas,
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
  }, [totalPaginas]);

  return (
    <>
      <h2 className="mb-sm">Todas as receitas</h2>

      {/* BUSCA */}
      <input
        className="input mb-sm"
        placeholder="Buscar receita..."
        value={buscaNome}
        onChange={(e) => {
          setBuscaNome(e.target.value);
          setPaginaAtual(1);
        }}
      />

      {/* CATEGORIA */}
      <select
        className="input mb-sm"
        value={buscaCategoria}
        onChange={(e) => {
          setBuscaCategoria(e.target.value);
          setPaginaAtual(1);
        }}
      >
        <option value="">Todas as categorias</option>
        {categorias.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* CONTROLES */}
      <div className="flex gap-sm mb-md flex-center">
        <button onClick={() => setModoExibicao("grid")}>
          <img src={IMAGES.icons.grid.active} style={{ width: "28px" }} />
        </button>

        <button onClick={() => setModoExibicao("lista")}>
          <img src={IMAGES.icons.lista.active} style={{ width: "28px" }} />
        </button>

        <select
          className="input"
          value={limite}
          onChange={(e) => {
            setLimite(Number(e.target.value));
            setPaginaAtual(1);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      {/* GRID */}
      {modoExibicao === "grid" && (
        <div className="grid gap-sm">
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

      {/* LISTA */}
      {modoExibicao === "lista" && (
        <div className="grid gap-sm">
          {receitasPaginadas.map((r) => (
            <div
              key={r.id}
              onClick={() => abrirReceita(r)}
              className="card"
              style={{ cursor: "pointer" }}
            >
              <strong>{r.nome}</strong>

              <p className="small text-muted">
                {r.categoria}
              </p>

              <img
                src={r.imagem}
                alt={r.nome}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "8px"
                }}
              />

              {/* PROGRESSO */}
              <div
                style={{
                  height: "6px",
                  background: "var(--color-surface)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "8px"
                }}
              >
                <div
                  style={{
                    width: `${percentual(r)}%`,
                    height: "100%",
                    background: "var(--color-accent)"
                  }}
                />
              </div>

              <p className="small mt-sm">
                {percentual(r)}%
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINAÇÃO */}
      {totalPaginas > 0 && (
        <div className="flex-center gap-sm mt-md">
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((p) => p - 1)}
          >
            <img
              src={IMAGES.icons.anterior.active}
              style={{
                width: "28px",
                opacity: paginaAtual === 1 ? 0.3 : 1
              }}
            />
          </button>

          <span>
            {paginaAtual} / {totalPaginas}
          </span>

          <button
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual((p) => p + 1)}
          >
            <img
              src={IMAGES.icons.proxima.active}
              style={{
                width: "28px",
                opacity: paginaAtual === totalPaginas ? 0.3 : 1
              }}
            />
          </button>
        </div>
      )}
    </>
  );
}