import {
  useEffect,
  useMemo,
  useState
} from "react";

import "../styles/components/linhas.css";

import coresLinhas from "../data/cores-linhas.json";
import { IMAGES } from "../assets/images";

const TEXTURAS = [
  IMAGES.ui.baselinha,
  IMAGES.ui.baselinha2,
  IMAGES.ui.baselinha3,
  IMAGES.ui.baselinha4,
  IMAGES.ui.baselinha5,
  IMAGES.ui.baselinha6
];

const getTexturaLinha = (codigo) => {
  const indice =
    Number(codigo) %
    TEXTURAS.length;

  return TEXTURAS[indice];
};

const ITENS_POR_PAGINA = 20;

function Linhas() {
  const [busca, setBusca] = useState("");

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("todas");

  const [ordenacao, setOrdenacao] =
    useState("codigo");

  const [modoVisualizacao, setModoVisualizacao] =
    useState("lista");

  const [linhaSelecionada, setLinhaSelecionada] =
    useState(null);

  const [paginaAtual, setPaginaAtual] =
    useState(1);

  const categorias = useMemo(() => {
    return [
      "todas",
      ...new Set(
        coresLinhas.map(
          (linha) => linha["Categoria"]
        )
      )
    ];
  }, []);

  const linhasFiltradas = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    let resultado = coresLinhas.filter((linha) => {
      const matchBusca =
        !termo ||
        linha["Nome"]
          .toLowerCase()
          .includes(termo) ||
        linha["Código"]
          .toLowerCase()
          .includes(termo) ||
        linha["Categoria"]
          .toLowerCase()
          .includes(termo);

      const matchCategoria =
        categoriaSelecionada === "todas" ||
        linha["Categoria"] ===
          categoriaSelecionada;

      return (
        matchBusca &&
        matchCategoria
      );
    });

    switch (ordenacao) {
      case "nome-asc":
        resultado.sort((a, b) =>
          a["Nome"].localeCompare(
            b["Nome"]
          )
        );
        break;

      case "nome-desc":
        resultado.sort((a, b) =>
          b["Nome"].localeCompare(
            a["Nome"]
          )
        );
        break;

      case "codigo-desc":
        resultado.sort(
          (a, b) =>
            Number(b["Código"]) -
            Number(a["Código"])
        );
        break;

      default:
        resultado.sort(
          (a, b) =>
            Number(a["Código"]) -
            Number(b["Código"])
        );
    }

    return resultado;
  }, [
    busca,
    categoriaSelecionada,
    ordenacao
  ]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [
    busca,
    categoriaSelecionada,
    ordenacao
  ]);

  const totalPaginas = Math.ceil(
    linhasFiltradas.length /
      ITENS_POR_PAGINA
  );

  const indiceInicial =
    (paginaAtual - 1) *
    ITENS_POR_PAGINA;

  const linhasPaginadas =
    linhasFiltradas.slice(
      indiceInicial,
      indiceInicial +
        ITENS_POR_PAGINA
    );

  const copiarLista = async () => {
    const texto = linhasFiltradas
      .map((linha) => {
        return `${linha["Código"]} - ${linha["Nome"]} (${linha["Categoria"]})`;
      })
      .join("\n");

    try {
      await navigator.clipboard.writeText(texto);

      alert(
        "Lista copiada com sucesso!"
      );
    } catch (error) {
      alert(
        "Erro ao copiar lista."
      );
    }
  };

  return (
    <main className="linhas-page">
      <section className="linhas-header">
        <h1 className="linhas-title">
          Paleta de Cores
        </h1>

        <p className="linhas-total">
          {linhasFiltradas.length} receitas encontradas
        </p>
      </section>

      <section className="linhas-filtros">
        <input
          type="text"
          placeholder="Buscar por Nome"
          className="linhas-busca"
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

        <div className="linhas-selects">
          <select
            className="linhas-select"
            value={categoriaSelecionada}
            onChange={(e) =>
              setCategoriaSelecionada(
                e.target.value
              )
            }
          >
            {categorias.map((categoria) => (
              <option
                key={categoria}
                value={categoria}
              >
                {categoria === "todas"
                  ? "Todas as categorias"
                  : categoria}
              </option>
            ))}
          </select>

          <select
            className="linhas-select"
            value={ordenacao}
            onChange={(e) =>
              setOrdenacao(
                e.target.value
              )
            }
          >
            <option value="codigo">
              Código crescente
            </option>

            <option value="codigo-desc">
              Código decrescente
            </option>

            <option value="nome-asc">
              Nome A-Z
            </option>

            <option value="nome-desc">
              Nome Z-A
            </option>
          </select>
        </div>

        <div className="linhas-view">
          <button
            className={`view-btn ${
              modoVisualizacao === "grid"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setModoVisualizacao(
                "grid"
              )
            }
          >
            Grid
          </button>

          <button
            className={`view-btn ${
              modoVisualizacao === "lista"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setModoVisualizacao(
                "lista"
              )
            }
          >
            Lista
          </button>
        </div>
      </section>

      {modoVisualizacao === "lista" && (
        <>
          <div className="linhas-tabela-header">
            <span>Cor</span>
            <span>Nome</span>
            <span>Classificação</span>
            <span>Código</span>
          </div>

          <div className="linhas-lista">
            {linhasPaginadas.length === 0 ? (
              <div className="linhas-vazio">
                <div className="linhas-vazio-icone">
                  🔍
                </div>

                <h3>
                  Nenhuma cor encontrada
                </h3>

                <p>
                  Tente ajustar sua busca
                  ou filtros.
                </p>
              </div>
            ) : (
              linhasPaginadas.map((linha) => (
                <div
                  className="linha-card"
                  key={linha["Código"]}
                  onClick={() =>
                    setLinhaSelecionada(
                      linha
                    )
                  }
                >
                  <div className="linha-preview">
                    <img
                      src={getTexturaLinha(
                        linha["Código"]
                      )}
                      alt={linha["Nome"]}
                    />

                    <div
                      className="linha-overlay"
                      style={{
                        background: `
                          linear-gradient(
                            135deg,
                            ${linha["HEX claro"]},
                            ${linha["HEX médio"]},
                            ${linha["HEX escuro"]}
                          )
                        `
                      }}
                    />
                  </div>

                  <div className="linha-nome">
                    {linha["Nome"]}
                  </div>

                  <div
                    className={`linha-categoria categoria-${linha[
                      "Categoria"
                    ]
                      .toLowerCase()
                      .replace("/", "-")
                      .replace(" ", "-")}`}
                  >
                    {linha["Categoria"]}
                  </div>

                  <div className="linha-direita">
                    <div className="linha-codigo">
                      {linha["Código"]}
                    </div>

                    <div className="linha-seta">
                      ›
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {modoVisualizacao === "grid" && (
        <div className="linhas-grid">
          {linhasPaginadas.map(
            (linha) => (
              <div
                className="linha-grid-card"
                key={
                  linha["Código"]
                }
                onClick={() =>
                  setLinhaSelecionada(
                    linha
                  )
                }
              >
                <div className="linha-grid-preview">
                  <img
                    src={getTexturaLinha(
                      linha["Código"]
                    )}
                    alt={
                      linha["Nome"]
                    }
                  />

                  <div
                    className="linha-overlay"
                    style={{
                      background: `
                        linear-gradient(
                          135deg,
                          ${linha["HEX claro"]},
                          ${linha["HEX médio"]},
                          ${linha["HEX escuro"]}
                        )
                      `
                    }}
                  />
                </div>

                <div className="linha-grid-info">
                  <h3>
                    {
                      linha["Nome"]
                    }
                  </h3>

                  <span>
                    {
                      linha[
                        "Código"
                      ]
                    }
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <div className="linhas-paginacao">
        <button
          disabled={
            paginaAtual === 1
          }
          onClick={() =>
            setPaginaAtual(
              (prev) =>
                prev - 1
            )
          }
        >
          ‹
        </button>

        {Array.from({
          length: totalPaginas
        }).map((_, index) => (
          <button
            key={index}
            className={
              paginaAtual ===
              index + 1
                ? "active"
                : ""
            }
            onClick={() =>
              setPaginaAtual(
                index + 1
              )
            }
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={
            paginaAtual ===
            totalPaginas
          }
          onClick={() =>
            setPaginaAtual(
              (prev) =>
                prev + 1
            )
          }
        >
          ›
        </button>
      </div>

      <button
        className="copiar-btn"
        onClick={copiarLista}
      >
        Copiar a lista de Linhas
      </button>

      {linhaSelecionada && (
        <div
          className="linha-modal-overlay"
          onClick={() =>
            setLinhaSelecionada(
              null
            )
          }
        >
          <div
            className="linha-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="linha-modal-close"
              onClick={() =>
                setLinhaSelecionada(
                  null
                )
              }
            >
              ×
            </button>

            <div className="linha-modal-preview">
              <img
                src={getTexturaLinha(
                  linhaSelecionada[
                    "Código"
                  ]
                )}
                alt={
                  linhaSelecionada[
                    "Nome"
                  ]
                }
              />

              <div
                className="linha-overlay"
                style={{
                  background: `
                    linear-gradient(
                      135deg,
                      ${linhaSelecionada["HEX claro"]},
                      ${linhaSelecionada["HEX médio"]},
                      ${linhaSelecionada["HEX escuro"]}
                    )
                  `
                }}
              />
            </div>

            <h2>
              {
                linhaSelecionada[
                  "Nome"
                ]
              }
            </h2>

            <p className="linha-modal-codigo">
              Código{" "}
              {
                linhaSelecionada[
                  "Código"
                ]
              }
            </p>

            <div className="linha-modal-categoria">
              {
                linhaSelecionada[
                  "Categoria"
                ]
              }
            </div>

            <p className="linha-modal-descricao">
              {
                linhaSelecionada[
                  "Descrição Nome"
                ]
              }
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Linhas;