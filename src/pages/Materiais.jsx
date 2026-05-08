import React from "react";

import { IMAGES } from "../assets/images";

import coresLinhas from "../data/cores-linhas.json";

export default function Materiais({
  receita,
  voltar,
  listaMateriaisTexto
}) {

  if (!receita) {
    return (
      <div className="p-md">
        <h2>Nenhuma receita selecionada</h2>
      </div>
    );
  }

  // ========================================
  // NORMALIZAR TEXTO DA LISTA
  // ========================================

  const textoLista =
    typeof listaMateriaisTexto ===
    "function"
      ? listaMateriaisTexto()
      : listaMateriaisTexto || "";

  // ========================================
  // BUSCAR LINHA PELO CÓDIGO
  // ========================================

  const buscarLinha = (codigo) => {
    return coresLinhas.find(
      (linha) =>
        String(linha["Código"]) ===
        String(codigo)
    );
  };

  // ========================================
  // GERAR IMAGEM DA LINHA
  // ========================================

  const gerarBackgroundLinha = (
    linha
  ) => {

    if (!linha) {
      return "#ececec";
    }

    const escuro =
      linha["HEX escuro"];

    const medio =
      linha["HEX médio"];

    const claro =
      linha["HEX claro"];

    return `
      linear-gradient(
        135deg,
        ${escuro},
        ${medio},
        ${claro}
      ),
      url(${IMAGES.ui.baselinha})
    `;
  };

  // ========================================
  // ABRIR MERCADO LIVRE
  // ========================================

  const abrirMercadoLivre = () => {

    window.open(
      "https://mercadolivre.com/sec/1AW2X78",
      "_blank"
    );
  };

  return (

    <div className="page-container">

      {/* VOLTAR */}

      <div className="mb-sm">

        <button
          onClick={voltar}
          className="materiais-back-btn"
        >
          <img
            src={IMAGES.icons.anterior.active}
            alt="Voltar"
            className="materiais-back-icon"
          />
        </button>

      </div>

      {/* TÍTULO */}

      <h2 className="materiais-title mb-sm">
        Materiais
      </h2>

      <p className="small text-muted mb-md materiais-subtitle">

        Compre os materiais pelo
        nosso link e ajude o Real
        Triarte 💛

      </p>

      {/* BOTÃO MERCADO LIVRE */}

      <button
        onClick={
          abrirMercadoLivre
        }
        className="btn btn-primary mb-lg btn-full materiais-btn-ml"
      >

        Comprar no Mercado Livre

      </button>

      {/* LINHAS */}

      <h3 className="materiais-section-title mb-sm">
        🧶 Linhas
      </h3>

      <div className="grid gap-sm mb-lg">

        {(receita.materiais
          ?.linhas || []).map(
          (item, index) => {

            const linha =
              buscarLinha(item);

            if (!linha) {
              return null;
            }

            return (

              <div
                key={index}
                className="material-linha-card"
              >

                {/* IMAGEM */}

                <div
                  className="material-linha-thumb"
                  style={{

                    backgroundImage:
                      gerarBackgroundLinha(
                        linha
                      ),

                    backgroundBlendMode:
                      "multiply",

                    backgroundSize:
                      "cover",

                    backgroundPosition:
                      "center"
                  }}
                />

                {/* INFOS */}

                <div className="material-linha-info">

                  <div className="material-linha-top">

                    <h4 className="material-linha-nome">
                      {
                        linha[
                          "Nome"
                        ]
                      }
                    </h4>

                    <span className="material-linha-codigo">
                      {
                        linha[
                          "Código"
                        ]
                      }
                    </span>

                  </div>

                  <div className="material-linha-bottom">

                    <span className="material-linha-categoria">
                      {
                        linha[
                          "Categoria"
                        ]
                      }
                    </span>

                  </div>

                </div>

                {/* SETA */}

                <div className="material-linha-arrow">
                   
                </div>

              </div>
            );
          }
        )}

      </div>

      {/* OUTROS MATERIAIS */}

      <h3 className="materiais-section-title mb-sm">
        ✂ Outros materiais
      </h3>

      <div className="grid gap-sm">

        {(receita.materiais
          ?.itens || []).map(
          (item, index) => (

            <div
              key={index}
              className="card material-item-card"
            >

              <span className="material-emoji">
                ✔
              </span>

              <span className="material-text">
                {item}
              </span>

            </div>
          )
        )}

      </div>

      {/* AÇÕES */}

      <div className="materiais-actions">

        {/* COPIAR */}

        <button
          onClick={async () => {

            try {

              await navigator.clipboard.writeText(
                textoLista
              );

              const botao =
                document.getElementById(
                  "btn-copiar-materiais"
                );

              if (botao) {

                botao.innerHTML =
                  "✔ Copiado!";

                botao.classList.add(
                  "materiais-copy-success"
                );

                setTimeout(() => {

                  botao.innerHTML =
                    "Copiar lista de materiais";

                  botao.classList.remove(
                    "materiais-copy-success"
                  );

                }, 2000);
              }

            } catch (error) {

              alert(
                "Erro ao copiar lista."
              );
            }

          }}
          id="btn-copiar-materiais"
          className="btn btn-primary btn-full materiais-copy-btn"
        >

          Copiar lista de materiais

        </button>

        {/* COMPARTILHAR */}

        <button
          onClick={async () => {

            try {

              if (navigator.share) {

                await navigator.share({

                  title:
                    "Materiais Real Triarte",

                  text: textoLista
                });

              } else {

                await navigator.clipboard.writeText(
                  textoLista
                );

                alert(
                  "Seu celular não suporta compartilhamento. A lista foi copiada."
                );
              }

            } catch (error) {

              console.log(error);
            }

          }}
          className="btn btn-full materiais-share-btn"
        >

          Compartilhar lista

        </button>

      </div>

    </div>
  );
}