import React from "react";
import CardReceita from "../components/CardReceita";

export default function Favoritos({
  receitas = [],
  favoritos = [],
  abrirReceita,
  percentual,
  toggleFavorito
}) {
  const [buscaNome, setBuscaNome] = React.useState("");
  const [buscaCategoria, setBuscaCategoria] = React.useState("");
  const [modoExibicao, setModoExibicao] = React.useState("grid");
  const [limite, setLimite] = React.useState(10);
  const [paginaAtual, setPaginaAtual] = React.useState(1);

  const listaBase = (receitas || []).filter((r) =>
    (favoritos || []).includes(r.id)
  );

  const categorias = [
    ...new Set(listaBase.map((r) => r.categoria))
  ];

  const listaFiltrada = React.useMemo(() => {
    const nome = buscaNome.toLowerCase();

    return listaBase.filter((r) => {
      return (
        (nome.length < 3 || r.nome.toLowerCase().includes(nome)) &&
        (buscaCategoria === "" || r.categoria === buscaCategoria)
      );
    });
  }, [listaBase, buscaNome, buscaCategoria]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(listaFiltrada.length / limite)
  );

  const listaPaginada = React.useMemo(() => {
    return listaFiltrada.slice(
      (paginaAtual - 1) * limite,
      paginaAtual * limite
    );
  }, [listaFiltrada, paginaAtual, limite]);

  React.useEffect(() => {
    setPaginaAtual(1);
  }, [buscaNome, buscaCategoria, limite]);

  React.useEffect(() => {
    if (paginaAtual > totalPaginas) {
      setPaginaAtual(1);
    }
  }, [totalPaginas]);

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>
        Minhas receitas favoritas
      </h2>

      {/* SEM FAVORITOS */}
      {listaBase.length === 0 ? (
        <div
          style={{
            marginTop: "20px",
            background: "#fff",
            padding: "30px 20px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
          }}
        >
          <img
            src="/images/icons/favoritos2.png"
            loading="lazy"
            decoding="async"
            style={{
              width: "60px",
              opacity: 0.6,
              marginBottom: "10px"
            }}
          />

          <h3>Nenhuma favorita ainda</h3>

          <p style={{ fontSize: "14px", color: "#666" }}>
            Toque no coração das receitas para salvar aqui ❤️
          </p>
        </div>
      ) : (
        <>
          {/* BUSCA */}
          <input
            placeholder="Buscar favorita..."
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
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
            onChange={(e) => setBuscaCategoria(e.target.value)}
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
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer"
              }}
            >
              <img src="/images/icons/grid.png" style={{ width: "28px" }} />
            </button>

            <button
              onClick={() => setModoExibicao("lista")}
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer"
              }}
            >
              <img src="/images/icons/lista.png" style={{ width: "28px" }} />
            </button>

            <select
              value={limite}
              onChange={(e) => setLimite(Number(e.target.value))}
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
              {listaPaginada.map((r) => (
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
              {listaPaginada.map((r) => (
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

                  {/* 🔥 IMAGEM COM LAZY */}
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
          {listaFiltrada.length > 0 && (
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
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer"
                }}
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
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer"
                }}
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
      )}
    </>
  );
}