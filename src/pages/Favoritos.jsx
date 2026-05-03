import React from "react";
import CardReceita from "../components/CardReceita";
import { IMAGES } from "../assets/images";

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
    <div className="page-container">
      <h2 className="mb-sm">
        Minhas receitas favoritas
      </h2>

      {/* SEM FAVORITOS */}
      {listaBase.length === 0 ? (
        <div className="card text-center mt-md favoritos-empty">
          <img
            src={IMAGES.icons.favoritos.active}
            loading="lazy"
            decoding="async"
            className="favoritos-empty-icon"
          />

          <h3 className="mt-sm">Nenhuma favorita ainda</h3>

          <p className="small text-muted mt-sm">
            Toque no coração das receitas para salvar aqui ❤️
          </p>
        </div>
      ) : (
        <>
          {/* BUSCA */}
          <input
            className="input mb-sm"
            placeholder="Buscar favorita..."
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
          />

          {/* CATEGORIA */}
          <select
            className="input mb-sm"
            value={buscaCategoria}
            onChange={(e) => setBuscaCategoria(e.target.value)}
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
            <button onClick={() => setModoExibicao("grid")} className="btn-icon">
              <img src={IMAGES.icons.grid.active} className="icon-md" />
            </button>

            <button onClick={() => setModoExibicao("lista")} className="btn-icon">
              <img src={IMAGES.icons.lista.active} className="icon-md" />
            </button>

            <select
              className="input"
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
            <div className="grid gap-sm">
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
            <div className="grid gap-sm">
              {listaPaginada.map((r) => (
                <div
                  key={r.id}
                  onClick={() => abrirReceita(r)}
                  className="card favoritos-item"
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
                    className="favoritos-img"
                  />

                  <div className="progress-bar mt-sm">
                    <div
                      className="progress-fill"
                      style={{ "--progress": `${percentual(r)}%` }}
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
          {listaFiltrada.length > 0 && (
            <div className="flex-center gap-sm mt-md">
              <button
                disabled={paginaAtual === 1}
                onClick={() => setPaginaAtual((p) => p - 1)}
                className="btn-icon"
              >
                <img
                  src={IMAGES.icons.anterior.active}
                  className="icon-md"
                />
              </button>

              <span>
                {paginaAtual} / {totalPaginas}
              </span>

              <button
                disabled={paginaAtual === totalPaginas}
                onClick={() => setPaginaAtual((p) => p + 1)}
                className="btn-icon"
              >
                <img
                  src={IMAGES.icons.proxima.active}
                  className="icon-md"
                />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}