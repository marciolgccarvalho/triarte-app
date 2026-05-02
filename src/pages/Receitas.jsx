import React from "react";
import CardReceita from "../components/CardReceita";

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
      <h2>Todas as receitas</h2>

      {/* BUSCA */}
      <input
        placeholder="Buscar receita..."
        value={buscaNome}
        onChange={(e) => {
          setBuscaNome(e.target.value);
          setPaginaAtual(1);
        }}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "1px solid #ddd"
        }}
      />

      {/* CATEGORIA */}
      <select
        value={buscaCategoria}
        onChange={(e) => {
          setBuscaCategoria(e.target.value);
          setPaginaAtual(1);
        }}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "10px",
          border: "1px solid #ddd"
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
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => setModoExibicao("grid")}
          style={{ background: "transparent", border: "none" }}
        >
          <img src="/images/icons/grid.png" style={{ width: "28px" }} />
        </button>

        <button
          onClick={() => setModoExibicao("lista")}
          style={{ background: "transparent", border: "none" }}
        >
          <img src="/images/icons/lista.png" style={{ width: "28px" }} />
        </button>

        <select
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          }}
        >
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
        <div style={{ display: "grid", gap: "10px" }}>
          {receitasPaginadas.map((r) => (
            <div
              key={r.id}
              onClick={() => abrirReceita(r)}
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                cursor: "pointer"
              }}
            >
              <strong>{r.nome}</strong>

              <p style={{ fontSize: "13px", color: "#666" }}>
                {r.categoria}
              </p>

              {/* 🔥 IMAGEM (adicionado lazy) */}
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

              <div
                style={{
                  height: "6px",
                  background: "#ddd",
                  borderRadius: "6px",
                  overflow: "hidden",
                  marginTop: "8px"
                }}
              >
                <div
                  style={{
                    width: `${percentual(r)}%`,
                    height: "100%",
                    background: "#ffd400"
                  }}
                />
              </div>

              <p style={{ fontSize: "12px", marginTop: "4px" }}>
                {percentual(r)}%
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PAGINAÇÃO */}
      {totalPaginas > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "15px"
          }}
        >
          <button
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual((p) => p - 1)}
            style={{ background: "transparent", border: "none" }}
          >
            <img
              src="/images/icons/anterior.png"
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
            style={{ background: "transparent", border: "none" }}
          >
            <img
              src="/images/icons/proxima.png"
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